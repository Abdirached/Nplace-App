import { createContext, useEffect } from "react";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const user = JSON.parse(localStorage.getItem("userId"));
  const role = JSON.parse(localStorage.getItem("userRole"));
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <UserContext.Provider value={{ user, role }}>
      {children}
    </UserContext.Provider>
  );
}
