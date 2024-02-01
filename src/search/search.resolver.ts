import { Args, Query, Resolver } from '@nestjs/graphql';
import { SearchService } from './search.service';
import { Order } from 'src/order/order.entity';
import { purchaseRequest } from 'src/purchase-request/purchase-request.entity';

@Resolver()
export class SearchResolver {
  constructor(private searchService: SearchService) {}

  @Query(() => [Order])
  async searchOrders(@Args('query') query: string): Promise<Order[]> {
    return this.searchService.searchOrders(query);
  }

  @Query(() => [Order])
  async searchPurchaseRequests(@Args('query') query: string) {
    return this.searchService.searchPurchaseRequest(query);
  }


}
