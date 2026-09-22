import React, { createContext, useEffect, useState } from "react";
import { decodeToken } from "../services/decodeToken";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const accessToken = localStorage.getItem("lm_token");

  useEffect(() => {
    if (!accessToken) {
      setAuthUser(null);
      setLoading(false);
      return;
    }

    const userData = decodeToken(accessToken);

    if (!userData) {
      localStorage.removeItem("lm_token");
      setAuthUser(null);
      setLoading(false);
      return;
    }

    setAuthUser(userData);
    setLoading(false);
  }, [accessToken]);

  const logout =()=>{
    localStorage.removeItem('lm_token')
    setAuthUser(null)
  }
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, logout, accessToken, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
