import { PurchaseRequest } from '@prisma/client';
import { CreatePurchaseRequestInput } from './Dto/purchase-request.create-inputs';
import { ReferenceNumberGeneratorService } from './generateReferenceNumber';
export declare class PurchaseRequestService {
    private referenceNumberGeneratorService;
    private prisma;
    constructor(referenceNumberGeneratorService: ReferenceNumberGeneratorService);
    purchaseRequestsByUSerId(userId: number): Promise<PurchaseRequest[]>;
    purchaseRequestsById(id: number): Promise<PurchaseRequest | null>;
    purchaseRequestsBySupplierId(id: number): Promise<PurchaseRequest[] | null>;
    allPurchaseRequests(): Promise<PurchaseRequest[]>;
    getAllPurchaseRequests(): Promise<PurchaseRequest[]>;
    createPurchaseRequest(createPurchaseRequestDto: CreatePurchaseRequestInput): Promise<PurchaseRequest>;
    coutRequest(): Promise<number>;
    countPurchaseRequestByStatus(status: string, userId: number): Promise<number>;
    countAllRequestBystatus(status: string): Promise<number>;
}
