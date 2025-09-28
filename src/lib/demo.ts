"use client";

export const DEMO_KEY = "demo";

export const isDemo = () => (
  typeof window !== "undefined" && 
  localStorage.getItem(DEMO_KEY) === "true"
);

export const enterDemo = () => {
  if (typeof window !== "undefined") {
    localStorage.setItem(DEMO_KEY, "true");
  }
};

export const exitDemo = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(DEMO_KEY);
  }
};