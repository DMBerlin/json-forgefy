import { $gt } from "./gt.operator";
import { ExecutionContext } from "@interfaces/execution-context.interface";

describe("GtOperator", () => {
  describe("asserting raw values", () => {
    it("should assert correctly for raw values", () => {
      expect($gt()([5, 4])).toBe(true);
      expect($gt()([4, 4])).toBe(false);
      expect($gt()([3, 4])).toBe(false);
    });
  });
  describe("asserting path values", () => {
    it("should assert correctly for path values", () => {
      const ctx: ExecutionContext = { context: { value: 10 } };
      expect($gt(ctx)(["$value", 1])).toBe(true);
      expect($gt(ctx)(["$value", 10])).toBe(false);
      expect($gt(ctx)(["$value", 11])).toBe(false);
      expect($gt(ctx)([1, "$value"])).toBe(false);
      expect($gt(ctx)([10, "$value"])).toBe(false);
      expect($gt(ctx)([11, "$value"])).toBe(true);
    });
  });
  describe("asserting expression values", () => {
    it("should assert correctly for expression values", () => {
      const ctx: ExecutionContext = { context: { value: 10 } };
      expect($gt(ctx)([{ $add: [5, 6] }, "$value"])).toBe(true);
      expect($gt(ctx)([{ $add: [5, 5] }, "$value"])).toBe(false);
      expect($gt(ctx)([{ $add: [5, 4] }, "$value"])).toBe(false);
      expect($gt(ctx)(["$value", { $add: [6, 5] }])).toBe(false);
      expect($gt(ctx)(["$value", { $add: [5, 5] }])).toBe(false);
      expect($gt(ctx)(["$value", { $add: [4, 5] }])).toBe(true);
    });
  });
});
