export declare class CreateQuotationInput {
    supplierId: number;
    customerId: number;
    shippingPrice: number;
    productPrices: ProductPriceInput[];
    status: string;
}
export declare class ProductPriceInput {
    productId: number;
    price: number;
}
