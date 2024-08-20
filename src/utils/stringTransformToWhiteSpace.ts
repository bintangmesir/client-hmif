export function stringTransformToWhiteSpace(inputString: string) {
  const transformedString = inputString
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/^./, (str) => str.toUpperCase());

  return transformedString;
}
