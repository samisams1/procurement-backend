import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

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
}
