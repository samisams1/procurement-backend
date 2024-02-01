import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Payment } from 'src/payment/payment.entity';
import { Shipping } from 'src/shipping/shipping.entity';

@ObjectType()
export class Invoice {
  @Field(() => Int)
  id: number;

  // Relationship fields
  @Field(() => Payment)
  payment: Payment;

  @Field(() => Shipping)
  shipping: Shipping;

  // Other fields
  @Field(() => Int)
  orderId: number;

  @Field()
  amount: number;

  @Field()
  issuedAt: Date;
}