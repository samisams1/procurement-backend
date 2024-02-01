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
exports.ReportService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let ReportService = class ReportService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async MonthlyReport() {
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const monthlyReports = [];
        for (let month = 1; month <= 12; month++) {
            const startDate = new Date(`2022-${month}-01`);
            const tempDate = new Date(startDate);
            tempDate.setMonth(tempDate.getMonth() + 1);
            const endDate = new Date(tempDate.getFullYear(), tempDate.getMonth(), 1);
            const payments = await this.prisma.payment.findMany({
                where: {
                    paidAt: {
                        gte: startDate.toISOString(),
                        lt: endDate.toISOString(),
                    },
                },
            });
            const totalAmount = payments.reduce((total, payment) => total + payment.amount, 0);
            monthlyReports.push({
                month: monthNames[month - 1],
                amount: totalAmount,
            });
        }
        return monthlyReports;
    }
};
exports.ReportService = ReportService;
exports.ReportService = ReportService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ReportService);
//# sourceMappingURL=report.service.js.map