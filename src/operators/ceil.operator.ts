type CeilOperatorInput = number;

export function $ceil() {
  return function (value: CeilOperatorInput): number {
    return Math.ceil(value);
  };
}
