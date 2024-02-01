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
exports.ForgotPasswordService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const mailer_service_1 = require("../mailer/mailer.service");
const crypto_1 = require("crypto");
let ForgotPasswordService = class ForgotPasswordService {
    constructor(mailService) {
        this.mailService = mailService;
        this.prisma = new client_1.PrismaClient();
    }
    async initiatePasswordReset(email) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new Error('User not found');
        }
        const resetToken = this.generateResetToken();
        const resetUrl = this.generateResetUrl(email, resetToken);
        await this.prisma.passwordReset.create({
            data: {
                userId: user.id.toString(),
                token: resetToken,
                expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
            },
        });
        await this.mailService.sendNewEmail(email, resetUrl);
    }
    generateResetToken() {
        const tokenLength = 32;
        const token = (0, crypto_1.randomBytes)(tokenLength).toString('hex');
        return token;
    }
    generateResetUrl(email, token) {
        const baseUrl = 'http://localhost:3000/reset-password';
        const resetUrl = `${baseUrl}?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`;
        return resetUrl;
    }
};
exports.ForgotPasswordService = ForgotPasswordService;
exports.ForgotPasswordService = ForgotPasswordService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_service_1.MailerService])
], ForgotPasswordService);
//# sourceMappingURL=forgot-password.service.js.map