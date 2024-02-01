"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const path_1 = require("path");
const users_module_1 = require("./users/users.module");
const prisma_service_1 = require("./prisma/prisma.service");
const auth_module_1 = require("./auth/auth.module");
const notification_module_1 = require("./notification/notification.module");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const report_module_1 = require("./report/report.module");
const purchase_request_module_1 = require("./purchase-request/purchase-request.module");
const supplier_module_1 = require("./supplier/supplier.module");
const product_module_1 = require("./product/product.module");
const quotation_module_1 = require("./quotation/quotation.module");
const order_module_1 = require("./order/order.module");
const category_module_1 = require("./category/category.module");
const shipping_module_1 = require("./shipping/shipping.module");
const payment_module_1 = require("./payment/payment.module");
const invoice_module_1 = require("./invoice/invoice.module");
const search_module_1 = require("./search/search.module");
const verification_service_1 = require("./verification/verification.service");
const verification_module_1 = require("./verification/verification.module");
const mailer_module_1 = require("./mailer/mailer.module");
const forgot_password_module_1 = require("./forgot-password/forgot-password.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: (0, path_1.join)(process.cwd(), 'src/schema.gql'),
                installSubscriptionHandlers: true,
                sortSchema: true,
                context: ({ req }) => ({ req }),
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            notification_module_1.NotificationModule,
            report_module_1.ReportModule,
            purchase_request_module_1.PurchaseRequestModule,
            supplier_module_1.SupplierModule,
            product_module_1.ProductModule,
            quotation_module_1.QuotationModule,
            order_module_1.OrderModule,
            category_module_1.CategoryModule,
            shipping_module_1.ShippingModule,
            payment_module_1.PaymentModule,
            invoice_module_1.InvoiceModule,
            search_module_1.SearchModule,
            verification_module_1.VerificationModule,
            mailer_module_1.MailerModule,
            forgot_password_module_1.ForgotPasswordModule,
        ],
        controllers: [],
        providers: [prisma_service_1.PrismaService, graphql_subscriptions_1.PubSub, verification_service_1.VerificationService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map