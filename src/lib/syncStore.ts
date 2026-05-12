export type SyncEntityType = "projects" | "presets" | "runs" | "recipes";

export interface SyncEntity {
  id: string;
  projectId?: string;
  updatedAt: string;
  payload: Record<string, unknown>;
}

export interface SyncStore {
  projects: Record<string, SyncEntity>;
  presets: Record<string, SyncEntity>;
  runs: Record<string, SyncEntity>;
  recipes: Record<string, SyncEntity>;
}

const globalRef = globalThis as typeof globalThis & {
  __WTE_SYNC_STORE__?: SyncStore;
};

function getStore(): SyncStore {
  if (!globalRef.__WTE_SYNC_STORE__) {
    globalRef.__WTE_SYNC_STORE__ = {
      projects: {},
      presets: {},
      runs: {},
      recipes: {},
    };
  }
  return globalRef.__WTE_SYNC_STORE__;
}

export function _listSyncEntities(type: SyncEntityType): SyncEntity[] {
  return Object.values(getStore()[type]);
}

export function _upsertSyncEntity(
  type: SyncEntityType,
  entity: SyncEntity,
): SyncEntity {
  const store = getStore();
  const current = store[type][entity.id];

  if (current) {
    const incomingTs = new Date(entity.updatedAt).getTime();
    const currentTs = new Date(current.updatedAt).getTime();

    if (
      Number.isFinite(incomingTs) &&
      Number.isFinite(currentTs) &&
      incomingTs < currentTs
    ) {
      return current;
    }
  }

  store[type][entity.id] = entity;
  return entity;
}

export function _removeSyncEntity(type: SyncEntityType, id: string): boolean {
  const store = getStore();
  if (!store[type][id]) return false;
  delete store[type][id];
  return true;
}
