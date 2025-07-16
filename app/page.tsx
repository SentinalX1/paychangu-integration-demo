"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter
} from "@/components/ui/card"
import { products } from "@/lib"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50 grainy">
      <div className="py-4 bg-white shadow-sm">
        <Link href="/">
          <h1 className="text-center text-2xl font-bold text-gray-800 cursor-pointer">
            StoreX
          </h1>
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <Card key={index} className={cn("relative w-full max-w-sm mx-auto mb-5")}>
            <div className="relative">
              <Image
                src={product.image}
                alt={product.Name}
                width={400}
                height={300}
                className="w-full h-[300px] object-cover rounded-t-lg"
              />
              <div className="absolute bottom-2 left-2 text-white">
                <p className="text-lg font-semibold">{product.Name}</p>
              </div>
              <div className="absolute bottom-2 right-2 text-white">
                <p className="text-lg font-semibold">{product.Amount.toLocaleString()} MWK</p>
              </div>
            </div>

            <CardContent className="p-4 text-center">
              <p className="text-sm text-gray-600">{product.Description}</p>
            </CardContent>

            <CardFooter className="p-4">
              <Button
                className="w-full"
                onClick={() => {
                  const url = `/payment-form?id=${product.Id}`;
                  router.push(url);
                }}
              >
                Buy Product
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
