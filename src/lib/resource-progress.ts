import { isSupabaseConfigured, supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";

export type ResourceType = Tables<"resource_progress">["resource_type"];

export type ResourceProgressRecord = {
  resourceId: string;
  resourceType: ResourceType;
  completed: boolean;
};

const RESOURCE_PROGRESS_CONFLICT_TARGET = "user_id,resource_type,resource_id";
const LOCAL_STORAGE_KEY = "zero-to-ai-hub:resource-progress";

const isBrowser = typeof window !== "undefined" && typeof window.localStorage !== "undefined";

type LocalProgressStore = Record<string, ResourceProgressRecord[]>;

const readLocalProgressStore = (): LocalProgressStore => {
  if (!isBrowser) {
    return {};
  }

  const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!raw) {
    return {};
  }

  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed === "object" && parsed !== null) {
      return parsed as LocalProgressStore;
    }
  } catch (error) {
    console.warn("Falha ao ler progresso local do aluno", error);
  }

  return {};
};

const writeLocalProgressStore = (store: LocalProgressStore) => {
  if (!isBrowser) {
    return;
  }

  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(store));
  } catch (error) {
    console.warn("Falha ao salvar progresso local do aluno", error);
  }
};

export const clearResourceProgressCache = (userId: string) => {
  if (!isBrowser) {
    return;
  }

  const store = readLocalProgressStore();
  if (store[userId]) {
    delete store[userId];
    writeLocalProgressStore(store);
  }
};

export async function fetchResourceProgress(userId: string): Promise<ResourceProgressRecord[]> {
  if (!isSupabaseConfigured) {
    const store = readLocalProgressStore();
    return [...(store[userId] ?? [])];
  }

  const { data, error } = await supabase
    .from("resource_progress")
    .select("resource_id, resource_type, completed")
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message, { cause: error });
  }

  if (!data) {
    return [];
  }

  return data.map((row) => ({
    resourceId: row.resource_id,
    resourceType: row.resource_type,
    completed: row.completed,
  }));
}

export async function upsertResourceProgress(
  userId: string,
  resourceType: ResourceType,
  resourceId: string,
  completed: boolean,
): Promise<void> {
  if (!isSupabaseConfigured) {
    const store = readLocalProgressStore();
    const userRecords = [...(store[userId] ?? [])];

    const existingIndex = userRecords.findIndex(
      (record) => record.resourceId === resourceId && record.resourceType === resourceType,
    );

    if (existingIndex >= 0) {
      userRecords[existingIndex] = { ...userRecords[existingIndex], completed };
    } else {
      userRecords.push({ resourceId, resourceType, completed });
    }

    writeLocalProgressStore({
      ...store,
      [userId]: userRecords,
    });

    return;
  }

  const payload: TablesInsert<"resource_progress"> = {
    user_id: userId,
    resource_type: resourceType,
    resource_id: resourceId,
    completed,
  };

  const { error } = await supabase
    .from("resource_progress")
    .upsert(payload, { onConflict: RESOURCE_PROGRESS_CONFLICT_TARGET });

  if (error) {
    throw new Error(error.message, { cause: error });
  }
}
