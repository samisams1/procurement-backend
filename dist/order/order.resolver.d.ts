import { Order, OrderDetail } from './order.entity';
import { CreateOrderInput } from './Dto/create.order';
import { OrderService } from './order.service';
export declare class OrderResolver {
    private readonly orderService;
    constructor(orderService: OrderService);
    createOrder(input: CreateOrderInput): Promise<Order>;
    orders(): Promise<Order[]>;
    getOrderDetailByOrderId(id: number): Promise<OrderDetail[]>;
    getOrderById(id: number): Promise<Order>;
    getOrderBySupplierId(supplierId: number): Promise<Order[]>;
    getOrderByCustomerId(customerId: number): Promise<Order[]>;
    updateOrder(id: number, status: string): Promise<Order>;
    countOrders(): Promise<number>;
}
