import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Cairo";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "700", "900"],
  subsets: ["arabic", "latin"],
});

type Props = {
  teal: string;
  tealLight: string;
  tealDark: string;
};

export const OutroScene: React.FC<Props> = ({ teal, tealLight }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Brand entrance
  const brandScale = spring({ frame, fps, config: { damping: 12 } });

  // CTA entrance
  const ctaProgress = spring({
    frame,
    fps,
    delay: Math.round(0.6 * fps),
    config: { damping: 200 },
  });
  const ctaY = interpolate(ctaProgress, [0, 1], [60, 0]);

  // URL entrance
  const urlOpacity = interpolate(
    frame,
    [1.2 * fps, 2 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Button pulse
  const buttonScale = 1 + Math.sin(frame / 12) * 0.03;

  // Radial burst lines
  const burstOpacity = interpolate(
    frame,
    [0.3 * fps, 1 * fps],
    [0, 0.15],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const burstRotation = frame * 0.3;

  // Particles
  const particles = Array.from({ length: 20 }, (_, i) => {
    const angle = (i / 20) * Math.PI * 2;
    const radius = 200 + Math.sin((frame + i * 15) / 25) * 80;
    const x = 540 + Math.cos(angle + frame / 60) * radius;
    const y = 960 + Math.sin(angle + frame / 60) * radius;
    const size = 3 + (i % 4) * 2;
    const particleOpacity = interpolate(
      frame,
      [i * 2, i * 2 + 15],
      [0, 0.2 + (i % 3) * 0.1],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );
    return { x, y, size, opacity: particleOpacity, key: i };
  });

  // Steps summary entrance
  const stepsProgress = spring({
    frame,
    fps,
    delay: Math.round(1.5 * fps),
    config: { damping: 200 },
  });

  const steps = [
    { num: "١", label: "ارفع" },
    { num: "٢", label: "حلّل" },
    { num: "٣", label: "اعثر" },
    { num: "٤", label: "تفاوض" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at center, ${teal}25 0%, #021a19 70%)`,
        justifyContent: "center",
        alignItems: "center",
        fontFamily,
        direction: "rtl",
      }}
    >
      {/* Particles */}
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

      {/* Radial burst */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          opacity: burstOpacity,
          transform: `rotate(${burstRotation}deg)`,
        }}
      >
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 2,
              height: 400,
              backgroundColor: tealLight,
              transformOrigin: "0 0",
              transform: `rotate(${i * 30}deg)`,
            }}
          />
        ))}
      </div>

      {/* Logo */}
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${teal}, ${tealLight})`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${brandScale})`,
          boxShadow: `0 0 100px ${teal}88`,
          marginBottom: 30,
        }}
      >
        <span style={{ fontSize: 90, fontWeight: 900, color: "white" }}>N</span>
      </div>

      {/* Brand name */}
      <div
        style={{
          fontSize: 100,
          fontWeight: 900,
          color: "white",
          transform: `scale(${brandScale})`,
          letterSpacing: 8,
        }}
      >
        Noder
      </div>

      {/* CTA in Arabic */}
      <div
        style={{
          fontSize: 52,
          fontWeight: 700,
          color: tealLight,
          transform: `translateY(${ctaY}px)`,
          opacity: ctaProgress,
          marginTop: 30,
          textAlign: "center",
        }}
      >
        ابدأ رحلتك التجارية الآن
      </div>

      {/* Steps summary row */}
      <div
        style={{
          display: "flex",
          gap: 30,
          marginTop: 60,
          opacity: stepsProgress,
          flexDirection: "row-reverse",
        }}
      >
        {steps.map((s, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                backgroundColor: `${teal}40`,
                border: `2px solid ${tealLight}`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 28,
                fontWeight: 700,
                color: tealLight,
              }}
            >
              {s.num}
            </div>
            <span style={{ fontSize: 22, color: `${tealLight}aa` }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div
        style={{
          marginTop: 70,
          paddingLeft: 80,
          paddingRight: 80,
          paddingTop: 28,
          paddingBottom: 28,
          borderRadius: 60,
          background: `linear-gradient(135deg, ${teal}, ${tealLight})`,
          transform: `scale(${buttonScale}) translateY(${ctaY}px)`,
          opacity: ctaProgress,
          boxShadow: `0 0 40px ${teal}66`,
        }}
      >
        <span style={{ fontSize: 40, fontWeight: 700, color: "white" }}>
          جرّب مجاناً
        </span>
      </div>

      {/* URL */}
      <div
        style={{
          fontSize: 36,
          fontWeight: 400,
          color: `${tealLight}99`,
          opacity: urlOpacity,
          marginTop: 50,
          letterSpacing: 2,
        }}
      >
        nodersa.com
      </div>
    </AbsoluteFill>
  );
};
