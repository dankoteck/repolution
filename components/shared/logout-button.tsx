import { logout } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";

export default function LogoutButton() {
  return (
    <form action={logout}>
      <Button type="submit" variant="outline" className="w-full">
        <span className="mr-4">Logout</span>
        <LogOutIcon size={16} />
      </Button>
    </form>
  );
}
