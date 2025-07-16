"use client"

import { useEffect } from "react"

import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <>
      <div className="mx-auto w-full max-w-none px-5 sm:max-w-[90%] sm:px-0 xl:max-w-6xl">
        <main className="flex w-full flex-col items-center justify-center gap-4 py-52">
          <h2 className="text-center text-2xl font-bold">
            Something went wrong!
          </h2>
          <p className="mb-4 max-w-prose text-center text-neutral-600">
            It seems like there&apos;s a hiccup on our end. Our team is working
            hard to fix the issue. We appreciate your patience and
            understanding.
          </p>
          <Button
            className="text-[15px] xl:hidden"
            onClick={
              () => reset()
            }
          >
            Try again
          </Button>
          <Button
            size="lg"
            className="hidden text-[15px] xl:flex"
            onClick={
              () => reset()
            }
          >
            Try again
          </Button>
        </main>
      </div>
    </>
  )
}
