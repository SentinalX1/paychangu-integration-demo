'use client';

import { useSearchParams } from 'next/navigation';
import { CheckCircleIcon } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

// Component to handle the content that uses useSearchParams
function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const txRef = searchParams.get('tx_ref');

  return (
    <>
      {/* Header */}
      <div className="py-4 bg-white shadow-sm">
        <Link href="/">
          <h1 className="text-center text-2xl font-bold text-gray-800 cursor-pointer">
            StoreX
          </h1>
        </Link>
      </div>

      {/* Success Message */}
      <main className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
        <CheckCircleIcon className="text-green-500 w-16 h-16 mb-4" />
        <h1 className="text-3xl font-bold mb-2 text-green-700">Payment Verified</h1>
        <p className="text-gray-700 max-w-md mb-4">
          🎉 Your payment has been <strong>received and verified</strong> successfully.
          Thank you for your purchase.
        </p>

        {txRef && (
          <p className="text-sm text-gray-500 mb-6">
            Transaction Reference:
            <span className="ml-2 font-mono text-blue-600">{txRef}</span>
          </p>
        )}

        <Link href="/">
          <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
            Return Home
          </button>
        </Link>
      </main>
    </>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}