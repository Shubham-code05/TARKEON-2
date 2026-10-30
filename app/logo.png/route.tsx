import { renderMark } from "@/lib/og";

// 512×512 logo PNG at /logo.png, referenced by the Organization schema.
export const dynamic = "force-static";

export function GET() {
  return renderMark(512);
}
