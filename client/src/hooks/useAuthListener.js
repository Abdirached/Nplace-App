import { useEffect } from "react";
export default function useAuthListener() {
  const currentUser = JSON.parse(localStorage.getItem("userId"));
  const role = JSON.parse(localStorage.getItem("userRole"));
  useEffect(() => {
    console.log(currentUser);
  }, []);
  return { currentUser, role };
}
