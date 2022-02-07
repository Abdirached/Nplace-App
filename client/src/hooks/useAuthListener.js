import { useEffect, useState } from "react";
export default function useAuthListener() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("userId")));
  const [role, setRole] = useState(
    JSON.parse(localStorage.getItem("userRole"))
  );
  useEffect(() => {
    console.log(user, role);
  }, []);
  return { user, role };
}
