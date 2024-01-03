import { Query, Resolver } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { product } from './product.entity';

@Resolver()
export class ProductResolver {
    constructor(private productService: ProductService) {}
    @Query(()=>[product])
    async products() {
      return this.productService.products();
    }
}
