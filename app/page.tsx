import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center flex-grow px-4 text-center">
      <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6">
        Gibwork API example Application
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl">
        Find exciting opportunities and complete tasks to earn rewards on
        GibWork.
      </p>
      <div className="space-x-4">
        <Link href="/explore">
          <Button size="lg" className="text-lg">
            Explore <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
        <Button size="lg" className="text-lg">
          Get Started <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
