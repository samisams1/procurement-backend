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
exports.UpdateOrderInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const create_order_1 = require("./create.order");
let UpdateOrderInput = class UpdateOrderInput {
};
exports.UpdateOrderInput = UpdateOrderInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], UpdateOrderInput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], UpdateOrderInput.prototype, "customerId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], UpdateOrderInput.prototype, "supplierId", void 0);
__decorate([
    (0, graphql_1.Field)(() => [create_order_1.CreateOrderDetailInput]),
    __metadata("design:type", Array)
], UpdateOrderInput.prototype, "orderDetails", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], UpdateOrderInput.prototype, "totalPrice", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], UpdateOrderInput.prototype, "shippingCost", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], UpdateOrderInput.prototype, "tax", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateOrderInput.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], UpdateOrderInput.prototype, "createdAt", void 0);
exports.UpdateOrderInput = UpdateOrderInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateOrderInput);
//# sourceMappingURL=update.order.js.map