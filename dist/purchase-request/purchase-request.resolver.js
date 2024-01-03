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
exports.PurchaseRequestResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const purchase_request_service_1 = require("./purchase-request.service");
const purchase_request_entity_1 = require("./purchase-request.entity");
const purchase_request_create_inputs_1 = require("./Dto/purchase-request.create-inputs");
let PurchaseRequestResolver = class PurchaseRequestResolver {
    constructor(purchaseRequestService) {
        this.purchaseRequestService = purchaseRequestService;
    }
    async createPurchaseRequest(createPurchaseRequestInput) {
        return this.purchaseRequestService.createPurchaseRequest(createPurchaseRequestInput);
    }
    async purchaseRequest(id) {
        return this.purchaseRequestService.purchaseRequestsById(id);
    }
    async purchaseRequestBySupplier(id) {
        return this.purchaseRequestService.purchaseRequestsBySupplierId(id);
    }
    async purchaseRequests() {
        return this.purchaseRequestService.getAllPurchaseRequests();
    }
};
exports.PurchaseRequestResolver = PurchaseRequestResolver;
__decorate([
    (0, graphql_1.Mutation)(() => purchase_request_entity_1.purchaseRequest),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [purchase_request_create_inputs_1.CreatePurchaseRequestInput]),
    __metadata("design:returntype", Promise)
], PurchaseRequestResolver.prototype, "createPurchaseRequest", null);
__decorate([
    (0, graphql_1.Query)(() => purchase_request_entity_1.purchaseRequest),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PurchaseRequestResolver.prototype, "purchaseRequest", null);
__decorate([
    (0, graphql_1.Query)(() => [purchase_request_entity_1.purchaseRequest]),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PurchaseRequestResolver.prototype, "purchaseRequestBySupplier", null);
__decorate([
    (0, graphql_1.Query)(() => [purchase_request_entity_1.purchaseRequest]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PurchaseRequestResolver.prototype, "purchaseRequests", null);
exports.PurchaseRequestResolver = PurchaseRequestResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [purchase_request_service_1.PurchaseRequestService])
], PurchaseRequestResolver);
//# sourceMappingURL=purchase-request.resolver.js.map