import { Quotation } from './quotation.entity';
import { CreateQuotationInput } from './Dto/create.quotation.input';
export declare class QuotationService {
    private prisma;
    constructor();
    getAllQuotations(): Promise<Quotation[]>;
    getQuotationById(id: number): Promise<Quotation | null>;
    createQuotation(createQuotationDto: CreateQuotationInput): Promise<Quotation>;
}
