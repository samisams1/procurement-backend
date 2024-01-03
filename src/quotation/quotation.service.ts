import { Injectable } from '@nestjs/common';
import { Quotation } from './quotation.entity';
//import { CreateQuotationInput } from './Dto/create.quotation.input';
import { PrismaClient } from '@prisma/client';
import { CreateQuotationInput } from './Dto/create.quotation.input';

@Injectable()
export class QuotationService {
  private prisma :PrismaClient

  constructor(){
      this.prisma = new PrismaClient();
  }
  
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
        },
      });
  
      const formattedQuotations: Quotation[] = quotations.map((quotation) => {
        const { productPrices, ...quotationData } = quotation;
  
        const products = productPrices.map((productPrice) => ({
          id: productPrice.product.id, // Include the id property
          title: productPrice.product.title,
          price: productPrice.price,
        }));
  
        return {
          ...quotationData,
          productPrices,
          products,
        };
      });
  
      return formattedQuotations;
    } catch (error) {
      console.error('Error retrieving quotations:', error);
      return [];
    }
  } 
  async  getQuotationById(id: number): Promise<Quotation | null> {
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
        })),
      };
  
      return formattedQuotation;
    } catch (error) {
      console.error(`Error retrieving quotation with ID ${id}:`, error);
      return null;
    }
  }
  async createQuotation(createQuotationDto: CreateQuotationInput): Promise<Quotation> {
    const { supplierId, customerId, productPrices,shippingPrice,status } = createQuotationDto;

    try {
      const quotation = await this.prisma.quotation.create({
        data: {
          supplier: { connect: { id: supplierId } },
          customer: { connect: { id: customerId } },
          createdAt: new Date(),
          status:status,
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
      return quotation;
    } catch (error) {
      throw new Error(`Failed to create quotation. ${error.message}`);
    }
  }
}