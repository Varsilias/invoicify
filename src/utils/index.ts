import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const fullConfig = resolveConfig(tailwindConfig);

export const getBreakPointValue = (value: string): number => {
  const screens = fullConfig.theme?.screens as Record<string, string>;

  const width = +screens[value].slice(0, screens[value].indexOf("px"));

  return width;
};

export const getCurrentBreakpoint = (): string => {
  let currentBreakpoint: string;
  let biggestBreakpointValue = 0;
  for (const breakpoint of Object.keys(
    fullConfig.theme?.screens as Record<string, string>
  )) {
    const breakpointValue = getBreakPointValue(breakpoint);
    if (
      breakpointValue > biggestBreakpointValue &&
      window.innerWidth >= breakpointValue
    ) {
      biggestBreakpointValue = breakpointValue;
      currentBreakpoint = breakpoint;
    }
  }
  return currentBreakpoint!;
};

export const formatDate = (value: string) => {
  return dayjs(value).format("D MMM YYYY");
};
