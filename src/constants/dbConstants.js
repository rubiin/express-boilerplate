export const VERIFICATION = "verificationToken";
export const USER_TYPES = ["admin", "app-admin", "user"];
export const FORGOT_PASSWORD_TOKEN = "forgotPasswordToken";
export const SELF_DEACTIVATED = "Self-Deactivated";
export const ADMIN = "admin";
export const DEFAULT_PAYMENT_EXPIRY = 2;
export const USER_ACCOUNT_STATUS = ["Active", "Inactive", "Disabled"];
export const CP_ACCOUNT_STATUS = ["Active", "Inactive", "Disabled"];
export const RECORDS_PER_PAGE = 5;
export const FUNDRAISER_STATUS = [
  "Active",
  "Completed",
  "Approved",
  "Requested For Approval",
  "Completed",
];
export const CARD_STATUS = ["Active", "Inactive"];
export const PAYMENT_REQUEST_TYPE = ["one-off", "recurring"];
export const PAYMENT_REQUEST_OPTION = ["pay-now", "pay-later"];
export const COMMUNICATION_TYPE = [
  "payment-upcoming",
  "payment-upcoming-1",
  "payment-upcoming-2",
  "payment-success",
  "payment-failed",
  "pay-later-plan-completed",
  "payment-request",
  "recurring-payment-approval",
  "payment-confirmation",
  "failed-recurring-transaction-confirmation",
  "failed-paynow-transaction-confirmation",
  "payment-refunded",
];
export const CUSTOM_FIELD_TYPE = ["text", "option-list", "date", "file", "number", "currency"];

export const finPowerElementType = [
  { Advance: 0 },
  { Refinance: 10 },
  { Deposit: 50 },
  { Cost: 100 },
  { Investment: 150 },
  { InvestmentAdditional: 160 },
  { PaymentReceived: 200 },
  { Withdrawal: 250 },
  { Refund: 260 },
  { Transfer: 290 },
  { Interest: 300 },
  { InterestDefault: 301 },
  { InterestPayout: 350 },
  { Fee: 400 },
  { Journal: 450 },
  { Disbursement: 500 },
  { PaymentDue: 900 },
];
