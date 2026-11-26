
import {
  Target,
  LockKeyhole,
  ShieldCheck,
  Handshake,
} from "lucide-react";
import { BorderTrail } from "./BorderTrail";


const values = [
  {
    title: "Accuracy",
    description: "Careful attention to detail in every financial task.",
    icon: Target,
  },
  {
    title: "Confidentiality",
    description: "Respecting and protecting our clients' private information.",
    icon: LockKeyhole,
  },
  {
    title: "Compliance",
    description: "Helping clients stay informed about applicable requirements.",
    icon: ShieldCheck,
  },
  {
    title: "Personal Service",
    description: "Individual attention and clear communication for every client.",
    icon: Handshake,
  },
];

export default function About() {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <div className="about-visual">
          <div className="about-visual-glow" />

          <div className="about-visual-card">
            <span className="about-visual-label">
              AMYA TAX SERVICES
            </span>

            <div className="about-visual-mark">A</div>

            <div className="about-visual-line" />

            <p>
              Clarity in every number. Confidence in every decision.
            </p>

            <span className="about-visual-location">
              HOUSTON, TEXAS
            </span>

            <BorderTrail
              className="bg-gradient-to-l from-purple-200 via-[#8B5BC5] to-purple-200"
              size={120}
            />
          </div>

          <div className="about-floating-note">
            <span className="about-note-dot" />
            Personal attention. Professional service.
          </div>
        </div>

        <div className="about-content">
          <span className="section-eyebrow">ABOUT US</span>

          <h2>
            Your Trusted Financial Partner
            <span> in Houston</span>
          </h2>

          <p>
            Amya Tax Services is a professional tax preparation and
            bookkeeping firm proudly serving individuals and small
            businesses throughout the Houston metropolitan area.
          </p>

          <p>
            Under the leadership of{" "}
            <strong>Nasir Wasim, President</strong>, our team is committed
            to delivering accurate, timely, and personalized financial
            services that help our clients stay compliant and make
            confident decisions.
          </p>

          <p>
            We believe every client deserves attentive service, clear
            communication, and the peace of mind that comes from knowing
            their finances are in capable hands.
          </p>

          <div className="about-values-heading">
            <span />
            <h3>Our Core Values</h3>
          </div>

          <div className="about-values-grid">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div className="about-value" key={value.title}>
                  <div className="about-value-icon">
                    <Icon size={20} strokeWidth={1.8} />
                  </div>

                  <div>
                    <h4>{value.title}</h4>
                    <p>{value.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
