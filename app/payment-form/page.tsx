"use client"

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { checkout } from "@/lib/actions/actions";
import { formSchema } from "@/lib/form-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Suspense, useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { products } from "@/lib";
import Link from "next/link";


function PaymentFormContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id")
  const product = products.find((p) => p.Id.toString() === id)


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      currency: "MWK",
      amount: Number(product?.Amount) || 0,
      callbackUrl: "https://paychangu-integration-demo.vercel.app/payment-success",
      returnUrl: "https://paychangu-integration-demo.vercel.app/api/finalize-payment",
    },
  });

  const [isPayChanguSDKLoaded, setIsPayChanguSDKLoaded] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // Manage popup visibility
  const [loading, setLoading] = useState(false); // State to control loader visibility

  // Dynamically load PayChangu SDK script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://in.paychangu.com/js/popup.js";
    script.async = true;
    script.onload = () => {
      // console.log("PayChangu SDK loaded successfully"); will just leave this here
      setIsPayChanguSDKLoaded(true);
    };
    script.onerror = () => {
      console.error("Failed to load PayChangu SDK");
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
  if (!product) {
    return <div>product not found</div>
  }
  
  const { Name, Description, Amount, image } = product
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Form Submitted", values);
    setLoading(true); // Show loader when submission starts

    if (isPayChanguSDKLoaded) {
      const checkoutUrl = await checkout(values); // Get checkout URL

      function generateUUID() {
        if (typeof crypto !== "undefined" && crypto.randomUUID) {
          return crypto.randomUUID(); // Use built-in when available
        } else {
          // Manual fallback for older browsers / mobile devices
          return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = (Math.random() * 16) | 0;
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
          });
        }
      }

      if (checkoutUrl) {
        const config = {
          public_key: process.env.NEXT_PUBLIC_PAYCHANGU_PUBLIC_KEY || "",
          tx_ref: generateUUID(),
          amount: values.amount,
          currency: values.currency,
          callback_url: values.callbackUrl,
          return_url: values.returnUrl,
          customer: {
            email: values.email,
            first_name: values.firstname,
            last_name: values.lastname,
          },
          customization: {
            title: product.Name || "Payment",
            description: product.Description || "Make a payment",
          },
        };

        try {
          if (window.PaychanguCheckout) {
            console.log("SDK loaded successfully");
            window.PaychanguCheckout(config);
            setShowPopup(true);
            setLoading(false);
          } else {
            console.error("PayChangu SDK is not loaded");
            setLoading(false);
          }
        } catch (error) {
          console.error("Error initializing PayChangu Popup:", error);
          alert("Failed to initiate payment. Please try again.");
          setLoading(false);
        }
      } else {
        console.error("Failed to get checkout URL");
        setLoading(false);
      }
    } else {
      console.error("PayChangu SDK not loaded");
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 grainy">
      {/* Logo Section */}
      <div className="py-4 bg-white shadow-sm">
        <Link href="/">
          <h1 className="text-center text-2xl font-bold text-gray-800 cursor-pointer">
            StoreX
          </h1>
        </Link>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/* Product Details */}
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
          {image && (
            <Image
              src={image as string}
              alt={product.Name as string || "Product Image"}
              width={400}
              height={300}
              className="w-full max-w-sm rounded-lg"
            />
          )}
          <h2 className="mt-4 text-lg font-bold">{Name}</h2>
          <p className="text-sm text-gray-600">{Description}</p>
          <p className="mt-2 text-xl font-semibold">{Amount.toLocaleString()} MWK</p>
        </div>

        {/* Payment Form */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Payment Form</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full mt-4"
                type="submit"
                disabled={loading}>
                {loading ? <Loader className="animate-spin" size={24} /> : "Proceed with Payment"}
              </Button>
            </form>
          </Form>
        </div>
      </div>

      {/* Wrapper for the PayChangu popup */}
      {showPopup && (
        <div id="wrapper">
        </div>
      )}
    </div>
  )
}

export default function PaymentForm() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <PaymentFormContent />
    </Suspense>
  );
}