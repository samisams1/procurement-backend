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
exports.QuotationService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let QuotationService = class QuotationService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async getAllQuotations() {
        try {
            const quotations = await this.prisma.quotation.findMany({
                include: {
                    supplier: true,
                    productPrices: {
                        include: {
                            product: true,
                        },
                    },
                },
            });
            const formattedQuotations = quotations.map((quotation) => {
                const { productPrices, ...quotationData } = quotation;
                const products = productPrices.map((productPrice) => ({
                    id: productPrice.product.id,
                    title: productPrice.product.title,
                    price: productPrice.price,
                }));
                return {
                    ...quotationData,
                    productPrices,
                    products,
                };
            });
            return formattedQuotations;
        }
        catch (error) {
            console.error('Error retrieving quotations:', error);
            return [];
        }
    }
    async getQuotationById(id) {
        try {
            const quotation = await this.prisma.quotation.findUnique({
                where: {
                    id: id,
                },
                include: {
                    supplier: true,
                    productPrices: {
                        include: {
                            product: true,
                        },
                    },
                },
            });
            if (!quotation) {
                return null;
            }
            const formattedQuotation = {
                ...quotation,
                productPrices: quotation.productPrices.map((productPrice) => ({
                    id: productPrice.id,
                    productId: productPrice.product.id,
                    product: productPrice.product,
                    price: productPrice.price,
                })),
            };
            return formattedQuotation;
        }
        catch (error) {
            console.error(`Error retrieving quotation with ID ${id}:`, error);
            return null;
        }
    }
    async createQuotation(createQuotationDto) {
        const { supplierId, customerId, productPrices, shippingPrice, status } = createQuotationDto;
        try {
            const quotation = await this.prisma.quotation.create({
                data: {
                    supplier: { connect: { id: supplierId } },
                    customer: { connect: { id: customerId } },
                    createdAt: new Date(),
                    status: status,
                    shippingPrice,
                    productPrices: {
                        create: productPrices.map((productPrice) => ({
                            price: productPrice.price,
                            product: { connect: { id: productPrice.productId } },
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
            return quotation;
        }
        catch (error) {
            throw new Error(`Failed to create quotation. ${error.message}`);
        }
    }
};
exports.QuotationService = QuotationService;
exports.QuotationService = QuotationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], QuotationService);
//# sourceMappingURL=quotation.service.js.map