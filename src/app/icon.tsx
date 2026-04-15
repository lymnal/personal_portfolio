import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0b",
        borderRadius: "6px",
      }}
    >
      <span
        style={{
          fontSize: "18px",
          fontWeight: 700,
          letterSpacing: "-0.04em",
          background: "linear-gradient(135deg, #e8d5b7, #c9a962)",
          backgroundClip: "text",
          color: "#c9a962",
        }}
      >
        ES
      </span>
    </div>,
    { ...size },
  );
}
