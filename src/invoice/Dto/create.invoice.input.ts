import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class InvoiceCreateInput {
  @Field(() => Int)
  orderId: number;

  @Field()
  amount: number;
}