import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="py-24">
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <Link href="https://app.gib.work/" target="_blank">
              {/* <Badge variant="outline"> */}
              <Badge>
                app.gib.work
                <ArrowUpRight className="ml-2 size-4" />
              </Badge>
            </Link>
            <h1 className="my-6 text-pretty text-3xl font-bold lg:text-4xl">
              Welcome to Example App using <br />{" "}
              <Link href="https://app.gib.work/" target="_blank">
                <span className="text-4xl dark:text-purple-300 text-purple-400  lg:text-6xl">
                  Gibwork APIs
                </span>
              </Link>
            </h1>
            <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
              This application demonstrates how to interact with the Gibwork
              APIs. You can create tasks and explore tasks using the provided
              endpoints.
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              <Button className="w-full sm:w-auto">Create Task</Button>
              <Link href="/explore">
                <Button variant="outline" className="w-full sm:w-auto">
                  Explore Tasks
                  <ArrowUpRight className="ml-2 size-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex justify-center lg:w-3/4 lg:ml-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 540 532"
              className="max-w-full h-auto rounded-md dark:bg-white"
              aria-label="Decorative graphic"
              role="img"
            >
              <path fill="#8151FD" d="M0 0h540v532H0z" />
              <path fill="#FFFFFF" d="M346 140h40v252h-40z" />
              <path fill="#FFFFFF" d="M154 140h40v252h-40z" />
              <path fill="#FFFFFF" d="M250 272h38v120h-58v-80h20z" />
              <path fill="#FFFFFF" d="M308 392h38v40h-38z" />
              <path fill="#FFFFFF" d="M194 392h38v40h-38z" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
