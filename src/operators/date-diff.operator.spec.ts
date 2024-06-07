import { $dateDiff } from "../operators/date-diff.operator";
import { DateDiffOperatorInput } from "../types/operator-input.types";
import { diffInDays } from "../helpers/date-time.heper";

describe("DateDiff operator", () => {
  it("should return the difference between two dates", () => {
    const dates: DateDiffOperatorInput = {
      startDate: "2021-01-01",
      endDate: "2021-01-05",
      unit: "days",
    };
    const result: number = $dateDiff()(dates);
    expect(result).toBe(4);
  });
  it("should return 0 if the dates are the same", () => {
    const dates: DateDiffOperatorInput = {
      startDate: "2021-01-01",
      endDate: "2021-01-01",
      unit: "days",
    };
    const result: number = $dateDiff()(dates);
    expect(result).toBe(0);
  });
  it("should return 0 if only one date is provided", () => {
    const dates: DateDiffOperatorInput = {
      startDate: "2021-01-01",
      endDate: "",
      unit: "days",
    };
    const daysDiff: number = diffInDays(new Date(dates.startDate), new Date());
    const result: number = $dateDiff()(dates);
    expect(result).toBe(daysDiff);
  });
  it("should return the difference between two dates with different formats", () => {
    const dates: DateDiffOperatorInput = {
      startDate: "2021-01-01",
      endDate: "01/05/2021",
      unit: "days",
    };
    const result: number = $dateDiff()(dates);
    expect(result).toBe(5);
  });
  it("should return the difference between two dates with different formats", () => {
    const dates: DateDiffOperatorInput = {
      startDate: "01/05/2021",
      endDate: "2021-01-01",
      unit: "days",
    };
    const result: number = $dateDiff()(dates);
    expect(result).toBe(5);
  });
  it("should return the difference between two dates with different formats", () => {
    const dates: DateDiffOperatorInput = {
      startDate: "01/01/2021",
      endDate: "01/05/2021",
      unit: "days",
    };
    const result: number = $dateDiff()(dates);
    expect(result).toBe(4);
  });
  it("should return the difference in months between two dates with different formats", () => {
    const dates: DateDiffOperatorInput = {
      startDate: "01/01/2021",
      endDate: "01/05/2021",
      unit: "months",
    };
    const result: number = $dateDiff()(dates);
    expect(result).toBe(0);
  });
  it("should return the difference in years between two dates with different formats", () => {
    const dates: DateDiffOperatorInput = {
      startDate: "01/01/2021",
      endDate: "01/05/2021",
      unit: "years",
    };
    const result: number = $dateDiff()(dates);
    expect(result).toBe(0);
  });
  it("should throw error if invalid unit is provided", () => {
    const dates: DateDiffOperatorInput = {
      startDate: "01/01/2021",
      endDate: "01/05/2021",
      // @ts-expect-error-next-line
      unit: "weeks",
    };
    expect(() => $dateDiff()(dates)).toThrow("Invalid unit: weeks");
  });
  it("should use current date on invalid end date", () => {
    const dates: DateDiffOperatorInput = {
      startDate: "01/01/2021",
      endDate: "invalid",
      unit: "days",
    };
    const daysDiff: number = diffInDays(new Date(dates.startDate), new Date());
    const result: number = $dateDiff()(dates);
    expect(result).toBe(daysDiff);
  });
  it("should use current date on invalid end date", () => {
    const dates: DateDiffOperatorInput = {
      startDate: "invalid",
      endDate: new Date().toLocaleDateString(),
      unit: "days",
    };
    const daysDiff: number = diffInDays(new Date(), new Date(dates.endDate));
    const result: number = $dateDiff()(dates);
    expect(result).toBe(daysDiff);
  });
});
