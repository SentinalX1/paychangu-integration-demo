import { NextRequest } from 'next/server';
import { verifyTransaction } from '@/lib/payment-helpers'; // adjust path if needed

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const tx_ref = searchParams.get('tx_ref');
    const status = searchParams.get('status');

    if (!tx_ref || !status) {
        console.warn('User canceled or missing tx_ref/status');

        return Response.redirect(
            'https://paychangu-integration-demo.vercel.app/payment-failed',
            302
        );
    }

    try {
        const verifiedStatus = await verifyTransaction(tx_ref);

        if (verifiedStatus === 'success') {
            console.log('✅ Payment verified successfully for:', tx_ref);

            // Optional: update DB, trigger email, etc

            return Response.redirect(
                `https://paychangu-integration-demo.vercel.app/payment-success?tx_ref=${tx_ref}&status=${status}`,
                302
            );
        } else {
            console.warn('❌ Payment verification failed for:', tx_ref);

            return Response.redirect(
                `https://paychangu-integration-demo.vercel.app/payment-failed?tx_ref=${tx_ref}&status=${status}`,
                302
            );
        }
    } catch (error) {
        console.error('❌ Error verifying payment:', error);

        return new Response(JSON.stringify({ message: 'Error verifying payment' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
