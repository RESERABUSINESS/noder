import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT_FAMILY } from "../fonts";

const fontFamily = FONT_FAMILY;

type Step = {
  number: number;
  titleAr: string;
  subtitleAr: string;
  icon: string;
};

type Props = {
  step: Step;
  teal: string;
  tealLight: string;
  tealDark: string;
};

const StepIcon: React.FC<{ icon: string; color: string; size: number }> = ({
  icon,
  color,
  size,
}) => {
  const iconPaths: Record<string, React.ReactNode> = {
    upload: (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <rect x="20" y="55" width="60" height="35" rx="6" stroke={color} strokeWidth="4" />
        <path d="M50 15 L50 55" stroke={color} strokeWidth="4" strokeLinecap="round" />
        <path d="M35 30 L50 15 L65 30" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="50" cy="72" r="5" fill={color} />
      </svg>
    ),
    ai: (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="35" stroke={color} strokeWidth="4" />
        <circle cx="50" cy="50" r="12" fill={color} opacity="0.6" />
        <path d="M50 15 L50 25" stroke={color} strokeWidth="3" strokeLinecap="round" />
        <path d="M50 75 L50 85" stroke={color} strokeWidth="3" strokeLinecap="round" />
        <path d="M15 50 L25 50" stroke={color} strokeWidth="3" strokeLinecap="round" />
        <path d="M75 50 L85 50" stroke={color} strokeWidth="3" strokeLinecap="round" />
        <path d="M25.3 25.3 L32.4 32.4" stroke={color} strokeWidth="3" strokeLinecap="round" />
        <path d="M67.6 67.6 L74.7 74.7" stroke={color} strokeWidth="3" strokeLinecap="round" />
        <path d="M74.7 25.3 L67.6 32.4" stroke={color} strokeWidth="3" strokeLinecap="round" />
        <path d="M32.4 67.6 L25.3 74.7" stroke={color} strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
    suppliers: (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="30" r="14" stroke={color} strokeWidth="4" />
        <circle cx="22" cy="55" r="10" stroke={color} strokeWidth="3" />
        <circle cx="78" cy="55" r="10" stroke={color} strokeWidth="3" />
        <path d="M50 44 L50 60 Q50 75 50 75" stroke={color} strokeWidth="3" strokeLinecap="round" />
        <path d="M50 60 L22 65" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M50 60 L78 65" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M15 80 Q22 70 29 80" stroke={color} strokeWidth="3" strokeLinecap="round" />
        <path d="M71 80 Q78 70 85 80" stroke={color} strokeWidth="3" strokeLinecap="round" />
        <path d="M35 88 Q50 78 65 88" stroke={color} strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
    negotiate: (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <path d="M15 55 Q15 35 35 35 L55 35 Q65 35 65 45 L65 55 Q65 65 55 65 L30 65" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M85 40 Q85 60 65 60 L50 60 Q40 60 40 70 L40 55 Q35 70 45 70 L70 70" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="30" cy="50" r="3" fill={color} />
        <circle cx="42" cy="50" r="3" fill={color} />
        <circle cx="54" cy="50" r="3" fill={color} />
      </svg>
    ),
  };
  return <>{iconPaths[icon]}</>;
};

export const StepScene: React.FC<Props> = ({
  step,
  teal,
  tealLight,
  tealDark,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Step number entrance
  const numberScale = spring({ frame, fps, config: { damping: 10 } });

  // Icon entrance
  const iconProgress = spring({
    frame,
    fps,
    delay: Math.round(0.2 * fps),
    config: { damping: 14 },
  });
  const iconY = interpolate(iconProgress, [0, 1], [60, 0]);

  // Title entrance
  const titleProgress = spring({
    frame,
    fps,
    delay: Math.round(0.5 * fps),
    config: { damping: 200 },
  });
  const titleY = interpolate(titleProgress, [0, 1], [50, 0]);

  // Subtitle entrance
  const subtitleOpacity = interpolate(
    frame,
    [1 * fps, 1.6 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Progress bar
  const progressWidth = interpolate(
    frame,
    [0.8 * fps, 2.5 * fps],
    [0, 100],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Floating orbs
  const orb1Y = Math.sin(frame / 25) * 20;
  const orb2Y = Math.cos(frame / 20) * 25;

  // Step indicator dots
  const dots = [1, 2, 3, 4];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, #021a19 0%, ${tealDark}15 50%, #021a19 100%)`,
        justifyContent: "center",
        alignItems: "center",
        fontFamily,
        direction: "rtl",
      }}
    >
      {/* Decorative orbs */}
      <div
        style={{
          position: "absolute",
          top: 200 + orb1Y,
          right: 80,
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${teal}20, transparent)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 300 + orb2Y,
          left: 60,
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${tealLight}15, transparent)`,
        }}
      />

      {/* Step number badge */}
      <div
        style={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          border: `4px solid ${tealLight}`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${numberScale})`,
          marginBottom: 40,
          background: `${teal}20`,
        }}
      >
        <span
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: tealLight,
          }}
        >
          {step.number}
        </span>
      </div>

      {/* Icon */}
      <div
        style={{
          transform: `translateY(${iconY}px)`,
          opacity: iconProgress,
          marginBottom: 50,
        }}
      >
        <StepIcon icon={step.icon} color={tealLight} size={180} />
      </div>

      {/* Title */}
      <div
        style={{
          fontSize: 72,
          fontWeight: 900,
          color: "white",
          transform: `translateY(${titleY}px)`,
          opacity: titleProgress,
          textAlign: "center",
          paddingLeft: 60,
          paddingRight: 60,
        }}
      >
        {step.titleAr}
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontSize: 38,
          fontWeight: 400,
          color: `${tealLight}cc`,
          opacity: subtitleOpacity,
          marginTop: 24,
          textAlign: "center",
          paddingLeft: 80,
          paddingRight: 80,
          lineHeight: 1.6,
        }}
      >
        {step.subtitleAr}
      </div>

      {/* Progress line */}
      <div
        style={{
          position: "absolute",
          bottom: 280,
          width: 600,
          height: 4,
          backgroundColor: `${teal}30`,
          borderRadius: 2,
        }}
      >
        <div
          style={{
            width: `${progressWidth}%`,
            height: "100%",
            backgroundColor: tealLight,
            borderRadius: 2,
          }}
        />
      </div>

      {/* Step indicator dots */}
      <div
        style={{
          position: "absolute",
          bottom: 200,
          display: "flex",
          gap: 24,
          flexDirection: "row-reverse",
        }}
      >
        {dots.map((d) => (
          <div
            key={d}
            style={{
              width: d === step.number ? 40 : 16,
              height: 16,
              borderRadius: 8,
              backgroundColor:
                d === step.number ? tealLight : `${teal}50`,
              transition: "none",
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};
