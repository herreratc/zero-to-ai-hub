import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

type SupabaseClientType = ReturnType<typeof createClient<Database>>;

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY);

const createMockSupabaseClient = (): SupabaseClientType => {
  const authNotConfiguredResponse = async () => ({
    data: { user: null, session: null },
    error: {
      message: "Supabase não está configurado. Defina VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY.",
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
    "Supabase environment variables are missing. The app is running in offline mode with local persistence only.",
  );
}
