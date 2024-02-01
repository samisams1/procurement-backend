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
exports.ShippingCreateInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const create_order_1 = require("../../order/Dto/create.order");
const create_user_input_1 = require("../../users/dto/create-user.input");
let ShippingCreateInput = class ShippingCreateInput {
};
exports.ShippingCreateInput = ShippingCreateInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ShippingCreateInput.prototype, "orderId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ShippingCreateInput.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ShippingCreateInput.prototype, "userId", void 0);
__decorate([
    (0, graphql_1.Field)(() => create_order_1.CreateOrderInput),
    __metadata("design:type", create_order_1.CreateOrderInput)
], ShippingCreateInput.prototype, "order", void 0);
__decorate([
    (0, graphql_1.Field)(() => create_user_input_1.CreateUserInput),
    __metadata("design:type", create_user_input_1.CreateUserInput)
], ShippingCreateInput.prototype, "user", void 0);
exports.ShippingCreateInput = ShippingCreateInput = __decorate([
    (0, graphql_1.InputType)()
], ShippingCreateInput);
//# sourceMappingURL=create.shipping.input.js.map