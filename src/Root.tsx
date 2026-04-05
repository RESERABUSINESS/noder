import { Composition } from "remotion";
import { NoderPromo } from "./NoderPromo";

// 30 seconds at 30fps = 900 frames
const FPS = 30;
const DURATION_IN_SECONDS = 30;

export const RemotionRoot = () => {
  return (
    <Composition
      id="NoderPromo"
      component={NoderPromo}
      durationInFrames={FPS * DURATION_IN_SECONDS}
      fps={FPS}
      width={1080}
      height={1920}
    />
  );
};
