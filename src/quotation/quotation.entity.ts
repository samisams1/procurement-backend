import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';
import { product } from 'src/product/product.entity';

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

   @Field()
  status:string;

  @Field()
  shippingPrice: number;


  
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