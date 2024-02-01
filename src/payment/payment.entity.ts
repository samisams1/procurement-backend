import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Order } from 'src/order/order.entity';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class Payment {
  @Field(() => Int)
  id: number;

  @Field(() => User)
  user: User;

  @Field(() => Order)
  order: Order;

  
  @Field()
  amount: number;

  @Field(() => Date, { nullable: false })
  paidAt: Date;

  @Field()
  paymentMethod:string;

  @Field(() => String)
  referenceNumber:string;

  @Field(() => String)
  status:string;
}