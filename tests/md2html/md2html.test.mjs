import { readdirSync, readFileSync } from "node:fs";
import { execFile } from "node:child_process";
import { resolve } from "node:path";
import { describe, test, expect } from "vitest";
import assert from "node:assert";

const folder = "./tests/md2html/fixtures/";
describe("md2html", async () => {
  readdirSync(folder, { withFileTypes: true })
    .filter((entry) => entry.isFile() && /\.md$/.test(entry.name))
    .forEach((entry) => {
      test(entry.name, async () => {
        const expected = readFileSync(
          folder + entry.name.replace(".md", ".html"),
          "utf8",
        ); 
        const output = await md2html(
          [
            "--maintainers",
            entry.name.replace(".md", ".maintainers"),
            entry.name,
            "path/31.0.0.md\npath/30.0.1.md\npath/30.0.0.md",
          ],
          folder,
        );
        expect(output.stdout).to.equal(expected);
      });
    });
});

function md2html(args, cwd) {
  return new Promise((res) => {
    execFile(
      "node",
      [`${resolve("./scripts/md2html/md2html.js")}`, ...args],
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
