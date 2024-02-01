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
const generateReferenceNumber_1 = require("./generateReferenceNumber");
let OrderService = class OrderService {
    constructor(referenceNumberGeneratorService) {
        this.referenceNumberGeneratorService = referenceNumberGeneratorService;
        this.prisma = new client_1.PrismaClient();
    }
    async createOrder(input) {
        const { customerId, supplierId, orderDetails, totalPrice, tax, status, shippingCost } = input;
        const referenceNumber = this.referenceNumberGeneratorService.generateReferenceNumber();
        const createdOrder = await this.prisma.order.create({
            data: {
                customerId,
                supplierId,
                totalPrice,
                shippingCost,
                tax,
                status,
                referenceNumber,
                orderDetails: {
                    create: orderDetails.map(detail => ({
                        title: detail.title,
                        price: detail.price,
                        quantity: detail.quantity,
                        product: { connect: { id: detail.productId } },
                    })),
                },
            },
            include: {
                orderDetails: {
                    include: {
                        product: true,
                    },
                },
                purchaseRequest: {
                    include: {
                        user: true,
                        products: true,
                        suppliers: true,
                    },
                },
            },
        });
        const order = {
            ...createdOrder,
            orderDetails: createdOrder.orderDetails,
            suppliers: [],
            customer: [],
        };
        for (const detail of orderDetails) {
            await this.prisma.product.update({
                where: { id: detail.productId },
                data: { status: 'confirmed' },
            });
        }
        const notification = await this.prisma.notification.create({
            data: {
                type: 'order',
                message: 'A new order has been created.',
                recipientId: supplierId,
                status: "new"
            },
        });
        return order;
    }
    async getAllOrders() {
        try {
            const orders = await this.prisma.order.findMany({
                include: {
                    orderDetails: {
                        include: {
                            product: true,
                        },
                    },
                    supplier: {
                        include: {
                            user: true,
                        },
                    },
                    purchaseRequest: {
                        include: {
                            user: true,
                            products: true,
                            suppliers: true,
                        },
                    },
                },
            });
            const formattedOrders = orders.map(order => ({
                ...order,
                suppliers: [],
                customer: [],
                purchaseRequest: order.purchaseRequest,
            }));
            return formattedOrders;
        }
        catch (error) {
            console.error('Error retrieving orders:', error);
            return [];
        }
    }
    async getOrderById(id) {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: {
                orderDetails: {
                    include: {
                        product: true,
                    },
                },
                supplier: {
                    include: {
                        user: true,
                    }
                },
                customer: true,
                purchaseRequest: {
                    include: {
                        user: true,
                        products: true,
                        suppliers: {
                            include: {
                                user: true,
                            }
                        },
                    },
                },
            },
        });
        if (!order) {
            throw new Error(`Order with ID ${id} not found`);
        }
        const suppliers = order.purchaseRequest.suppliers.map(supplier => ({
            id: supplier.id,
            name: supplier.name,
            categoryId: supplier.categoryId,
            user: supplier.user,
            userId: supplier.userId,
        }));
        const customer = order.purchaseRequest.suppliers.map(supplier => ({
            id: supplier.id,
            name: supplier.name,
            categoryId: supplier.categoryId,
            user: supplier.user,
            userId: supplier.userId,
        }));
        const orderWithSuppliers = {
            ...order,
            suppliers,
            customer,
        };
        return orderWithSuppliers;
    }
    async getOrderDetailByOrderId(orderId) {
        const orderDetails = await this.prisma.orderDetail.findMany({
            where: { orderId },
            include: { product: true },
        });
        if (!orderDetails || orderDetails.length === 0) {
            throw new Error(`Order details with orderId ${orderId} not found`);
        }
        return orderDetails;
    }
    async getOrderBySupplierId(supplierId) {
        const orders = await this.prisma.order.findMany({
            include: {
                orderDetails: {
                    include: {
                        product: true,
                    },
                },
                supplier: {
                    include: {
                        user: {
                            where: {
                                id: supplierId
                            }
                        }
                    }
                },
                purchaseRequest: {
                    include: {
                        user: true,
                        products: true,
                        suppliers: true,
                    },
                },
            },
            orderBy: {
                id: 'desc',
            },
        });
        const ordersWithSuppliers = orders.map(order => ({
            ...order,
            suppliers: [],
            customer: [],
        }));
        if (ordersWithSuppliers.length === 0) {
            throw new Error(`No orders found for supplier with ID ${supplierId}`);
        }
        return ordersWithSuppliers;
    }
    async getApprovedOrderByCustomerId(customerId) {
        const orders = await this.prisma.order.findMany({
            where: {
                customerId,
                status: 'approved'
            },
            include: {
                orderDetails: {
                    include: {
                        product: true,
                    },
                },
                purchaseRequest: {
                    include: {
                        user: true,
                        products: true,
                        suppliers: true,
                    },
                },
            },
            orderBy: {
                id: 'desc',
            },
        });
        const ordersWithSuppliers = orders.map(order => ({
            ...order,
            suppliers: [],
            purchaseRequests: [],
            customer: [],
        }));
        if (ordersWithSuppliers.length === 0) {
            throw new Error(`No orders found for customer with ID ${customerId}`);
        }
        return ordersWithSuppliers;
    }
    async getOrderByCustomerId(customerId) {
        const orders = await this.prisma.order.findMany({
            where: { customerId },
            include: {
                orderDetails: {
                    include: {
                        product: true,
                    },
                },
                purchaseRequest: {
                    include: {
                        user: true,
                        products: true,
                        suppliers: true,
                    },
                },
            },
            orderBy: {
                id: 'desc',
            },
        });
        const ordersWithSuppliers = orders.map(order => ({
            ...order,
            suppliers: [],
            purchaseRequests: [],
            customer: [],
        }));
        if (ordersWithSuppliers.length === 0) {
            throw new Error(`No orders found for customer with ID ${customerId}`);
        }
        return ordersWithSuppliers;
    }
    async updateOrder(id, status) {
        const updatedOrder = await this.prisma.order.update({
            where: { id },
            data: { status: status },
            include: {
                orderDetails: {
                    include: {
                        product: true,
                    },
                },
                purchaseRequest: {
                    include: {
                        user: true,
                        products: true,
                        suppliers: true,
                    },
                },
            },
        });
        const orderWithSuppliers = {
            ...updatedOrder,
            suppliers: [],
            customer: [],
        };
        const notification = await this.prisma.notification.create({
            data: {
                type: 'order',
                message: 'A new order  has been created.',
                recipientId: 1,
                status: "new"
            },
        });
        return orderWithSuppliers;
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
    async countOrderByStatus(status, userId) {
        const orders = async () => {
            try {
                const count = await this.prisma.order.count({
                    where: {
                        status: status,
                        customerId: userId
                    }
                });
                return count;
            }
            catch (error) {
                throw new Error('An error occurred while counting products.');
            }
        };
        return orders();
    }
    async countOAllrderByStatus(status) {
        const orders = async () => {
            try {
                const count = await this.prisma.order.count({
                    where: {
                        status: status,
                    }
                });
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
    __metadata("design:paramtypes", [generateReferenceNumber_1.ReferenceNumberGeneratorService])
], OrderService);
//# sourceMappingURL=order.service.js.map