type FloorOperatorInput = number;

export function $floor() {
  return function (value: FloorOperatorInput): number {
    return Math.floor(value);
  };
}
