"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuotationResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const quotation_service_1 = require("./quotation.service");
const quotation_entity_1 = require("./quotation.entity");
const create_quotation_input_1 = require("./Dto/create.quotation.input");
const updateQuotationInput_1 = require("./Dto/updateQuotationInput");
let QuotationResolver = class QuotationResolver {
    constructor(quotationService) {
        this.quotationService = quotationService;
    }
    async allQuotations() {
        return this.quotationService.allQuotations();
    }
    async quotations() {
        return this.quotationService.getAllQuotations();
    }
    async quotation(id) {
        return this.quotationService.getQuotationById(id);
    }
    async quotationByRequestId(requestId) {
        return this.quotationService.getQuotationsByRequestId(requestId);
    }
    async quotationByRequestIdAdSupplierId(id, supplierId) {
        return this.quotationService.purchaseRequestsByIdAndSupplierId(id, supplierId);
    }
    async createQuotation(input) {
        return this.quotationService.createQuotation(input);
    }
    async updateQuotation(id, input) {
        return await this.quotationService.updateQuotation(id, input);
    }
    async countRfq() {
        return this.quotationService.countRfq();
    }
};
exports.QuotationResolver = QuotationResolver;
__decorate([
    (0, graphql_1.Query)(() => [quotation_entity_1.Quotation]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QuotationResolver.prototype, "allQuotations", null);
__decorate([
    (0, graphql_1.Query)(() => [quotation_entity_1.Quotation]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QuotationResolver.prototype, "quotations", null);
__decorate([
    (0, graphql_1.Query)(() => quotation_entity_1.Quotation),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QuotationResolver.prototype, "quotation", null);
__decorate([
    (0, graphql_1.Query)(() => [quotation_entity_1.Quotation]),
    __param(0, (0, graphql_1.Args)('requestId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QuotationResolver.prototype, "quotationByRequestId", null);
__decorate([
    (0, graphql_1.Query)(() => [quotation_entity_1.Quotation]),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('supplierId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], QuotationResolver.prototype, "quotationByRequestIdAdSupplierId", null);
__decorate([
    (0, graphql_1.Mutation)(() => quotation_entity_1.Quotation),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_quotation_input_1.CreateQuotationInput]),
    __metadata("design:returntype", Promise)
], QuotationResolver.prototype, "createQuotation", null);
__decorate([
    (0, graphql_1.Mutation)(() => quotation_entity_1.Quotation),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updateQuotationInput_1.UpdateQuotationInput]),
    __metadata("design:returntype", Promise)
], QuotationResolver.prototype, "updateQuotation", null);
__decorate([
    (0, graphql_1.Query)(() => graphql_1.Int),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QuotationResolver.prototype, "countRfq", null);
exports.QuotationResolver = QuotationResolver = __decorate([
    (0, graphql_1.Resolver)(() => quotation_entity_1.Quotation),
    __metadata("design:paramtypes", [quotation_service_1.QuotationService])
], QuotationResolver);
//# sourceMappingURL=quotation.resolver.js.map