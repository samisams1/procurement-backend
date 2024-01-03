export declare class CreateOrderDetailInput {
    title: string;
    price: number;
    quantity: number;
}
export declare class CreateOrderInput {
    customerId: number;
    supplierId: number;
    orderDetails: CreateOrderDetailInput[];
    totalPrice: number;
    tax: number;
    status: string;
    shippingCost: number;
}
