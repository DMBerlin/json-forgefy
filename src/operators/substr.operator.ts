export function substr() {
  return function (value: string, start: number, length: number) {
    return value.substring(start, start + length);
  };
}
