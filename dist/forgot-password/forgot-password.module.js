"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPasswordModule = void 0;
const common_1 = require("@nestjs/common");
const forgot_password_service_1 = require("./forgot-password.service");
const forgot_password_resolver_1 = require("./forgot-password.resolver");
const mailer_service_1 = require("../mailer/mailer.service");
let ForgotPasswordModule = class ForgotPasswordModule {
};
exports.ForgotPasswordModule = ForgotPasswordModule;
exports.ForgotPasswordModule = ForgotPasswordModule = __decorate([
    (0, common_1.Module)({
        providers: [forgot_password_service_1.ForgotPasswordService, forgot_password_resolver_1.ForgotPasswordResolver, mailer_service_1.MailerService]
    })
], ForgotPasswordModule);
//# sourceMappingURL=forgot-password.module.js.map