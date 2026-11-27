import { useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Phone,
  Mail,
  ShieldCheck,
} from "lucide-react";
import TunnelScene from "./TunnelScene";
import { TextEffect } from "./TextEffect";


export default function Hero({ onSceneReady }) {
  const [sceneReady, setSceneReady] = useState(false);

  const handleSceneReady = () => {
    if (sceneReady) return;

    setSceneReady(true);
    onSceneReady?.();
  };

  return (
    <section className="hero tunnel-hero" id="home">
      {/* 3D tunnel background */}
      <div className="tunnel-background">
        <TunnelScene onReady={handleSceneReady} />
      </div>

      {/* Contrast layer */}
      <div className="tunnel-overlay" />

      {/* Main hero content */}

      <div className="tunnel-content">
        <TextEffect>
          <div className="hero-tag">
            <span className="status-dot" />
            TAX PREPARATION · BOOKKEEPING · CONSULTING
          </div>

          <h1>
            Your Finances.
            <br />
            <span>Handled with</span>
            <br />
            Confidence.
          </h1>

          <p className="hero-description">
            Trusted tax preparation and bookkeeping services for individuals and
            small businesses in Houston. Get personalized attention and a
            clearer path through your financial responsibilities.
          </p>

          <div className="hero-actions">
            <a className="button-gold" href="tel:+17133950930">
              <Phone size={18} />
              Speak With Us
              <ArrowUpRight size={17} />
            </a>

            <a className="button-outline" href="#services">
              Explore Services
              <ArrowDown size={17} />
            </a>
          </div>

          <div className="hero-trust">
            <ShieldCheck size={19} />
            <span>Personalized attention. Professional service.</span>
          </div>

          <div className="hero-contact">
            <a href="tel:+17133950930">
              <Phone size={15} />
              713-395-0930
            </a>

            <a href="mailto:nasir@amyatax.com">
              <Mail size={15} />
              nasir@amyatax.com
            </a>
          </div>
        </TextEffect>
      </div>

      {/* Bottom caption */}
      <div className="tunnel-caption">
        <span className="caption-line" />A clearer path to financial confidence
      </div>

      {/* <div className="hero-scroll-indicator">
        <span>SCROLL TO EXPLORE</span>
        <div className="scroll-indicator-line" />
      </div> */}

      <div className="hero-bottom-line" />
    </section>
  );
}
