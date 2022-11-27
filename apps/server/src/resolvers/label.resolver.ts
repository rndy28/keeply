import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Label } from "../schema/label.schema";
import { Context } from "../types/context";
import { isAuth } from "../middleware/auth.middleware";

@Resolver()
export class LabelResolver {
  @Mutation(() => Label)
  @UseMiddleware(isAuth)
  async createLabel(@Arg("name") name: string, @Ctx() { prisma, req }: Context) {
    const label = await prisma.label.create({
      data: {
        name,
        user: {
          connect: {
            id: req.session.userId!,
          },
        },
      },
    });

    return label;
  }

  @Mutation(() => Label)
  @UseMiddleware(isAuth)
  async editLabel(@Arg("labelId") labelId: number, @Arg("name") name: string, @Ctx() { prisma }: Context) {
    const label = await prisma.label.update({
      where: {
        id: labelId,
      },
      data: {
        name,
      },
    });

    return label;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteLabel(@Arg("labelId") labelId: number, @Ctx() { prisma }: Context) {
    const label = await prisma.label.delete({
      where: {
        id: labelId,
      },
    });

    if (!label) return false;
    return true;
  }

  @Query(() => [Label])
  @UseMiddleware(isAuth)
  async labels(@Ctx() { prisma, req }: Context) {
    return await prisma.label.findMany({
      where: {
        userId: req.session.userId!,
      },
    });
  }
}
