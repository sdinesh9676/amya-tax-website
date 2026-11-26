
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";

const links = [
  ["Home", "#home"],
  ["Services", "#services"],
  ["About", "#about"],
  ["Why Us", "#why-us"],
  ["Contact", "#contact"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <a className="brand" href="#home">
        <span className="brand-icon">A</span>
        <span>
          <strong>AMYA TAX</strong>
          <small>Tax · Bookkeeping · Consulting</small>
        </span>
      </a>

      <button
        className="mobile-toggle"
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation"
        aria-expanded={open}
      >
        {open ? <X /> : <Menu />}
      </button>

      <nav className={open ? "nav-links active" : "nav-links"}>
        {links.map(([label, href]) => (
          <a
            key={label}
            href={href}
            onClick={() => setOpen(false)}
          >
            {label}
          </a>
        ))}
        <a className="nav-call" href="tel:+17133950930">
          <Phone size={16} />
          Call Now
        </a>
      </nav>
    </header>
  );
}
