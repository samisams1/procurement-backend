import { product } from 'src/product/product.entity';
import { purchaseRequest } from 'src/purchase-request/purchase-request.entity';
export declare class Order {
    id: number;
    customerId: number;
    supplierId: number;
    orderDetails: OrderDetail[];
    purchaseRequest: purchaseRequest;
    totalPrice: number;
    tax: number;
    referenceNumber: string;
    status: string;
    shippingCost: number;
    createdAt: Date;
    customer: {
        id: number;
        name: string;
        userId: number;
    }[];
    suppliers: {
        id: number;
        userId: number;
    }[];
}
export declare class OrderDetail {
    id: number;
    orderId: number;
    title: string;
    price: number;
    quantity: number;
    productId: number;
    product: product;
}
