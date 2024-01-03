import { CreateOrderDetailInput } from "./create.order";
export declare class UpdateOrderInput {
    id: number;
    customerId: number;
    supplierId: number;
    orderDetails: CreateOrderDetailInput[];
    totalPrice: number;
    shippingCost: number;
    tax: number;
    status: string;
    createdAt: Date;
}
