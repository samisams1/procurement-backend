import { Field, InputType, Float, Int } from '@nestjs/graphql';

@InputType()
export class UpdateProductPriceInput {
  @Field(()=>Int)
  id:number

  @Field(() => String)
  title: string;

  @Field(() => Float)
  price: number;
}

