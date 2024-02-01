import { ObjectType, Field, Int } from '@nestjs/graphql';
import { product } from 'src/product/product.entity';
import { supplier } from 'src/supplier/supplier.entity';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class purchaseRequest {
  @Field(() => Int)
  id: number;

  @Field(() => User)
  user: User;
  
  @Field(()=>String)
   referenceNumber:string;

  @Field(() => [product])
  products: product[];

  @Field()
  createdAt: Date;

  @Field()
  status:String;
  
  @Field()
  addressDetail:string;

  @Field()
  estimatedDelivery:string;

  @Field()
  remark:string;


  @Field(() => [supplier])
  suppliers: {
    id: number;
    userId: number; 
  }[];


} 
