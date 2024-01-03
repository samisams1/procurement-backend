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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let OrderService = class OrderService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async createOrder(input) {
        const { customerId, supplierId, orderDetails, totalPrice, tax, status, shippingCost } = input;
        const createdOrder = await this.prisma.order.create({
            data: {
                customerId,
                supplierId,
                totalPrice,
                shippingCost,
                tax,
                status,
                orderDetails: {
                    create: orderDetails.map(detail => ({
                        title: detail.title,
                        price: detail.price,
                        quantity: detail.quantity,
                    })),
                },
            },
            include: {
                orderDetails: true,
            },
        });
        const order = {
            ...createdOrder,
            orderDetails: createdOrder.orderDetails,
        };
        return order;
    }
    async getAllOrders() {
        return this.prisma.order.findMany({ include: { orderDetails: true } });
    }
    async getOrderById(id) {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: { orderDetails: true },
        });
        if (!order) {
            throw new Error(`Order with ID ${id} not found`);
        }
        return order;
    }
    async getOrderDetailByOrderId(orderId) {
        const order = await this.prisma.orderDetail.findMany({
            where: { orderId },
        });
        if (!order) {
            throw new Error(`Order detail with orderId ${orderId} not found`);
        }
        return order;
    }
    async getOrderBySupplierId(supplierId) {
        const orders = await this.prisma.order.findMany({
            where: { supplierId },
            include: { orderDetails: true },
            orderBy: {
                id: 'desc'
            }
        });
        if (!orders) {
            throw new Error(`No orders found for supplier with ID ${supplierId}`);
        }
        return orders;
    }
    async getOrderByCustomerId(customerId) {
        const orders = await this.prisma.order.findMany({
            where: { customerId },
            include: { orderDetails: true },
            orderBy: {
                id: 'desc'
            }
        });
        if (!orders) {
            throw new Error(`No orders found for supplier with ID ${customerId}`);
        }
        return orders;
    }
    async updateOrder(id, status) {
        const updatedOrder = await this.prisma.order.update({
            where: { id },
            data: { status: status },
            include: { orderDetails: true },
        });
        return updatedOrder;
    }
    async countOrder() {
        const orders = async () => {
            try {
                const count = await this.prisma.order.count();
                return count;
            }
            catch (error) {
                throw new Error('An error occurred while counting products.');
            }
        };
        return orders();
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], OrderService);
//# sourceMappingURL=order.service.js.map