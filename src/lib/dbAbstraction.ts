export type DbProvider = "postgres" | "neon" | "supabase" | "d1" | "memory";

export interface DbRecord {
  id: string;
  [key: string]: unknown;
}

export interface DbAdapter {
  provider: DbProvider;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  isConnected(): boolean;
  upsert(collection: string, record: DbRecord): Promise<void>;
  getById(collection: string, id: string): Promise<DbRecord | null>;
  list(collection: string): Promise<DbRecord[]>;
  remove(collection: string, id: string): Promise<boolean>;
}

class MemoryDbAdapter implements DbAdapter {
  provider: DbProvider = "memory";
  private connected = false;
  private store = new Map<string, Map<string, DbRecord>>();

  async connect(): Promise<void> {
    this.connected = true;
  }

  async disconnect(): Promise<void> {
    this.connected = false;
  }

  isConnected(): boolean {
    return this.connected;
  }

  async upsert(collection: string, record: DbRecord): Promise<void> {
    this.assertConnected();
    if (!this.store.has(collection)) {
      this.store.set(collection, new Map());
    }
    this.store.get(collection)!.set(record.id, { ...record });
  }

  async getById(collection: string, id: string): Promise<DbRecord | null> {
    this.assertConnected();
    const result = this.store.get(collection)?.get(id);
    return result ? { ...result } : null;
  }

  async list(collection: string): Promise<DbRecord[]> {
    this.assertConnected();
    return Array.from(this.store.get(collection)?.values() || []).map((v) => ({
      ...v,
    }));
  }

  async remove(collection: string, id: string): Promise<boolean> {
    this.assertConnected();
    return this.store.get(collection)?.delete(id) || false;
  }

  private assertConnected(): void {
    if (!this.connected) {
      throw new Error("DB adapter is not connected");
    }
  }
}

export function _createDbAdapter(provider: DbProvider): DbAdapter {
  // For now, route future providers through the same adapter contract.
  if (provider === "memory") {
    return new MemoryDbAdapter();
  }

  // Placeholder adapter to preserve portability API until concrete providers are wired.
  return {
    provider,
    async connect() {
      return;
    },
    async disconnect() {
      return;
    },
    isConnected() {
      return true;
    },
    async upsert() {
      throw new Error(`${provider} adapter not implemented yet`);
    },
    async getById() {
      throw new Error(`${provider} adapter not implemented yet`);
    },
    async list() {
      throw new Error(`${provider} adapter not implemented yet`);
    },
    async remove() {
      throw new Error(`${provider} adapter not implemented yet`);
    },
  };
}

export function _getPortableProviderOrder(): DbProvider[] {
  return ["postgres", "neon", "supabase", "d1", "memory"];
}
