import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePurchaseRequestInput {
  @Field()
  userId: number;

  @Field(() => [CreateProductInput])
  products: CreateProductInput[];

  @Field(() => [CreateSupplierInput])
  suppliers: CreateSupplierInput[];

  @Field()
  status: string;

}

@InputType()
export class CreateProductInput {
  @Field()
  title: string;

  @Field({ nullable: true }) // Add this line if the quotation field is optional
  quotation?: string; // Replace `string` with the appropriate type of the quotation field
}

@InputType()
export class CreateSupplierInput {
  @Field()
  id: number;
}