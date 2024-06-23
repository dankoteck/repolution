"use client";

import { signOut } from "supertokens-auth-react/recipe/session";

export default function LogoutButton() {
  async function onLogout() {
    await signOut();
    window.location.href = "/auth"; // or to wherever your logic page is
  }

  return <button onClick={onLogout}>Logout</button>;
}
