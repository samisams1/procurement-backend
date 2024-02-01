import { Field, Float, InputType, Int } from '@nestjs/graphql';
@InputType()
export class UpdateQuotationInput {
  
  @Field(() => [UpdateProductPriceInput])
  productPrices: UpdateProductPriceInput[];

  @Field()
  status: string;

  @Field()
  shippingPrice: number;
  
}

@InputType()
export class UpdateProductPriceInput {
    @Field(()=>Int)
    id:number

  @Field(() => Float)
  price: number;

  
}