import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { ReferenceNumberGeneratorService } from './generateReferenceNumber';

@Module({
  providers: [OrderService, OrderResolver,ReferenceNumberGeneratorService]
})
export class OrderModule {}
