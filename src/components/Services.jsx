
import { useLayoutEffect, useRef } from "react";
import {
  FileText,
  Calculator,
  BookOpen,
  Wallet,
  Building2,
  ShieldCheck,
} from "lucide-react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: "01",
    title: "Tax Preparation",
    description:
      "Accurate individual and business tax return preparation, ensuring maximum deductions and full compliance with federal and state regulations.",
    icon: FileText,
  },
  {
    number: "02",
    title: "Tax Consulting",
    description:
      "Strategic tax planning and advisory services to help you minimize liability and make informed financial decisions year-round.",
    icon: Calculator,
  },
  {
    number: "03",
    title: "Bookkeeping",
    description:
      "Reliable day-to-day bookkeeping services to keep your financial records organized, accurate, and audit-ready.",
    icon: BookOpen,
  },
  {
    number: "04",
    title: "Payroll Support",
    description:
      "Streamlined payroll processing, tax withholdings, and reporting to keep your team paid on time and in compliance.",
    icon: Wallet,
  },
  {
    number: "05",
    title: "Small Business Accounting",
    description:
      "Comprehensive accounting solutions tailored for small businesses, from startup formation to ongoing financial management.",
    icon: Building2,
  },
  {
    number: "06",
    title: "IRS / Tax Filing Assistance",
    description:
      "Expert guidance through IRS correspondence, audits, and complex filing situations to protect your financial standing.",
    icon: ShieldCheck,
  },
];

export default function Services() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = gridRef.current?.querySelectorAll(".service-card");

    if (!section || !heading || !cards?.length) return;

    const mm = gsap.matchMedia();

    // Desktop: pin the section and connect card reveals to scrolling.
    mm.add("(min-width: 768px)", () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * 4}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, index) => {
        timeline.fromTo(
          card,
          {
            opacity: 0,
            scale: 0.8,
            y: 45,
            filter: "blur(12px)",
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "none",
          },
          index * 0.85
        );
      });
    });

    // Mobile: reveal cards as they enter the viewport.
    mm.add("(max-width: 767px)", () => {
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 45,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      className="services-section services-scroll-section"
      id="services"
      ref={sectionRef}
    >
      <div className="services-container">
        <div className="services-heading" ref={headingRef}>
          <span className="section-eyebrow">WHAT WE OFFER</span>

          <h2>
            Financial clarity.
            <span> Professional support.</span>
          </h2>

          <p>
            Practical tax, accounting, and bookkeeping services designed
            to help individuals and businesses move forward with confidence.
          </p>
        </div>

        <div className="services-grid" ref={gridRef}>
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article className="service-card" key={service.number}>
                <div className="service-card-top">
                  <span className="service-number">
                    {service.number}
                  </span>

                  <div className="service-icon">
                    <Icon size={25} strokeWidth={1.7} />
                  </div>
                </div>

                <h3>{service.title}</h3>

                <p>{service.description}</p>

                <a className="service-link" href="#contact">
                  Discuss this service
                  <span aria-hidden="true">↗</span>
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
