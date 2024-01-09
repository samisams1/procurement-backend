import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class product {
  @Field(() => Int)
  id: number;
  
  @Field()
  title: string;

  @Field()
  code: string;

  @Field()
  partNumber: string;

  @Field()
  uom: string;

  @Field()
  quantity: number;

  @Field()
  mark: string;

  @Field()
  Description: string;

  @Field()
  manufacturer: string;

  @Field()
  model: string;
}

