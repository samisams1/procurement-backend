"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceService = void 0;
const common_1 = require("@nestjs/common");
let InvoiceService = class InvoiceService {
    constructor() {
        this.invoices = [];
    }
    async getInvoiceById(id) {
        const invoice = this.invoices.find((i) => i.id === id);
        if (!invoice) {
            throw new Error('Invoice not found');
        }
        return invoice;
    }
    async getAllInvoices() {
        return this.invoices;
    }
    async updateInvoice(id, invoiceData) {
        const invoiceIndex = this.invoices.findIndex((i) => i.id === id);
        if (invoiceIndex === -1) {
            throw new Error('Invoice not found');
        }
        const updatedInvoice = {
            ...this.invoices[invoiceIndex],
            ...invoiceData,
        };
        this.invoices[invoiceIndex] = updatedInvoice;
        return updatedInvoice;
    }
    async deleteInvoice(id) {
        const invoiceIndex = this.invoices.findIndex((i) => i.id === id);
        if (invoiceIndex === -1) {
            throw new Error('Invoice not found');
        }
        const deletedInvoice = this.invoices.splice(invoiceIndex, 1)[0];
        return deletedInvoice;
    }
};
exports.InvoiceService = InvoiceService;
exports.InvoiceService = InvoiceService = __decorate([
    (0, common_1.Injectable)()
], InvoiceService);
//# sourceMappingURL=invoice.service.js.map