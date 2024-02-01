import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ShippingService } from './shipping.service';
import { Shipping } from './shipping.entity';
import { ShippingCreateInput } from './Dto/create.shipping.input';

@Resolver(() => Shipping)
export class ShippingResolver {
  constructor(private readonly shippingService: ShippingService) {}
  @Query(() => [Shipping])
  async shippings() {
    return this.shippingService.getAllShippings();
  }
  @Query(() => [Shipping])
  async shippingsByUserId(@Args('userId') userId: number) {
    return this.shippingService.getShippingsByUserId(userId);
  }
  @Mutation(() => Shipping)
  async createShipping(
    @Args('data') data: ShippingCreateInput,
  ) {
    return this.shippingService.createShipping(data);
  }
  /*@Mutation(() => Shipping)
  async createShipping(@Args('shippingData') shippingData: ShippingCreateInput): Promise<Shipping> {
    return this.shippingService.createShipping(shippingData);
  }

  @Mutation(() => Shipping)
  async updateShipping(
    @Args('id', { type: () => Int }) id: number,
    @Args('shippingData') shippingData: ShippingCreateInput,
  ): Promise<Shipping> {
    return this.shippingService.updateShipping(id, shippingData);
  }

  @Mutation(() => Shipping)
  async deleteShipping(@Args('id', { type: () => Int }) id: number): Promise<Shipping> {
    return this.shippingService.deleteShipping(id);
  }*/
}