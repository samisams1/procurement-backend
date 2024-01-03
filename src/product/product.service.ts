import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ProductService {
    private prisma :PrismaClient

    constructor(){
        this.prisma = new PrismaClient();
    }
   
    async products(){
        return this.prisma.product.findMany({
         /* include:{
            category:true
          } */
        });
    }
}
