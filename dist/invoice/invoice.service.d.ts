import { Invoice } from './invocie.entity';
import { InvoiceCreateInput } from './Dto/create.invoice.input';
export declare class InvoiceService {
    private invoices;
    getInvoiceById(id: number): Promise<Invoice>;
    getAllInvoices(): Promise<Invoice[]>;
    updateInvoice(id: number, invoiceData: InvoiceCreateInput): Promise<Invoice>;
    deleteInvoice(id: number): Promise<Invoice>;
}
