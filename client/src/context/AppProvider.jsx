import { useState } from "react";
import { createContext } from "react";
import { getAuth } from "firebase/auth";
import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const auth = getAuth();

  useLayoutEffect(() => {
    const unSubscribe = auth.onIdTokenChanged((user) => {
      console.log("[From AuthProvider]", { user });
      if (user?.uid) {
        setUser(user);
        if (user.accessToken !== localStorage.getItem("accessToken")) {
          localStorage.setItem("accessToken", user.accessToken);
          window.location.reload();
        }
        setLoading(false);
        return;
      }

      setLoading(false);
      localStorage.clear();
      setUser({});
      navigate("/login");
    });
    return () => {
      unSubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {loading ? <div>loading ...</div> : children}
    </AppContext.Provider>
  );
}

export default AppProvider;
