import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class supplier {
  @Field(() => Int)
  id: number;
  @Field()
  name: String;
}