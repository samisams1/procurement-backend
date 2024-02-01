import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';
import { product } from 'src/product/product.entity';
import { purchaseRequest } from 'src/purchase-request/purchase-request.entity';

@ObjectType()
export class Quotation {
  @Field(() => ID)
  id: number;

  @Field(() => Int)
  supplierId: number;

  @Field(() => Int)
  customerId: number;
  
  @Field(() => [ProductPrice])
  productPrices: ProductPrice[];

  supplier: {
    id: number;
    userId: number;
    name: string;
    categoryId: number;
  };

  @Field()
  status:string;

  @Field()
  shippingPrice: number;

  @Field(() => Int, { nullable: true })
  purchaseRequestId: number;


  purchaseRequests?: purchaseRequest[]; // Make it optional with `?`


  @Field()
  createdAt: Date;

  
}

@ObjectType()
export class ProductPrice {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  productId: number;


  @Field(() => Float)
  price: number;

  @Field(() => product)
  product: product;


  
}