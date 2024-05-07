export function slice() {
  return function (value: string, start: number, end: number) {
    return value.slice(start, end);
  };
}
