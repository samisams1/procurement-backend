export declare class Order {
    id: number;
    customerId: number;
    supplierId: number;
    orderDetails: OrderDetail[];
    totalPrice: number;
    tax: number;
    status: string;
    shippingCost: number;
    createdAt: Date;
}
export declare class OrderDetail {
    id: number;
    orderId: number;
    title: string;
    price: number;
    quantity: number;
}
