type AddOperatorInput = number[];

export function $add() {
  return function (value: AddOperatorInput) {
    return value.reduce(
      (accumulator: number, base: number) => accumulator + base,
      0,
    );
  };
}
