export type LevelCustomization = {
  title: string | null;
  description: string | null;
  logo?: string | null;
};

export type LevelMeta = {
  uuid: string;
  response: string;
};

export type LevelData = {
  amount: number;
  currency: "MWK" | "USD";
  email: string;
  first_name: string;
  last_name: string;
  callback_url: string;
  return_url: string;
  tx_ref: string;
  customization?: LevelCustomization;
  meta?: LevelMeta;
};

// Types for transmitted in the callback triggered by PayChangu
export type LevelAmountSplit = {
  fee_paid_by_customer: number;
  fee_paid_by_merchant: number;
  total_paid_by_customer: number;
  amount_received_by_merchant: number;
};

export type LevelCallbackPayload = {
  event_type: string;
  first_name: string;
  email: string;
  currency: "MWK" | "USD";
  amount: number;
  charge: number;
  amount_split: LevelAmountSplit;
  total_amount_paid: number;
  mode: string;
  type: string;
  status: string;
  reference: string;
  tx_ref: string;
  customization: LevelCustomization;
  meta: LevelMeta | null;
  created_at: string;
  updated_at: string;
};

// Types for payload received when verifying a transaction
export type LevelVerifyAuthorization = {
  channel: string;
  card_number: string | null;
  expiry: string | null;
  brand: string | null;
  provider: string | null;
  mobile_number: string | null;
  completed_at: string;
};

export type LevelVerifyCustomer = {
  email: string;
  first_name: string;
  last_name: string;
};

export type LevelVerifyLog = {
  type: string;
  message: string;
  created_at: string;
};

export type LevelVerifyData = {
  event_type: string;
  tx_ref: string;
  mode: string;
  type: string;
  status: string;
  number_of_attempts: number;
  reference: string;
  currency: "MWK" | "USD";
  amount: number;
  charges: number;
  customization?: LevelCustomization;
  meta: LevelMeta | null;
  authorization: LevelVerifyAuthorization;
  customer?: LevelVerifyCustomer;
  logs: LevelVerifyLog[];
  created_at: string;
  updated_at: string;
};

export type LevelVerifyPayload = {
  status: string;
  message: string;
  data: LevelVerifyData;
};
