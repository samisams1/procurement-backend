import { supplier } from 'src/supplier/supplier.entity';
export declare class category {
    id: number;
    name: string;
    suppliers: supplier[];
    createdAt: Date;
}
