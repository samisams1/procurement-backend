import { Injectable } from '@nestjs/common';
import { Payment } from './payment.entity';
import { PaymentCreateInput } from './Dto/create.payment.input';
import { PrismaClient } from '@prisma/client';
import { ReferenceNumberGeneratorService } from './generateReferenceNumber';

@Injectable()
export class PaymentService {
      private prisma :PrismaClient
  
      constructor(
        private referenceNumberGeneratorService: ReferenceNumberGeneratorService) {
        this.prisma = new PrismaClient();
      }
      async createPayment(paymentData: PaymentCreateInput) {
        const referenceNumber = this.referenceNumberGeneratorService.generateReferenceNumber();
        const status = "paid";
        const paymentWithReference = {
          ...paymentData,
          status,
        };
      
        const createdPayment = await this.prisma.payment.create({
          data: paymentWithReference,
          include: {
            user: true,
          },
        });
      
        await this.prisma.order.update({
          where: { id: paymentWithReference.orderId },
          data: { status: 'paid' },
        });
       await this.prisma.notification.create({
          data: {
            type: 'payment',
            message: 'A new payment is made .',
            recipientId: 3, // ID of the supplier who should receive the notification
            status:"new"
          },
        });
        return createdPayment;
      }
  async getAllPayments() { 
        {
          return this.prisma.payment.findMany({
            include:{
              user:true,
            } 
          });
      }
    }
  async getAllPayment(id: number) {
      return this.prisma.payment.findMany({
        where: {
          id: id
        },
        include: {
          user: true,
          order:{
            include:{
              orderDetails:true,
              
            }
          }
        },
      });
    }
    async countPaymentBystatus(status: string): Promise<number> {
      const paymnts = async () => {
        try {
          const count = await this.prisma.payment.count({
            where:{
              status:status,
            }
          });
          return count;
        } catch (error) {
          // Handle any errors that occur during the count operation
          throw new Error('An error occurred while counting products.');
        }
      };
      return paymnts();
    }
}