export function split() {
  return function (value: string, delimiter: string) {
    return value.split(delimiter);
  };
}
