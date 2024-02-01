import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CategoryInput } from './Dto/create.category.input';
import { category } from './category.entity';

@Injectable()
export class CategoryService {
    private prisma :PrismaClient
    constructor(){
        this.prisma = new PrismaClient();
    }
   
    async categories(){
        return this.prisma.category.findMany({
          include:{
            suppliers:true
          } 
        });
    }
   // async createCategory(input: CategoryInput) {
    async createCategory(input: CategoryInput) {

      try {
        const { name} = input;
      const existingCategory = await this.prisma.category.findUnique({ where: { name } });
      if (existingCategory) {
        throw new Error('Category already exists');
      }
      const category = await this.prisma.category.create({
        data: {name},
      });
return category;
  }catch (error) {
    throw error.message;
  }
}
}