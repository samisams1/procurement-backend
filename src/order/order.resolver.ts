import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Order, OrderDetail } from './order.entity';
import { CreateOrderInput } from './Dto/create.order';
import { OrderService } from './order.service';
import { UpdateOrderInput } from './Dto/update.order';

@Resolver()
export class OrderResolver {
constructor(private readonly orderService: OrderService) {}
@Mutation(() => Order)
  async createOrder(@Args('input') input: CreateOrderInput) {
    return this.orderService.createOrder(input);
  }
  @Query(() => [Order])
  async orders() {
    return this.orderService.getAllOrders();
  }
  @Query(() => [OrderDetail])
  async getOrderDetailByOrderId(@Args('id') id: number) {
    return this.orderService.getOrderDetailByOrderId(id);
  }
  @Query(() => Order)
  async getOrderById(@Args('id') id: number) {
    return this.orderService.getOrderById(id);
  }
  
  @Query(() => [Order])
  async getOrderBySupplierId(@Args('supplierId') supplierId: number) {
    return this.orderService.getOrderBySupplierId(supplierId);
  }
  @Query(() => [Order])
  async getOrderByCustomerId(@Args('customerId') customerId: number) {
    return this.orderService.getOrderByCustomerId(customerId);
  }
  @Mutation(() => Order)
async updateOrder(
  @Args('id') id: number,
  @Args('status') status: string,
): Promise<Order> {
  const updatedOrder = await this.orderService.updateOrder(id, status);
  return updatedOrder;
}
@Query(() => Int)
async countOrders(): Promise<number> {
  const count = await this.orderService.countOrder();
  return count;
}
}


