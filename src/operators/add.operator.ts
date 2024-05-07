export function $add() {
  return function (values: number[]) {
    return values.reduce(
      (accumulator: number, base: number) => accumulator + base,
      0,
    );
  };
}
