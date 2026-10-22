import { useState, useEffect } from "react";

export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);

      if (item !== null) {
        return JSON.parse(item);
      }

      return typeof initialValue === "function" ? initialValue() : initialValue;
    } catch (error) {
      console.error("Failed to read localStorage:", error);

      return typeof initialValue === "function" ? initialValue() : initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("Failed to save localStorage:", error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
