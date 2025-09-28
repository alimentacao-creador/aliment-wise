"use client";

import { useEffect } from "react";
import { enterDemo } from "@/lib/demo";
import { useRouter } from "next/navigation";

export default function EntrarPage() {
  const router = useRouter();
  
  useEffect(() => {
    enterDemo();
    router.replace("/dashboard");
  }, [router]);
  
  return null;
}