import {
  diffInDays,
  diffInMonths,
  diffInYears,
} from "../helpers/date-time.heper";

describe("DateTimeHelper", () => {
  let startDate: Date;
  let endDate: Date;

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
  });
});
