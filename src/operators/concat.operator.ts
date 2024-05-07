export function $concat() {
  return function (values: string[]) {
    return values.reduce(
      (accumulator: string, base: string) => accumulator + base,
      "",
    );
  };
}
