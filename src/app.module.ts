import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
//import { CategoryResolver } from './category/category.resolver';
//import { CategoryModule } from './category/category.module';
import { NotificationModule } from './notification/notification.module';
import { PubSub } from 'graphql-subscriptions';
import { ReportModule } from './report/report.module';
import { PurchaseRequestModule } from './purchase-request/purchase-request.module';
import { SupplierModule } from './supplier/supplier.module';
//import { InvoiceService } from './invoice/invoice.service';
//import { InvoiceResolver } from './invoice/invoice.resolver';
//import { InvoiceModule } from './invoice/invoice.module';
import { ProductModule } from './product/product.module';
import { QuotationModule } from './quotation/quotation.module';
import { OrderModule } from './order/order.module';
import { CategoryModule } from './category/category.module';
import { ShippingModule } from './shipping/shipping.module';
import { PaymentModule } from './payment/payment.module';
import { InvoiceModule } from './invoice/invoice.module';
import { SearchModule } from './search/search.module';
import { VerificationService } from './verification/verification.service';
import { VerificationModule } from './verification/verification.module';
import { MailerModule } from './mailer/mailer.module';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers: true,
      sortSchema: true,
      context: ({ req }: { req: Express.Request }) => ({ req }),
    }),
    UsersModule,
    AuthModule,
   // CategoryModule,
    //CategoryModule,
    NotificationModule,
    ReportModule,
    PurchaseRequestModule,
    SupplierModule,
    ProductModule,
    QuotationModule,
    OrderModule,
    CategoryModule,
    ShippingModule,
    PaymentModule,
    InvoiceModule,
    SearchModule,
    VerificationModule,
    MailerModule,
    ForgotPasswordModule,
   // InvoiceModule,
  ],
  controllers: [],
  providers: [PrismaService,PubSub, VerificationService],
})
export class AppModule {}
