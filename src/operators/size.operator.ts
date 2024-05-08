type SizeOperatorInput = number[];

export function $size() {
  return function (values: SizeOperatorInput) {
    return values.length;
  };
}
