import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { QuotationService } from './quotation.service';
import { Quotation } from './quotation.entity';
import { CreateQuotationInput } from './Dto/create.quotation.input';

@Resolver(() => Quotation)
export class QuotationResolver {
  constructor(private readonly quotationService: QuotationService) {}

  @Query(() => [Quotation])
  async quotations() {
    return this.quotationService.getAllQuotations();
  }
  @Query(() => Quotation)
  async quotation(@Args('id') id: number) {
    return this.quotationService.getQuotationById(id);
  }
@Mutation(() => Quotation)
  async createQuotation(@Args('input') input: CreateQuotationInput) {
    return this.quotationService.createQuotation(input);
  } 
} 


