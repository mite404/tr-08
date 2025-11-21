import { describe, it, expect } from "vitest";
import { getAngleFromDb, getDbFromAngle } from "../src/components/Knob";

// getAngleFromDb formula:
// ((-30 - -25) / (5 - -25)) * (256 - 10) + 10;

describe("convert dB to angle via getAngleFromDb()", () => {
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

// getDbFromAngle formula:
// ((-30 - 10) / (256 - 10)) * (5 - -25) + -25;

describe("convert angle to dB via getDbFromAngle()", () => {
  it("convert negative invalid value to angle", () => {
    expect(getDbFromAngle(-30)).toBeCloseTo(-29.878);
  });

  it("convert positive invalid value to angle", () => {
    expect(getDbFromAngle(15)).toBeCloseTo(-24.39);
  });
});
