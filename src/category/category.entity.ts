import { ObjectType, Field, Int } from '@nestjs/graphql';
import { supplier } from 'src/supplier/supplier.entity';

@ObjectType()
export class category {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => [supplier])
  suppliers: supplier[];

  @Field()
  createdAt: Date;
}