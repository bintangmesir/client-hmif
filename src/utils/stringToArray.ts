export function splitStringToArray(
  input: string,
  separator: string = ";",
): string[] {
  return input.split(separator);
}
