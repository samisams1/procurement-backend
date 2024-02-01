import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { MemcachedService } from 'src/memcached/memcached.service';
import { UserMock } from './mocks/user.mock';
import { VerificationModule } from 'src/verification/verification.module';
import { MailerModule } from 'src/mailer/mailer.module';
import { MailerService } from 'src/mailer/mailer.service';
import { VerificationService } from 'src/verification/verification.service';
import { PrismaService } from '../prisma/prisma.service'; // Import the PrismaService

@Module({
  imports: [VerificationModule, MailerModule],
  providers: [
    UsersResolver,
    UsersService,
    MemcachedService,
    UserMock,
    MailerService,
    VerificationService,
    PrismaService, // Include the PrismaService provider
  ],
  exports: [],
})
export class UsersModule {}