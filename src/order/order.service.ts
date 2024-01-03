import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Order, OrderDetail } from './order.entity';
import { CreateOrderInput } from './Dto/create.order';
import { UpdateOrderInput } from './Dto/update.order';

@Injectable()
export class OrderService {
    private prisma :PrismaClient

  constructor(){
      this.prisma = new PrismaClient();
  }
  async createOrder(input: CreateOrderInput): Promise<Order> {
    const { customerId, supplierId, orderDetails, totalPrice, tax,status,shippingCost } = input;
  
    const createdOrder = await this.prisma.order.create({
      data: {
        customerId,
        supplierId,
        totalPrice,
        shippingCost,
        tax,
        status,
        orderDetails: {
          create: orderDetails.map(detail => ({
            title: detail.title,
            price: detail.price,
            quantity: detail.quantity,
          })),
        },
      },
      include: {
        orderDetails: true,
      },
    });
  
    const order: Order = {
      ...createdOrder,
      orderDetails: createdOrder.orderDetails,
    };
  
    return order;
  }
  async getAllOrders(): Promise<Order[]> {
    return this.prisma.order.findMany({ include: { orderDetails: true } });
  }
  
  async getOrderById(id: number): Promise<Order> {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { orderDetails: true },
    });
    if (!order) {
      // Handle the case where the order is not found
      throw new Error(`Order with ID ${id} not found`);
    }
    return order;
  }
  async getOrderDetailByOrderId(orderId: number): Promise<OrderDetail[]> {
    const order = await this.prisma.orderDetail.findMany({
      where: { orderId },
    });
  
    if (!order) {
      // Handle the case where the order detail is not found
      throw new Error(`Order detail with orderId ${orderId} not found`);
    }
  
    return order;
  }
  async getOrderBySupplierId(supplierId: number): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      where: { supplierId },
      include: { orderDetails: true },
      orderBy: {
        id: 'desc'
      }
    });

    if (!orders) {
      throw new Error(`No orders found for supplier with ID ${supplierId}`);
    }

    return orders;
  }
  async getOrderByCustomerId(customerId: number): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      where: { customerId },
      include: { orderDetails: true },
      orderBy: {
        id: 'desc'
      }
    });

    if (!orders) {
      throw new Error(`No orders found for supplier with ID ${customerId}`);
    }

    return orders;
  }
  async updateOrder(id: number, status: string): Promise<Order> {
    const updatedOrder = await this.prisma.order.update({
      where: { id },
      data: { status: status },
      include: { orderDetails: true }, // Include orderDetails if required
    });
    return updatedOrder;
  }
  async countOrder() {
    const orders = async () => {
      try {
        const count = await this.prisma.order.count();
        return count;
      } catch (error) {
        // Handle any errors that occur during the count operation
        throw new Error('An error occurred while counting products.');
      }
    };
  
    return orders();
  }
}
