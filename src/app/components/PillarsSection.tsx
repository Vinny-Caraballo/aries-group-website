import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Box, Code2, Wrench, ChevronRight } from "lucide-react";
import explodedView from "../../imports/17_ALT.png";
import robotSimulation from "../../imports/Screenshot1.png";
import SERVICE_TEAM_IMG from "../../imports/Screenshot3.png";

const pillars = [
  {
    id: "units",
    icon: Box,
    tag: "01 — Making Products",
    title: "Units",
    subtitle: "Modular 3D-Printed Robotic Hardware",
    accent: "#FF5E0E",
    image: explodedView,
    imageBg: "bg-[#111218]",
    description:
      "Fully functional 6-DOF robotic arm units designed from the ground up to be 3D-printed in-house, assembled with off-the-shelf components, and customized to your production needs. From individual joint modules to complete machining cells — built to be replicated, not just purchased.",
    features: [
      "Printable structural components & housings",
      "Modular harmonic drive actuator joints",
      "Scalable from desktop prototype to workshop",
      "Open hardware specifications & BOM",
    ],
  },
  {
    id: "program",
    icon: Code2,
    tag: "02 — Open Ecosystem",
    title: "Program",
    subtitle: "Blender-Based Software Suite",
    accent: "#00D4FF",
    image: robotSimulation,
    imageBg: "bg-[#1a1d24]",
    description:
      "A complete open-source toolchain built on top of Blender — from 3D design and kinematic simulation to G-code generation and machine control. Program, simulate, and verify your robot's movements before they happen. No proprietary licenses, no vendor lock-in.",
    features: [
      "Blender add-on for CAM & robot programming",
      "Real-time kinematic simulation & collision check",
      "G-code generator & machine post-processor",
      "Community-driven plugin ecosystem",
    ],
  },
  {
    id: "service",
    icon: Wrench,
    tag: "03 — Implementation",
    title: "Service",
    subtitle: "Training & Solutions Consulting",
    accent: "#A855F7",
    image: SERVICE_TEAM_IMG,
    imageBg: "bg-[#111218]",
    description:
      "Technology is only useful when you can implement it. A.R.I.E.S. provides hands-on operator training, integration consulting, and ongoing support — helping small businesses deploy, run, and grow with the platform, closing the skills gap alongside the technology gap.",
    features: [
      "Onboarding & operator certification",
      "Custom workflow automation design",
      "Integration consulting & site visits",
      "Ongoing technical support & updates",
    ],
  },
];

function PillarCard({ pillar, index }: { pillar: typeof pillars[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} id={pillar.id} className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${!isEven ? "lg:[&>*:first-child]:order-2" : ""}`}>
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -40 : 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-8" style={{ backgroundColor: pillar.accent }} />
              <span
                style={{ fontFamily: "'Space Mono', monospace", color: pillar.accent }}
                className="text-xs tracking-[0.2em] uppercase"
              >
                {pillar.tag}
              </span>
            </div>

            <div className="flex items-start gap-4 mb-4">
              <div
                className="w-12 h-12 rounded-sm flex items-center justify-center shrink-0 mt-1"
                style={{ backgroundColor: `${pillar.accent}18` }}
              >
                <pillar.icon size={22} style={{ color: pillar.accent }} />
              </div>
              <div>
                <h2
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(2rem, 5vw, 3.2rem)",
                    lineHeight: 1.1,
                    color: "white",
                  }}
                >
                  {pillar.title}
                </h2>
                <p
                  style={{ fontFamily: "'Inter', sans-serif", color: pillar.accent }}
                  className="text-base mt-1"
                >
                  {pillar.subtitle}
                </p>
              </div>
            </div>

            <p
              style={{ fontFamily: "'Inter', sans-serif", lineHeight: 1.75, fontSize: "1rem" }}
              className="text-white/60 mb-8"
            >
              {pillar.description}
            </p>

            <ul className="space-y-3">
              {pillar.features.map((feat) => (
                <li key={feat} className="flex items-center gap-3">
                  <ChevronRight size={14} style={{ color: pillar.accent }} className="shrink-0" />
                  <span
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem" }}
                    className="text-white/70"
                  >
                    {feat}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? 40 : -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="relative"
          >
            <div className={`relative rounded-sm overflow-hidden aspect-[4/3] ${pillar.imageBg} flex items-center justify-center`}>
              <img
                src={pillar.image}
                alt={pillar.title}
                className="w-full h-full object-contain p-4"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b10]/30 to-transparent pointer-events-none" />
              {/* Accent corner badge */}
              <div
                className="absolute top-4 right-4 w-10 h-10 rounded-sm flex items-center justify-center"
                style={{ backgroundColor: `${pillar.accent}20`, border: `1px solid ${pillar.accent}40` }}
              >
                <pillar.icon size={18} style={{ color: pillar.accent }} />
              </div>
            </div>
            {/* Glow */}
            <div
              className="absolute -inset-4 rounded-sm -z-10 opacity-15 blur-3xl"
              style={{ backgroundColor: pillar.accent }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function PillarsSection() {
  return (
    <section className="bg-[#0a0b10]">
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-px w-8 bg-[#FF5E0E]" />
          <span
            style={{ fontFamily: "'Space Mono', monospace" }}
            className="text-[#FF5E0E] text-xs tracking-[0.2em] uppercase"
          >
            The Platform
          </span>
        </div>
        <h2
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", lineHeight: 1.15 }}
          className="text-white max-w-xl"
        >
          Three pillars, one integrated ecosystem
        </h2>
      </div>

      {pillars.map((pillar, i) => (
        <PillarCard key={pillar.id} pillar={pillar} index={i} />
      ))}
    </section>
  );
}
