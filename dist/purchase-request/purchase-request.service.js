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
let PurchaseRequestService = class PurchaseRequestService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
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
                            userId: id
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
    async getAllPurchaseRequests() {
        try {
            const purchaseRequests = await this.prisma.purchaseRequest.findMany({
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
            return purchaseRequests;
        }
        catch (error) {
            console.error('Error retrieving purchase requests:', error);
            return [];
        }
    }
    async createPurchaseRequest(createPurchaseRequestDto) {
        const { userId, products, suppliers, status } = createPurchaseRequestDto;
        try {
            const purchaseRequest = await this.prisma.purchaseRequest.create({
                data: {
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    userId,
                    status: status,
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
            return purchaseRequest;
        }
        catch (error) {
            throw new Error('Failed to create purchase request.');
        }
    }
};
exports.PurchaseRequestService = PurchaseRequestService;
exports.PurchaseRequestService = PurchaseRequestService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PurchaseRequestService);
//# sourceMappingURL=purchase-request.service.js.map