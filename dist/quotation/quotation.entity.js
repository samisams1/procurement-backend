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
exports.ProductPrice = exports.Quotation = void 0;
const graphql_1 = require("@nestjs/graphql");
const product_entity_1 = require("../product/product.entity");
let Quotation = class Quotation {
};
exports.Quotation = Quotation;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", Number)
], Quotation.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Quotation.prototype, "supplierId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Quotation.prototype, "customerId", void 0);
__decorate([
    (0, graphql_1.Field)(() => [ProductPrice]),
    __metadata("design:type", Array)
], Quotation.prototype, "productPrices", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Quotation.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Quotation.prototype, "shippingPrice", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Quotation.prototype, "purchaseRequestId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Quotation.prototype, "createdAt", void 0);
exports.Quotation = Quotation = __decorate([
    (0, graphql_1.ObjectType)()
], Quotation);
let ProductPrice = class ProductPrice {
};
exports.ProductPrice = ProductPrice;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ProductPrice.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ProductPrice.prototype, "productId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], ProductPrice.prototype, "price", void 0);
__decorate([
    (0, graphql_1.Field)(() => product_entity_1.product),
    __metadata("design:type", product_entity_1.product)
], ProductPrice.prototype, "product", void 0);
exports.ProductPrice = ProductPrice = __decorate([
    (0, graphql_1.ObjectType)()
], ProductPrice);
//# sourceMappingURL=quotation.entity.js.map