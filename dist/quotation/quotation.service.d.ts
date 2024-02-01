import { Quotation } from './quotation.entity';
import { CreateQuotationInput } from './Dto/create.quotation.input';
import { UpdateQuotationInput } from './Dto/updateQuotationInput';
export declare class QuotationService {
    private prisma;
    constructor();
    allQuotations(): Promise<Quotation[]>;
    getAllQuotations(): Promise<Quotation[]>;
    getQuotationById(id: number): Promise<Quotation | null>;
    getQuotationsByRequestId(requestId: number): Promise<Quotation[]>;
    createQuotation(createQuotationDto: CreateQuotationInput): Promise<Quotation>;
    updateQuotation(id: number, input: UpdateQuotationInput): Promise<Quotation>;
    purchaseRequestsByIdAndSupplierId(id: number, supplierId: number): Promise<Quotation[]>;
    countRfq(): Promise<number>;
}
