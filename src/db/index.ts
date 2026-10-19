import { createFileStore } from "@/db/store-file";
import { createPostgresStore } from "@/db/store-postgres";
import type { Store } from "@/db/store";

const globalForDb = globalThis as typeof globalThis & {
  __angelStore?: Store;
};

/**
 * Com DATABASE_URL usa PostgreSQL; sem ela, um arquivo local.
 * Criado só no primeiro uso, para o build não precisar de banco.
 */
export function getStore(): Store {
  if (!globalForDb.__angelStore) {
    const databaseUrl = process.env.DATABASE_URL;
    globalForDb.__angelStore = databaseUrl
      ? createPostgresStore(databaseUrl)
      : createFileStore();
  }
  return globalForDb.__angelStore;
}
