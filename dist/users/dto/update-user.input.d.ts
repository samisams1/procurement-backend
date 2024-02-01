export declare class UpdateUserInput {
    email?: string;
    username?: string;
    categoryId?: number;
    firstName?: string;
    role?: EnumRole;
    lastName?: string;
    password?: string;
}
export declare class ChangePasswordInput {
    currentPassword: string;
    newPassword: string;
}
export declare enum EnumRole {
    ADMIN = "ADMIN",
    GUEST = "CUSTOMER",
    SUPPLIER = "SUPPLIER"
}
export declare enum StatusEnum {
    active = "active",
    disabled = "disabled",
    pending = "pending"
}
