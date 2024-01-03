import { Field, Float, InputType, Int } from "@nestjs/graphql";
import { CreateOrderDetailInput } from "./create.order";

@InputType()
export class UpdateOrderInput {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  customerId: number;

  @Field(() => Int)
  supplierId: number;

  @Field(() => [CreateOrderDetailInput])
  orderDetails: CreateOrderDetailInput[];


  @Field(() => Float)
  totalPrice: number;

  @Field()
  shippingCost: number; // Include the shippingCost property

  @Field()
  tax: number;

  @Field()
  status:string;

  @Field()
  createdAt: Date;
}