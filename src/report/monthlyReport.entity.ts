import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class MonthlyReport {
  @Field()
  month: string;

  @Field(() => Int)
  amount: number;
}