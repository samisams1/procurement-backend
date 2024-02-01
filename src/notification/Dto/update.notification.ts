import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NotificationUpdate {
  @Field()
  status: string;
}