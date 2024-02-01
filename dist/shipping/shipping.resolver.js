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
exports.ShippingResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const shipping_service_1 = require("./shipping.service");
const shipping_entity_1 = require("./shipping.entity");
const create_shipping_input_1 = require("./Dto/create.shipping.input");
let ShippingResolver = class ShippingResolver {
    constructor(shippingService) {
        this.shippingService = shippingService;
    }
    async shippings() {
        return this.shippingService.getAllShippings();
    }
    async shippingsByUserId(userId) {
        return this.shippingService.getShippingsByUserId(userId);
    }
    async createShipping(data) {
        return this.shippingService.createShipping(data);
    }
};
exports.ShippingResolver = ShippingResolver;
__decorate([
    (0, graphql_1.Query)(() => [shipping_entity_1.Shipping]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ShippingResolver.prototype, "shippings", null);
__decorate([
    (0, graphql_1.Query)(() => [shipping_entity_1.Shipping]),
    __param(0, (0, graphql_1.Args)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ShippingResolver.prototype, "shippingsByUserId", null);
__decorate([
    (0, graphql_1.Mutation)(() => shipping_entity_1.Shipping),
    __param(0, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_shipping_input_1.ShippingCreateInput]),
    __metadata("design:returntype", Promise)
], ShippingResolver.prototype, "createShipping", null);
exports.ShippingResolver = ShippingResolver = __decorate([
    (0, graphql_1.Resolver)(() => shipping_entity_1.Shipping),
    __metadata("design:paramtypes", [shipping_service_1.ShippingService])
], ShippingResolver);
//# sourceMappingURL=shipping.resolver.js.map