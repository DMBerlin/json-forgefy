import { $lte } from "./lte.operator";
import { ExecutionContext } from "../interfaces/execution-context.interface";

describe("LteOperator", () => {
  describe("asserting raw values", () => {
    it("should assert correctly for raw values", () => {
      expect($lte()([5, 4])).toBe(false);
      expect($lte()([4, 4])).toBe(true);
      expect($lte()([3, 4])).toBe(true);
    });
  });
  describe("asserting path values", () => {
    it("should assert correctly for path values", () => {
      const ctx: ExecutionContext = { context: { value: 10 } };
      expect($lte(ctx)(["$value", 1])).toBe(false);
      expect($lte(ctx)(["$value", 10])).toBe(true);
      expect($lte(ctx)(["$value", 11])).toBe(true);
      expect($lte(ctx)([1, "$value"])).toBe(true);
      expect($lte(ctx)([10, "$value"])).toBe(true);
      expect($lte(ctx)([11, "$value"])).toBe(false);
    });
  });
  describe("asserting expression values", () => {
    it("should assert correctly for expression values", () => {
      const ctx: ExecutionContext = { context: { value: 10 } };
      expect($lte(ctx)([{ $add: [5, 6] }, "$value"])).toBe(false);
      expect($lte(ctx)([{ $add: [5, 5] }, "$value"])).toBe(true);
      expect($lte(ctx)([{ $add: [5, 4] }, "$value"])).toBe(true);
      expect($lte(ctx)(["$value", { $add: [6, 5] }])).toBe(true);
      expect($lte(ctx)(["$value", { $add: [5, 5] }])).toBe(true);
      expect($lte(ctx)(["$value", { $add: [4, 5] }])).toBe(false);
    });
  });
});
