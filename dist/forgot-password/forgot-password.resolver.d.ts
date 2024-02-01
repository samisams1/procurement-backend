import { ForgotPasswordService } from './forgot-password.service';
import { ForgotPasswordInput } from './dto/ForgotPasswordInput';
export declare class ForgotPasswordResolver {
    private readonly forgotPasswordService;
    constructor(forgotPasswordService: ForgotPasswordService);
    forgotPassword(input: ForgotPasswordInput): Promise<boolean>;
}
