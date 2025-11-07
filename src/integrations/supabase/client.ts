import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

type SupabaseClientType = ReturnType<typeof createClient<Database>>;

const DEFAULT_SUPABASE_URL = "https://yhxkudknfpagrrlsparr.supabase.co";

type GlobalWithOptionalProcess = typeof globalThis & {
  process?: { env?: Record<string, string | undefined> };
};

const runtimeEnv =
  typeof globalThis !== "undefined"
    ? (globalThis as GlobalWithOptionalProcess).process?.env ?? {}
    : {};

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL ??
  runtimeEnv.VITE_SUPABASE_URL ??
  runtimeEnv.SUPABASE_URL ??
  DEFAULT_SUPABASE_URL;

const runtimeSupabaseKey = runtimeEnv.VITE_SUPABASE_PUBLISHABLE_KEY ?? runtimeEnv.SUPABASE_KEY;

const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? runtimeSupabaseKey;

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY);

const createMockSupabaseClient = (): SupabaseClientType => {
  const authNotConfiguredResponse = async () => ({
    data: { user: null, session: null },
    error: {
      message:
        "Supabase não está configurado. Defina SUPABASE_KEY ou VITE_SUPABASE_PUBLISHABLE_KEY.",
      name: "AuthApiError",
      status: 400,
    } as unknown,
  });

  return {
    auth: {
      onAuthStateChange: () => ({
        data: {
          subscription: {
            unsubscribe: () => {},
          },
        },
      }),
      getSession: async () => ({
        data: { session: null },
        error: null,
      }),
      signOut: async () => ({ error: null }),
      signInWithPassword: authNotConfiguredResponse,
      signUp: authNotConfiguredResponse,
    },
    from: () => ({
      select: () => ({
        eq: async () => ({
          data: [],
          error: null,
        }),
      }),
      upsert: async () => ({ error: null }),
    }),
  } as unknown as SupabaseClientType;
};

export const supabase = isSupabaseConfigured
  ? createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
      auth: {
        storage: localStorage,
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : createMockSupabaseClient();

if (!isSupabaseConfigured) {
  console.warn(
    "Supabase environment variables are missing. Provide SUPABASE_KEY (and optionally SUPABASE_URL) or their VITE_ equivalents to enable the online mode.",
  );
}
