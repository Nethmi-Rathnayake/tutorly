import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/constants/site";

export const alt = `${siteConfig.name} — private tutors in Dubai & the UAE`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Shared social preview card (English only: the default OG font has no Arabic glyphs).
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 90px",
          background: "#2a2f3a",
          color: "#ffffff",
        }}
      >
        <div style={{ fontSize: 40, color: "#d6b66c", letterSpacing: 4, textTransform: "uppercase" }}>
          {siteConfig.name}
        </div>
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.1, marginTop: 28 }}>
          Private tutors in Dubai & the UAE
        </div>
        <div style={{ fontSize: 34, color: "#e9d8a6", marginTop: 32 }}>
          Hand-matched, vetted educators · IB · British · American
        </div>
      </div>
    ),
    size,
  );
}
