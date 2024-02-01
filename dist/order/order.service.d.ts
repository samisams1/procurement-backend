import { Order, OrderDetail } from './order.entity';
import { CreateOrderInput } from './Dto/create.order';
import { ReferenceNumberGeneratorService } from './generateReferenceNumber';
export declare class OrderService {
    private referenceNumberGeneratorService;
    private prisma;
    constructor(referenceNumberGeneratorService: ReferenceNumberGeneratorService);
    createOrder(input: CreateOrderInput): Promise<Order>;
    getAllOrders(): Promise<Order[]>;
    getOrderById(id: number): Promise<Order>;
    getOrderDetailByOrderId(orderId: number): Promise<OrderDetail[]>;
    getOrderBySupplierId(supplierId: number): Promise<Order[]>;
    getApprovedOrderByCustomerId(customerId: number): Promise<Order[]>;
    getOrderByCustomerId(customerId: number): Promise<Order[]>;
    updateOrder(id: number, status: string): Promise<Order>;
    countOrder(): Promise<number>;
    countOrderByStatus(status: string, userId: number): Promise<number>;
    countOAllrderByStatus(status: string): Promise<number>;
}
