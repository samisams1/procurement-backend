import { product } from 'src/product/product.entity';
import { purchaseRequest } from 'src/purchase-request/purchase-request.entity';
export declare class Quotation {
    id: number;
    supplierId: number;
    customerId: number;
    productPrices: ProductPrice[];
    supplier: {
        id: number;
        userId: number;
        name: string;
        categoryId: number;
    };
    status: string;
    shippingPrice: number;
    purchaseRequestId: number;
    purchaseRequests?: purchaseRequest[];
    createdAt: Date;
}
export declare class ProductPrice {
    id: number;
    productId: number;
    price: number;
    product: product;
}
