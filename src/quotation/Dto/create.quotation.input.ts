import { Field, Float, InputType, Int } from '@nestjs/graphql';
@InputType()
export class CreateQuotationInput {
  @Field(() => Int)
  supplierId: number;

  @Field(() => Int)
  customerId: number;

  @Field(()=>Float)
  shippingPrice:number;

  @Field(() => [ProductPriceInput])
  productPrices: ProductPriceInput[];

  @Field()
  status: string;

  @Field(() => Int)
  requestId:number;
  
  @Field(() => Int, { nullable: true })
  purchaseRequestId?: number;
  
}

@InputType()
export class ProductPriceInput {
  @Field(()=>Int)
  productId:number


  @Field(() => Float)
  price: number;

  
}