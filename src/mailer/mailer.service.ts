import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Initialize the nodemailer transporter
    this.transporter = nodemailer.createTransport({
      // Configure your email transport options (SMTP, SendGrid, etc.)
      host: 'smtp.gmail.com',
      port: 465, // or 465 for SSL
      secure: true, // true for SSL
      secureConnectio:false,
      auth: {
        user: 'forsamisams@gmail.com',
        pass: 'hpjx gotb xxmt iouf',
       },
    });
  }
  async sendVerificationEmail(email: string, verificationUrl: string): Promise<void> {
    const mailOptions = {
      from: 'forsamisams@gmail.com',
      to: email,
      subject: 'Email Verification',
      text: `Please click on the following link to verify your email: ${verificationUrl}`,
    };

    await this.transporter.sendMail(mailOptions);
  }
  async sendNewEmail(email: string, verificationUrl: string): Promise<void> {
    const mailOptions = {
      from: 'forsamisams@gmail.com',
      to: email,
      subject: 'Email Verification',
      text: `Please click on the following link to verify your email: ${verificationUrl}`,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendEmail({ to, subject, body }: { to: string; subject: string; body: string }): Promise<void> {
    const mailOptions = {
      from: 'forsamisams@@gmail.com',
      to,
      subject,
      text: body,
    };
    await this.transporter.sendMail(mailOptions);
  }
  
}