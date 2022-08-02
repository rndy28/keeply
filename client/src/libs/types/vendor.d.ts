import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colorBackground: string;
    colorText: string;
    colorBorder: string;
    colorAccent: string;
    colorAccentText: string;
    colorCardBackground: string;
    colorDisabledBackground: string;
    colorLabel: string;
    colorLabelBackground: string;
    borderRadius: string;
    boxShadow: string;
    state: "light" | "dark";
  }
}
