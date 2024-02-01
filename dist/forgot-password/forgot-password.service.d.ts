import { MailerService } from 'src/mailer/mailer.service';
export declare class ForgotPasswordService {
    private readonly mailService;
    private prisma;
    constructor(mailService: MailerService);
    initiatePasswordReset(email: string): Promise<void>;
    generateResetToken(): string;
    generateResetUrl(email: string, token: string): string;
}
