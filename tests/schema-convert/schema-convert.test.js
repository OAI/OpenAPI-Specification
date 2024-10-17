import { readdirSync, readFileSync } from "node:fs";
import { exec } from "node:child_process";
import { resolve } from "node:path";
import { describe, test, expect } from "vitest";
import assert from "node:assert";

const folder = "./tests/schema-convert/fixtures/";
describe("Convert Schemas", async () => {
  test("YAML with id, $id, $ref", async () => {
    const expected = readFileSync(folder + "schema.json", "utf8");
    const output = await convert(
      [
        "schema.yaml",
        "87654321",
      ],
      folder,
    );
    expect(output.stdout).to.equal(expected);
  });

  test("non-existing input", async () => {
    const output = await convert(
      [
        "does-not-exist",
        "YYYYMMDD",
      ],
      folder,
    );
    expect(output.stderr).to.equal("   ENOENT: no such file or directory, open 'does-not-exist'\n");
  });

  test("invalid parameters", async () => {
    const output = await convert(
      [
        "schema.yaml",
      ],
      folder,
    );
    expect(output.stderr).to.equal("Usage: convert-schema.js file.yaml YYYYMMDD\n");
  });
});

function convert(args, cwd) {
  return new Promise((res) => {
    exec(
      `node ${resolve("./scripts/schema-convert.js")} ${args.join(" ")}`,
      { cwd },
      (error, stdout, stderr) => {
        res({
          code: error?.code || 0,
          error,
          stdout,
          stderr,
        });
      },
    );
  });
}
