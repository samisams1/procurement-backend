import { ShippingCreateInput } from './Dto/create.shipping.input';
export declare class ShippingService {
    private prisma;
    constructor();
    getAllShippings(): Promise<({
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
        order: {
            supplier: {
                id: number;
                userId: number;
                name: string;
                categoryId: number;
            };
        } & {
            id: number;
            customerId: number;
            supplierId: number;
            totalPrice: number;
            tax: number;
            shippingCost: number;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            referenceNumber: string;
            purchaseRequestId: number;
        };
    } & {
        id: number;
        orderId: number;
        address: string;
        userId: number;
        status: string;
    })[]>;
    getShippingsByUserId(userId: number): Promise<({
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
        order: {
            supplier: {
                id: number;
                userId: number;
                name: string;
                categoryId: number;
            };
        } & {
            id: number;
            customerId: number;
            supplierId: number;
            totalPrice: number;
            tax: number;
            shippingCost: number;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            referenceNumber: string;
            purchaseRequestId: number;
        };
    } & {
        id: number;
        orderId: number;
        address: string;
        userId: number;
        status: string;
    })[]>;
    createShipping(data: ShippingCreateInput): Promise<{
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
        order: {
            id: number;
            customerId: number;
            supplierId: number;
            totalPrice: number;
            tax: number;
            shippingCost: number;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            referenceNumber: string;
            purchaseRequestId: number;
        };
    } & {
        id: number;
        orderId: number;
        address: string;
        userId: number;
        status: string;
    }>;
}
