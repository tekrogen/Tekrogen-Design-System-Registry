import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// Smoke + Phase-1 token contract: prove the harness runs and that the registry
// manifest's theme item carries the Tekrogen brand tokens (not the starter's).
const registry = JSON.parse(
  readFileSync(resolve(process.cwd(), "registry.json"), "utf8"),
);

type ThemeItem = {
  type: string;
  title: string;
  cssVars: { light: Record<string, string>; dark: Record<string, string> };
};

const theme: ThemeItem | undefined = registry.items.find(
  (item: { type: string }) => item.type === "registry:theme",
);

describe("registry.json", () => {
  it("declares the tekrogen registry with items", () => {
    expect(registry.name).toBe("tekrogen");
    expect(Array.isArray(registry.items)).toBe(true);
    expect(registry.items.length).toBeGreaterThan(0);
  });

  it("includes a theme item", () => {
    expect(theme, "a registry:theme item should exist").toBeTruthy();
  });
});

describe("Tekrogen theme token contract", () => {
  it("is branded Tekrogen (not the starter's Nature Theme)", () => {
    expect(theme?.title).toMatch(/tekrogen/i);
  });

  it("maps Ink (dark) to the brand palette", () => {
    const dark = theme?.cssVars.dark ?? {};
    expect(dark.background).toBe("#0e1116"); // ink
    expect(dark.foreground).toBe("#e7ecf2"); // fg-1
    expect(dark.primary).toBe("#1fd5da"); // cyan accent
    expect(dark["primary-foreground"]).toBe("#0e1116"); // dark on cyan (AA)
    expect(dark["muted-foreground"]).toBe("#8a98a8"); // fg-3 = lowest text token
  });

  it("maps Paper (light) to the brand palette with AA-safe accent", () => {
    const light = theme?.cssVars.light ?? {};
    expect(light.background).toBe("#f3f5f7");
    expect(light.foreground).toBe("#1f2731");
    expect(light.primary).toBe("#086a6f"); // teal — cyan fails AA on paper
    expect(light["muted-foreground"]).toBe("#6b7280"); // paper fg-3
  });

  it("uses the brand radius and brand chart palette", () => {
    expect(theme?.cssVars.dark.radius).toBe("0.625rem");
    const charts = ["#446e88", "#6491ac", "#0db4b9", "#7edba5", "#1fd5da"];
    for (let i = 0; i < charts.length; i++) {
      expect(theme?.cssVars.dark[`chart-${i + 1}`]).toBe(charts[i]);
    }
  });

  it("retains no Nature-Theme green leftovers", () => {
    const allValues = [
      ...Object.values(theme?.cssVars.light ?? {}),
      ...Object.values(theme?.cssVars.dark ?? {}),
    ].join(" ");
    expect(allValues).not.toMatch(/144\.|145\.|146\./); // green oklch hues
  });
});
