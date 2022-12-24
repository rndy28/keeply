import { Text as NativeText, TextProps } from "react-native";
import * as React from "react";
import clsx from "clsx";

type TVariant = "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface Props extends Omit<TextProps, "style"> {
  variant?: TVariant;
}

const createVariant = (variant: TVariant) => {
  switch (variant) {
    case "p":
      return "font-manjari-regular text-polarNight2 text-base";
    case "h1":
      return "font-manjari-bold text-polarNight0 text-4xl";
    case "h2":
      return "font-manjari-bold text-polarNight0 text-3xl";
    case "h3":
      return "font-manjari-bold text-polarNight0 text-2xl";
    case "h4":
      return "font-manjari-bold text-polarNight0 text-xl";
    case "h5":
      return "font-manjari-bold text-polarNight0 text-lg";
    case "h6":
      return "font-manjari-bold text-polarNight0 text-base";
    default:
      return "";
  }
};

const Text = ({ children, className, variant = "p", ...props }: Props) => {
  return (
    <NativeText  className={clsx(createVariant(variant), className)} {...props}>
      {children}
    </NativeText>
  );
};
export default Text;
