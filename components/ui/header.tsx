import LogoutButton from "../shared/logout-button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

type Props = {
  username: string;
};

export default async function UIHeader({ username }: Props) {
  return (
    <header className="flex items-center justify-between border-b border-slate-700 px-4 py-6">
      <h1 className="text-2xl font-bold uppercase text-white">Repolution</h1>
      <Popover>
        <PopoverTrigger>
          Hello, <span className="font-bold">{username}</span>
        </PopoverTrigger>
        <PopoverContent>
          <LogoutButton />
        </PopoverContent>
      </Popover>
    </header>
  );
}
