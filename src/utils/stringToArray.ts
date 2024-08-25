export function splitStringToArray(
  input: string,
  separator: string = ";",
): string[] {
  if (!input || input.trim() === separator) {
    return [input];
  }

  // Split the input string by the separator
  const newArray = input.split(separator);

  // Filter out any empty strings if they exist
  return newArray.filter((item) => item.trim() !== "");
}
