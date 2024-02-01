import { ReportService } from "src/report/report.service";
export declare class ReportResolver {
    private readonly reportService;
    constructor(reportService: ReportService);
    monthlyReport(): Promise<{
        month: string;
        amount: number;
    }[]>;
}
