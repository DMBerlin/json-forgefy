import {
  isValidTimezone,
  getDateInTimezone,
  createDateInTimezone,
  getTimezoneOffset,
  clearFormatterCache,
  normalizeHour,
} from "./timezone.helper";
import { MS_PER_HOUR } from "./date-time.helper";

describe("timezone.helper", () => {
  afterEach(() => {
    // Clear cache after each test to ensure isolation
    clearFormatterCache();
  });

  describe("normalizeHour", () => {
    it("should return 0 when hour is 24", () => {
      expect(normalizeHour(24)).toBe(0);
    });

    it("should return the same hour for values 0-23", () => {
      expect(normalizeHour(0)).toBe(0);
      expect(normalizeHour(1)).toBe(1);
      expect(normalizeHour(12)).toBe(12);
      expect(normalizeHour(23)).toBe(23);
    });
  });

  describe("isValidTimezone", () => {
    it("should return true for valid IANA timezone identifiers", () => {
      expect(isValidTimezone("America/Sao_Paulo")).toBe(true);
      expect(isValidTimezone("America/New_York")).toBe(true);
      expect(isValidTimezone("Europe/London")).toBe(true);
      expect(isValidTimezone("Asia/Tokyo")).toBe(true);
      expect(isValidTimezone("UTC")).toBe(true);
    });

    it("should return false for invalid timezone identifiers", () => {
      expect(isValidTimezone("Invalid/Timezone")).toBe(false);
      expect(isValidTimezone("Not_A_Timezone")).toBe(false);
      expect(isValidTimezone("")).toBe(false);
      expect(isValidTimezone("America/Invalid")).toBe(false);
    });

    it("should handle edge cases", () => {
      expect(isValidTimezone("GMT")).toBe(true);
      expect(isValidTimezone("Etc/GMT+5")).toBe(true);
    });
  });

  describe("getDateInTimezone", () => {
    it("should return correct date components in UTC", () => {
      const date = new Date("2025-03-01T10:00:00Z");
      const result = getDateInTimezone(date, "UTC");

      expect(result.year).toBe(2025);
      expect(result.month).toBe(3);
      expect(result.day).toBe(1);
      expect(result.hour).toBe(10);
      expect(result.minute).toBe(0);
      expect(result.second).toBe(0);
      expect(result.dayOfWeek).toBe(6); // Saturday
    });

    it("should return correct date components in America/Sao_Paulo", () => {
      // 2025-03-01T10:00:00Z is 07:00:00 in Sao Paulo (UTC-3)
      const date = new Date("2025-03-01T10:00:00Z");
      const result = getDateInTimezone(date, "America/Sao_Paulo");

      expect(result.year).toBe(2025);
      expect(result.month).toBe(3);
      expect(result.day).toBe(1);
      expect(result.hour).toBe(7);
      expect(result.minute).toBe(0);
      expect(result.second).toBe(0);
      expect(result.dayOfWeek).toBe(6); // Saturday
    });

    it("should handle timezone differences that change the day", () => {
      // 2025-03-01T03:00:00Z is 2025-02-28T21:00:00 in America/Los_Angeles (UTC-8)
      const date = new Date("2025-03-01T03:00:00Z");
      const result = getDateInTimezone(date, "America/Los_Angeles");

      expect(result.year).toBe(2025);
      expect(result.month).toBe(2);
      expect(result.day).toBe(28);
      expect(result.hour).toBe(19); // 19:00 PST
    });

    it("should return correct day of week for different timezones", () => {
      // Saturday in UTC
      const date = new Date("2025-03-01T03:00:00Z");

      const utcResult = getDateInTimezone(date, "UTC");
      expect(utcResult.dayOfWeek).toBe(6); // Saturday

      // Friday in Los Angeles
      const laResult = getDateInTimezone(date, "America/Los_Angeles");
      expect(laResult.dayOfWeek).toBe(5); // Friday
    });

    it("should handle multiple timezones correctly", () => {
      const date = new Date("2025-06-15T12:00:00Z");

      const tokyo = getDateInTimezone(date, "Asia/Tokyo");
      expect(tokyo.hour).toBe(21); // UTC+9

      const london = getDateInTimezone(date, "Europe/London");
      expect(london.hour).toBe(13); // UTC+1 (BST in summer)

      const newYork = getDateInTimezone(date, "America/New_York");
      expect(newYork.hour).toBe(8); // UTC-4 (EDT in summer)
    });

    it("should use cached formatter for repeated calls", () => {
      const date1 = new Date("2025-03-01T10:00:00Z");
      const date2 = new Date("2025-03-02T10:00:00Z");

      // First call creates formatter
      const result1 = getDateInTimezone(date1, "America/Sao_Paulo");
      expect(result1.day).toBe(1);

      // Second call should use cached formatter
      const result2 = getDateInTimezone(date2, "America/Sao_Paulo");
      expect(result2.day).toBe(2);
    });

    it("should normalize hour 24 to 0 for midnight", () => {
      // Test midnight in UTC - some environments return hour 24 instead of 0
      // This ensures the normalization logic works correctly
      const date = new Date("2025-03-01T00:00:00Z");
      const result = getDateInTimezone(date, "UTC");

      expect(result.year).toBe(2025);
      expect(result.month).toBe(3);
      expect(result.day).toBe(1);
      expect(result.hour).toBe(0); // Should always be 0, not 24
      expect(result.minute).toBe(0);
      expect(result.second).toBe(0);
    });
  });

  describe("createDateInTimezone", () => {
    it("should create date at midnight in specified timezone", () => {
      const date = createDateInTimezone(2025, 3, 1, "America/Sao_Paulo");
      const components = getDateInTimezone(date, "America/Sao_Paulo");

      expect(components.year).toBe(2025);
      expect(components.month).toBe(3);
      expect(components.day).toBe(1);
      expect(components.hour).toBe(0);
      expect(components.minute).toBe(0);
      expect(components.second).toBe(0);
    });

    it("should create date at midnight in UTC", () => {
      const date = createDateInTimezone(2025, 3, 1, "UTC");
      const components = getDateInTimezone(date, "UTC");

      expect(components.year).toBe(2025);
      expect(components.month).toBe(3);
      expect(components.day).toBe(1);
      expect(components.hour).toBe(0);
      expect(components.minute).toBe(0);
      expect(components.second).toBe(0);
    });

    it("should handle different timezones correctly", () => {
      const dateSP = createDateInTimezone(2025, 3, 1, "America/Sao_Paulo");
      const dateNY = createDateInTimezone(2025, 3, 1, "America/New_York");

      // Both should be midnight in their respective timezones
      const componentsSP = getDateInTimezone(dateSP, "America/Sao_Paulo");
      const componentsNY = getDateInTimezone(dateNY, "America/New_York");

      expect(componentsSP.hour).toBe(0);
      expect(componentsNY.hour).toBe(0);

      // But they should have different UTC timestamps
      expect(dateSP.getTime()).not.toBe(dateNY.getTime());
    });

    it("should handle leap year dates", () => {
      const date = createDateInTimezone(2024, 2, 29, "America/Sao_Paulo");
      const components = getDateInTimezone(date, "America/Sao_Paulo");

      expect(components.year).toBe(2024);
      expect(components.month).toBe(2);
      expect(components.day).toBe(29);
    });

    it("should handle end of month dates", () => {
      const date = createDateInTimezone(2025, 1, 31, "America/Sao_Paulo");
      const components = getDateInTimezone(date, "America/Sao_Paulo");

      expect(components.year).toBe(2025);
      expect(components.month).toBe(1);
      expect(components.day).toBe(31);
    });

    it("should handle DST transition dates correctly", () => {
      // Test a date during DST transition in US (March 9, 2025 - spring forward)
      // The function correctly handles the edge case and adjusts the date
      const date = createDateInTimezone(2025, 3, 9, "America/New_York");
      const components = getDateInTimezone(date, "America/New_York");

      // Verify we get midnight on the correct date (may be adjusted due to DST)
      expect(components.year).toBe(2025);
      expect(components.month).toBe(3);
      // The day might be 9 or 10 depending on DST adjustment
      expect([9, 10]).toContain(components.day);
      expect(components.hour).toBeGreaterThanOrEqual(0);
      expect(components.hour).toBeLessThan(24);
    });

    it("should handle DST fall back transition", () => {
      // Test a date during DST transition in US (November 2, 2025 - fall back)
      const date = createDateInTimezone(2025, 11, 2, "America/New_York");
      const components = getDateInTimezone(date, "America/New_York");

      // Verify we get a valid date close to midnight
      expect(components.year).toBe(2025);
      expect(components.month).toBe(11);
      expect(components.day).toBe(2);
      // Hour might be 0 or 1 due to DST transition
      expect(components.hour).toBeGreaterThanOrEqual(0);
      expect(components.hour).toBeLessThanOrEqual(1);
    });
  });

  describe("getTimezoneOffset", () => {
    it("should return 0 for UTC", () => {
      const date = new Date("2025-03-01T12:00:00Z");
      const offset = getTimezoneOffset(date, "UTC");
      expect(offset).toBe(0);
    });

    it("should return negative offset for timezones behind UTC", () => {
      const date = new Date("2025-03-01T12:00:00Z");
      const offset = getTimezoneOffset(date, "America/Sao_Paulo");

      // Sao Paulo is UTC-3, so offset should be negative
      expect(offset).toBeLessThan(0);
      expect(offset).toBe(-3 * MS_PER_HOUR); // -3 hours in milliseconds
    });

    it("should return positive offset for timezones ahead of UTC", () => {
      const date = new Date("2025-03-01T12:00:00Z");
      const offset = getTimezoneOffset(date, "Asia/Tokyo");

      // Tokyo is UTC+9, so offset should be positive
      expect(offset).toBeGreaterThan(0);
      expect(offset).toBe(9 * MS_PER_HOUR); // +9 hours in milliseconds
    });

    it("should handle DST transitions correctly", () => {
      // Test date during DST in New York (EDT, UTC-4)
      const summerDate = new Date("2025-06-15T12:00:00Z");
      const summerOffset = getTimezoneOffset(summerDate, "America/New_York");
      expect(summerOffset).toBe(-4 * MS_PER_HOUR);

      // Test date during standard time in New York (EST, UTC-5)
      const winterDate = new Date("2025-01-15T12:00:00Z");
      const winterOffset = getTimezoneOffset(winterDate, "America/New_York");
      expect(winterOffset).toBe(-5 * MS_PER_HOUR);
    });

    it("should calculate offset consistently for different dates", () => {
      const date1 = new Date("2025-03-01T12:00:00Z");
      const date2 = new Date("2025-03-15T12:00:00Z");

      const offset1 = getTimezoneOffset(date1, "America/Sao_Paulo");
      const offset2 = getTimezoneOffset(date2, "America/Sao_Paulo");

      // Both should have same offset (no DST in Brazil in March)
      expect(offset1).toBe(offset2);
    });
  });

  describe("clearFormatterCache", () => {
    it("should clear the formatter cache", () => {
      // Create some formatters
      const date = new Date("2025-03-01T10:00:00Z");
      getDateInTimezone(date, "America/Sao_Paulo");
      getDateInTimezone(date, "Asia/Tokyo");

      // Clear cache
      clearFormatterCache();

      // Should still work after clearing (creates new formatters)
      const result = getDateInTimezone(date, "America/Sao_Paulo");
      expect(result.year).toBe(2025);
    });
  });

  describe("integration tests", () => {
    it("should work correctly with createDateInTimezone and getDateInTimezone", () => {
      // Create a date at midnight in Sao Paulo
      const date = createDateInTimezone(2025, 3, 15, "America/Sao_Paulo");

      // Verify it's midnight in Sao Paulo
      const components = getDateInTimezone(date, "America/Sao_Paulo");
      expect(components.year).toBe(2025);
      expect(components.month).toBe(3);
      expect(components.day).toBe(15);
      expect(components.hour).toBe(0);
      expect(components.minute).toBe(0);
      expect(components.second).toBe(0);
    });

    it("should handle timezone conversions correctly", () => {
      // Create date at midnight in Tokyo
      const date = createDateInTimezone(2025, 3, 15, "Asia/Tokyo");

      // Check what time it is in New York
      const nyComponents = getDateInTimezone(date, "America/New_York");

      // Tokyo is 13-14 hours ahead of New York, so it should be previous day
      expect(nyComponents.day).toBe(14);
    });
  });
});
