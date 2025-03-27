export interface PaymentMethods {
    payment_method?: string | null;
    ccNumber?: string | null;
    ccFirstName?: string | null;
    ccLastName?: string | null;
    ccExpiry?: string | null;
    ccCVC?: string | null;
    paypalEmail?: string | null;
    stripeDetails?: string | null;
    bankName?: string | null;
    accountNumber?: string | null;
    iBAN?: string | null;
    acceptsCash?: boolean | null;
}