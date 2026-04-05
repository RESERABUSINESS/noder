import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

export const FONT_FAMILY = "NotoSansArabic";

loadFont({
  family: FONT_FAMILY,
  url: staticFile("NotoSansArabic-Regular.ttf"),
  weight: "400",
});

loadFont({
  family: FONT_FAMILY,
  url: staticFile("NotoSansArabic-Bold.ttf"),
  weight: "700",
});

loadFont({
  family: FONT_FAMILY,
  url: staticFile("NotoSansArabic-Black.ttf"),
  weight: "900",
});
