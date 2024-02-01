import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/users/entities/user.entity';
export declare class VerificationService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createVerificationToken(userId: number): Promise<string>;
    verifyToken(token: string): Promise<User>;
}
