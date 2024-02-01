import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class PaymentCreateInput {

  @Field()
  fullName:string;
  
  @Field()
  amount: number;

  @Field(() => Int)
  userId: number;
  
  @Field()
  status:string;

  @Field()
  referenceNumber:string;

  @Field()
  paymentMethod:string;

  @Field(()=>Int)
  orderId:number;
  
}