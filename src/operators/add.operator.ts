type AddOperatorInput = number[];

export function $add() {
  return function (value: AddOperatorInput): number {
    return value.reduce(
      (accumulator: number, base: number) => accumulator + base,
      0,
    );
  };
}
