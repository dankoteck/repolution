import { User } from "supertokens-node/types";
import LogoutButton from "../shared/logout-button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

type Props = {
  userInfo: User | undefined;
};

export default async function UIHeader({ userInfo }: Props) {
  return (
    <header className="flex items-center justify-between border-b border-slate-700 px-4 py-6">
      <h1 className="text-2xl font-bold uppercase text-white">Repolution</h1>
      <Popover>
        <PopoverTrigger>
          Hello, <span className="font-bold">{userInfo?.emails[0]}</span>
        </PopoverTrigger>
        <PopoverContent>
          <LogoutButton />
        </PopoverContent>
      </Popover>
    </header>
  );
}
