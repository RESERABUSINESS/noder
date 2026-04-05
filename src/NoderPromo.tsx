import { AbsoluteFill, useVideoConfig } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";
import { IntroScene } from "./scenes/IntroScene";
import { StepScene } from "./scenes/StepScene";
import { OutroScene } from "./scenes/OutroScene";

const TEAL = "#0D9488";
const TEAL_DARK = "#0F766E";
const TEAL_LIGHT = "#14B8A6";

const STEPS = [
  {
    number: 1,
    titleAr: "ارفع طلبك",
    subtitleAr: "حمّل تفاصيل المنتج بسهولة",
    icon: "upload",
  },
  {
    number: 2,
    titleAr: "تحليل ذكي",
    subtitleAr: "الذكاء الاصطناعي يحلل متطلباتك",
    icon: "ai",
  },
  {
    number: 3,
    titleAr: "اعثر على الموردين",
    subtitleAr: "نوصلك بأفضل الموردين حول العالم",
    icon: "suppliers",
  },
  {
    number: 4,
    titleAr: "تفاوض واحصل على أفضل سعر",
    subtitleAr: "أدوات تفاوض ذكية لأفضل الصفقات",
    icon: "negotiate",
  },
];

export const NoderPromo = () => {
  const { fps } = useVideoConfig();
  const transitionDuration = Math.round(0.5 * fps); // 0.5s transitions

  return (
    <AbsoluteFill style={{ backgroundColor: "#021a19" }}>
      <TransitionSeries>
        {/* Intro - 5 seconds */}
        <TransitionSeries.Sequence durationInFrames={5 * fps}>
          <IntroScene
            teal={TEAL}
            tealLight={TEAL_LIGHT}
            tealDark={TEAL_DARK}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* Step 1 - 5s */}
        <TransitionSeries.Sequence durationInFrames={5 * fps}>
          <StepScene
            step={STEPS[0]}
            teal={TEAL}
            tealLight={TEAL_LIGHT}
            tealDark={TEAL_DARK}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-left" })}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* Step 2 - 5s */}
        <TransitionSeries.Sequence durationInFrames={5 * fps}>
          <StepScene
            step={STEPS[1]}
            teal={TEAL}
            tealLight={TEAL_LIGHT}
            tealDark={TEAL_DARK}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-left" })}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* Step 3 - 5s */}
        <TransitionSeries.Sequence durationInFrames={5 * fps}>
          <StepScene
            step={STEPS[2]}
            teal={TEAL}
            tealLight={TEAL_LIGHT}
            tealDark={TEAL_DARK}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-left" })}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* Step 4 - 5s */}
        <TransitionSeries.Sequence durationInFrames={5 * fps}>
          <StepScene
            step={STEPS[3]}
            teal={TEAL}
            tealLight={TEAL_LIGHT}
            tealDark={TEAL_DARK}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* Outro / CTA - 7.5s (remaining frames to fill 30s total accounting for transitions) */}
        <TransitionSeries.Sequence durationInFrames={Math.round(7.5 * fps)}>
          <OutroScene
            teal={TEAL}
            tealLight={TEAL_LIGHT}
            tealDark={TEAL_DARK}
          />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
