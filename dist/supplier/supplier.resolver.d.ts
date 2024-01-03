import { SupplierService } from './supplier.service';
export declare class SupplierResolver {
    private supplierService;
    constructor(supplierService: SupplierService);
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
        };
    } & {
        id: number;
        userId: number;
    })[]>;
}
