
import { useEffect, useState, lazy, Suspense } from "react";

import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skeleton from "./components/Skeleton";
import About from "./components/About";
import ScrollProgress from "./components/ScrollProgress";

import "./App.css";

const Services = lazy(() => import("./components/Services"));

function App() {
  const [loading, setLoading] = useState(true);
  const [sceneReady, setSceneReady] = useState(false);

  useEffect(() => {
    const fallback = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(fallback);
  }, []);

  useEffect(() => {
    if (!sceneReady) return;

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2100);

    return () => clearTimeout(timer);
  }, [sceneReady]);

  return (
    <>
      <ScrollProgress />

      {loading && <Preloader />}

      <Navbar />

      <main>
        <Hero onSceneReady={() => setSceneReady(true)} />

        <Suspense fallback={<Skeleton />}>
          <Services />
        </Suspense>

        <About />

        <section className="why-section" id="why-us">
          <div className="section-heading">
            <span>WHY AMYA TAX</span>
            <h2>A more personal approach to your finances.</h2>
          </div>

          <div className="why-grid">
            <article>
              <span>01</span>
              <h3>Personal attention</h3>
              <p>Service shaped around your individual or business needs.</p>
            </article>

            <article>
              <span>02</span>
              <h3>Clear communication</h3>
              <p>Understand your tax and bookkeeping requirements.</p>
            </article>

            <article>
              <span>03</span>
              <h3>Organized records</h3>
              <p>Keep important financial information structured and accessible.</p>
            </article>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div>
            <span>LET'S CONNECT</span>
            <h2>Ready to bring more clarity to your finances?</h2>
            <p>
              Speak with Amya Tax Services about your
              tax preparation and bookkeeping needs.
            </p>
          </div>

          <div className="contact-actions">
            <a href="tel:+17133950930" className="button-gold">
              Call 713-395-0930
            </a>

            <a
              href="mailto:nasir@amyatax.com"
              className="button-outline"
            >
              Email Amya Tax
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="brand footer-brand">
          <span className="brand-icon">A</span>
          <span>
            <strong>AMYA TAX</strong>
            <small>Tax · Bookkeeping · Consulting</small>
          </span>
        </div>

        <p>
          © {new Date().getFullYear()} Amya Tax Services. All rights reserved.
        </p>

        <a href="mailto:nasir@amyatax.com">Contact us ↗</a>
      </footer>
    </>
  );
}

export default App;
