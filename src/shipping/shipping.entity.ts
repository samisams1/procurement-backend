import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Order } from 'src/order/order.entity';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class Shipping {
  @Field(() => Int)
  id: number;

  // Relationship fields
  @Field(() => Order)
  order: Order;

  @Field(() => User)
  user: User;

  // Other fields
  @Field(() => Int)
  orderId: number;

  @Field(() => String)
  status:string;
  
  @Field()
  address: string;
}