import { Module } from '@nestjs/common';
import { PurchaseRequestService } from './purchase-request.service';
import { PurchaseRequestResolver } from './purchase-request.resolver';
import { ReferenceNumberGeneratorService } from './generateReferenceNumber';

@Module({
  providers: [PurchaseRequestService, PurchaseRequestResolver,ReferenceNumberGeneratorService,]
})
export class PurchaseRequestModule {}
