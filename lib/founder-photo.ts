import "server-only";
import fs from "node:fs";
import path from "node:path";

const src = "/images/about/founder.jpg";

/** The founder's photo if the file exists in public/, otherwise null. */
export function founderPhoto(): string | null {
  return fs.existsSync(path.join(process.cwd(), "public", src)) ? src : null;
}
