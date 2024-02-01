import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { category } from './category.entity';
import { CategoryInput } from './Dto/create.category.input';

@Resolver()
export class CategoryResolver {
    constructor(private categoryService: CategoryService) {}
    @Query(()=>[category])
    async categories() {
      return this.categoryService.categories();
    }
    @Mutation(() => category)
    async createCategory(
      @Args('input') categoryInput: CategoryInput,
    ) {
      return this.categoryService.createCategory(categoryInput);
    }
  
}
