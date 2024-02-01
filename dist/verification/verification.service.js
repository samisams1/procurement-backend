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
exports.VerificationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const crypto = require("crypto");
let VerificationService = class VerificationService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createVerificationToken(userId) {
        const verificationToken = crypto.randomBytes(20).toString('hex');
        const verification = await this.prisma.verification.create({
            data: { token: verificationToken, userId },
        });
        return verificationToken;
    }
    async verifyToken(token) {
        const verification = await this.prisma.verification.findFirst({
            where: { token },
            include: { user: true },
        });
        if (!verification) {
            throw new Error('Invalid verification token');
        }
        await this.prisma.user.update({
            where: { id: verification.userId },
            data: { isVerified: true },
        });
        await this.prisma.verification.delete({
            where: { id: verification.id },
        });
        return verification.user;
    }
};
exports.VerificationService = VerificationService;
exports.VerificationService = VerificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VerificationService);
//# sourceMappingURL=verification.service.js.map