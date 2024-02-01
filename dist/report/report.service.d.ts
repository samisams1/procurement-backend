export declare class ReportService {
    private prisma;
    constructor();
    MonthlyReport(): Promise<{
        month: string;
        amount: number;
    }[]>;
}
