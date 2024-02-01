import { Injectable } from '@nestjs/common';

import { Shipping } from './shipping.entity';
import { ShippingCreateInput } from './Dto/create.shipping.input';
import { PrismaClient } from '@prisma/client';
import { Order } from 'src/order/order.entity';

@Injectable()
export class ShippingService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  async  getAllShippings() {
    try {
      const shippings = await this.prisma.shipping.findMany({
        include:{
          order:{
            include:{
              supplier:true,
            }
          },
          user:true,
        }
      });
      return shippings;
    } catch (error) {
      // Handle error
      console.error('Error retrieving shippings:', error);
      throw new Error('Failed to retrieve shippings');
    } 
  }
  async  getShippingsByUserId(userId:number) {
    try {
      const shippings = await this.prisma.shipping.findMany({
        where:{
          userId:userId
        },
        include:{
          order:{
            include:{
              supplier:true,
            }
          },
          user:true,
        }
      });
      return shippings;
    } catch (error) {
      // Handle error
      console.error('Error retrieving shippings:', error);
      throw new Error('Failed to retrieve shippings');
    } 
  }
 async createShipping(data: ShippingCreateInput){
    const { userId, orderId, address } = data;
    try {
      const shipping = await this.prisma.shipping.create({
        data: {
          userId,
          orderId,
          address,
        },
        include: {
          order: true,
          user: true,
        },
      });
  
      return shipping;
    } catch (error) {
      // Handle the error appropriately
      throw new Error('Failed to create shipping.');
    }
  }
  
}