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
exports.MailerService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
let MailerService = class MailerService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            secureConnectio: false,
            auth: {
                user: 'forsamisams@gmail.com',
                pass: 'hpjx gotb xxmt iouf',
            },
        });
    }
    async sendVerificationEmail(email, verificationUrl) {
        const mailOptions = {
            from: 'forsamisams@gmail.com',
            to: email,
            subject: 'Email Verification',
            text: `Please click on the following link to verify your email: ${verificationUrl}`,
        };
        await this.transporter.sendMail(mailOptions);
    }
    async sendNewEmail(email, verificationUrl) {
        const mailOptions = {
            from: 'forsamisams@gmail.com',
            to: email,
            subject: 'Email Verification',
            text: `Please click on the following link to verify your email: ${verificationUrl}`,
        };
        await this.transporter.sendMail(mailOptions);
    }
    async sendEmail({ to, subject, body }) {
        const mailOptions = {
            from: 'forsamisams@@gmail.com',
            to,
            subject,
            text: body,
        };
        await this.transporter.sendMail(mailOptions);
    }
};
exports.MailerService = MailerService;
exports.MailerService = MailerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MailerService);
//# sourceMappingURL=mailer.service.js.map