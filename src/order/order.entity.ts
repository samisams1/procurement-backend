import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class Order {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  customerId: number;

  @Field(() => Int)
  supplierId: number;

  @Field(() => [OrderDetail])
  orderDetails: OrderDetail[];
  
  @Field(() => Int)
  totalPrice: number;

  @Field(() => Float)
  tax: number;


  @Field(()=>String)
  status:string

  @Field(()=>Float)
  shippingCost:number

  @Field()
  createdAt: Date;
}



@ObjectType()
export class OrderDetail {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  orderId: number;

  @Field()
  title: string;

  @Field(() => Int)
  price: number;

  @Field(() => Int)
  quantity: number;
}