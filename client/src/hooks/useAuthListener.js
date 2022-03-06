import { useEffect, useState } from "react";
import Cookies from "js-cookie";
export default function useAuthListener() {
  const [user, setUser] = useState(Cookies.get("user"));
  const [role, setRole] = useState(Cookies.get("role"));
  const [auth, setAuth] = useState(Cookies.get("auth"));
  useEffect(() => {
    console.log(user);
  }, []);
  return { user, role, auth };
}
