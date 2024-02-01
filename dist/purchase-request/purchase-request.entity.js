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
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchaseRequest = void 0;
const graphql_1 = require("@nestjs/graphql");
const product_entity_1 = require("../product/product.entity");
const supplier_entity_1 = require("../supplier/supplier.entity");
const user_entity_1 = require("../users/entities/user.entity");
let purchaseRequest = class purchaseRequest {
};
exports.purchaseRequest = purchaseRequest;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], purchaseRequest.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], purchaseRequest.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], purchaseRequest.prototype, "referenceNumber", void 0);
__decorate([
    (0, graphql_1.Field)(() => [product_entity_1.product]),
    __metadata("design:type", Array)
], purchaseRequest.prototype, "products", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], purchaseRequest.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], purchaseRequest.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], purchaseRequest.prototype, "addressDetail", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], purchaseRequest.prototype, "estimatedDelivery", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], purchaseRequest.prototype, "remark", void 0);
__decorate([
    (0, graphql_1.Field)(() => [supplier_entity_1.supplier]),
    __metadata("design:type", Array)
], purchaseRequest.prototype, "suppliers", void 0);
exports.purchaseRequest = purchaseRequest = __decorate([
    (0, graphql_1.ObjectType)()
], purchaseRequest);
//# sourceMappingURL=purchase-request.entity.js.map