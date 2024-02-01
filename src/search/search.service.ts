import { Injectable } from '@nestjs/common';
import { PrismaClient, PurchaseRequest } from '@prisma/client';
import { Order } from 'src/order/order.entity';
import { purchaseRequest } from 'src/purchase-request/purchase-request.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class SearchService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async searchOrders(query: string): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      where: {
        OR: [
          { referenceNumber: { contains: query } },
          { /* other search criteria based on your requirements */ },
        ],
      },
      include: {
        orderDetails: {
          include: {
            product: true,
          },
        },
        purchaseRequest: { // Include the required properties of purchaseRequest
          include: {
            user: true,
            products: true,
            suppliers: true,
          },
        },
      },
    });
  
    const ordersWithSuppliers: Order[] = orders.map((order) => ({
      ...order,
      suppliers: [], // Set suppliers to an empty array if it's not available
      customer:[],

    }));
  
    return ordersWithSuppliers;
  }
  async searchPurchaseRequest(query: string): Promise<PurchaseRequest[]> {
    try {
      const purchaseRequests = await this.prisma.purchaseRequest.findMany({
        where: {
          OR: [
            { referenceNumber: { contains: query } },
            // Add other search criteria based on your requirements
          ],
        },
        include: {
          user: true,
          products: true,
          suppliers: {
            include: {
              user: true,
            },
          },
        },
      });
  
      return purchaseRequests;
    } catch (error) {
      console.error('Error retrieving purchase requests:', error);
      return [];
    }
  }
  async searchPurcshaseRequest(id: number): Promise<purchaseRequest | null> {
    try {
      const purchaseRequest = await this.prisma.purchaseRequest.findUnique({
        where: { id },
        include: {
          user: true,
          products: true,
          suppliers: {
            include: {
              user: true,
            },
          },
        },
      });

      return purchaseRequest;
    } catch (error) {
      console.error('Error retrieving purchase request:', error);
      return null;
    }
  }
}