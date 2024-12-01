"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import userLogout from "@/lib/actions/userLogout";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const { success, error } = await userLogout();

    if (success) {
      router.push("/login");
    }
    if (error) {
      console.warn("error", error);
    }
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};

export default LogoutButton;
