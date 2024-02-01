"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseRequestModule = void 0;
const common_1 = require("@nestjs/common");
const purchase_request_service_1 = require("./purchase-request.service");
const purchase_request_resolver_1 = require("./purchase-request.resolver");
const generateReferenceNumber_1 = require("./generateReferenceNumber");
let PurchaseRequestModule = class PurchaseRequestModule {
};
exports.PurchaseRequestModule = PurchaseRequestModule;
exports.PurchaseRequestModule = PurchaseRequestModule = __decorate([
    (0, common_1.Module)({
        providers: [purchase_request_service_1.PurchaseRequestService, purchase_request_resolver_1.PurchaseRequestResolver, generateReferenceNumber_1.ReferenceNumberGeneratorService,]
    })
], PurchaseRequestModule);
//# sourceMappingURL=purchase-request.module.js.map