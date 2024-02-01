import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { MailerService } from 'src/mailer/mailer.service';
import { randomBytes } from 'crypto';


@Injectable()
export class ForgotPasswordService {
    private prisma :PrismaClient

  constructor(
    private readonly mailService: MailerService,
  ) {
    this.prisma = new PrismaClient();

  }
  async initiatePasswordReset(email: string): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new Error('User not found');
    }

    const resetToken = this.generateResetToken(); // Replace with your reset token generation logic
    const resetUrl = this.generateResetUrl(email, resetToken); // Replace with your reset URL generation logic

    await this.prisma.passwordReset.create({
      data: {
        userId: user.id.toString(),
        token: resetToken,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Set expiration to 24 hours from now
      },
    });

    await this.mailService.sendNewEmail(email, resetUrl);
  }
   generateResetToken(): string {
    const tokenLength = 32; // Length of the token in bytes
    const token = randomBytes(tokenLength).toString('hex');
    return token;
  }
  generateResetUrl(email: string, token: string): string {
    const baseUrl = 'http://localhost:3000/reset-password'; // Replace with your actual base URL
    const resetUrl = `${baseUrl}?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`;
    return resetUrl;
  }
}