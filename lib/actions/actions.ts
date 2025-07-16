'use server'

import { formSchema } from "@/lib/form-schemas";
import { LevelData } from "@/types/paychangu";
import { z } from "zod";

// The inferred type is used here because this implementation used a React Hook Form

export async function checkout(values: z.infer<typeof formSchema>): Promise<string | null> {
  // Generate a random transaction reference to be used to identify the transaction.
  const tx_ref = crypto.randomUUID();

  // Clean data to match the Level Config requirements
  const data: LevelData = {
    amount: values.amount,
    currency: values.currency,
    email: values.email,
    first_name: values.firstname,
    last_name: values.lastname,
    callback_url: values.callbackUrl,
    return_url: values.returnUrl,
    tx_ref,
  };

  // Send a fetch request to the PayChangu API using your secret key and the data
  const response = await fetch("https://api.paychangu.com/payment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYCHANGU_SECRET_KEY}`,
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  // Return the checkout_url if it exists, else return null
  if (responseData?.data?.checkout_url) {
    return responseData.data.checkout_url; // Return the URL
  } else {
    console.error("Error: Unable to get checkout URL", responseData);
    return null; // Return null if the URL is not available
  }
}
