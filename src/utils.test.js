const { computeLatest } = require("./utils");

test("returns the latest tag when present", () => {
  const input = {
    all: ["v0.0.1", "v0.0.2", "v0.1.0", "v0.4.0", "v1.0.0"],
    latest: "v1.0.0",
  };

  expect(computeLatest(input)).toBe("v1.0.0");
});

test("returns the latest tag when not present", () => {
  const input = {
    all: ["v0.0.1", "v0.0.2", "v0.1.0", "v0.4.0", "v1.0.0"],
    latest: undefined,
  };

  expect(computeLatest(input)).toBe("v1.0.0");
});

test("returns v0.0.0 when no tags at all", () => {
  const input = {
    all: [],
    latest: undefined,
  };

  expect(computeLatest(input)).toBe("v0.0.0");
});
