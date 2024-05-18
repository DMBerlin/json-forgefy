import { OperatorKey } from "./operator.types";

export type Expression = { [K in OperatorKey]?: ExpressionValues };

type NestedExpression = { [key: string]: ExpressionValues };

type ExpressionValues =
  | string
  | number
  | boolean
  | Expression
  | ExpressionValues[]
  | NestedExpression;

export type Projection = { [key: string]: 1 | 0 | ExpressionValues };
