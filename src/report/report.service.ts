import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ReportService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async MonthlyReport(): Promise<{ month: string; amount: number }[]> {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const monthlyReports: { month: string; amount: number }[] = [];
    for (let month = 1; month <= 12; month++) {
      const startDate = new Date(`2022-${month}-01`);
      const tempDate = new Date(startDate);
      tempDate.setMonth(tempDate.getMonth() + 1);
      const endDate = new Date(tempDate.getFullYear(), tempDate.getMonth(), 1);

      const payments = await this.prisma.payment.findMany({
        where: {
          paidAt: {
            gte: startDate.toISOString(), // Format as ISO-8601 DateTime
            lt: endDate.toISOString(), // Format as ISO-8601 DateTime
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
}