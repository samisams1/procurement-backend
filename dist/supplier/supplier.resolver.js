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
exports.SupplierResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const supplier_service_1 = require("./supplier.service");
const supplier_entity_1 = require("./supplier.entity");
let SupplierResolver = class SupplierResolver {
    constructor(supplierService) {
        this.supplierService = supplierService;
    }
    async suppliers() {
        return this.supplierService.suppliers();
    }
    async suppliersByCategoryId(categoryId) {
        return this.supplierService.getSuppliersByCategoryId(categoryId);
    }
};
exports.SupplierResolver = SupplierResolver;
__decorate([
    (0, graphql_1.Query)(() => [supplier_entity_1.supplier]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SupplierResolver.prototype, "suppliers", null);
__decorate([
    (0, graphql_1.Query)(() => [supplier_entity_1.supplier]),
    __param(0, (0, graphql_1.Args)('categoryId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SupplierResolver.prototype, "suppliersByCategoryId", null);
exports.SupplierResolver = SupplierResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [supplier_service_1.SupplierService])
], SupplierResolver);
//# sourceMappingURL=supplier.resolver.js.map