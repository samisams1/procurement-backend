import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentResolver } from './payment.resolver';
import { ReferenceNumberGeneratorService } from './generateReferenceNumber';

@Module({
  providers: [PaymentService, PaymentResolver,ReferenceNumberGeneratorService]
})
export class PaymentModule {}
