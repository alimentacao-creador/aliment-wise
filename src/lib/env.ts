import { z } from "zod";

const EnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_CHAVE_ANON: z.string().min(10),
  SUPABASE_CHAVE_ROLE: z.string().min(10).optional(),
  NEXT_PUBLIC_URL_APLICACAO: z.string().optional(),
  CRON_SEGREDO: z.string().optional(),
  EMAIL_REMETENTE: z.string().optional(),
  EMAIL_CHAVE_PROVEDOR: z.string().optional(),
  GEMINI_CHAVE_API: z.string().optional(),
  GEMINI_MODELO_IMAGEM: z.string().optional(),
  GEMINI_MODELO_TEXTO: z.string().optional(),
  SHOPIFY_STORE_DOMAIN: z.string().optional(),
  SHOPIFY_API_KEY: z.string().optional(),
  SHOPIFY_ADMIN_TOKEN: z.string().optional(),
  SHOPIFY_WEBHOOK_SECRET: z.string().optional(),
});

export const env = EnvSchema.parse(process.env);