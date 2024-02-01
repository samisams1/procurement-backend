import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class supplier {
  @Field(() => Int)
  id: number;

  @Field(()=>String)
  name:string;
  
  @Field(() => Int)
  categoryId: number;

  
  @Field(() => User)
  user: User;

  @Field(() => Int)
  userId: number;

}


