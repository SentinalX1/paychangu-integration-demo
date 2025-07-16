"use client";

import FuzzyText from '@/components/fuzzyText';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#152046] text-white">
      <div className="relative z-10 flex flex-col items-center">
        <span className="sr-only">404</span>
        <FuzzyText 
          baseIntensity={0.2} 
          hoverIntensity={0.5} 
          enableHover={true}
          fontSize="clamp(4rem, 10vw, 10rem)"
          color="#fff"
        >
          404
        </FuzzyText>
        <p className="mt-4 text-lg">Oops! The page you're looking for doesn't exist.</p>
        <Button onClick={() => router.push('/')} className="mt-4">
          Go back home
        </Button>
      </div>
    </div>
  );
}