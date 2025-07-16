import { LevelVerifyPayload } from "@/types/paychangu";

export async function verifyTransaction(tx_ref: string) {
  // This implementation just returns the status but you can do more with the payload
  const response = await fetch(
    `https://api.paychangu.com/verify-payment/${tx_ref}`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.PAYCHANGU_SECRET_KEY}`,
      },
    },
  );
  const text = await response.text();
  const payload: LevelVerifyPayload = JSON.parse(text);

  return payload.data.status;
}
