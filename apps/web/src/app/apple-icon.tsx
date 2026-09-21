import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "36px",
          background: "radial-gradient(circle at 50% 30%, #1e293b 0%, #020617 100%)",
          border: "4px solid #eab308",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 76,
            color: "#eab308",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 2,
          }}
        >
          ⚕
        </div>
        <div
          style={{
            fontSize: 22,
            fontWeight: 900,
            letterSpacing: "3px",
            color: "#fde047",
            display: "flex",
          }}
        >
          BMA
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
