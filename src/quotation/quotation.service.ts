import { Injectable } from '@nestjs/common';
import { Quotation } from './quotation.entity';
//import { CreateQuotationInput } from './Dto/create.quotation.input';
import { PrismaClient } from '@prisma/client';
import { CreateQuotationInput } from './Dto/create.quotation.input';
import { UpdateProductPriceInput, UpdateQuotationInput } from './Dto/updateQuotationInput';

@Injectable()
export class QuotationService {
  private prisma :PrismaClient

  constructor(){
      this.prisma = new PrismaClient();
  }

  async allQuotations(): Promise<Quotation[]> {
    try {
      const quotations = await this.prisma.quotation.findMany({
        include: {
          supplier: true,
          productPrices: {
            include: {
              product: true,
            },
          },
          
          purchaseRequest:true,
        },
        orderBy: {
          id: 'desc',
        },
      });
      const formattedQuotations: Quotation[] = quotations.map((quotation) => {
        const { productPrices,purchaseRequest, ...quotationData } = quotation;
  
        const products = productPrices.map((productPrice) => ({
          id: productPrice.product.id, // Include the id property
          title: productPrice.product.title,
          price: productPrice.price,
        }));
  
        return {
          ...quotationData,
          productPrices,
          products,
          purchaseRequest, // Include the purchaseRequest property

        };
      });
      return formattedQuotations;
    } catch (error) {
      console.error('Error retrieving quotations:', error);
      return [];
    }
  } 
//distinict
  async getAllQuotations(): Promise<Quotation[]> {
    try {
      const quotations = await this.prisma.quotation.findMany({
        include: {
          supplier: true,
          productPrices: {
            include: {
              product: true,
            },
          },
          
          purchaseRequest:true,
        },
        orderBy: {
          id: 'desc',
        },
       where:{
          status:"comformed"
        },
        distinct: ['purchaseRequestId'],
      });
      const formattedQuotations: Quotation[] = quotations.map((quotation) => {
        const { productPrices,purchaseRequest, ...quotationData } = quotation;
  
        const products = productPrices.map((productPrice) => ({
          id: productPrice.product.id, // Include the id property
          title: productPrice.product.title,
          price: productPrice.price,
        }));
  
        return {
          ...quotationData,
          productPrices,
          products,
          purchaseRequest, // Include the purchaseRequest property

        };
      });
    /*  const formattedQuotations: Quotation[] = quotations.map((quotation) => {
        const { productPrices, ...quotationData } = quotation;
      
        const products = productPrices.map((productPrice) => ({
          id: productPrice.product.id,
          title: productPrice.product.title,
          price: productPrice.price,
        }));
      
        return {
          ...quotationData,
          productPrices,
          products,
        //  purchaseRequests: [purchaseRequest], // Include the purchaseRequests property
        };
      });*/
      return formattedQuotations;
    } catch (error) {
      console.error('Error retrieving quotations:', error);
      return [];
    }
  } 
  async getQuotationById(id: number): Promise<Quotation | null> {
    try {
      const quotation = await this.prisma.quotation.findUnique({
        where: {
          id: id,
        },
        include: {
          supplier: true,
          productPrices: {
            include: {
              product: true,
            },
            where: {
              product: {
                status: "wait",
              },
            },
          },
        },
      });
  
      if (!quotation) {
        return null;
      }
  
      const formattedQuotation: Quotation = {
        ...quotation,
        productPrices: quotation.productPrices.map((productPrice) => ({
          id: productPrice.id,
          productId: productPrice.product.id,
          product: productPrice.product,
          price: productPrice.price,
          status: productPrice.status,
        })),
      };
  
      return formattedQuotation;
    } catch (error) {
      console.error(`Error retrieving quotation with ID ${id}:`, error);
      return null;
    }
  }
  //get Request by Request Id
  async getQuotationsByRequestId(requestId: number): Promise<Quotation[]> {
    try {
      const quotations = await this.prisma.quotation.findMany({
        where: {
          purchaseRequestId: requestId,
        },
        include: {
          supplier: {
            
          },
          productPrices: {
            include: {
              product: true,
            },
          },
        },
      });
  
      if (!quotations || quotations.length === 0) {
        return [];
      }
  
      const formattedQuotations: Quotation[] = quotations.map((quotation) => ({
        id: quotation.id,
        supplierId: quotation.supplierId,
        customerId: quotation.customerId,
        shippingPrice: quotation.shippingPrice,
        createdAt: quotation.createdAt,
        status: quotation.status,
        purchaseRequestId: quotation.purchaseRequestId,
        supplier: quotation.supplier as any, // Cast to any since the structure is not fully defined
        productPrices: quotation.productPrices.map((productPrice) => ({
          id: productPrice.id,
          productId: productPrice.productId,
          product: productPrice.product as any, // Cast to any since the structure is not fully defined
          price: productPrice.price,
        })),
      }));
  
      return formattedQuotations;
    } catch (error) {
      console.error(`Error retrieving quotations with purchaseRequestId ${requestId}:`, error);
      return [];
    }
  }
  async createQuotation(createQuotationDto: CreateQuotationInput): Promise<Quotation> {
    const { supplierId, customerId, productPrices,shippingPrice,status,requestId } = createQuotationDto;

    try {
      const quotation =  this.prisma.quotation.create({
        data: {
          supplier: { connect: { id: supplierId } },
          customer: { connect: { id: customerId } },
          createdAt: new Date(),
          status:status,
          purchaseRequest: { connect: { id: requestId } },
          shippingPrice,
          productPrices: {
            create: productPrices.map((productPrice) => ({
              price: productPrice.price,
              product: { connect: { id: productPrice.productId } },
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
       // Update the PurchaseRequest table
   // const purchaseRequestId = createQuotationDto.purchaseRequestId;
      return quotation;
    } catch (error) {
      throw new Error(`Failed to create quotation. ${error.message}`);
    }
  }
  // update Quation
 /* async updateQuotation(id: number, input: UpdateQuotationInput): Promise<Quotation> {
    const { productPrices, shippingPrice, status, requestId } = input;

    try {
      const quotation = await this.prisma.quotation.update({
        where: { id },
        data: {
          status,
          purchaseRequest: { connect: { id: requestId } },
          shippingPrice,
          productPrices: {
            upsert: productPrices.map((productPrice: UpdateProductPriceInput) => ({
              where: { id: productPrice.id },
              create: {
                price: productPrice.price,
                product: { connect: { id: productPrice.productId } },
              },
              update: {
                price: productPrice.price,
                product: { connect: { id: productPrice.productId } },
              },
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

      return quotation;
    } catch (error) {
      throw new Error(`Failed to update quotation. ${error.message}`);
    }
  }*/

   async updateQuotation(id: number, input: UpdateQuotationInput): Promise<Quotation> {
    const { productPrices, status,shippingPrice } = input;
    try {
      const quotation = await this.prisma.quotation.update({
        where: { id },
        data: {
          status,
          shippingPrice,
          productPrices: {
            updateMany: productPrices.map((productPrice) => ({
              where: { id: productPrice.id },
              data: {
                price: productPrice.price,
              },
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

      return quotation;
    } catch (error) {
      throw new Error(`Failed to update quotation. ${error.message}`);
    }
  }
    async purchaseRequestsByIdAndSupplierId(id: number,supplierId:number): Promise<Quotation[]> {
      try {
        const quotations = await this.prisma.quotation.findMany({
          where: {
            purchaseRequestId: id,
            //supplierId:supplierId,
          },
          include: {
            supplier: {
              include:{
                user:{
                  where:{
                    id:id
                  }
                }
              }
            },
            productPrices: {
              include: {
                product: true,
              },
            },
          },
        });
    
        if (!quotations || quotations.length === 0) {
          return [];
        }
    
        const formattedQuotations: Quotation[] = quotations.map((quotation) => ({
          id: quotation.id,
          supplierId: quotation.supplierId,
          customerId: quotation.customerId,
          shippingPrice: quotation.shippingPrice,
          createdAt: quotation.createdAt,
          status: quotation.status,
          purchaseRequestId: quotation.purchaseRequestId,
          supplier: quotation.supplier as any, // Cast to any since the structure is not fully defined
          productPrices: quotation.productPrices.map((productPrice) => ({
            id: productPrice.id,
            productId: productPrice.productId,
            product: productPrice.product as any, // Cast to any since the structure is not fully defined
            price: productPrice.price,
          })),
        }));
    
        return formattedQuotations;
      } catch (error) {
        console.error(`Error retrieving quotations with purchaseRequestId ${id}:`, error);
        return [];
      }
    }
    async countRfq() {
      const quotations = async () => {
        try {
          const quotations = await this.prisma.quotation.count();
          return quotations;
        } catch (error) {
          // Handle any errors that occur during the count operation
          throw new Error('An error occurred while counting products.');
        }
      };
    
      return quotations();
    }
}