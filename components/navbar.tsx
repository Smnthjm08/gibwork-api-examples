import { ModeToggle } from "./mode-toggle";

export default function NavBar() {
  return (
    <div>
      <h2 className="text-2xl  md:text-4xl font-bold tracking-tight ">
        gibwork
      </h2>
      <ModeToggle />
    </div>
  );
}
