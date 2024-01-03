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
exports.CreateSupplierInput = exports.CreateProductInput = exports.CreatePurchaseRequestInput = void 0;
const graphql_1 = require("@nestjs/graphql");
let CreatePurchaseRequestInput = class CreatePurchaseRequestInput {
};
exports.CreatePurchaseRequestInput = CreatePurchaseRequestInput;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CreatePurchaseRequestInput.prototype, "userId", void 0);
__decorate([
    (0, graphql_1.Field)(() => [CreateProductInput]),
    __metadata("design:type", Array)
], CreatePurchaseRequestInput.prototype, "products", void 0);
__decorate([
    (0, graphql_1.Field)(() => [CreateSupplierInput]),
    __metadata("design:type", Array)
], CreatePurchaseRequestInput.prototype, "suppliers", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreatePurchaseRequestInput.prototype, "status", void 0);
exports.CreatePurchaseRequestInput = CreatePurchaseRequestInput = __decorate([
    (0, graphql_1.InputType)()
], CreatePurchaseRequestInput);
let CreateProductInput = class CreateProductInput {
};
exports.CreateProductInput = CreateProductInput;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateProductInput.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateProductInput.prototype, "quotation", void 0);
exports.CreateProductInput = CreateProductInput = __decorate([
    (0, graphql_1.InputType)()
], CreateProductInput);
let CreateSupplierInput = class CreateSupplierInput {
};
exports.CreateSupplierInput = CreateSupplierInput;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateSupplierInput.prototype, "id", void 0);
exports.CreateSupplierInput = CreateSupplierInput = __decorate([
    (0, graphql_1.InputType)()
], CreateSupplierInput);
//# sourceMappingURL=purchase-request.create-inputs.js.map