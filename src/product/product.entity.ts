import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class product {
  @Field(() => Int)
  id: number;
  
  @Field()
  title: string;

}
