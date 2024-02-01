import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/users/entities/user.entity';
import * as crypto from 'crypto';
@Injectable()
export class VerificationService {
  constructor(private readonly prisma: PrismaService) {}

  async createVerificationToken(userId: number): Promise<string> {
    const verificationToken = crypto.randomBytes(20).toString('hex');
    const verification = await this.prisma.verification.create({
      data: { token: verificationToken, userId },
    });
    return verificationToken;
  } 
  async verifyToken(token: string): Promise<User> {
    const verification = await this.prisma.verification.findFirst({
      where: { token },
      include: { user: true },
    });

    if (!verification) {
      throw new Error('Invalid verification token');
    }

    await this.prisma.user.update({
      where: { id: verification.userId },
      data: { isVerified: true },
    });

    await this.prisma.verification.delete({
      where: { id: verification.id },
    });

    return verification.user;
  }

}