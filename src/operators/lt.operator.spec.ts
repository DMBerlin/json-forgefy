import { $lt } from "./lt.operator";
import { ExecutionContext } from "../interfaces/execution-context.interface";

describe("LtOperator", () => {
  describe("asserting raw values", () => {
    it("should assert correctly for raw values", () => {
      expect($lt()([5, 4])).toBe(false);
      expect($lt()([4, 4])).toBe(false);
      expect($lt()([3, 4])).toBe(true);
    });
  });
  describe("asserting path values", () => {
    it("should assert correctly for path values", () => {
      const ctx: ExecutionContext = { context: { value: 10 } };
      expect($lt(ctx)(["$value", 1])).toBe(false);
      expect($lt(ctx)(["$value", 10])).toBe(false);
      expect($lt(ctx)(["$value", 11])).toBe(true);
      expect($lt(ctx)([1, "$value"])).toBe(true);
      expect($lt(ctx)([10, "$value"])).toBe(false);
      expect($lt(ctx)([11, "$value"])).toBe(false);
    });
  });
  describe("asserting expression values", () => {
    it("should assert correctly for expression values", () => {
      const ctx: ExecutionContext = { context: { value: 10 } };
      expect($lt(ctx)([{ $add: [5, 6] }, "$value"])).toBe(false);
      expect($lt(ctx)([{ $add: [5, 5] }, "$value"])).toBe(false);
      expect($lt(ctx)([{ $add: [5, 4] }, "$value"])).toBe(true);
      expect($lt(ctx)(["$value", { $add: [6, 5] }])).toBe(true);
      expect($lt(ctx)(["$value", { $add: [5, 5] }])).toBe(false);
      expect($lt(ctx)(["$value", { $add: [4, 5] }])).toBe(false);
    });
  });
});
