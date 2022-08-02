import { Job } from "agenda";
import {
  Arg,
  ArgsDictionary,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Publisher,
  PubSub,
  Query,
  Resolver,
  ResolverFilterData,
  Root,
  Subscription,
  UseMiddleware,
} from "type-graphql";
import { isAuth } from "../middleware/auth.middleware";
import { Note } from "../schema/note.schema";
import { Context } from "../types/context";

@InputType()
export class NoteInput {
  @Field(() => String, { nullable: true })
  title: string;

  @Field(() => String, { nullable: true })
  text: string;

  @Field(() => Boolean, { nullable: true })
  archived: boolean;

  @Field(() => Boolean, { nullable: true })
  pinned: boolean;

  @Field(() => Int, { nullable: true })
  indexColor: number | null;

  @Field(() => String, { nullable: true })
  time: string | null;
}

@InputType()
export class LabelId {
  @Field(() => Int)
  id!: number;
}

@ObjectType()
class NotificationPayload {
  @Field(() => Int)
  userId: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  body: string;
}

@Resolver()
export class NoteResolver {
  @Mutation(() => Note)
  @UseMiddleware(isAuth)
  async createNote(
    @Arg("noteInput") noteInput: NoteInput,
    @Arg("labelId", () => [LabelId], { nullable: true }) labelId: LabelId[],
    @PubSub("NOTIFICATIONS") publish: Publisher<NotificationPayload>,
    @Ctx() { prisma, req, agenda }: Context
  ): Promise<Note> {
    const userId = req.session.userId!;
    const note = await prisma.note.create({
      data: {
        ...noteInput,
        userId,
        labels: {
          connect: labelId,
        },
      },
      include: {
        labels: true,
      },
    });

    if (typeof note.time === "string") {
      console.log("schedule created");
      agenda.define(`sendNotification:${req.session.userId}-${note.id}`, async (job: Job) => {
        const payload = {
          title: note.title,
          body: note.text,
        };

        await publish({ ...payload, userId });
        job.remove();
      });

      await agenda.schedule(
        new Date(note.time),
        `sendNotification:${req.session.userId}-${note.id}`,
        {}
      );
    }

    return note;
  }

  @Mutation(() => Note, { nullable: true })
  @UseMiddleware(isAuth)
  async editNote(
    @Arg("noteId") noteId: number,
    @Arg("noteInput") noteInput: NoteInput,
    @Arg("labelId", () => [LabelId], { nullable: true }) labelId: LabelId[],
    @Ctx() { prisma }: Context
  ) {
    const note = await prisma.note.update({
      where: {
        id: noteId,
      },
      data: {
        ...noteInput,
        labels: {
          connect: labelId,
        },
      },
      include: {
        labels: true,
      },
    });

    return note;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteNoteForever(@Arg("noteId") noteId: number, @Ctx() { prisma, agenda, req }: Context) {
    await prisma.note.delete({
      where: {
        id: noteId,
      },
    });

    await agenda.cancel({ name: `delete note in 7 days:${req.session.userId}-${noteId}` });

    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async clearTrash(@Ctx() { prisma, agenda }: Context) {
    const trashedNotes = await prisma.note.findMany({
      where: {
        trashed: true,
      },
    });

    for (const { id } of trashedNotes) {
      await agenda.cancel({ name: `delete note in 7 days:${id}` });
    }

    await prisma.note.deleteMany({
      where: {
        trashed: true,
      },
    });
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async restoreNoteFromTrash(
    @Arg("noteId") noteId: number,
    @Ctx() { prisma, agenda, req }: Context
  ) {
    await prisma.note.update({
      where: {
        id: noteId,
      },
      data: {
        trashed: false,
      },
    });

    await agenda.cancel({ name: `delete note in 7 days:${req.session.userId}-${noteId}` });

    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async moveNoteToTrash(@Arg("noteId") noteId: number, @Ctx() { prisma, agenda, req }: Context) {
    const note = await prisma.note.update({
      where: {
        id: noteId,
      },
      data: {
        trashed: true,
      },
    });

    if (!note) return false;

    const now = new Date().getTime();

    agenda.define(`delete note in 7 days:${req.session.userId}-${noteId}`, async () => {
      await prisma.note.delete({
        where: {
          id: noteId,
        },
      });
    });

    await agenda.schedule(
      new Date(now + 7 * 24 * 60 * 60 * 1000),
      `delete note in 7 days:${req.session.userId}-${noteId}`,
      {}
    );

    return true;
  }

  @Query(() => [Note])
  @UseMiddleware(isAuth)
  async notes(
    @Arg("reminder", () => Boolean, { nullable: true }) reminder: boolean | undefined,
    @Ctx() { prisma, req }: Context
  ): Promise<Note[]> {
    const notes = await prisma.note.findMany({
      where: {
        userId: req.session.userId!,
        time: reminder ? { not: { equals: null } } : null,
        AND: {
          trashed: {
            equals: false,
          },
        },
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
      include: {
        labels: true,
      },
    });

    return notes;
  }

  @Query(() => [Note])
  async trash(@Ctx() { prisma, req }: Context): Promise<Note[]> {
    const trashed = await prisma.note.findMany({
      where: {
        userId: req.session.userId!,
        AND: {
          trashed: {
            equals: true,
          },
          archived: {
            equals: false,
          },
          pinned: {
            equals: false,
          },
        },
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
      include: {
        labels: true,
      },
    });

    return trashed;
  }

  @Subscription(() => NotificationPayload, {
    topics: "NOTIFICATIONS",
    filter: ({
      payload,
      context,
    }: ResolverFilterData<NotificationPayload, ArgsDictionary, { userId: number }>) => {
      return payload.userId === context.userId;
    },
  })
  reminder(@Root() payload: NotificationPayload): NotificationPayload {
    return payload;
  }
}
