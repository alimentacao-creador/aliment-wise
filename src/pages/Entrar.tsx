"use client";

import { useEffect } from "react";
import { enterDemo } from "@/lib/demo";
import { useNavigate } from "react-router-dom";

export default function EntrarPage() {
  const navigate = useNavigate();
  
  useEffect(() => {
    enterDemo();
    navigate("/dashboard");
  }, [navigate]);
  
  return null;
}