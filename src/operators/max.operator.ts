type MaxOperatorInput = number[];

export function $max() {
  return function (values: MaxOperatorInput) {
    return Math.max(...values);
  };
}
