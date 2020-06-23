export function wellDefinedOnly<T>(arr: (T | null | undefined)[]): T[] {
  return arr.filter((t) => t !== null && t !== undefined) as T[];
}
