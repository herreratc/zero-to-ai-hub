import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

type SupabaseClientType = ReturnType<typeof createClient<Database>>;

const SUPABASE_URL = "https://yhxkudknfpagrrlsparr.supabase.co";

type GlobalWithOptionalProcess = typeof globalThis & {
  process?: { env?: Record<string, string | undefined> };
};

const runtimeSupabaseKey =
  typeof globalThis !== "undefined"
    ? (globalThis as GlobalWithOptionalProcess).process?.env?.SUPABASE_KEY
    : undefined;
const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? runtimeSupabaseKey;

export const isSupabaseConfigured = Boolean(SUPABASE_PUBLISHABLE_KEY);

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
    "Supabase environment variables are missing. Set SUPABASE_KEY or VITE_SUPABASE_PUBLISHABLE_KEY to enable the online mode.",
  );
}
