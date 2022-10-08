/* eslint-disable @typescript-eslint/no-floating-promises */
import "dotenv/config";
import "reflect-metadata";
import { PrismaClient } from "@prisma/client";
import { Agenda } from "agenda";
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import MongoStore from "connect-mongo";
import cors from "cors";
import express, { Request } from "express";
import session from "express-session";
import { useServer } from "graphql-ws/lib/use/ws";
import { createServer } from "http";
import { MongoClient } from "mongodb";
import { buildSchema } from "type-graphql";
import { WebSocketServer } from "ws";
import { COOKIE_NAME, PORT, __prod__ } from "./constants";
import { LabelResolver } from "./resolvers/label.resolver";
import { NoteResolver } from "./resolvers/note.resolver";
import { UserResolver } from "./resolvers/user.resolver";

(async () => {
  try {
    const app = express();

    const httpServer = createServer(app);

    // create websocket server
    const wsServer = new WebSocketServer({
      server: httpServer,
      path: "/graphql",
    });

    const prisma = new PrismaClient();
    const mongoClient = new MongoClient(process.env.MONGO_URI);
    const mongoDB = mongoClient.db(process.env.MONGO_DB_NAME);
    const agenda = new Agenda({
      db: {
        address: __prod__ ? process.env.MONGO_URI :`${process.env.MONGO_URI}/${process.env.MONGO_DB_NAME}`,
        collection: "agendaJobs",
      },
    });
    const sessionMiddleware = session({
      name: COOKIE_NAME,
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        dbName: process.env.MONGO_DB_NAME,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: __prod__ ? "none" : "lax",
        secure: __prod__, // cookie only works in https
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    });

    const schema = await buildSchema({
      resolvers: [LabelResolver, NoteResolver, UserResolver],
      validate: false,
    });

    const serverCleanup = useServer(
      {
        schema,
        onConnect: async ({ extra: { request } }) => {
          const req = request as Request;
          sessionMiddleware(req, {} as any, () => {
            if (req.session.userId === null) {
              throw new Error("not authenticated");
            }
          });
        },
        context: ({ extra: { request } }) => {
          const req = request as Request;

          return { userId: req.session?.userId };
        },
      },
      wsServer,
    );

    await mongoDB.collection("user_forgot_password_token").createIndex(
      { createdAt: 1 },
      { expireAfterSeconds: 1000 * 60 * 60 * 24 * 3 }, // 3 days
    );

    app.set("trust proxy", 1);

    app.use(
      cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
      }),
    );

    app.use(sessionMiddleware);

    const apollo = new ApolloServer({
      plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground(),
        ApolloServerPluginDrainHttpServer({ httpServer }),
        {
          async serverWillStart() {
            return {
              async drainServer() {
                await serverCleanup.dispose();
              },
            };
          },
        },
      ],
      schema,
      csrfPrevention: true,
      introspection: true,
      cache: "bounded",
      context: ({ req, res }) => ({ req, res, prisma, mongoDB, agenda }),
    });

    await apollo.start();
    await agenda.start();
    await mongoClient.connect();

    apollo.applyMiddleware({ app, cors: false });

    httpServer.listen(+PORT, () => {
      console.log(`server ready at http://localhost:${PORT}${apollo.graphqlPath}`);
    });
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
})();
