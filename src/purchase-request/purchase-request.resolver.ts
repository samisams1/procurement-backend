import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PurchaseRequestService } from './purchase-request.service';
import { PrismaClient, PurchaseRequest } from '@prisma/client';
import { purchaseRequest } from './purchase-request.entity';
import { CreatePurchaseRequestInput } from './Dto/purchase-request.create-inputs';

@Resolver()
export class PurchaseRequestResolver {

    private prisma :PrismaClient
    constructor(private purchaseRequestService: PurchaseRequestService) {}


   /* constructor(){
        this.prisma = new PrismaClient();
    }*/

   /* @Mutation(() => purchaseRequest)
    async createPurchaseRequest(
      @Args('input') createPurchaseRequestDto: CreatePurchaseRequestInput,
    ): Promise<PurchaseRequest | null> {
      return this.purchaseRequestService.createPurchaseRequest(createPurchaseRequestDto);
    }
*/
/*@Mutation(() => purchaseRequest)
async createPurchaseRequest(
  @Args('input') createPurchaseRequestDto: CreatePurchaseRequestInput,
): Promise<PurchaseRequest | null> {
  const { userId, products, suppliers } = createPurchaseRequestDto;

  try {
    const purchaseRequest = await this.purchaseRequestService.createPurchaseRequest({
      userId,
      products: products.map(product => ({ title: product.title })),
      suppliers: suppliers.map(supplier => ({ id: supplier.id })),
    });

    return purchaseRequest;
  } catch (error) {
    console.error('Error creating purchase request:', error);
    throw new Error('Failed to create purchase request.');
  }
}*/
@Mutation(() => purchaseRequest)
async createPurchaseRequest(
  @Args('input') createPurchaseRequestInput: CreatePurchaseRequestInput,
): Promise<PurchaseRequest> {
  return this.purchaseRequestService.createPurchaseRequest(createPurchaseRequestInput);
}

@Query(() => purchaseRequest)
async purchaseRequest(@Args('id') id: number) {
  return this.purchaseRequestService.purchaseRequestsById(id);
}
@Query(() => [purchaseRequest])
async purchaseRequestsByUSerId(@Args('userId') userId: number) {
  return this.purchaseRequestService.purchaseRequestsByUSerId(userId);
}
@Query(() => [purchaseRequest])
async purchaseRequestBySupplier(@Args('id') id: number) {
  return this.purchaseRequestService.purchaseRequestsBySupplierId(id);
}
// get all 
@Query(()=>[purchaseRequest])
async allPurchaseRequests(){
    return this.purchaseRequestService.allPurchaseRequests();
}
// bellow is all distiict
 @Query(()=>[purchaseRequest])
    async purchaseRequests(){
        return this.purchaseRequestService.getAllPurchaseRequests();
    }
    @Query(() => Int)
    async countrequests(): Promise<number> {
      const count = await this.purchaseRequestService.coutRequest();
      return count;
    } 

    @Query(() => Int)
async countPurchaseRequestBystatus(@Args('status') status:string, @Args('userId') userId:number ): Promise<number> {
  const count = await this.purchaseRequestService.countPurchaseRequestByStatus(status,userId);
  return count;
} 
@Query(() => Int)
async countAllRequestBystatus(@Args('status') status:string  ): Promise<number> {
  const count = await this.purchaseRequestService.countAllRequestBystatus(status);
  return count;
} 
}
