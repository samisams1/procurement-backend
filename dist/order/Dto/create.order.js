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
exports.CreateOrderInput = exports.CreateOrderDetailInput = void 0;
const graphql_1 = require("@nestjs/graphql");
let CreateOrderDetailInput = class CreateOrderDetailInput {
};
exports.CreateOrderDetailInput = CreateOrderDetailInput;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateOrderDetailInput.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], CreateOrderDetailInput.prototype, "productId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateOrderDetailInput.prototype, "price", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateOrderDetailInput.prototype, "quantity", void 0);
exports.CreateOrderDetailInput = CreateOrderDetailInput = __decorate([
    (0, graphql_1.InputType)()
], CreateOrderDetailInput);
let CreateOrderInput = class CreateOrderInput {
};
exports.CreateOrderInput = CreateOrderInput;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateOrderInput.prototype, "customerId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateOrderInput.prototype, "supplierId", void 0);
__decorate([
    (0, graphql_1.Field)(() => [CreateOrderDetailInput]),
    __metadata("design:type", Array)
], CreateOrderInput.prototype, "orderDetails", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], CreateOrderInput.prototype, "totalPrice", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateOrderInput.prototype, "tax", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateOrderInput.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateOrderInput.prototype, "shippingCost", void 0);
exports.CreateOrderInput = CreateOrderInput = __decorate([
    (0, graphql_1.InputType)()
], CreateOrderInput);
//# sourceMappingURL=create.order.js.map