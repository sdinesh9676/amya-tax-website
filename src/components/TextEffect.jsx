
export function TextEffect({ children, className = "" }) {
  return (
    <div className={`hero-reveal ${className}`}>
      {children}
    </div>
  );
}
