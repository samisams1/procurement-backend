export declare class MailerService {
    private transporter;
    constructor();
    sendVerificationEmail(email: string, verificationUrl: string): Promise<void>;
    sendNewEmail(email: string, verificationUrl: string): Promise<void>;
    sendEmail({ to, subject, body }: {
        to: string;
        subject: string;
        body: string;
    }): Promise<void>;
}
