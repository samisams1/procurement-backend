import { CreateOrderInput } from 'src/order/Dto/create.order';
import { CreateUserInput } from 'src/users/dto/create-user.input';
export declare class ShippingCreateInput {
    orderId: number;
    address: string;
    userId: number;
    order: CreateOrderInput;
    user: CreateUserInput;
}
