import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Design",
    desc: "Use Blender's open-source tools to design your part or product, with A.R.I.E.S. add-ons that generate machine-ready toolpaths.",
    color: "#FF5E0E",
  },
  {
    num: "02",
    title: "Print & Build",
    desc: "Print your CNC unit's structural components and assemble with commodity hardware — no specialized sourcing required.",
    color: "#00D4FF",
  },
  {
    num: "03",
    title: "Machine",
    desc: "Run your designs directly on the A.R.I.E.S. unit. Iterate fast, scale incrementally, and keep costs proportional to your output.",
    color: "#A855F7",
  },
  {
    num: "04",
    title: "Deploy & Scale",
    desc: "With A.R.I.E.S. Service, get the training and consulting support to go from first part to full production workflow.",
    color: "#22C55E",
  },
];

const FACTORY_IMG = "https://images.unsplash.com/photo-1647427060118-4911c9821b82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxzbWFsbCUyMGJ1c2luZXNzJTIwbWFudWZhY3R1cmluZyUyMHdvcmtzaG9wJTIwYXV0b21hdGlvbnxlbnwxfHx8fDE3ODEyMzQyNDR8MA&ixlib=rb-4.1.0&q=80&w=1080";

export function EcosystemSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="mission" ref={ref} className="bg-[#0d0e14] py-28 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      {/* Background factory image */}
      <div className="absolute inset-0">
        <img src={FACTORY_IMG} alt="Factory automation" className="w-full h-full object-cover opacity-5" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-8 bg-[#FF5E0E]" />
            <span
              style={{ fontFamily: "'Space Mono', monospace" }}
              className="text-[#FF5E0E] text-xs tracking-[0.2em] uppercase"
            >
              How It Works
            </span>
            <div className="h-px w-8 bg-[#FF5E0E]" />
          </div>
          <h2
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", lineHeight: 1.2 }}
            className="text-white mb-4"
          >
            From concept to production — entirely in your hands
          </h2>
          <p
            style={{ fontFamily: "'Inter', sans-serif", lineHeight: 1.7 }}
            className="text-white/50 max-w-xl mx-auto"
          >
            The A.R.I.E.S. workflow is designed to be end-to-end, open, and
            scalable — whether you're making one prototype or running a small
            production line.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {steps.map(({ num, title, desc, color }, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.12 }}
              className="relative group"
            >
              <div className="p-6 rounded-sm border border-white/8 bg-white/3 hover:border-white/15 transition-all duration-300 h-full">
                <div
                  style={{ fontFamily: "'Space Mono', monospace", color, fontSize: "2.5rem", fontWeight: 700, lineHeight: 1 }}
                  className="mb-4 opacity-70"
                >
                  {num}
                </div>
                <h3
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: "white" }}
                  className="mb-2 text-lg"
                >
                  {title}
                </h3>
                <p
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", lineHeight: 1.65 }}
                  className="text-white/50"
                >
                  {desc}
                </p>
              </div>
              {/* Connector arrow */}
              {i < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 text-white/20">
                  <ArrowRight size={16} />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Open source manifesto */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-10 rounded-sm border border-[#FF5E0E]/15 bg-[#FF5E0E]/5"
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-[#FF5E0E]" />
              <span
                style={{ fontFamily: "'Space Mono', monospace" }}
                className="text-[#FF5E0E] text-xs tracking-[0.2em] uppercase"
              >
                Our Philosophy
              </span>
            </div>
            <h3
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(1.4rem, 3vw, 2rem)", lineHeight: 1.2 }}
              className="text-white mb-4"
            >
              Open source is not a feature. It's the foundation.
            </h3>
            <p
              style={{ fontFamily: "'Inter', sans-serif", lineHeight: 1.75 }}
              className="text-white/55"
            >
              A.R.I.E.S. is built on the belief that manufacturing knowledge
              belongs to everyone. By building on Blender and open hardware
              standards, we ensure that every improvement benefits the entire
              community — not just our paying customers.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Open Hardware", value: "100%" },
              { label: "Open Software", value: "100%" },
              { label: "Community Driven", value: "Always" },
              { label: "Vendor Lock-in", value: "Zero" },
            ].map(({ label, value }) => (
              <div key={label} className="p-5 rounded-sm bg-white/5 border border-white/8">
                <div
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.6rem", color: "#FF5E0E", lineHeight: 1 }}
                  className="mb-1"
                >
                  {value}
                </div>
                <div
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem" }}
                  className="text-white/45"
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
