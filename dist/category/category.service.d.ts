import { CategoryInput } from './Dto/create.category.input';
export declare class CategoryService {
    private prisma;
    constructor();
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
    createCategory(input: CategoryInput): Promise<{
        id: number;
        name: string;
        createdAt: Date;
    }>;
}
