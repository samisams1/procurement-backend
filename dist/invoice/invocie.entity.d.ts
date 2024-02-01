import { Payment } from 'src/payment/payment.entity';
import { Shipping } from 'src/shipping/shipping.entity';
export declare class Invoice {
    id: number;
    payment: Payment;
    shipping: Shipping;
    orderId: number;
    amount: number;
    issuedAt: Date;
}
