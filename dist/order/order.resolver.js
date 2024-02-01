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
exports.OrderResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const order_entity_1 = require("./order.entity");
const create_order_1 = require("./Dto/create.order");
const order_service_1 = require("./order.service");
let OrderResolver = class OrderResolver {
    constructor(orderService) {
        this.orderService = orderService;
    }
    async createOrder(input) {
        return this.orderService.createOrder(input);
    }
    async orders() {
        return this.orderService.getAllOrders();
    }
    async getOrderDetailByOrderId(id) {
        return this.orderService.getOrderDetailByOrderId(id);
    }
    async getOrderById(id) {
        return this.orderService.getOrderById(id);
    }
    async getOrderBySupplierId(supplierId) {
        return this.orderService.getOrderBySupplierId(supplierId);
    }
    async getOrderByCustomerId(customerId) {
        return this.orderService.getOrderByCustomerId(customerId);
    }
    async getApprovedOrderByCustomerId(customerId) {
        return this.orderService.getApprovedOrderByCustomerId(customerId);
    }
    async updateOrder(id, status) {
        const updatedOrder = await this.orderService.updateOrder(id, status);
        return updatedOrder;
    }
    async countOrders() {
        const count = await this.orderService.countOrder();
        return count;
    }
    async countOrderBystatus(status, userId) {
        const count = await this.orderService.countOrderByStatus(status, userId);
        return count;
    }
    async countOAllrderByStatus(status) {
        const count = await this.orderService.countOAllrderByStatus(status);
        return count;
    }
};
exports.OrderResolver = OrderResolver;
__decorate([
    (0, graphql_1.Mutation)(() => order_entity_1.Order),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_1.CreateOrderInput]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "createOrder", null);
__decorate([
    (0, graphql_1.Query)(() => [order_entity_1.Order]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "orders", null);
__decorate([
    (0, graphql_1.Query)(() => [order_entity_1.OrderDetail]),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "getOrderDetailByOrderId", null);
__decorate([
    (0, graphql_1.Query)(() => order_entity_1.Order),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "getOrderById", null);
__decorate([
    (0, graphql_1.Query)(() => [order_entity_1.Order]),
    __param(0, (0, graphql_1.Args)('supplierId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "getOrderBySupplierId", null);
__decorate([
    (0, graphql_1.Query)(() => [order_entity_1.Order]),
    __param(0, (0, graphql_1.Args)('customerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "getOrderByCustomerId", null);
__decorate([
    (0, graphql_1.Query)(() => [order_entity_1.Order]),
    __param(0, (0, graphql_1.Args)('customerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "getApprovedOrderByCustomerId", null);
__decorate([
    (0, graphql_1.Mutation)(() => order_entity_1.Order),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "updateOrder", null);
__decorate([
    (0, graphql_1.Query)(() => graphql_1.Int),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "countOrders", null);
__decorate([
    (0, graphql_1.Query)(() => graphql_1.Int),
    __param(0, (0, graphql_1.Args)('status')),
    __param(1, (0, graphql_1.Args)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "countOrderBystatus", null);
__decorate([
    (0, graphql_1.Query)(() => graphql_1.Int),
    __param(0, (0, graphql_1.Args)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "countOAllrderByStatus", null);
exports.OrderResolver = OrderResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderResolver);
//# sourceMappingURL=order.resolver.js.map