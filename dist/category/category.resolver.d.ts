import { CategoryService } from './category.service';
import { CategoryInput } from './Dto/create.category.input';
export declare class CategoryResolver {
    private categoryService;
    constructor(categoryService: CategoryService);
    categories(): Promise<({
        suppliers: {
            id: number;
            userId: number;
            name: string;
            categoryId: number;
        }[];
    } & {
        id: number;
        name: string;
        createdAt: Date;
    })[]>;
    createCategory(categoryInput: CategoryInput): Promise<{
        id: number;
        name: string;
        createdAt: Date;
    }>;
}
