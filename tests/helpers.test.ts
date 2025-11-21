import { describe, it, expect } from "vitest";
import {
  getAngleFromDb,
  getDbFromAngle,
  clampAngle,
} from "../src/utils/helpers";

// getAngleFromDb formula:
// ((-30 - -25) / (5 - -25)) * (256 - 10) + 10;

describe("convert dB to angle via getAngleFromDb", () => {
  it("convert default negative valid value to angle", () => {
    expect(getAngleFromDb(-5)).toBeCloseTo(174);
  });

  it("convert positive valid value to angle", () => {
    expect(getAngleFromDb(5)).toBeCloseTo(256);
  });

  it("convert negative invalid value to angle", () => {
    expect(getAngleFromDb(-30)).toBeCloseTo(-31);
  });
});

// we can allow for 'any user input' and then we clamp values to 10-256 degrees
// getDbFromAngle formula:
// ((133 - 10) / (256 - 10)) * (5 - -25) + -25;

// BOUNDARY TESTS
describe("boundary values for getDbFromAngle", () => {
  it("should map MIN_ROTATION_ANGLE (10) to MIN_DB (-25)", () => {
    expect(getDbFromAngle(10)).toBeCloseTo(-25);
  });

  it("should map MAX_ROTATION_ANGLE (256) to MAX_DB (5)", () => {
    expect(getDbFromAngle(256)).toBeCloseTo(5);
  });
});

// VALID RANGE TESTS
describe("valid angles within range", () => {
  it("should map angle 133 (roughly mid-point) to approx. -10dB", () => {
    expect(getDbFromAngle(133)).toBe(-10);
  });

  it("should interpolate angle 50 to a negative dB value", () => {
    const result = getDbFromAngle(50);
    expect(result).toBeLessThan(0);
    expect(result).toBeGreaterThan(-25);
  });
});

// OUT OF BOUNDS TESTS
describe("angles outside valid range", () => {
  it("should handle angles below MIN_ROTATION_ANGLE", () => {
    // clamping happens after input within handleWindowMouseMove
    const result = getDbFromAngle(0);
    expect(result).toBeLessThan(-25); // Should be more negative
  });

  it("should handle angles above MAX_ROTATION_ANGLE (extrapolation)", () => {
    // If angle is 300 (above 256), it should extrapolate
    const result = getDbFromAngle(300);
    expect(result).toBeGreaterThan(5); // Should be more positive
  });
});

// INVERSE FUNCTION TESTS
describe("round-trip with inverse function", () => {
  it("should recover original dB value after angle conversion", () => {
    const originalDb = -10;
    const angle = getAngleFromDb(originalDb);
    const updatedDb = getDbFromAngle(angle);

    expect(updatedDb).toBeCloseTo(originalDb);
  });

  it("should round-trip boundary values", () => {
    const boundaryDb = [-25, 5];
    boundaryDb.forEach((dB) => {
      const angle = getAngleFromDb(dB);
      const updatedDb = getDbFromAngle(angle);

      expect(updatedDb).toBeCloseTo(dB);
    });
  });
});

describe("mathematical properties", () => {
  it("each angle should increase consistently", () => {
    const angle1 = 50;
    const angle2 = 150;
    const dB1 = getDbFromAngle(angle1);
    const dB2 = getDbFromAngle(angle2);
    expect(dB2).toBeGreaterThan(dB1);
  });

  it("should return a finite number for any input", () => {
    [10, 256, -100, 1000, 0, 99].forEach((angle) => {
      const result = getDbFromAngle(angle);
      expect(Number.isFinite(result)).toBe(true);
    });
  });
});

// CLAMP INPUT TESTS
// MIN_ROTATION_ANGLE: 10 MAX_ROTATION_ANGLE: 256
describe("clamping logic", () => {
  //
  // BOUNDARY TESTS - where branches switch
  describe("boundary behavior", () => {
    it("should clamp angle above MAX to MAX_ROTATION_ANGLE", () => {
      expect(clampAngle(300)).toBe(256);
    });

    it("should clamp angle below MIN to MIN_ROTATION_ANGLE", () => {
      expect(clampAngle(-50)).toBe(10);
    });

    it("should NOT clamp angle at exact MAX boundary", () => {
      expect(clampAngle(256)).toBe(256);
    });

    it("should NOT clamp angle at exact MIN boundary", () => {
      expect(clampAngle(10)).toBe(10);
    });
  });

  // VALID RANGE TESTS
  describe("angles within valid range", () => {
    it("should return angle unchanged when within valid range", () => {
      expect(clampAngle(100)).toBe(100);
    });

    it("angle remains unchanged near bottom boundary", () => {
      expect(clampAngle(11)).toBe(11);
    });

    it("angle remains unchanged near upper boundary", () => {
      expect(clampAngle(255)).toBe(255);
    });
  });

  // EDGE CASES
  describe("edge cases", () => {
    it("should handle zero", () => {
      expect(clampAngle(0)).toBe(10); // Clamped to MIN
    });

    it("should handle large positive numbers", () => {
      expect(clampAngle(9999)).toBe(256); // Clamped to MAX
    });

    it("should handle large negative numbers", () => {
      expect(clampAngle(-9999)).toBe(10); // Clamped to MIN
    });
  });
});
