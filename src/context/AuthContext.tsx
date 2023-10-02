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
  setToken: React.Dispatch<React.SetStateAction<string | undefined | null>>;
  token?: string | null;
}

export const AuthContext = createContext<IAuthState>({} as IAuthState);

export const AuthContextProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const [token, setToken] = useState<string | undefined | null>(
    localStorage.getItem(ACCESS_TOKEN_KEY),
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY) as string;
    if (token) {
      setToken(token);
      setIsAuthenticated(true);
    }
  }, [token]);
  return (
    <AuthContext.Provider value={{ isAuthenticated, setToken, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const authMetadata = useContext(AuthContext);

  const { isAuthenticated, setToken, token } = authMetadata;

  return { isAuthenticated, setToken, token };
};
