import { User } from 'src/users/entities/user.entity';
export declare class SendNotificationInput {
    recipientId: number;
    soundUrl: string;
    type: String;
    recipient: User;
    timestamp: Date;
}
export declare class Notification {
    id: number;
    recipientId: number;
    message: string;
    soundUrl: string;
    status: string;
    type: string;
}
