export function getValueByPath(
  source: Record<string, unknown>,
  path: string,
): unknown {
  return path.at(0) === "$"
    ? path
        .slice(1)
        .split(".")
        .reduce((obj: Record<string, any>, key: string) => obj[key], source)
    : undefined;
}
