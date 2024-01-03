import { product } from 'src/product/product.entity';
import { User } from 'src/users/entities/user.entity';
export declare class purchaseRequest {
    id: number;
    user: User;
    products: product[];
    createdAt: Date;
    status: String;
    suppliers: {
        id: number;
        userId: number;
    }[];
}
