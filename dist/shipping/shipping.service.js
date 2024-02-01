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
exports.ShippingService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let ShippingService = class ShippingService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async getAllShippings() {
        try {
            const shippings = await this.prisma.shipping.findMany({
                include: {
                    order: {
                        include: {
                            supplier: true,
                        }
                    },
                    user: true,
                }
            });
            return shippings;
        }
        catch (error) {
            console.error('Error retrieving shippings:', error);
            throw new Error('Failed to retrieve shippings');
        }
    }
    async getShippingsByUserId(userId) {
        try {
            const shippings = await this.prisma.shipping.findMany({
                where: {
                    userId: userId
                },
                include: {
                    order: {
                        include: {
                            supplier: true,
                        }
                    },
                    user: true,
                }
            });
            return shippings;
        }
        catch (error) {
            console.error('Error retrieving shippings:', error);
            throw new Error('Failed to retrieve shippings');
        }
    }
    async createShipping(data) {
        const { userId, orderId, address } = data;
        try {
            const shipping = await this.prisma.shipping.create({
                data: {
                    userId,
                    orderId,
                    address,
                },
                include: {
                    order: true,
                    user: true,
                },
            });
            return shipping;
        }
        catch (error) {
            throw new Error('Failed to create shipping.');
        }
    }
};
exports.ShippingService = ShippingService;
exports.ShippingService = ShippingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ShippingService);
//# sourceMappingURL=shipping.service.js.map