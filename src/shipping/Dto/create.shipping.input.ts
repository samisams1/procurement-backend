import { InputType, Field, Int } from '@nestjs/graphql';
import { CreateOrderInput } from 'src/order/Dto/create.order';
import { CreateUserInput } from 'src/users/dto/create-user.input';

@InputType()
export class ShippingCreateInput {
  @Field(() => Int)
  orderId: number;

  @Field()
  address: string;

  @Field(() => Int)
  userId: number;

  @Field(() => CreateOrderInput) 
  order: CreateOrderInput;

  @Field(() => CreateUserInput) 
  user: CreateUserInput;
}