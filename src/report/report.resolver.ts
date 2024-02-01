import { Query, Resolver } from "@nestjs/graphql";
import { MonthlyReport } from "src/report/monthlyReport.entity";
import { ReportService } from "src/report/report.service";

@Resolver()
export class ReportResolver {
  constructor(private readonly reportService: ReportService) {}

  @Query(() => [MonthlyReport]) // <-- Update the return type here
  async monthlyReport() {
    return this.reportService.MonthlyReport();
  }
}