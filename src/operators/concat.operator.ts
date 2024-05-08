type ConcatOperatorInput = string[];

export function $concat() {
  return function (value: ConcatOperatorInput) {
    return value.reduce(
      (accumulator: string, base: string) => accumulator + base,
      "",
    );
  };
}
