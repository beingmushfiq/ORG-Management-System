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
          borderRadius: "38px",
          background: "radial-gradient(circle at 50% 30%, #164e32 0%, #0d3b25 100%)",
          border: "4px solid #10b981",
          color: "#ffffff",
          fontFamily: "sans-serif",
          boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
        }}
      >
        <div
          style={{
            fontSize: 72,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 4,
          }}
        >
          🛡️
        </div>
        <div
          style={{
            fontSize: 24,
            fontWeight: 900,
            letterSpacing: "4px",
            color: "#34d399",
            display: "flex",
          }}
        >
          RSM
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
