import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { Db } from "mongodb";
import { Agenda } from "agenda";

export type Context = {
  req: Request;
  res: Response;
  mongoDB: Db;
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
  agenda: Agenda;
};
