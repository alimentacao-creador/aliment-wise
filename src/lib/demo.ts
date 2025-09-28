"use client";
export const demoKey = "aiapp_demo";
export function isDemo() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(demoKey) === "true";
}
export function enterDemo() {
  if (typeof window !== "undefined") localStorage.setItem(demoKey, "true");
}
export function exitDemo() {
  if (typeof window !== "undefined") localStorage.removeItem(demoKey);
}