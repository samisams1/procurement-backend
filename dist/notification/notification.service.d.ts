import { PubSub } from 'graphql-subscriptions';
import { NotificationUpdate } from './Dto/update.notification';
export declare class NotificationService {
    pubSub: PubSub;
    private prisma;
    constructor();
    createNotification(notificationData: any): Promise<{
        id: number;
        type: string;
        message: string;
        recipientId: number;
        timestamp: Date;
        status: string;
    }>;
    getNotificationById(notificationId: any): Promise<{
        id: number;
        type: string;
        message: string;
        recipientId: number;
        timestamp: Date;
        status: string;
    }>;
    countNotifications(): Promise<number>;
    getAllNotifications(): Promise<{
        id: number;
        type: string;
        message: string;
        recipientId: number;
        timestamp: Date;
        status: string;
    }[]>;
    deleteNotification(notificationId: any): Promise<{
        id: number;
        type: string;
        message: string;
        recipientId: number;
        timestamp: Date;
        status: string;
    }>;
    updateotification(id: number): Promise<NotificationUpdate>;
}
