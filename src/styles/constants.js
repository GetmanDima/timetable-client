import {Dimensions} from "react-native";

export const spacer = 16;
export const whiteColor = "#fff";
export const lightColor = "#e7e7e7";
export const blackColor = "#000";
export const darkColor = "#081320";
export const primaryColor = "#278FFF";
export const secondaryColor = "#6c757d";
export const dangerColor = "#dc3545";
export const darkPrimaryColor = "#1976d2";
export const lightDarkColor = "#0F2238";
export const lightPrimaryColor = "#bbdefb";
export const lightSecondaryColor = "#bac0c6";
export const lightDangerColor = "#ff7961";
export const opacityDarkColor = "rgba(8, 19, 32,0.95)";

export const textFontSize = 18;
export const smallTextFontSize = 16;
export const h1FontSize = 23;

export const windowHeight = Dimensions.get("window").height;

export const typesToColors = {
  dark: darkColor,
  secondary: secondaryColor,
  primary: primaryColor,
  danger: dangerColor,
};
export const typesToDarkColors = {
  secondary: secondaryColor,
  primary: darkPrimaryColor,
  danger: dangerColor,
};
export const typesToLightColors = {
  dark: lightDarkColor,
  secondaryColor: lightSecondaryColor,
  primary: lightPrimaryColor,
  danger: lightDangerColor,
};
