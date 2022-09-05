export function ellipsis(str: string, maxLength: number = 250): string {
  return str.length > maxLength ? str.substring(0, maxLength) + "..." : str;
}
