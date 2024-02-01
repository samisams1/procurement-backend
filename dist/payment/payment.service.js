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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const generateReferenceNumber_1 = require("./generateReferenceNumber");
let PaymentService = class PaymentService {
    constructor(referenceNumberGeneratorService) {
        this.referenceNumberGeneratorService = referenceNumberGeneratorService;
        this.prisma = new client_1.PrismaClient();
    }
    async createPayment(paymentData) {
        const referenceNumber = this.referenceNumberGeneratorService.generateReferenceNumber();
        const status = "paid";
        const paymentWithReference = {
            ...paymentData,
            status,
        };
        const createdPayment = await this.prisma.payment.create({
            data: paymentWithReference,
            include: {
                user: true,
            },
        });
        await this.prisma.order.update({
            where: { id: paymentWithReference.orderId },
            data: { status: 'paid' },
        });
        await this.prisma.notification.create({
            data: {
                type: 'payment',
                message: 'A new payment is made .',
                recipientId: 3,
                status: "new"
            },
        });
        return createdPayment;
    }
    async getAllPayments() {
        {
            return this.prisma.payment.findMany({
                include: {
                    user: true,
                }
            });
        }
    }
    async getAllPayment(id) {
        return this.prisma.payment.findMany({
            where: {
                id: id
            },
            include: {
                user: true,
                order: {
                    include: {
                        orderDetails: true,
                    }
                }
            },
        });
    }
    async countPaymentBystatus(status) {
        const paymnts = async () => {
            try {
                const count = await this.prisma.payment.count({
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
        return paymnts();
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [generateReferenceNumber_1.ReferenceNumberGeneratorService])
], PaymentService);
//# sourceMappingURL=payment.service.js.map