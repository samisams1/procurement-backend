import { Order } from 'src/order/order.entity';
import { User } from 'src/users/entities/user.entity';
export declare class Shipping {
    id: number;
    order: Order;
    user: User;
    orderId: number;
    status: string;
    address: string;
}
