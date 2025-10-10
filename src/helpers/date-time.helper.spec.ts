import {
  diffInDays,
  diffInMonths,
  diffInYears,
  isValidDateString,
} from "@helpers/date-time.heper";

describe("DateTimeHelper", () => {
  let startDate: Date;
  let endDate: Date;

  describe("isValidDateString", () => {
    it("should return true for valid date strings", () => {
      expect(isValidDateString("2024-01-01")).toBe(true);
      expect(isValidDateString("2024-01-01T10:30:00Z")).toBe(true);
      expect(isValidDateString("January 1, 2024")).toBe(true);
      expect(isValidDateString("01/01/2024")).toBe(true);
    });

    it("should return false for invalid date strings", () => {
      expect(isValidDateString("invalid-date")).toBe(false);
      expect(isValidDateString("")).toBe(false);
      expect(isValidDateString("not a date")).toBe(false);
    });
  });

  describe("diffInDays", () => {
    it("should return 0 when the dates are the same", () => {
      startDate = new Date("2020-01-01");
      endDate = new Date("2020-01-01");
      expect(diffInDays(startDate, startDate)).toBe(0);
    });
    it("should return 1 when the dates are one day apart", () => {
      startDate = new Date("2020-01-01");
      endDate = new Date("2020-01-02");
      expect(diffInDays(startDate, endDate)).toBe(1);
    });
    it("should return 2 when the dates are two days apart", () => {
      startDate = new Date("2020-01-01");
      endDate = new Date("2020-01-03");
      expect(diffInDays(startDate, endDate)).toBe(2);
    });
    it("should return absolute difference regardless of order", () => {
      startDate = new Date("2020-01-05");
      endDate = new Date("2020-01-01");
      expect(diffInDays(startDate, endDate)).toBe(4);
      expect(diffInDays(endDate, startDate)).toBe(4);
    });
  });
  describe("diffInMonths", () => {
    it("should return 0 when the months are the same", () => {
      startDate = new Date("2020-01-01");
      endDate = new Date("2020-01-01");
      expect(diffInMonths(startDate, endDate)).toBe(0);
    });
    it("should return 1 when the dates are one month apart", () => {
      startDate = new Date("2020-01-01");
      endDate = new Date("2020-02-01");
      expect(diffInMonths(startDate, endDate)).toBe(1);
    });
    it("should return 2 when the dates are two months apart", () => {
      startDate = new Date("2020-01-01");
      endDate = new Date("2020-03-01");
      expect(diffInMonths(startDate, endDate)).toBe(2);
    });
    it("should return negative when end date is before start date", () => {
      startDate = new Date("2020-03-01");
      endDate = new Date("2020-01-01");
      expect(diffInMonths(startDate, endDate)).toBeLessThan(0);
    });
  });
  describe("diffInYears", () => {
    it("should return 0 when the dates are the same", () => {
      startDate = new Date("2020-01-01");
      endDate = new Date("2020-01-01");
      expect(diffInYears(startDate, endDate)).toBe(0);
    });
    it("should return 1 when the dates are one year apart", () => {
      startDate = new Date("2020-01-01");
      endDate = new Date("2021-02-01");
      expect(diffInYears(startDate, endDate)).toBe(1);
    });
    it("should return 2 when the dates are two years apart", () => {
      startDate = new Date("2020-01-01");
      endDate = new Date("2022-03-01");
      expect(diffInYears(startDate, endDate)).toBe(2);
    });
    it("should return negative when end date is before start date", () => {
      startDate = new Date("2022-01-01");
      endDate = new Date("2020-01-01");
      expect(diffInYears(startDate, endDate)).toBeLessThan(0);
    });
  });
});
