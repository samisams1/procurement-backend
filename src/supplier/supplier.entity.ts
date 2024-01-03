import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class supplier {
  @Field(() => Int)
  id: number;
  
  @Field()
  name: String;

  @Field()
  email: String;


  @Field(() => User)
  user: User;

  @Field()
  createdAt: Date;;

  @Field()
  updatedAt: Date;
}


