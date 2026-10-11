import { ImageResponse } from "next/og";
export const alt =
  "Yeabsra Abera — Software Developer, Bluecode Technology Solution";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#090f1b",
        padding: "64px 76px",
        color: "#f2f5fa",
        fontFamily: "sans-serif",
        borderTop: "6px solid #74def2",
      }}
    >
      <div style={{ display: "flex", fontSize: 26, color: "#74def2" }}>
        bluecode / TECHNOLOGY SOLUTION
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 35 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 132,
            height: 132,
            borderRadius: 80,
            background: "#183449",
            border: "2px solid #426780",
            color: "#bceffa",
            fontSize: 53,
          }}
        >
          YA
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div
            style={{
              display: "flex",
              fontSize: 67,
              fontWeight: 700,
              letterSpacing: -3,
            }}
          >
            Yeabsra Abera<span style={{ color: "#74def2" }}>.</span>
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#74def2" }}>
            Software Developer
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 23,
          color: "#aabbd0",
        }}
      >
        <span>Addis Ababa, Ethiopia</span>
        <span>Let’s connect ↗</span>
      </div>
    </div>,
    size,
  );
}
