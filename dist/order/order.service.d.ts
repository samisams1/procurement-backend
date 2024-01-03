import { Order, OrderDetail } from './order.entity';
import { CreateOrderInput } from './Dto/create.order';
export declare class OrderService {
    private prisma;
    constructor();
    createOrder(input: CreateOrderInput): Promise<Order>;
    getAllOrders(): Promise<Order[]>;
    getOrderById(id: number): Promise<Order>;
    getOrderDetailByOrderId(orderId: number): Promise<OrderDetail[]>;
    getOrderBySupplierId(supplierId: number): Promise<Order[]>;
    getOrderByCustomerId(customerId: number): Promise<Order[]>;
    updateOrder(id: number, status: string): Promise<Order>;
    countOrder(): Promise<number>;
}
