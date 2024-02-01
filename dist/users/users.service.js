"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const memcached_service_1 = require("../memcached/memcached.service");
const fs_1 = require("fs");
const bcrypt = require("bcrypt");
const verification_service_1 = require("../verification/verification.service");
const mailer_service_1 = require("../mailer/mailer.service");
let UsersService = class UsersService {
    constructor(memcachedService, verificationService, mailerService) {
        this.tokenMap = new Map();
        this.prisma = new client_1.PrismaClient();
        this.verificationService = verificationService;
        this.mailerService = mailerService;
    }
    async users() {
        const users = await this.prisma.user.findMany();
        return users;
    }
    async user(id) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        return user;
    }
    async create(input) {
        try {
            const { username, email, password, firstName, lastName, role, categoryId } = input;
            const hashedPassword = await bcrypt.hash(password, 10);
            const existingUserByUsername = await this.prisma.user.findUnique({ where: { username } });
            if (existingUserByUsername) {
                throw new Error('Username already exists');
            }
            const existingUserByEmail = await this.prisma.user.findUnique({ where: { email } });
            if (existingUserByEmail) {
                throw new Error('Email already exists');
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                throw new Error('Invalid email format');
            }
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
                    suppliers: true,
                },
            });
            const verificationToken = await this.verificationService.createVerificationToken(user.id);
            const verificationUrl = `http://localhost:3000/verify?token=${verificationToken}`;
            await this.mailerService.sendVerificationEmail(email, verificationUrl);
            if (role === "SUPPLIER") {
                await this.prisma.supplier.create({
                    data: {
                        userId: user.id,
                        categoryId: categoryId,
                    },
                });
            }
            return user;
        }
        catch (error) {
            throw error.message;
        }
    }
    async update(id, input) {
        const user = await this.prisma.user.update({
            where: { id },
            data: input,
        });
        return user;
    }
    async delete(id) {
        return this.prisma.user.delete({ where: { id } });
    }
    async changePassword(userId, changePasswordInput) {
        const { currentPassword, newPassword } = changePasswordInput;
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        if (user && await bcrypt.compare(currentPassword, user.password)) {
            return this.prisma.user.update({
                where: { id: userId },
                data: { password: hashedPassword },
            });
        }
        throw new Error('Invalid current password');
    }
    async forgotPassword(email) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new Error('User not found');
        }
        const token = this.generateRandomToken();
        this.tokenMap.set(email, token);
        this.sendPasswordResetEmail(user.email, token);
        return true;
    }
    generateRandomToken(length = 16) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let token = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            token += characters.charAt(randomIndex);
        }
        return token;
    }
    sendPasswordResetEmail(email, token) {
        console.log(`Sending password reset email to ${email}`);
        console.log(`Token: ${token}`);
    }
    async changePRofilePic(id, updateStoreDto) {
        const { firstName, lastName } = updateStoreDto;
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
            }
            catch (error) {
                throw new Error('An error occurred while counting products.');
            }
        };
        return users();
    }
    async uploadAvatar(file) {
        const { createReadStream, filename } = await file;
        const stream = createReadStream();
        const savePath = `path/to/save/${filename}`;
        await new Promise((resolve, reject) => {
            const writeStream = fs_1.default.createWriteStream(savePath);
            stream.pipe(writeStream);
            writeStream.on('finish', resolve);
            writeStream.on('error', reject);
        });
        return savePath;
    }
    async verifyUser(token) {
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
            await this.prisma.user.update({
                where: {
                    id: verification.user.id,
                },
                data: {
                    isVerified: true,
                },
            });
            return { success: true };
        }
        catch (error) {
            console.log(error);
            throw new Error('An error occurred during user verification.');
        }
    }
    async findByEmail(email) {
        return this.prisma.user.findFirst({
            where: {
                email: email
            }
        });
    }
    async resetPassword(email, password, token) {
        const user = await this.findByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }
        if (user.resetPasswordToken !== token) {
            throw new Error('Invalid token');
        }
        user.password = password;
        user.resetPasswordToken = null;
        return user;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [memcached_service_1.MemcachedService,
        verification_service_1.VerificationService,
        mailer_service_1.MailerService])
], UsersService);
//# sourceMappingURL=users.service.js.map