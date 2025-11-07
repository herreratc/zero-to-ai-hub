import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";

export type ResourceType = Tables<"resource_progress">["resource_type"];

export type ResourceProgressRecord = {
  resourceId: string;
  resourceType: ResourceType;
  completed: boolean;
};

const RESOURCE_PROGRESS_CONFLICT_TARGET = "user_id,resource_type,resource_id";

export async function fetchResourceProgress(userId: string): Promise<ResourceProgressRecord[]> {
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
