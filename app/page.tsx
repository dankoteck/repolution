import { HomePage } from "./components/home";
import LogoutButton from "./components/shared/logout-button";

export default function Home() {
  return (
    <main className="">
      <HomePage />
      <LogoutButton />
    </main>
  );
}
