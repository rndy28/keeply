import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class Label {
  @Field(() => ID)
  id!: number;

  @Field(() => String)
  name!: string;
}
