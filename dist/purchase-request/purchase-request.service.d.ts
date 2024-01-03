import { PurchaseRequest } from '@prisma/client';
import { CreatePurchaseRequestInput } from './Dto/purchase-request.create-inputs';
export declare class PurchaseRequestService {
    private prisma;
    constructor();
    purchaseRequestsById(id: number): Promise<PurchaseRequest | null>;
    purchaseRequestsBySupplierId(id: number): Promise<PurchaseRequest[] | null>;
    getAllPurchaseRequests(): Promise<PurchaseRequest[]>;
    createPurchaseRequest(createPurchaseRequestDto: CreatePurchaseRequestInput): Promise<PurchaseRequest>;
}
