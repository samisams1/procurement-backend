import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PaymentService } from './payment.service';
import { Payment } from './payment.entity';
import { PaymentCreateInput } from './Dto/create.payment.input';

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

 @Mutation(() => Payment)
 async createPayment(@Args('input') input: PaymentCreateInput) {
      return this.paymentService.createPayment(input);
   } 
 @Query(() => [Payment])
  async payments() {
    return this.paymentService.getAllPayments();
  }
  @Query(() => [Payment])
  async payment(@Args('id', { type: () => Int }) id: number) {
    return this.paymentService.getAllPayment(id);
  }
  @Query(() => Int)
  async countPaymentBystatus(@Args('status') status:string  ): Promise<number> {
    const count = await this.paymentService.countPaymentBystatus(status);
    return count;
  } 

}