export function $ifNull() {
  return function (value: any, defaultValue: any) {
    return value ?? defaultValue;
  };
}
