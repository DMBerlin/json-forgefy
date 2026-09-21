import { OperatorKey } from "./operator.types";

export type Expression = { [K in OperatorKey]?: ExpressionValues };

type NestedExpression = { [key: string]: ExpressionValues };

export type ExpressionValues =
  | string
  | null
  | undefined
  | number
  | boolean
  | Expression
  | ExpressionValues[]
  | NestedExpression;

export type Projection = { [key: string]: 1 | 0 | ExpressionValues };
