import { QuotationService } from './quotation.service';
import { Quotation } from './quotation.entity';
import { CreateQuotationInput } from './Dto/create.quotation.input';
export declare class QuotationResolver {
    private readonly quotationService;
    constructor(quotationService: QuotationService);
    quotations(): Promise<Quotation[]>;
    quotation(id: number): Promise<Quotation>;
    createQuotation(input: CreateQuotationInput): Promise<Quotation>;
}
