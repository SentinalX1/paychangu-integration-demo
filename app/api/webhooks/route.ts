import { redirect } from "next/navigation";
import type { LevelCallbackPayload } from "@/types/paychangu";
import { verifyTransaction } from "@/lib/payment-helpers";

// Redirect to the home page when paychangu returns to this url
export async function GET() {
  redirect("/");
}

export async function POST(request: Request) {
  try {
    const text = await request.text();
    const payload: LevelCallbackPayload = JSON.parse(text);

    // Verify that the transaction is valid as recommended from the paychangu documentation
    const verifiedStatus = await verifyTransaction(payload.tx_ref);
    if (verifiedStatus !== "success") {
      return new Response("Transaction verification failed", { status: 400 });
    }

    // Process the webhook payload
    // For example, you can update the user's subscription status in your database
    // or send a notification to the user or return the payload as json response

    return Response.json(payload);
  } catch (error) {
    if (error instanceof Error) {
      return new Response(`Webhook error: ${error.message}`, {
        status: 400,
      });
    }
    return new Response("Unknown Webhook error", { status: 400 });
  }
}
