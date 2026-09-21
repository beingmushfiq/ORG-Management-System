import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #1e293b 0%, #020617 100%)",
          border: "2px solid #eab308",
          color: "#fde047",
          fontSize: 18,
          fontWeight: 900,
          fontFamily: "sans-serif",
        }}
      >
        ⚕
      </div>
    ),
    {
      ...size,
    }
  );
}
