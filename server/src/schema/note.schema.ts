import { ObjectType, Field, ID, Int } from "type-graphql";
import { Label } from "./label.schema";

@ObjectType()
export class Note {
  @Field(() => ID)
  id!: number;

  @Field(() => String)
  title!: string;

  @Field(() => String)
  text!: string;

  @Field(() => Boolean, { defaultValue: false })
  archived!: boolean;

  @Field(() => Boolean, { defaultValue: false })
  pinned!: boolean;

  @Field(() => Boolean, { defaultValue: false })
  trashed!: boolean;

  @Field(() => Int, { nullable: true })
  indexColor: number | null;

  @Field(() => [Label], { nullable: true })
  labels: Label[];

  @Field(() => String, { nullable: true })
  time: string | null;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}
