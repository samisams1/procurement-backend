import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { QuotationService } from './quotation.service';
import { Quotation } from './quotation.entity';
import { CreateQuotationInput } from './Dto/create.quotation.input';
import { UpdateQuotationInput } from './Dto/updateQuotationInput';

@Resolver(() => Quotation)
export class QuotationResolver {
  constructor(private readonly quotationService: QuotationService) {}

  @Query(() => [Quotation])
  async allQuotations() {
    return this.quotationService.allQuotations();
  }
  //distinict
  @Query(() => [Quotation])
  async quotations() {
    return this.quotationService.getAllQuotations();
  }
  @Query(() => Quotation)
  async quotation(@Args('id') id: number) {
    return this.quotationService.getQuotationById(id);
  }
  @Query(() => [Quotation])
  async quotationByRequestId(@Args('requestId') requestId: number) {
    return this.quotationService.getQuotationsByRequestId(requestId);
  }
  @Query(() => [Quotation])
  async quotationByRequestIdAdSupplierId(@Args('id') id: number,@Args('supplierId') supplierId: number) {
    return this.quotationService.purchaseRequestsByIdAndSupplierId(id,supplierId);
  }
@Mutation(() => Quotation)
  async createQuotation(@Args('input') input: CreateQuotationInput) {
    return this.quotationService.createQuotation(input);
  } 
  @Mutation(() => Quotation)
  async updateQuotation(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateQuotationInput,
  ): Promise<Quotation> {
    return await this.quotationService.updateQuotation(id, input);
  }
  @Query(()=>Int)
  async countRfq():Promise<number> {
    return this.quotationService.countRfq();

  }
} 


