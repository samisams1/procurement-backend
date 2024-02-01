import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateOrderDetailInput {
  @Field()
  title: string;

  @Field(()=>Int)
  productId: number;


  @Field()
  price: number;

  @Field()
  quantity: number;
 
}

@InputType()
export class CreateOrderInput {
  @Field()
  customerId: number;

  @Field()
  supplierId: number;

  @Field(() => [CreateOrderDetailInput])
  orderDetails: CreateOrderDetailInput[];

  @Field(()=>Float)
  totalPrice: number;

  @Field()
  tax: number;

  @Field()
  status:string

  @Field()
  shippingCost: number; // Include the shippingCost property
}