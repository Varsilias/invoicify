import { useState, useEffect } from "react";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";

const useMediaQuery = () => {
  const fullConfig = resolveConfig(tailwindConfig);

  const getBreakPointValue = (value: string): number => {
    const screens = fullConfig.theme?.screens as Record<string, string>;

    const width = +screens[value].slice(0, screens[value].indexOf("px"));

    return width;
  };

  const getCurrentBreakpoint = (): string => {
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

  const [breakpoint, setBreakpoint] = useState(() => getCurrentBreakpoint());

  useEffect(() => {
    window.addEventListener("resize", () => {
      const point = getCurrentBreakpoint();
      setBreakpoint(point);
    });
  }, []);

  return { breakpoint };
};

export default useMediaQuery;
