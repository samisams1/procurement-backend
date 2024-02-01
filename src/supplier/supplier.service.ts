import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { supplier } from './supplier.entity';

@Injectable()
export class SupplierService {
    private prisma :PrismaClient

    constructor(){
        this.prisma = new PrismaClient();
    }
   
    async suppliers(){
        return this.prisma.supplier.findMany({
          include:{
            user:true
          } 
        });
    }
    async getSuppliersByCategoryId(categoryId: number): Promise<supplier[]> {
      return this.prisma.supplier.findMany({
        where: {
          categoryId,
        },
        include: {
          category: true,
          user: true,
        },
      });
    }
  
}
