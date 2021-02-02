import { useEffect, useState } from "react"

export function useAuth() {
  const [value, setValue] = useState(
    sessionStorage.getItem('auth') || ''
  );

  useEffect(() => {
    sessionStorage.setItem('auth', value);
  }, [value]);

  return [value, setValue];
}