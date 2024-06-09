import { $gte } from "./gte.operator";
import { ExecutionContext } from "../interfaces/execution-context.interface";

describe("GteOperator", () => {
  describe("asserting raw values", () => {
    it("should assert correctly for raw values", () => {
      expect($gte()([5, 4])).toBe(true);
      expect($gte()([4, 4])).toBe(true);
      expect($gte()([3, 4])).toBe(false);
    });
  });
  describe("asserting path values", () => {
    it("should assert correctly for path values", () => {
      const ctx: ExecutionContext = { context: { value: 10 } };
      expect($gte(ctx)(["$value", 1])).toBe(true);
      expect($gte(ctx)(["$value", 10])).toBe(true);
      expect($gte(ctx)(["$value", 11])).toBe(false);
      expect($gte(ctx)([1, "$value"])).toBe(false);
      expect($gte(ctx)([10, "$value"])).toBe(true);
      expect($gte(ctx)([11, "$value"])).toBe(true);
    });
  });
  describe("asserting expression values", () => {
    it("should assert correctly for expression values", () => {
      const ctx: ExecutionContext = { context: { value: 10 } };
      expect($gte(ctx)([{ $add: [5, 6] }, "$value"])).toBe(true);
      expect($gte(ctx)([{ $add: [5, 5] }, "$value"])).toBe(true);
      expect($gte(ctx)([{ $add: [5, 4] }, "$value"])).toBe(false);
      expect($gte(ctx)(["$value", { $add: [6, 5] }])).toBe(false);
      expect($gte(ctx)(["$value", { $add: [5, 5] }])).toBe(true);
      expect($gte(ctx)(["$value", { $add: [4, 5] }])).toBe(true);
    });
  });
});
