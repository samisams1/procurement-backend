import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client'; // Import the verification model

@Injectable()
export class PrismaService {
  constructor() {
    this.prisma = new PrismaClient();
  }

  private prisma: PrismaClient;

  get user() {
    return this.prisma.user;
  }

  get product() {
    return this.prisma.product;
  }

  get verification() {
    return this.prisma.verification; // Getter for the verification model
  }

  // Other Prisma models

  async onModuleDestroy() {
    await this.prisma.$disconnect();
  }
}