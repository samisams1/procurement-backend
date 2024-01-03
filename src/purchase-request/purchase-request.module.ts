import { Module } from '@nestjs/common';
import { PurchaseRequestService } from './purchase-request.service';
import { PurchaseRequestResolver } from './purchase-request.resolver';

@Module({
  providers: [PurchaseRequestService, PurchaseRequestResolver]
})
export class PurchaseRequestModule {}
