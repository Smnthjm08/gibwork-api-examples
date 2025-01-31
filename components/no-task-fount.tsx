import Link from "next/link";
import { Button } from "./ui/button";

export default function NoTaskFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center p-6 pb-auto space-y-4">
      <div className="text-4xl text-gray-300">🔍</div>
      <div className="text-xl font-semibold text-gray-700">No tasks found</div>
      <div className="text-gray-500 max-w-md">
        We couldn&apos;t find any tasks matching <span className="italic">&quot;rgethnjnyhtbgrvfecdwxs&quot;</span>.
      </div>
      <div className="text-gray-600">Would you like to create a new task?</div>
      <Link href={"/"}>
      <Button className="mt-4 w-full max-w-xs">Create Task</Button>
      </Link>
    </div>
  );
}