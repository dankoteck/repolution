import { validateRequest } from "@/lib/auth";
import Link from "next/link";
import LogoutButton from "../shared/logout-button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const nav = [
  { text: "Home", href: "/" },
  { text: "Settings", href: "/settings" },
];

export default async function UIHeader() {
  const { user } = await validateRequest();

  return (
    <header className="border-b border-[#C9ADA7] bg-[#22223B] pb-24">
      <div className="container">
        <div className="flex items-center justify-between border-b border-[#C9ADA7]/50 py-5">
          <Link href="/">
            <h1 className="text-2xl font-bold uppercase">Repolution</h1>
          </Link>
          {user && (
            <Popover>
              <PopoverTrigger>
                Hello, <span className="font-bold">{user.username}</span>
              </PopoverTrigger>
              <PopoverContent>
                <LogoutButton />
              </PopoverContent>
            </Popover>
          )}
        </div>

        <nav className="py-5">
          <ul className="col-span-2 flex items-center gap-4">
            {nav.map((item) => (
              <li key={item.text}>
                <Link
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-base duration-150 hover:bg-[#C9ADA7] hover:text-[#22223B]"
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
