export interface CommonDisplayer {
  name: string;
  abbreviation?: string;
}
export function isCommondDisplayer(c: any): c is CommonDisplayer {
  if (c === null || typeof c !== "object") {
    return false;
  }
  return typeof c.name === "string";
}
