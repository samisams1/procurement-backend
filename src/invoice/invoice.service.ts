import { Injectable } from '@nestjs/common';
import { Invoice } from './invocie.entity';
import { InvoiceCreateInput } from './Dto/create.invoice.input';

@Injectable()
export class InvoiceService {
  private invoices: Invoice[] = [];

  async getInvoiceById(id: number): Promise<Invoice> {
    const invoice = this.invoices.find((i) => i.id === id);
    if (!invoice) {
      throw new Error('Invoice not found');
    }
    return invoice;
  }
  async getAllInvoices(): Promise<Invoice[]> {
    return this.invoices;
  }
  async updateInvoice(id: number, invoiceData: InvoiceCreateInput): Promise<Invoice> {
    const invoiceIndex = this.invoices.findIndex((i) => i.id === id);
    if (invoiceIndex === -1) {
      throw new Error('Invoice not found');
    }
    const updatedInvoice: Invoice = {
      ...this.invoices[invoiceIndex],
      ...invoiceData,
    };
    this.invoices[invoiceIndex] = updatedInvoice;
    return updatedInvoice;
  }

  async deleteInvoice(id: number): Promise<Invoice> {
    const invoiceIndex = this.invoices.findIndex((i) => i.id === id);
    if (invoiceIndex === -1) {
      throw new Error('Invoice not found');
    }
    const deletedInvoice = this.invoices.splice(invoiceIndex, 1)[0];
    return deletedInvoice;
  }

}