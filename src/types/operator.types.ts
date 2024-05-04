export type OperatorKey =
  | "$ifNull"
  | "$multiply"
  | "$toNumber"
  | "$toString"
  | "$toUpper";

export type OperatorValue = (
  source?: Record<string, any>,
) => (...args: any[]) => any;
