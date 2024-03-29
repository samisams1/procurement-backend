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
Object.defineProperty(exports, "__esModule", { value: true });
exports.product = void 0;
const graphql_1 = require("@nestjs/graphql");
let product = class product {
};
exports.product = product;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], product.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], product.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], product.prototype, "code", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], product.prototype, "partNumber", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], product.prototype, "uom", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], product.prototype, "quantity", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], product.prototype, "mark", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], product.prototype, "Description", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], product.prototype, "manufacturer", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], product.prototype, "model", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], product.prototype, "status", void 0);
exports.product = product = __decorate([
    (0, graphql_1.ObjectType)()
], product);
//# sourceMappingURL=product.entity.js.map