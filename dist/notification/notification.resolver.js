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
exports.NotificationResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const notification_service_1 = require("./notification.service");
const notification_dto_1 = require("./Dto/notification.dto");
const createNotificationInput_1 = require("./Dto/createNotificationInput");
let NotificationResolver = class NotificationResolver {
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    notification() {
        return this.notificationService.pubSub.asyncIterator('notification');
    }
    async notitfications() {
        return this.notificationService.getAllNotifications();
    }
    async countNotifications() {
        const count = await this.notificationService.countNotifications();
        return count;
    }
    async createNotification(input) {
        return this.notificationService.createNotification(input);
    }
    async updateNotification(id) {
        try {
            const updateNotification = await this.notificationService.updateotification(id);
            return updateNotification;
        }
        catch (error) {
            throw new Error('Failed to update notification');
        }
    }
};
exports.NotificationResolver = NotificationResolver;
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, graphql_1.Subscription)(() => notification_dto_1.Notification),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], NotificationResolver.prototype, "notification", null);
__decorate([
    (0, graphql_1.Query)(() => [notification_dto_1.Notification]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificationResolver.prototype, "notitfications", null);
__decorate([
    (0, graphql_1.Query)(() => graphql_1.Int),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificationResolver.prototype, "countNotifications", null);
__decorate([
    (0, graphql_1.Mutation)(() => notification_dto_1.Notification),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createNotificationInput_1.NotificationInput]),
    __metadata("design:returntype", Promise)
], NotificationResolver.prototype, "createNotification", null);
__decorate([
    (0, graphql_1.Mutation)(() => notification_dto_1.Notification),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NotificationResolver.prototype, "updateNotification", null);
exports.NotificationResolver = NotificationResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [notification_service_1.NotificationService])
], NotificationResolver);
//# sourceMappingURL=notification.resolver.js.map