"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function PaymentFailedContent() {
    const searchParams = useSearchParams();
    const txRef = searchParams.get("tx_ref");
    const status = searchParams.get("status");

    return (
        <>
            <div className="py-4 bg-white shadow-sm">
                <Link href="/">
                    <h1 className="text-center text-2xl font-bold text-gray-800 cursor-pointer">
                        StoreX
                    </h1>
                </Link>
            </div>

            <main className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
                <h1 className="text-3xl font-bold mb-2 text-red-600">
                    Payment Failed
                </h1>
                <p className="text-gray-600 mb-4">
                    Unfortunately, your payment could not be completed.
                </p>

                {txRef && (
                    <p className="text-gray-700 mb-2">
                        Transaction Reference:{" "}
                        <span className="ml-2 font-mono text-red-500">{txRef}</span>
                    </p>
                )}

                {status && (
                    <p className="text-gray-700 mb-6">
                        Status:{" "}
                        <span className="ml-2 font-mono text-yellow-600">{status}</span>
                    </p>
                )}

                <Link href="/">
                    <button className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-black transition">
                        Return Home
                    </button>
                </Link>
            </main>
        </>
    );
}

export default function PaymentFailed() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <PaymentFailedContent />
      </Suspense>
    );
  }