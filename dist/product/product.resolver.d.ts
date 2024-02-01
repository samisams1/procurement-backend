import { ProductService } from './product.service';
export declare class ProductResolver {
    private productService;
    constructor(productService: ProductService);
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
        status: string;
    }[]>;
}
