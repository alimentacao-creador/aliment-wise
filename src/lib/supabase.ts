"use client";
import { createClient as createSB } from "@supabase/supabase-js";
import { env } from "./env";

export function createClient() {
  return createSB(env.NEXT_PUBLIC_SUPABASE_URL!, env.NEXT_PUBLIC_SUPABASE_CHAVE_ANON!);
}