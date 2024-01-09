import { Injectable } from '@nestjs/common';
import { Args } from '@nestjs/graphql';
import { PrismaClient, PurchaseRequest } from '@prisma/client';
import { CreatePurchaseRequestInput } from './Dto/purchase-request.create-inputs';

@Injectable()
export class PurchaseRequestService {
    private prisma :PrismaClient

    constructor(){
        this.prisma = new PrismaClient();
    }
   /* async product(@Args('id') id:number):Promise<PurchaseRequest | null>{
        return this.prisma.purchaseRequest.findUnique({
          where:{id},
          });
    }*/
    /*async purchaseRequestsByUSerId(): Promise<PurchaseRequest[]> {
      try {
        const purchaseRequests = await this.prisma.purchaseRequest.findMany({
          include: { suppliers: true },
        });
  
        return purchaseRequests;
      } catch (error) {
        console.error('Error retrieving purchase requests:', error);
        return [];
      }
    }*/
    async purchaseRequestsById(id: number): Promise<PurchaseRequest | null> {
      try {
        const purchaseRequest = await this.prisma.purchaseRequest.findUnique({
          where: {
            id: id,
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
        return purchaseRequest;
      } catch (error) {
        console.error('Error retrieving purchase request:', error);
        return null;
      }
    }
    async purchaseRequestsBySupplierId(id: number): Promise<PurchaseRequest[] | null> {
      try {
        const purchaseRequests = await this.prisma.purchaseRequest.findMany({
          where: {
            suppliers: {
              some: {
                userId: id
              }
            }
          },
          include: {
            user: true,
            products: true,
            suppliers: {
              include: {
                user: true
              }
            }
          },
          orderBy: {
            id: 'desc'
          }
        });
    
        return purchaseRequests;
      } catch (error) {
        console.error('Error retrieving purchase requests:', error);
        return null;
      }
    
    }
    async getAllPurchaseRequests(): Promise<PurchaseRequest[]> {
      try {
        const purchaseRequests = await this.prisma.purchaseRequest.findMany({
          include: {
            user: true,
            products: true,
            suppliers: {
              include: {
                user:true,
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
     /* async createPurchaseRequest(data: CreatePurchaseRequestInput): Promise<PurchaseRequest | null> {
        const { suppliers,productTitle } = data;
    
        try {
          const supplierIds = suppliers.map((supplierId) => ({ id: Number(supplierId)}));
          const purchaseRequest = await this.prisma.purchaseRequest.create({
            data: {
             // productTitle,
              suppliers: {
                connect: supplierIds,
              },
            },
          });
    
          return purchaseRequest;
        } catch (error) {
          console.error('Error creating purchase request:', error);
          return null;
        }
      }  */
     /* async createPurchaseRequest(data) {
        const {  userId, products, suppliers } = data;
    
        try {
          const purchaseRequest = await this.prisma.purchaseRequest.create({
            data: {
              userId,
              products: {
                create: products,
              },
              suppliers: {
                create: suppliers,
              },
            },
            include: {
              products: true,
              suppliers: true,
            },
          });
    
          return purchaseRequest;
        } catch (error) {
          console.error('Error creating purchase request:', error);
          throw new Error('Failed to create purchase request.');
        }
      }*/
      async createPurchaseRequest(createPurchaseRequestDto: CreatePurchaseRequestInput): Promise<PurchaseRequest> {
        const { userId, products, suppliers,status } = createPurchaseRequestDto;
        try {
          const purchaseRequest = await this.prisma.purchaseRequest.create({
            data: {
              createdAt: new Date(),
              updatedAt: new Date(),
              userId,
              status:status,
              products: {
                create: products.map((product) => ({
                  title: product.title,
                  partNumber:product.partNumber,
                  code:product.code,
                  quantity:product.quantity,
                  model:product.model,
                  uom:product.uom,
                  manufacturer:product.manufacturer,
                  mark:product.mark,
                  Description:product.Description
                //  quotation: product.quotation,
                })),
              },
              suppliers: {
                connect: suppliers.map((supplier) => ({ id: supplier.id })),
              },
            },
            include: {
              user: true,
              products: true,
              suppliers: true,
            },
          });
    
          return purchaseRequest;
        } catch (error) {
          // Handle the error appropriately
          throw new Error('Failed to create purchase request.');
        }
      }
  /*  async createPurchaseRequest(data: CreatePurchaseRequestInput): Promise<PurchaseRequest | null> {
        const { suppliers } = data;
    
        try {
          const purchaseRequest = await this.prisma.purchaseRequest.create({
            data: {
              suppliers: [1]
            },
          });
    
          return purchaseRequest;
        } catch (error) {
          console.error('Error creating purchase request:', error);
          return null;
        }
      }**/
}




