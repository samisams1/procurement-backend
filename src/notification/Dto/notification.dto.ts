import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@InputType()
export class SendNotificationInput {


@Field()
recipientId: number;

@Field()
soundUrl: string;

@Field()
type: String;

@Field(()=>[User])
recipient: User;

timestamp: Date;

}

@ObjectType()
export class Notification {
  @Field()
id: number;

  @Field()
  recipientId: number;

  @Field()
  message: string;

  @Field()
  soundUrl: string;

  @Field()
  status: string;
  
  @Field()
  type: string;
}