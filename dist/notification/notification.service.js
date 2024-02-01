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
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const graphql_subscriptions_1 = require("graphql-subscriptions");
let NotificationService = class NotificationService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
        this.pubSub = new graphql_subscriptions_1.PubSub();
    }
    async createNotification(notificationData) {
        try {
            const notification = await this.prisma.notification.create({
                data: notificationData,
            });
            return notification;
        }
        catch (error) {
            throw new Error(`Failed to create notification: ${error.message}`);
        }
    }
    async getNotificationById(notificationId) {
        try {
            const notification = await this.prisma.notification.findUnique({
                where: { id: notificationId },
            });
            return notification;
        }
        catch (error) {
            throw new Error(`Failed to retrieve notification: ${error.message}`);
        }
    }
    async countNotifications() {
        const orders = async () => {
            try {
                const count = await this.prisma.notification.count({
                    where: {
                        status: "new"
                    }
                });
                return count;
            }
            catch (error) {
                throw new Error('An error occurred while counting products.');
            }
        };
        return orders();
    }
    async getAllNotifications() {
        try {
            const notifications = await this.prisma.notification.findMany();
            return notifications;
        }
        catch (error) {
            throw new Error(`Failed to retrieve notifications: ${error.message}`);
        }
    }
    async deleteNotification(notificationId) {
        try {
            const notification = await this.prisma.notification.delete({
                where: { id: notificationId },
            });
            return notification;
        }
        catch (error) {
            throw new Error(`Failed to delete notification: ${error.message}`);
        }
    }
    async updateotification(id) {
        const updateNotification = await this.prisma.notification.update({
            where: { id },
            data: { status: "seen" },
        });
        return updateNotification;
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], NotificationService);
//# sourceMappingURL=notification.service.js.map