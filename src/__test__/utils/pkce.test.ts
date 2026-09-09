import { describe, expect, it } from "vitest";

import { generateCodeChallenge, generateRandomToken } from "../../utils/pkce";

describe("generateRandomToken", () => {
  it("produces a URL-safe string with no two calls colliding", () => {
    const a = generateRandomToken();
    const b = generateRandomToken();

    expect(a).not.toBe(b);
    expect(a).toMatch(/^[A-Za-z0-9_-]+$/);
    expect(a.length).toBeGreaterThanOrEqual(43);
  });
});

describe("generateCodeChallenge", () => {
  it("derives the known S256 code challenge for the RFC 7636 example verifier", async () => {
    const verifier = "dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk";
    const challenge = await generateCodeChallenge(verifier);

    expect(challenge).toBe("E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM");
  });
});
