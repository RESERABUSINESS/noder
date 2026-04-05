import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT_FAMILY } from "../fonts";

const fontFamily = FONT_FAMILY;

type Props = {
  teal: string;
  tealLight: string;
  tealDark: string;
};

export const IntroScene: React.FC<Props> = ({ teal, tealLight }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo/brand entrance
  const logoScale = spring({ frame, fps, config: { damping: 12 } });
  const logoRotation = interpolate(logoScale, [0, 1], [-15, 0]);

  // Title entrance (delayed)
  const titleProgress = spring({
    frame,
    fps,
    delay: Math.round(0.4 * fps),
    config: { damping: 14 },
  });
  const titleY = interpolate(titleProgress, [0, 1], [80, 0]);

  // Subtitle entrance
  const subtitleOpacity = interpolate(
    frame,
    [0.8 * fps, 1.5 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const subtitleY = interpolate(
    frame,
    [0.8 * fps, 1.5 * fps],
    [40, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Floating particles
  const particles = Array.from({ length: 12 }, (_, i) => {
    const x = 100 + (i * 73) % 880;
    const baseY = 300 + (i * 137) % 1300;
    const floatY = Math.sin((frame + i * 20) / 30) * 30;
    const size = 4 + (i % 5) * 3;
    const particleOpacity = interpolate(
      frame,
      [i * 3, i * 3 + 20],
      [0, 0.3 + (i % 3) * 0.15],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );
    return { x, y: baseY + floatY, size, opacity: particleOpacity, key: i };
  });

  // Glow pulse
  const glowScale = 1 + Math.sin(frame / 20) * 0.08;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, #021a19 0%, ${teal}22 40%, #021a19 100%)`,
        justifyContent: "center",
        alignItems: "center",
        fontFamily,
        direction: "rtl",
      }}
    >
      {/* Background particles */}
      {particles.map((p) => (
        <div
          key={p.key}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            backgroundColor: tealLight,
            opacity: p.opacity,
          }}
        />
      ))}

      {/* Center glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${teal}30 0%, transparent 70%)`,
          transform: `scale(${glowScale})`,
        }}
      />

      {/* Logo circle */}
      <div
        style={{
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${teal}, ${tealLight})`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${logoScale}) rotate(${logoRotation}deg)`,
          boxShadow: `0 0 80px ${teal}66`,
          marginBottom: 50,
        }}
      >
        <div
          style={{
            fontSize: 100,
            fontWeight: 900,
            color: "white",
            letterSpacing: -4,
            fontFamily,
          }}
        >
          N
        </div>
      </div>

      {/* Title */}
      <div
        style={{
          fontSize: 110,
          fontWeight: 900,
          color: "white",
          transform: `translateY(${titleY}px)`,
          opacity: titleProgress,
          letterSpacing: 6,
        }}
      >
        Noder
      </div>

      {/* Arabic subtitle */}
      <div
        style={{
          fontSize: 48,
          fontWeight: 700,
          color: tealLight,
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
          marginTop: 20,
        }}
      >
        التجارة أسهل مع الذكاء الاصطناعي
      </div>

      {/* Decorative line */}
      <div
        style={{
          width: interpolate(frame, [1.2 * fps, 2 * fps], [0, 400], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          height: 3,
          backgroundColor: tealLight,
          marginTop: 40,
          borderRadius: 2,
          opacity: 0.6,
        }}
      />
    </AbsoluteFill>
  );
};
