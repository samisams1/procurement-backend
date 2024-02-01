import { supplier } from './supplier.entity';
export declare class SupplierService {
    private prisma;
    constructor();
    suppliers(): Promise<({
        user: {
            id: number;
            username: string;
            firstName: string;
            lastName: string;
            phoneNumber: string;
            address: string;
            email: string;
            password: string;
            role: import(".prisma/client").$Enums.RoleEnum;
            createdAt: Date;
            updatedAt: Date;
            roleId: number;
            status: import(".prisma/client").$Enums.Status;
            isVerified: boolean;
            resetPasswordToken: string;
        };
    } & {
        id: number;
        userId: number;
        name: string;
        categoryId: number;
    })[]>;
    getSuppliersByCategoryId(categoryId: number): Promise<supplier[]>;
}
