export declare class ProductService {
    private prisma;
    constructor();
    products(): Promise<{
        id: number;
        title: string;
        code: string;
        partNumber: string;
        uom: string;
        quantity: number;
        mark: string;
        Description: string;
        manufacturer: string;
        model: string;
        requestId: number;
    }[]>;
}
