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
exports.PaymentResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const payment_service_1 = require("./payment.service");
const payment_entity_1 = require("./payment.entity");
const create_payment_input_1 = require("./Dto/create.payment.input");
let PaymentResolver = class PaymentResolver {
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    async createPayment(input) {
        return this.paymentService.createPayment(input);
    }
    async payments() {
        return this.paymentService.getAllPayments();
    }
    async payment(id) {
        return this.paymentService.getAllPayment(id);
    }
    async countPaymentBystatus(status) {
        const count = await this.paymentService.countPaymentBystatus(status);
        return count;
    }
};
exports.PaymentResolver = PaymentResolver;
__decorate([
    (0, graphql_1.Mutation)(() => payment_entity_1.Payment),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_payment_input_1.PaymentCreateInput]),
    __metadata("design:returntype", Promise)
], PaymentResolver.prototype, "createPayment", null);
__decorate([
    (0, graphql_1.Query)(() => [payment_entity_1.Payment]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentResolver.prototype, "payments", null);
__decorate([
    (0, graphql_1.Query)(() => [payment_entity_1.Payment]),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PaymentResolver.prototype, "payment", null);
__decorate([
    (0, graphql_1.Query)(() => graphql_1.Int),
    __param(0, (0, graphql_1.Args)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentResolver.prototype, "countPaymentBystatus", null);
exports.PaymentResolver = PaymentResolver = __decorate([
    (0, graphql_1.Resolver)(() => payment_entity_1.Payment),
    __metadata("design:paramtypes", [payment_service_1.PaymentService])
], PaymentResolver);
//# sourceMappingURL=payment.resolver.js.map