import argon2 from "argon2";
import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../schema/user.schema";
import { Context } from "../types/context";
import { sendEmail } from "../utils/sendEmail";
import { verifyIdToken } from "../utils/verifyTokenId";

import { v4 } from "uuid";
import { COOKIE_NAME } from "../constants";
import { isAuth } from "../middleware/auth.middleware";
import { validateAuth } from "../utils/validateAuth";

@ObjectType()
export class Error {
  @Field(() => String)
  field!: string;

  @Field(() => String)
  message!: string;
}

@ObjectType()
class UserResponse {
  @Field(() => Error, { nullable: true })
  error?: Error;

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async signinFromGoogle(@Arg("tokenId") tokenId: string, @Ctx() { prisma, req }: Context): Promise<UserResponse> {
    const payload = await verifyIdToken(tokenId);

    const userFromGoogleExist = await prisma.user.findFirst({
      where: {
        email: payload?.email,
        AND: {
          isFromGoogle: true,
        },
      },
    });

    if (!userFromGoogleExist) {
      const newUser = await prisma.user.create({
        data: {
          email: payload?.email!,
          name: payload?.given_name ?? payload?.name ?? payload?.family_name ?? payload?.email!,
          picture: payload?.picture,
          isFromGoogle: true,
        },
      });

      req.session.userId = newUser.id;
      return {
        user: newUser,
      };
    } else {
      req.session.userId = userFromGoogleExist.id;
      return {
        user: userFromGoogleExist,
      };
    }
  }

  @Mutation(() => UserResponse)
  async signup(
    @Arg("name") name: string,
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { prisma, req }: Context
  ): Promise<UserResponse> {
    validateAuth(email, password);
    if (name === "")
      return {
        error: {
          field: "name",
          message: "name is required",
        },
      };

    const googleUser = await prisma.user.findFirst({
      where: {
        email,
        AND: {
          isFromGoogle: true,
        },
      },
    });

    if (googleUser)
      return {
        error: {
          field: "email",
          message: "this email is already registered via google, please signup via google instead",
        },
      };

    const userExist = await prisma.user.findFirst({
      where: {
        email,
        AND: {
          isFromGoogle: null,
        },
      },
    });

    if (userExist)
      return {
        error: {
          field: "email",
          message: "that email already exist",
        },
      };

    const hashedPassword = await argon2.hash(password);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    req.session.userId = user.id;

    return {
      user,
    };
  }

  @Mutation(() => UserResponse)
  async signin(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { prisma, req }: Context
  ): Promise<UserResponse> {
    validateAuth(email, password);

    const googleUser = await prisma.user.findFirst({
      where: {
        email,
        AND: {
          isFromGoogle: true,
        },
      },
    });

    if (googleUser)
      return {
        error: {
          field: "email",
          message: "this email is already registered via google, please signin via google instead",
        },
      };

    const user = await prisma.user.findFirst({
      where: {
        email,
        AND: {
          isFromGoogle: null,
        },
      },
    });

    if (!user)
      return {
        error: {
          field: "email",
          message: "that email doesn't exist",
        },
      };

    const valid = await argon2.verify(user.password!, password);

    if (!valid)
      return {
        error: {
          field: "password",
          message: "incorrect password",
        },
      };

    req.session.userId = user.id;

    return {
      user,
    };
  }

  @Mutation(() => String)
  async forgotPassword(@Arg("email") email: string, @Ctx() { prisma, mongoDB }: Context) {
    const user = await prisma.user.findFirst({
      where: {
        email,
        AND: {
          isFromGoogle: null,
        },
      },
    });

    if (!user) return false;

    const token = v4();

    await mongoDB.collection("user_forgot_password_token").insertOne({
      token,
      id: user.id,
      createdAt: new Date(),
    });

    const link = await sendEmail(
      email,
      `
    <a href="${process.env.CORS_ORIGIN}/change-password/${token}">reset password</a>
    `
    );

    return link;
  }

  @Mutation(() => UserResponse)
  async changePassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { mongoDB, prisma, req }: Context
  ): Promise<UserResponse> {
    if (newPassword.length <= 3)
      return {
        error: {
          field: "newPassword",
          message: "length must be greater than 3",
        },
      };

    const userToken = await mongoDB.collection("user_token").findOne({
      token: {
        $eq: token,
      },
    });
    if (!userToken)
      return {
        error: {
          field: "token",
          message: "token expired",
        },
      };

    const userId = userToken["id"];

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
        AND: {
          isFromGoogle: null,
        },
      },
    });

    if (!user)
      return {
        error: {
          field: "token",
          message: "user no longer exists",
        },
      };

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: await argon2.hash(newPassword),
      },
    });

    req.session.userId = user.id;

    return {
      user,
    };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: Context): Promise<boolean> {
    return new Promise(async (resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) return resolve(false);

        resolve(true);
      })
    );
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async saveUserFCMToken(
    @Ctx() { mongoDB, req }: Context,
    @Arg("token") token: string,
    @Arg("timestamp") timestamp: string
  ) {
    const usersFcmTokenCollections = mongoDB.collection("users_fcm_token");
    const userId = req.session.userId!;

    const exist = await usersFcmTokenCollections.findOne({ userId });

    if (exist && exist.timestamp < timestamp) {
      await usersFcmTokenCollections.findOneAndUpdate({ userId }, { $set: { token } });
      return false;
    }

    await usersFcmTokenCollections.insertOne({
      userId,
      token,
      timestamp,
    });

    return true;
  }

  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  async me(@Ctx() { prisma, req }: Context): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        id: req.session.userId!,
        AND: {
          isFromGoogle: null,
        },
      },
    });

    if (user) return user;

    const googleUser = await prisma.user.findFirst({
      where: {
        id: req.session.userId!,
        AND: {
          isFromGoogle: true,
        },
      },
    });

    if (googleUser) return googleUser;

    return null;
  }
}
