import { formatDateOnly, toDateOnlyString } from "@/utils/dates";

describe("dates", () => {
  it("formats date to yyyy-MM-dd", () => {
    expect(toDateOnlyString(new Date(2026, 0, 15))).toBe("2026-01-15");
  });

  it("formats date-only string to dd/MM/yyyy", () => {
    expect(formatDateOnly("2026-01-15")).toBe("15/01/2026");
  });
});
