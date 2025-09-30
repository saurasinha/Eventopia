"use client";
import { Button } from "@eventopia/ui";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/login");
  };

  return (
    <div>
      <h1>Welcome to Eventopia 🎉</h1>
      <Button onClick={handleClick}>Click Me</Button>
    </div>
  );
}
