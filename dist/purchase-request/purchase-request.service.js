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
exports.PurchaseRequestService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const generateReferenceNumber_1 = require("./generateReferenceNumber");
let PurchaseRequestService = class PurchaseRequestService {
    constructor(referenceNumberGeneratorService) {
        this.referenceNumberGeneratorService = referenceNumberGeneratorService;
        this.prisma = new client_1.PrismaClient();
    }
    async purchaseRequestsByUSerId(userId) {
        try {
            const purchaseRequests = await this.prisma.purchaseRequest.findMany({
                where: { userId: userId },
                include: { suppliers: true },
            });
            return purchaseRequests;
        }
        catch (error) {
            console.error('Error retrieving purchase requests:', error);
            return [];
        }
    }
    async purchaseRequestsById(id) {
        try {
            const purchaseRequest = await this.prisma.purchaseRequest.findUnique({
                where: {
                    id: id,
                },
                include: {
                    user: true,
                    products: true,
                    suppliers: {
                        include: {
                            user: true,
                        },
                    },
                },
            });
            return purchaseRequest;
        }
        catch (error) {
            console.error('Error retrieving purchase request:', error);
            return null;
        }
    }
    async purchaseRequestsBySupplierId(id) {
        try {
            const purchaseRequests = await this.prisma.purchaseRequest.findMany({
                where: {
                    suppliers: {
                        some: {
                            userId: 3
                        }
                    }
                },
                include: {
                    user: true,
                    products: true,
                    suppliers: {
                        include: {
                            user: true
                        }
                    }
                },
                orderBy: {
                    id: 'desc'
                }
            });
            return purchaseRequests;
        }
        catch (error) {
            console.error('Error retrieving purchase requests:', error);
            return null;
        }
    }
    async allPurchaseRequests() {
        try {
            const purchaseRequests = await this.prisma.purchaseRequest.findMany({
                include: {
                    user: true,
                    products: true,
                    suppliers: {
                        include: {
                            user: true,
                            category: true
                        },
                    },
                },
                orderBy: {
                    id: 'desc',
                },
            });
            return purchaseRequests;
        }
        catch (error) {
            console.error('Error retrieving purchase requests:', error);
            return [];
        }
    }
    async getAllPurchaseRequests() {
        try {
            const purchaseRequests = await this.prisma.purchaseRequest.findMany({
                include: {
                    user: true,
                    products: true,
                    suppliers: {
                        include: {
                            user: true,
                            category: true
                        },
                    },
                },
                orderBy: {
                    id: 'desc',
                },
            });
            return purchaseRequests;
        }
        catch (error) {
            console.error('Error retrieving purchase requests:', error);
            return [];
        }
    }
    async createPurchaseRequest(createPurchaseRequestDto) {
        const { userId, products, suppliers, status, remark, addressDetail, estimatedDelivery, selectedType } = createPurchaseRequestDto;
        if (selectedType === "supplier") {
            try {
                const referenceNumber = this.referenceNumberGeneratorService.generateReferenceNumber();
                const purchaseRequest = await this.prisma.purchaseRequest.create({
                    data: {
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        userId,
                        status,
                        remark,
                        estimatedDelivery,
                        addressDetail,
                        referenceNumber,
                        products: {
                            create: products.map((product) => ({
                                title: product.title,
                                partNumber: product.partNumber,
                                code: product.code,
                                quantity: product.quantity,
                                model: product.model,
                                uom: product.uom,
                                manufacturer: product.manufacturer,
                                mark: product.mark,
                                Description: product.Description
                            })),
                        },
                        suppliers: {
                            connect: suppliers.map((supplier) => ({ id: supplier.id })),
                        },
                    },
                    include: {
                        user: true,
                        products: true,
                        suppliers: true,
                    },
                });
                for (const supplier of suppliers) {
                    const quotation = await this.prisma.quotation.create({
                        data: {
                            supplier: { connect: { id: supplier.id } },
                            customer: { connect: { id: purchaseRequest.user.id } },
                            createdAt: new Date(),
                            status,
                            purchaseRequest: { connect: { id: purchaseRequest.id } },
                            shippingPrice: 0,
                            productPrices: {
                                create: purchaseRequest.products.map((product) => ({
                                    price: 0,
                                    product: { connect: { id: product.id } },
                                })),
                            },
                        },
                        include: {
                            supplier: true,
                            customer: true,
                            productPrices: {
                                include: {
                                    product: true,
                                },
                            },
                        },
                    });
                }
                const notification = await this.prisma.notification.create({
                    data: {
                        type: 'request',
                        message: 'A new purchase request has been created.',
                        recipientId: userId,
                        status: "new"
                    },
                });
                return purchaseRequest;
            }
            catch (error) {
                throw new Error('Failed to create purchase request.');
            }
        }
        else if (selectedType === "agent") {
            try {
                const referenceNumber = this.referenceNumberGeneratorService.generateReferenceNumber();
                const purchaseRequest = await this.prisma.purchaseRequest.create({
                    data: {
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        userId,
                        status,
                        remark,
                        estimatedDelivery,
                        addressDetail,
                        referenceNumber,
                        products: {
                            create: products.map((product) => ({
                                title: product.title,
                                partNumber: product.partNumber,
                                code: product.code,
                                quantity: product.quantity,
                                model: product.model,
                                uom: product.uom,
                                manufacturer: product.manufacturer,
                                mark: product.mark,
                                Description: product.Description
                            })),
                        },
                        suppliers: {
                            connect: { id: 1 },
                        },
                    },
                    include: {
                        user: true,
                        products: true,
                        suppliers: true,
                    },
                });
                for (const supplier of suppliers) {
                    const quotation = await this.prisma.quotation.create({
                        data: {
                            supplier: { connect: { id: supplier.id } },
                            customer: { connect: { id: purchaseRequest.user.id } },
                            createdAt: new Date(),
                            status,
                            purchaseRequest: { connect: { id: purchaseRequest.id } },
                            shippingPrice: 0,
                            productPrices: {
                                create: purchaseRequest.products.map((product) => ({
                                    price: 0,
                                    product: { connect: { id: product.id } },
                                })),
                            },
                        },
                        include: {
                            supplier: true,
                            customer: true,
                            productPrices: {
                                include: {
                                    product: true,
                                },
                            },
                        },
                    });
                }
                const notification = await this.prisma.notification.create({
                    data: {
                        type: 'request',
                        message: 'A new purchase request has been created.',
                        recipientId: userId,
                        status: "new"
                    },
                });
                return purchaseRequest;
            }
            catch (error) {
                throw new Error('Failed to create purchase request.');
            }
        }
        else if (selectedType === "x-company") {
            try {
                const referenceNumber = this.referenceNumberGeneratorService.generateReferenceNumber();
                const purchaseRequest = await this.prisma.purchaseRequest.create({
                    data: {
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        userId,
                        status,
                        remark,
                        estimatedDelivery,
                        addressDetail,
                        referenceNumber,
                        products: {
                            create: products.map((product) => ({
                                title: product.title,
                                partNumber: product.partNumber,
                                code: product.code,
                                quantity: product.quantity,
                                model: product.model,
                                uom: product.uom,
                                manufacturer: product.manufacturer,
                                mark: product.mark,
                                Description: product.Description
                            })),
                        },
                        suppliers: {
                            connect: { id: 1 },
                        },
                    },
                    include: {
                        user: true,
                        products: true,
                        suppliers: true,
                    },
                });
                const quotation = await this.prisma.quotation.create({
                    data: {
                        supplier: { connect: { id: 5 } },
                        customer: { connect: { id: purchaseRequest.user.id } },
                        createdAt: new Date(),
                        status,
                        purchaseRequest: { connect: { id: purchaseRequest.id } },
                        shippingPrice: 0,
                        productPrices: {
                            create: purchaseRequest.products.map((product) => ({
                                price: 0,
                                product: { connect: { id: product.id } },
                            })),
                        },
                    },
                    include: {
                        supplier: true,
                        customer: true,
                        productPrices: {
                            include: {
                                product: true,
                            },
                        },
                    },
                });
                const notification = await this.prisma.notification.create({
                    data: {
                        type: 'request',
                        message: 'A new purchase request has been created.',
                        recipientId: 1,
                        status: "new"
                    },
                });
                return purchaseRequest;
            }
            catch (error) {
                throw new Error('Failed to create purchase request.');
            }
        }
    }
    async coutRequest() {
        const orders = async () => {
            try {
                const count = await this.prisma.purchaseRequest.count();
                return count;
            }
            catch (error) {
                throw new Error('An error occurred while counting products.');
            }
        };
        return orders();
    }
    async countPurchaseRequestByStatus(status, userId) {
        const requests = async () => {
            try {
                const count = await this.prisma.purchaseRequest.count({
                    where: {
                        status: status,
                        userId: userId
                    }
                });
                return count;
            }
            catch (error) {
                throw new Error('An error occurred while counting products.');
            }
        };
        return requests();
    }
    async countAllRequestBystatus(status) {
        const requests = async () => {
            try {
                const count = await this.prisma.purchaseRequest.count({
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
        return requests();
    }
};
exports.PurchaseRequestService = PurchaseRequestService;
exports.PurchaseRequestService = PurchaseRequestService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [generateReferenceNumber_1.ReferenceNumberGeneratorService])
], PurchaseRequestService);
//# sourceMappingURL=purchase-request.service.js.map