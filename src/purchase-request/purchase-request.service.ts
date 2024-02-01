import { Injectable } from '@nestjs/common';
import { Args } from '@nestjs/graphql';
import { PrismaClient, PurchaseRequest } from '@prisma/client';
import { CreatePurchaseRequestInput } from './Dto/purchase-request.create-inputs';
import { FileUpload } from './file-upload.scalar';
import { ReferenceNumberGeneratorService } from './generateReferenceNumber';


@Injectable()
export class PurchaseRequestService {
    private prisma :PrismaClient

    constructor(private referenceNumberGeneratorService: ReferenceNumberGeneratorService) {
      this.prisma = new PrismaClient();
    }

    
   /* async product(@Args('id') id:number):Promise<PurchaseRequest | null>{
        return this.prisma.purchaseRequest.findUnique({
          where:{id},
          });
    }*/
    async purchaseRequestsByUSerId(userId:number): Promise<PurchaseRequest[]> {
      try {
        const purchaseRequests = await this.prisma.purchaseRequest.findMany({
          where:{userId:userId},
          include: { suppliers: true },
        });
  
        return purchaseRequests;
      } catch (error) {
        console.error('Error retrieving purchase requests:', error);
        return [];
      }
    }
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
                userId: 3
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
    async allPurchaseRequests(): Promise<PurchaseRequest[]> {
      try {
        const purchaseRequests = await this.prisma.purchaseRequest.findMany({
          include: {
            user: true,
            products: true,
            suppliers: {
              include: {
                user:true,
                category:true
              },
            },
          },
          orderBy: {
            id: 'desc',
          },
        });
        return purchaseRequests;
      } catch (error) {
        console.error('Error retrieving purchase requests:', error);
        return [];
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
                category:true
              },
            },
          },
          orderBy: {
            id: 'desc',
          },
        });
        return purchaseRequests;
      } catch (error) {
        console.error('Error retrieving purchase requests:', error);
        return [];
      }
    }
      async createPurchaseRequest(createPurchaseRequestDto: CreatePurchaseRequestInput): Promise<PurchaseRequest> {
        const { userId, products, suppliers, status, remark, addressDetail, estimatedDelivery,selectedType } = createPurchaseRequestDto;

        if(selectedType ==="supplier"){
          try {
            const referenceNumber = this.referenceNumberGeneratorService.generateReferenceNumber();
            const purchaseRequest = await this.prisma.purchaseRequest.create({
              data: {
                createdAt: new Date(),
                updatedAt: new Date(),
                userId,
                status,
                remark,
                estimatedDelivery,
                addressDetail,
                referenceNumber,
                products: {
                  create: products.map((product) => ({
                    title: product.title,
                    partNumber: product.partNumber,
                    code: product.code,
                    quantity: product.quantity,
                    model: product.model,
                    uom: product.uom,
                    manufacturer: product.manufacturer,
                    mark: product.mark,
                    Description: product.Description
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
        
            // Create quotation entries for each supplier
            for (const supplier of suppliers) {
              const quotation = await this.prisma.quotation.create({
                data: {
                  supplier: { connect: { id: supplier.id } },
                  customer: { connect: { id: purchaseRequest.user.id } },
                  createdAt: new Date(),
                  status,
                  purchaseRequest: { connect: { id: purchaseRequest.id } },
                  shippingPrice: 0, // Set the shipping price accordingly
                  productPrices: {
                    create: purchaseRequest.products.map((product) => ({
                      price: 0, // Set the price accordingly
                      product: { connect: { id: product.id } },
                    })),
                  },
                },
                include: {
                  supplier: true,
                  customer: true,
                  productPrices: {
                    include: {
                      product: true,
                    },
                  },
                },
              });
            }
            const notification = await this.prisma.notification.create({
              data: {
                type: 'request',
                message: 'A new purchase request has been created.',
                recipientId: userId, // ID of the supplier who should receive the notification
                status:"new"
              },
            });
            return purchaseRequest;
          } catch (error) {
            // Handle the error appropriately
            throw new Error('Failed to create purchase request.');
          }
        }else if(selectedType ==="agent"){

          try {
            const referenceNumber = this.referenceNumberGeneratorService.generateReferenceNumber();
            const purchaseRequest = await this.prisma.purchaseRequest.create({
              data: {
                createdAt: new Date(),
                updatedAt: new Date(),
                userId,
                status,
                remark,
                estimatedDelivery,
                addressDetail,
                referenceNumber,
                products: {
                  create: products.map((product) => ({
                    title: product.title,
                    partNumber: product.partNumber,
                    code: product.code,
                    quantity: product.quantity,
                    model: product.model,
                    uom: product.uom,
                    manufacturer: product.manufacturer,
                    mark: product.mark,
                    Description: product.Description
                  })),
                },
                suppliers: {
                  connect: { id: 1 }, 
                },
              },
              include: {
                user: true,
                products: true,
                suppliers: true,
              },
            });
            // Create quotation entries for each supplier
            for (const supplier of suppliers) {
              const quotation = await this.prisma.quotation.create({
                data: {
                  supplier: { connect: { id: supplier.id } },
                  customer: { connect: { id: purchaseRequest.user.id } },
                  createdAt: new Date(),
                  status,
                  purchaseRequest: { connect: { id: purchaseRequest.id } },
                  shippingPrice: 0, // Set the shipping price accordingly
                  productPrices: {
                    create: purchaseRequest.products.map((product) => ({
                      price: 0, // Set the price accordingly
                      product: { connect: { id: product.id } },
                    })),
                  },
                },
                include: {
                  supplier: true,
                  customer: true,
                  productPrices: {
                    include: {
                      product: true,
                    },
                  },
                },
              });
            }
            const notification = await this.prisma.notification.create({
              data: {
                type: 'request',
                message: 'A new purchase request has been created.',
                recipientId: userId, // ID of the supplier who should receive the notification
                status:"new"
              },
            });
            return purchaseRequest;
          } catch (error) {
            // Handle the error appropriately
            throw new Error('Failed to create purchase request.');
          }
        }else if(selectedType ==="x-company"){
          try {
            const referenceNumber = this.referenceNumberGeneratorService.generateReferenceNumber();
            const purchaseRequest = await this.prisma.purchaseRequest.create({
              data: {
                createdAt: new Date(),
                updatedAt: new Date(),
                userId,
                status,
                remark,
                estimatedDelivery,
                addressDetail,
                referenceNumber,
                products: {
                  create: products.map((product) => ({
                    title: product.title,
                    partNumber: product.partNumber,
                    code: product.code,
                    quantity: product.quantity,
                    model: product.model,
                    uom: product.uom,
                    manufacturer: product.manufacturer,
                    mark: product.mark,
                    Description: product.Description
                  })),
                },
                suppliers: {
                  connect: { id: 1 }, 
                },
              },
              include: {
                user: true,
                products: true,
                suppliers: true,
              },
            });
        
            // Create quotation entries for each supplier
              const quotation = await this.prisma.quotation.create({
                data: {
                  supplier: { connect: { id: 5 } },
                  customer: { connect: { id: purchaseRequest.user.id } },
                  createdAt: new Date(),
                  status,
                  purchaseRequest: { connect: { id: purchaseRequest.id } },
                  shippingPrice: 0, // Set the shipping price accordingly
                  productPrices: {
                    create: purchaseRequest.products.map((product) => ({
                      price: 0, // Set the price accordingly
                      product: { connect: { id: product.id } },
                    })),
                  },
                },
                include: {
                  supplier: true,
                  customer: true,
                  productPrices: {
                    include: {
                      product: true,
                    },
                  },
                },
              });
             // Create a new notification
  const notification = await this.prisma.notification.create({
    data: {
      type: 'request',
      message: 'A new purchase request has been created.',
      recipientId: 1, // ID of the supplier who should receive the notification
      status:"new"
    },
  }); 
            return purchaseRequest;
          } catch (error) {
            // Handle the error appropriately
            throw new Error('Failed to create purchase request.');
          }

        }
       
      }
  async coutRequest() {
    const orders = async () => {
      try {
        const count = await this.prisma.purchaseRequest.count();
        return count;
      } catch (error) {
        // Handle any errors that occur during the count operation
        throw new Error('An error occurred while counting products.');
      }
    };
  
    return orders();
  }
  async countPurchaseRequestByStatus(status: string,userId:number): Promise<number> {
    const requests = async () => {
      try {
        const count = await this.prisma.purchaseRequest.count({
          where:{
            status:status,
            userId:userId
          }
        });
        return count;
      } catch (error) {
        // Handle any errors that occur during the count operation
        throw new Error('An error occurred while counting products.');
      }
    };
    return requests();
  }
  async countAllRequestBystatus(status: string): Promise<number> {
    const requests = async () => {
      try {
        const count = await this.prisma.purchaseRequest.count({
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
    return requests();
  }
    
}




