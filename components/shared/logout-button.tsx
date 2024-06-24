"use client";

import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { signOut } from "supertokens-auth-react/recipe/session";

export default function LogoutButton() {
  async function onLogout() {
    await signOut();
    window.location.href = "/auth";
  }

  return (
    <Button onClick={onLogout} variant="outline" className="w-full">
      <span className="mr-4">Logout</span>
      <LogOutIcon size={16} />
    </Button>
  );
}
