import { Field, Float, InputType, Int } from '@nestjs/graphql';
@InputType()
export class CategoryInput {
  @Field(() => Float)
  name: string;
}