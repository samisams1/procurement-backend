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
exports.SearchService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let SearchService = class SearchService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async searchOrders(query) {
        const orders = await this.prisma.order.findMany({
            where: {
                OR: [
                    { referenceNumber: { contains: query } },
                    {},
                ],
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
        const ordersWithSuppliers = orders.map((order) => ({
            ...order,
            suppliers: [],
            customer: [],
        }));
        return ordersWithSuppliers;
    }
    async searchPurchaseRequest(query) {
        try {
            const purchaseRequests = await this.prisma.purchaseRequest.findMany({
                where: {
                    OR: [
                        { referenceNumber: { contains: query } },
                    ],
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
            return purchaseRequests;
        }
        catch (error) {
            console.error('Error retrieving purchase requests:', error);
            return [];
        }
    }
    async searchPurcshaseRequest(id) {
        try {
            const purchaseRequest = await this.prisma.purchaseRequest.findUnique({
                where: { id },
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
};
exports.SearchService = SearchService;
exports.SearchService = SearchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SearchService);
//# sourceMappingURL=search.service.js.map