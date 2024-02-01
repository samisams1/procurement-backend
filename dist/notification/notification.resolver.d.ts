import { NotificationService } from './notification.service';
import { Notification } from './Dto/notification.dto';
import { NotificationUpdate } from './Dto/update.notification';
import { NotificationInput } from './Dto/createNotificationInput';
export declare class NotificationResolver {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    notification(): AsyncIterator<Notification>;
    notitfications(): Promise<{
        id: number;
        type: string;
        message: string;
        recipientId: number;
        timestamp: Date;
        status: string;
    }[]>;
    countNotifications(): Promise<number>;
    createNotification(input: NotificationInput): Promise<{
        id: number;
        type: string;
        message: string;
        recipientId: number;
        timestamp: Date;
        status: string;
    }>;
    updateNotification(id: number): Promise<NotificationUpdate>;
}
