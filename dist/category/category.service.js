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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let CategoryService = class CategoryService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async categories() {
        return this.prisma.category.findMany({
            include: {
                suppliers: true
            }
        });
    }
    async createCategory(input) {
        try {
            const { name } = input;
            const existingCategory = await this.prisma.category.findUnique({ where: { name } });
            if (existingCategory) {
                throw new Error('Category already exists');
            }
            const category = await this.prisma.category.create({
                data: { name },
            });
            return category;
        }
        catch (error) {
            throw error.message;
        }
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CategoryService);
//# sourceMappingURL=category.service.js.map