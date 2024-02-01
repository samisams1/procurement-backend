import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { product } from 'src/product/product.entity';
import { purchaseRequest } from 'src/purchase-request/purchase-request.entity';
import { supplier } from 'src/supplier/supplier.entity';

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
  
  @Field(() => purchaseRequest) // Add the purchaseRequest property
  purchaseRequest: purchaseRequest;

  @Field(() => Int)
  totalPrice: number;

  @Field(() => Float)
  tax: number;

  @Field(()=>String)
  referenceNumber:string;
  
  @Field(()=>String)
  status:string

  @Field(()=>Float)
  shippingCost:number

  @Field()
  createdAt: Date;

  @Field(() => [supplier])
  customer: {
    id: number;
    name:string
    userId: number; 
  }[];


  @Field(() => [supplier])
  suppliers: {
    id: number;
    userId: number; 
  }[];
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

  @Field(() => Int) // Add the productId property
  productId: number;

  @Field(() => product)
  product: product;
  
}