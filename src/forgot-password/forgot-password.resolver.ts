import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { ForgotPasswordService } from './forgot-password.service';
import { ForgotPasswordInput } from './dto/ForgotPasswordInput';

@Resolver()
export class ForgotPasswordResolver {
  constructor(private readonly forgotPasswordService: ForgotPasswordService) {}

 /* @Mutation(() => Boolean)
  async forgotPassword(@Args('input') input: ForgotPasswordInput): Promise<boolean> {
    await this.forgotPasswordService.createForgotPassword(input.email);
    return true;
  }*/

  @Mutation(() => Boolean)
  async forgotPassword(@Args('input') input: ForgotPasswordInput): Promise<boolean> {
    await this.forgotPasswordService.initiatePasswordReset(input.email);
    return true;
  }
  
}

