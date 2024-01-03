import { product } from 'src/product/product.entity';
export declare class Quotation {
    id: number;
    supplierId: number;
    customerId: number;
    productPrices: ProductPrice[];
    status: string;
    shippingPrice: number;
}
export declare class ProductPrice {
    id: number;
    productId: number;
    price: number;
    product: product;
}
