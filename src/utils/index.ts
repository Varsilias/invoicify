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
    fullConfig.theme?.screens as Record<string, string>,
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

export const ACCESS_TOKEN_KEY = "invoicify_token";

export const handleError = (e: any, callback: (message: string) => void) => {
  let message;

  if (e.response) {
    if (e.response.status === 401) {
      message = "You are unauthorized";
    } else {
      const res = e?.response.data.message;

      if (typeof res === "string") {
        message = res;
      } else {
        message = res[0];
      }
    }
  } else {
    message = e.message;
  }

  callback(message);
};

export const handleSuccessBlockError = (
  res: any,
  callback: (message: string) => void,
) => {
  let message;

  if (res?.errors && !Object.keys(res?.errors).length) {
    message = res?.message;
  } else {
    const err = Object.values(res?.errors)[0] as string;
    message = err;
  }

  callback(message);
};

export const clean = (object: object) =>
  JSON.parse(JSON.stringify(object, (_, value) => value ?? undefined));

export const getQueryStringParams = (queryStringParam: object) =>
  new URLSearchParams(clean(queryStringParam)).toString();
