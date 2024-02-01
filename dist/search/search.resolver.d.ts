import { SearchService } from './search.service';
import { Order } from 'src/order/order.entity';
export declare class SearchResolver {
    private searchService;
    constructor(searchService: SearchService);
    searchOrders(query: string): Promise<Order[]>;
    searchPurchaseRequests(query: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        status: string;
        remark: string;
        addressDetail: string;
        estimatedDelivery: string;
        imageUrl: string;
        referenceNumber: string;
    }[]>;
}
