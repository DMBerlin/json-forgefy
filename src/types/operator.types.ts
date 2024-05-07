export type OperatorKey =
  | "$ifNull"
  | "$multiply"
  | "$toNumber"
  | "$toString"
  | "$divide"
  | "$add"
  | "$subtract"
  | "$toUpper"
  | "$toLower"
  | "$concat"
  | "$size"
  | "$substr"
  | "$slice"
  | "$split"
  | "$eq"
  | "$switch"
  | "$cond";

export type OperatorValue = (
  source?: Record<string, any>,
) => (...args: any[]) => any;
