import { createContext, useContext, useState } from "react";

const authContext = createContext();

function useAuth() {
  const [authedUser, setAuthedUser] = useState("");

  return {
    authedUser,
    authed: authedUser !== "",
    login(authedUser) {
      return new Promise((res) => {
        setAuthedUser(authedUser);
        res();
      });
    },
    logout() {
      return new Promise((res) => {
        setAuthedUser("");
        res();
      });
    },
  };
}

export function AuthProvider({ children }) {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return useContext(authContext);
}
