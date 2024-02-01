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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPasswordResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const forgot_password_service_1 = require("./forgot-password.service");
const ForgotPasswordInput_1 = require("./dto/ForgotPasswordInput");
let ForgotPasswordResolver = class ForgotPasswordResolver {
    constructor(forgotPasswordService) {
        this.forgotPasswordService = forgotPasswordService;
    }
    async forgotPassword(input) {
        await this.forgotPasswordService.initiatePasswordReset(input.email);
        return true;
    }
};
exports.ForgotPasswordResolver = ForgotPasswordResolver;
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ForgotPasswordInput_1.ForgotPasswordInput]),
    __metadata("design:returntype", Promise)
], ForgotPasswordResolver.prototype, "forgotPassword", null);
exports.ForgotPasswordResolver = ForgotPasswordResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [forgot_password_service_1.ForgotPasswordService])
], ForgotPasswordResolver);
//# sourceMappingURL=forgot-password.resolver.js.map