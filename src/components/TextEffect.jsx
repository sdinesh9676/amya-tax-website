
import { useEffect, useState } from "react";

export function TextEffect({ children, className = "" }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`hero-reveal ${visible ? "active" : ""} ${className}`}>
      {children}
    </div>
  );
}
