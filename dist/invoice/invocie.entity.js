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
exports.Invoice = void 0;
const graphql_1 = require("@nestjs/graphql");
const payment_entity_1 = require("../payment/payment.entity");
const shipping_entity_1 = require("../shipping/shipping.entity");
let Invoice = class Invoice {
};
exports.Invoice = Invoice;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Invoice.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => payment_entity_1.Payment),
    __metadata("design:type", payment_entity_1.Payment)
], Invoice.prototype, "payment", void 0);
__decorate([
    (0, graphql_1.Field)(() => shipping_entity_1.Shipping),
    __metadata("design:type", shipping_entity_1.Shipping)
], Invoice.prototype, "shipping", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Invoice.prototype, "orderId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Invoice.prototype, "amount", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Invoice.prototype, "issuedAt", void 0);
exports.Invoice = Invoice = __decorate([
    (0, graphql_1.ObjectType)()
], Invoice);
//# sourceMappingURL=invocie.entity.js.map