import { Module } from '@nestjs/common';
import { QuotationService } from './quotation.service';
import { QuotationResolver } from './quotation.resolver';

@Module({
  providers: [QuotationService, QuotationResolver]
})
export class QuotationModule {}
