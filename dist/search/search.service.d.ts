import { PurchaseRequest } from '@prisma/client';
import { Order } from 'src/order/order.entity';
import { purchaseRequest } from 'src/purchase-request/purchase-request.entity';
export declare class SearchService {
    private prisma;
    constructor();
    searchOrders(query: string): Promise<Order[]>;
    searchPurchaseRequest(query: string): Promise<PurchaseRequest[]>;
    searchPurcshaseRequest(id: number): Promise<purchaseRequest | null>;
}
