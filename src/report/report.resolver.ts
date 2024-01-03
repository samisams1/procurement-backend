import { Query, Resolver } from '@nestjs/graphql';
//import { Sale } from '@prisma/client';
import { ReportService } from './report.service';


@Resolver()
export class ReportResolver {
  constructor(private reportService: ReportService) {}
   
 
}