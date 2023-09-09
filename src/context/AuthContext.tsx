/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  PropsWithChildren,
  useState,
  useContext,
  useEffect,
} from "react";
import { ACCESS_TOKEN_KEY } from "../utils";

interface IAuthState {
  isAuthenticated: boolean;
  setToken: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const AuthContext = createContext<IAuthState>({} as IAuthState);

export const AuthContextProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const [token, setToken] = useState<string | undefined>(
    localStorage.getItem(ACCESS_TOKEN_KEY) ?? undefined,
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (token !== undefined) {
      setIsAuthenticated(true);
    }
  }, [token, setIsAuthenticated]);
  return (
    <AuthContext.Provider value={{ isAuthenticated: true, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const authMetadata = useContext(AuthContext);

  const { isAuthenticated, setToken } = authMetadata;

  return { isAuthenticated, setToken };
};
