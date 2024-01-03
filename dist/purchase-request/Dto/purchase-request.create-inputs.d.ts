export declare class CreatePurchaseRequestInput {
    userId: number;
    products: CreateProductInput[];
    suppliers: CreateSupplierInput[];
    status: string;
}
export declare class CreateProductInput {
    title: string;
    quotation?: string;
}
export declare class CreateSupplierInput {
    id: number;
}
