import { Module } from '@nestjs/common';
import { ForgotPasswordService } from './forgot-password.service';
import { ForgotPasswordResolver } from './forgot-password.resolver';
import { MailerService } from 'src/mailer/mailer.service';

@Module({
  providers: [ForgotPasswordService, ForgotPasswordResolver,MailerService]
})
export class ForgotPasswordModule {}
