import { Cache } from "@urql/exchange-graphcache";

export function invalidateQuery(cache: Cache, fieldName: string) {
  const key = "Query";
  cache
    .inspectFields(key)
    .filter((field) => field.fieldName === fieldName)
    .forEach((field) => {
      cache.invalidate(key, field.fieldKey);
    });
}
