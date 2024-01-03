export declare class ProductService {
    private prisma;
    constructor();
    products(): Promise<{
        id: number;
        title: string;
        requestId: number;
    }[]>;
}
