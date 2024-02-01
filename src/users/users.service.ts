import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { MemcachedService } from '../memcached/memcached.service'
import { ChangePasswordInput, CreateUserInput } from './dto/create-user.input';
import fs from 'fs';

import * as bcrypt from 'bcrypt';
import { UpdateUserInput } from './dto/update-user.input';
import { category } from 'src/category/category.entity';
import { VerificationService } from 'src/verification/verification.service';
import { MailerService } from 'src/mailer/mailer.service';

@Injectable()
export class UsersService {
  private prisma: PrismaClient
  private readonly memcachedService:MemcachedService;
  private tokenMap: Map<string, string> = new Map();
  private readonly verificationService: VerificationService;
  private readonly mailerService: MailerService;
  
 /*constructor(memcachedService: MemcachedService) {
    this.prisma = new PrismaClient();
    this.memcachedService = memcachedService;
    
  }*/

  constructor(
    memcachedService: MemcachedService,
    verificationService: VerificationService,
    mailerService: MailerService,
  ) {
    this.prisma = new PrismaClient();
   // this.memcachedService = memcachedService;
    this.verificationService = verificationService; // Inject the verification service
    this.mailerService = mailerService; // Inject the mailer service
  }
  async users(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users;
  }
  async user(id:number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({where:{id}});
    return user;
  }
 
  async create(input: CreateUserInput): Promise<User> {
    try {
      const { username, email, password, firstName, lastName, role, categoryId } = input;
      const hashedPassword = await bcrypt.hash(password, 10);
       // Check if the username already exists
    const existingUserByUsername = await this.prisma.user.findUnique({ where: { username } });
    if (existingUserByUsername) {
      throw new Error('Username already exists');
    }

    // Check if the email already exists
    const existingUserByEmail = await this.prisma.user.findUnique({ where: { email } });
    if (existingUserByEmail) {
      throw new Error('Email already exists');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }
      // Password strength validation
      const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{6,}$/;
      if (!passwordRegex.test(password)) {
        throw new Error('Password should be at least 6 characters long and contain at least one special character and one number');
      }
      const user = await this.prisma.user.create({
        data: {
          firstName,
          lastName,
          username,
          email,
          password: hashedPassword,
          phoneNumber: "+251973316377",
          address: "Addis Ababa",
          role: role,
        },
        include: {
          suppliers: true, // Include the suppliers relation in the created user
        },
      });
      
      const verificationToken = await this.verificationService.createVerificationToken(user.id);
     // const verificationUrl = `https://itrustu2.netlify.app/verify?token=${verificationToken}`; // Replace with your actual verification URL
     const verificationUrl = `http://localhost:3000/verify?token=${verificationToken}`;
      await this.mailerService.sendVerificationEmail(email, verificationUrl);

      if (role === "SUPPLIER") {
        // Create a new Supplier record with the userId set to the id of the created User
        await this.prisma.supplier.create({
          data: {
            userId: user.id,
            categoryId: categoryId,
          },
        });
      }

      return user;
    } catch (error) {
      throw error.message;
    }
  }
  async update(id: number, input: UpdateUserInput): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id },
      data: input,
    });
    return user;
  }

  async delete(id:number):Promise<User>{
      return this.prisma.user.delete({where:{id}});
    }
  

    async changePassword(
      userId: number,
      changePasswordInput: ChangePasswordInput,
    ): Promise<User> {
      const { currentPassword, newPassword } = changePasswordInput;
  
      // Retrieve the user from the database
      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      // Perform password validation and update the password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      if (user && await bcrypt.compare(currentPassword, user.password)) {
        
        return this.prisma.user.update({
          where: { id: userId },
          data: { password: hashedPassword },
        });
      }
  
      throw new Error('Invalid current password');
    }
  
    async forgotPassword(email: string): Promise<boolean> {
      const user = await this.prisma.user.findUnique({ where: { email } });
  
      if (!user) {
        throw new Error('User not found');
      }
  
      // Generate a unique token for password reset
      const token = this.generateRandomToken();
  
      // Create the forgot password record in the database
     /* await this.prisma.forgotPassword.create({
        data: {
          userId: user.id,
          token,
        },
      });8*/
      this.tokenMap.set(email, token);
  
      // Send password reset email with the generated token
      this.sendPasswordResetEmail(user.email, token);
  
      return true;
    }
  
    generateRandomToken(length: number = 16): string {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let token = '';
  
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        token += characters.charAt(randomIndex);
      }
  
      return token;
    }
  
    sendPasswordResetEmail(email: string, token: string): void {
      // Implement your email sending logic here
      // This is just a placeholder function for demonstration purposes
  
      console.log(`Sending password reset email to ${email}`);
      console.log(`Token: ${token}`);
    }
    async changePRofilePic(id: number, updateStoreDto: CreateUserInput):Promise<User> {
      const { firstName,lastName } = updateStoreDto;
  
      return this.prisma.user.update({
        where: {
          id,
        },
        data: {
          firstName,
          lastName,
        },
      });
    }

  async totalUsers() {
      const users = async () => {
        try {
          const count = await this.prisma.user.count();
          return count;
        } catch (error) {
          // Handle any errors that occur during the count operation
          throw new Error('An error occurred while counting products.');
        }
      };
    
      return users();
    }
    async uploadAvatar(file: any): Promise<string> {
      const { createReadStream, filename } = await file;
      const stream = createReadStream();
    
      // Define the path where you want to save the uploaded file
      const savePath = `path/to/save/${filename}`;
    
      // Save the file to the specified path
      await new Promise((resolve, reject) => {
        const writeStream = fs.createWriteStream(savePath);
        stream.pipe(writeStream);
        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
      });
    
      // Perform any additional processing if needed
    
      // Return the file path or any other relevant response
      return savePath;
    }
    async verifyUser(token: string) {
      try {
        const verification = await this.prisma.verification.findUnique({
          where: {
            token: token,
          },
          include: {
            user: true,
          },
        });
    
        if (!verification || !verification.user) {
          return { success: false };
        }
    
        // Update the user's verification status
        await this.prisma.user.update({
          where: {
            id: verification.user.id,
          },
          data: {
            isVerified: true,
          },
        });
    
        return { success: true };
      } catch (error) {
        // Handle any errors that occur during the verification process
        console.log(error);
        throw new Error('An error occurred during user verification.');
      }
    }
    async findByEmail(email: string): Promise<User | null> {
      return this.prisma.user.findFirst({ 
        where:{
          email:email
        }
       });
    }
    async resetPassword(email: string, password: string, token: string): Promise<User> {
      // Validate the token and perform the password reset
      // Implement your own logic here, such as checking if the token is valid and updating the user's password
    
      // Example implementation:
      const user = await this.findByEmail(email);
      if (!user) {
        throw new Error('User not found');
      }
    
      if (user.resetPasswordToken !== token) {
        throw new Error('Invalid token');
      }
    
      user.password = password;
      user.resetPasswordToken = null;
    
      // Save the updated user in the database
      // Add your code here to update the user in your data source (e.g., using Prisma)
    
      return user;
    }
}










