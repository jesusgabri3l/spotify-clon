import { describe, expect, it, vi } from "vitest";

import {
  getAlbumReleaseDate,
  millisToMinutesAndSeconds,
  numberWithCommas,
} from "../../utils";

describe("numberWithCommas", () => {
  it("groups thousands", () => {
    expect(numberWithCommas(1234567)).toBe("1,234,567");
    expect(numberWithCommas(123)).toBe("123");
  });
});

describe("millisToMinutesAndSeconds", () => {
  it("formats milliseconds as m:ss", () => {
    expect(millisToMinutesAndSeconds(65000)).toBe("1:05");
    expect(millisToMinutesAndSeconds(3000)).toBe("0:03");
  });

  it("rolls over into the next minute when seconds round to 60", () => {
    expect(millisToMinutesAndSeconds(59700)).toBe("1:00");
  });
});

describe("getAlbumReleaseDate", () => {
  it("returns the year as-is for year precision", () => {
    expect(
      getAlbumReleaseDate({
        release_date_precision: "year",
        release_date: "1999",
      }),
    ).toBe("1999");
  });

  it("extracts the year for day precision", () => {
    expect(
      getAlbumReleaseDate({
        release_date_precision: "day",
        release_date: "1999-05-20",
      }),
    ).toBe("1999");
  });
});

describe("debounce", () => {
  it("delays and coalesces rapid calls into one", async () => {
    vi.useFakeTimers();
    const { debounce } = await import("../../utils");
    const fn = vi.fn();
    const debounced = debounce(fn, 300);

    debounced("a");
    debounced("b");
    debounced("c");
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(300);
    expect(fn).toHaveBeenCalledOnce();
    expect(fn).toHaveBeenCalledWith("c");
    vi.useRealTimers();
  });
});
