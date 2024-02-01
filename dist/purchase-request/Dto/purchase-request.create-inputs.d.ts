export declare class CreatePurchaseRequestInput {
    userId: number;
    products: CreateProductInput[];
    suppliers: CreateSupplierInput[];
    status: string;
    remark?: string;
    addressDetail?: string;
    estimatedDelivery?: string;
    selectedType?: string;
}
export declare class CreateProductInput {
    title: string;
    quotation?: string;
    code: string;
    partNumber: string;
    uom: string;
    quantity: number;
    mark?: string;
    Description?: string;
    manufacturer?: string;
    model?: string;
}
export declare class CreateSupplierInput {
    id: number;
}
