import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class NotificationInput {

  @Field()
  recipientId: number;

  @Field()
  message: string;
  
  @Field()
  type: string;
}