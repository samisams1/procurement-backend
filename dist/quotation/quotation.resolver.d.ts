import { QuotationService } from './quotation.service';
import { Quotation } from './quotation.entity';
import { CreateQuotationInput } from './Dto/create.quotation.input';
import { UpdateQuotationInput } from './Dto/updateQuotationInput';
export declare class QuotationResolver {
    private readonly quotationService;
    constructor(quotationService: QuotationService);
    allQuotations(): Promise<Quotation[]>;
    quotations(): Promise<Quotation[]>;
    quotation(id: number): Promise<Quotation>;
    quotationByRequestId(requestId: number): Promise<Quotation[]>;
    quotationByRequestIdAdSupplierId(id: number, supplierId: number): Promise<Quotation[]>;
    createQuotation(input: CreateQuotationInput): Promise<Quotation>;
    updateQuotation(id: number, input: UpdateQuotationInput): Promise<Quotation>;
    countRfq(): Promise<number>;
}
