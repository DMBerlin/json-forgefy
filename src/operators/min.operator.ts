type MinOperatorInput = number[];

export function $min() {
  return function (values: MinOperatorInput) {
    return Math.min(...values);
  };
}
