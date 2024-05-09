type AbsOperatorInput = number;

export function $abs() {
  return function (value: AbsOperatorInput): number {
    return Math.abs(value);
  };
}
