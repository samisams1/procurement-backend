import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { SupplierService } from './supplier.service';
import { supplier } from './supplier.entity';

@Resolver()
export class SupplierResolver {
    constructor(private supplierService: SupplierService) {}
    @Query(()=>[supplier])
    async suppliers() {
      return this.supplierService.suppliers();
    }
    @Query(() => [supplier])
    async suppliersByCategoryId(@Args('categoryId', { type: () => Int }) categoryId: number): Promise<supplier[]> {
      return this.supplierService.getSuppliersByCategoryId(categoryId);
    }
}
