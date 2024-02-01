import { InputType, Field, registerEnumType } from '@nestjs/graphql';





@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  firstName: string;

  @Field()
  role:EnumRole

  @Field()
  lastName: string;

  @Field()
  password: string;

  @Field()
  categoryId:number;

}

@InputType()
export class ChangePasswordInput {
  @Field()
  currentPassword: string;

  @Field()
  newPassword: string;
}

export enum EnumRole {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
  SUPPLIER = 'SUPPLIER'
}

registerEnumType(EnumRole, {
  name: 'EnumRole',
});