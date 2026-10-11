import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const logOutHandler = async () => {
    try {
        const response = await fetch(
            "http://localhost:5001/api/logout",
            {
                method: "POST",
                credentials: "include",
            }
        );
        const result = await response.json();
        console.log(result);
        if (response.ok) {   
            setUser(null);
        }
    } catch (error) {
        console.log(error);
    }
};
  const checkLogin = async () => {
  
    try {
      const response = await fetch("http://localhost:5001/api/me", {
        credentials: "include",
      });

      const result = await response.json();
      console.log("this is a session part ", result);

      if (result.success) {
        setUser(result.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log(error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading ,logOutHandler,checkLogin}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;