import { Order } from 'src/order/order.entity';
import { User } from 'src/users/entities/user.entity';
export declare class Payment {
    id: number;
    user: User;
    order: Order;
    amount: number;
    paidAt: Date;
    paymentMethod: string;
    referenceNumber: string;
    status: string;
}
