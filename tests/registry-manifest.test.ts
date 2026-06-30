import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// Phase-0 smoke + seed for the Phase-1 token contract: prove the harness runs
// and assert the registry manifest's basic shape.
const registry = JSON.parse(
  readFileSync(resolve(process.cwd(), "registry.json"), "utf8"),
);

describe("registry.json", () => {
  it("declares the tekrogen registry with items", () => {
    expect(registry.name).toBe("tekrogen");
    expect(Array.isArray(registry.items)).toBe(true);
    expect(registry.items.length).toBeGreaterThan(0);
  });

  it("includes a theme item (Phase 1 rebrands its tokens)", () => {
    const theme = registry.items.find(
      (item: { type: string }) => item.type === "registry:theme",
    );
    expect(theme, "a registry:theme item should exist").toBeTruthy();
  });
});
