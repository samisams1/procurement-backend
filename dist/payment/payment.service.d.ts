import { PaymentCreateInput } from './Dto/create.payment.input';
import { ReferenceNumberGeneratorService } from './generateReferenceNumber';
export declare class PaymentService {
    private referenceNumberGeneratorService;
    private prisma;
    constructor(referenceNumberGeneratorService: ReferenceNumberGeneratorService);
    createPayment(paymentData: PaymentCreateInput): Promise<{
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
        amount: number;
        paidAt: Date;
        paymentMethod: string;
        userId: number;
        orderId: number;
        status: string;
        referenceNumber: string;
        fullName: string;
    }>;
    getAllPayments(): Promise<({
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
        amount: number;
        paidAt: Date;
        paymentMethod: string;
        userId: number;
        orderId: number;
        status: string;
        referenceNumber: string;
        fullName: string;
    })[]>;
    getAllPayment(id: number): Promise<({
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
            orderDetails: {
                id: number;
                orderId: number;
                title: string;
                price: number;
                quantity: number;
                productId: number;
                createdAt: Date;
                updatedAt: Date;
            }[];
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
        amount: number;
        paidAt: Date;
        paymentMethod: string;
        userId: number;
        orderId: number;
        status: string;
        referenceNumber: string;
        fullName: string;
    })[]>;
    countPaymentBystatus(status: string): Promise<number>;
}
