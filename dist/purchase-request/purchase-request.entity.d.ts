import { product } from 'src/product/product.entity';
import { User } from 'src/users/entities/user.entity';
export declare class purchaseRequest {
    id: number;
    user: User;
    referenceNumber: string;
    products: product[];
    createdAt: Date;
    status: String;
    addressDetail: string;
    estimatedDelivery: string;
    remark: string;
    suppliers: {
        id: number;
        userId: number;
    }[];
}
