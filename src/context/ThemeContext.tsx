import {
  useState,
  useLayoutEffect,
  useContext,
  createContext,
  PropsWithChildren,
} from "react";

export const ThemeContext = createContext({
  dark: false,
  toggle: (e: any) => {},
});

export const ThemeContextProvider = ({ children }: PropsWithChildren<any>) => {
  const html = document.getElementsByTagName("html")[0];
  const prefersDark = localStorage.getItem("theme") === "dark" ? true : false;

  const [dark, setDark] = useState(prefersDark);

  const toggle = (e: any) => {
    e.preventDefault();
    setDark(!dark);
  };

  // console.log("dark - %o", dark);

  const applyTheme = () => {
    if (!dark) {
      localStorage.setItem("theme", "light");
      html.style.cssText = "transition: background .5s ease";
      html.classList.remove("dark");
    }

    if (dark) {
      localStorage.setItem("theme", "dark");
      html.style.cssText = "transition: background .5s ease";
      html.classList.add("dark");
    }
  };

  useLayoutEffect(() => {
    /* You end up here only when the user takes action
        to change the theme, hence you can just apply the new theme. */
    applyTheme();
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const theme = useContext(ThemeContext);
  const { dark, toggle } = theme;

  return {
    dark,
    toggle,
  };
};
