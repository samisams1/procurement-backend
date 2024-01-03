import { PurchaseRequestService } from './purchase-request.service';
import { PurchaseRequest } from '@prisma/client';
import { CreatePurchaseRequestInput } from './Dto/purchase-request.create-inputs';
export declare class PurchaseRequestResolver {
    private purchaseRequestService;
    private prisma;
    constructor(purchaseRequestService: PurchaseRequestService);
    createPurchaseRequest(createPurchaseRequestInput: CreatePurchaseRequestInput): Promise<PurchaseRequest>;
    purchaseRequest(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        status: string;
    }>;
    purchaseRequestBySupplier(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        status: string;
    }[]>;
    purchaseRequests(): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        status: string;
    }[]>;
}
