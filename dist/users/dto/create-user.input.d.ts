export declare class CreateUserInput {
    email: string;
    username: string;
    firstName: string;
    role: EnumRole;
    lastName: string;
    password: string;
    categoryId: number;
}
export declare class ChangePasswordInput {
    currentPassword: string;
    newPassword: string;
}
export declare enum EnumRole {
    ADMIN = "ADMIN",
    CUSTOMER = "CUSTOMER",
    SUPPLIER = "SUPPLIER"
}
