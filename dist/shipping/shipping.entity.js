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
exports.Shipping = void 0;
const graphql_1 = require("@nestjs/graphql");
const order_entity_1 = require("../order/order.entity");
const user_entity_1 = require("../users/entities/user.entity");
let Shipping = class Shipping {
};
exports.Shipping = Shipping;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Shipping.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => order_entity_1.Order),
    __metadata("design:type", order_entity_1.Order)
], Shipping.prototype, "order", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Shipping.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Shipping.prototype, "orderId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Shipping.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Shipping.prototype, "address", void 0);
exports.Shipping = Shipping = __decorate([
    (0, graphql_1.ObjectType)()
], Shipping);
//# sourceMappingURL=shipping.entity.js.map