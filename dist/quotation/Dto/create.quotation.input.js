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
exports.ProductPriceInput = exports.CreateQuotationInput = void 0;
const graphql_1 = require("@nestjs/graphql");
let CreateQuotationInput = class CreateQuotationInput {
};
exports.CreateQuotationInput = CreateQuotationInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], CreateQuotationInput.prototype, "supplierId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], CreateQuotationInput.prototype, "customerId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], CreateQuotationInput.prototype, "shippingPrice", void 0);
__decorate([
    (0, graphql_1.Field)(() => [ProductPriceInput]),
    __metadata("design:type", Array)
], CreateQuotationInput.prototype, "productPrices", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateQuotationInput.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], CreateQuotationInput.prototype, "requestId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], CreateQuotationInput.prototype, "purchaseRequestId", void 0);
exports.CreateQuotationInput = CreateQuotationInput = __decorate([
    (0, graphql_1.InputType)()
], CreateQuotationInput);
let ProductPriceInput = class ProductPriceInput {
};
exports.ProductPriceInput = ProductPriceInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ProductPriceInput.prototype, "productId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], ProductPriceInput.prototype, "price", void 0);
exports.ProductPriceInput = ProductPriceInput = __decorate([
    (0, graphql_1.InputType)()
], ProductPriceInput);
//# sourceMappingURL=create.quotation.input.js.map