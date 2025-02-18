import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import { Skeleton } from "./ui/skeleton";

export default function ExploreSkeleton() {
  return (
    <main className="w-full">
      <h1 className="scroll-m-20 text-2xl flex px-8 pt-4 justify-start font-bold tracking-tight lg:text-4xl">
      Explore Tasks
      </h1>
      <div className="max-w-full px-4 sm:px-8 pt-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 flex flex-col sm:flex-row gap-2">
          <Input
            type="text"
            placeholder="Search task..."
            disabled
            className="w-full"
          />
          <Button disabled className="w-full sm:w-auto">
            Search
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" disabled className="w-full sm:w-auto">
              Sort By
            </Button>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </div>

      <section className="w-full">
      <div className="grid grid-cols-1 gap-4 p-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="flex flex-col h-full bg-card">
            <CardHeader className="flex flex-row items-center gap-4 pb-4">
              <Skeleton className="h-12 w-12 rounded-full" />

              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-5 w-3/4" />
              </div>
            </CardHeader>

            <CardContent className="flex-grow space-y-4">
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3].map((tag) => (
                  <Skeleton key={tag} className="h-6 w-16" />
                ))}
              </div>

              <Skeleton className="h-4 w-32" />
            </CardContent>

            <CardFooter className="flex justify-between items-center pt-4 border-t">
              <Skeleton className="h-4 w-24" />

              <Skeleton className="h-4 w-20" />
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex justify-center my-8">
        <div className="flex gap-2">
          <Skeleton className="h-10 w-24" /> 
          <div className="flex gap-1">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-10 w-10" />
            ))}
          </div>
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    </section>
    </main>
  );
}
