import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { TrendingDown, Lock, DollarSign, BookOpen } from "lucide-react";

const barriers = [
  {
    icon: DollarSign,
    title: "Capital Barrier",
    desc: "Industrial CNC systems cost $50k–$500k+, pricing out small workshops and startups.",
  },
  {
    icon: Lock,
    title: "Closed Ecosystems",
    desc: "Proprietary software locks users into expensive licenses and vendor dependencies.",
  },
  {
    icon: BookOpen,
    title: "Knowledge Gap",
    desc: "Complex toolchains require specialized engineers, unavailable to most small teams.",
  },
  {
    icon: TrendingDown,
    title: "Scale Penalty",
    desc: "Small-batch production costs stay high, making custom manufacturing unviable.",
  },
];

export function ProblemSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-[#0a0b10] py-28 px-6 relative overflow-hidden">
      {/* Accent gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-[#FF5E0E]/40 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-16"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-[#FF5E0E]" />
            <span
              style={{ fontFamily: "'Space Mono', monospace" }}
              className="text-[#FF5E0E] text-xs tracking-[0.2em] uppercase"
            >
              The Problem
            </span>
          </div>
          <h2
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", lineHeight: 1.2 }}
            className="text-white mb-4"
          >
            Advanced manufacturing is gated by{" "}
            <span className="text-[#FF5E0E]">cost, complexity, and closed walls</span>
          </h2>
          <p
            style={{ fontFamily: "'Inter', sans-serif", lineHeight: 1.7 }}
            className="text-white/50"
          >
            Small businesses, makers, and emerging manufacturers are locked out
            of the tools that define modern production — not because the
            technology doesn't exist, but because access has been deliberately
            restricted by price and proprietary lock-in.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {barriers.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              className="group p-6 rounded-sm border border-white/8 bg-white/3 hover:border-[#FF5E0E]/30 hover:bg-white/5 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-sm bg-[#FF5E0E]/10 flex items-center justify-center mb-4 group-hover:bg-[#FF5E0E]/20 transition-colors">
                <Icon size={18} className="text-[#FF5E0E]" />
              </div>
              <h3
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
                className="text-white mb-2"
              >
                {title}
              </h3>
              <p
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", lineHeight: 1.6 }}
                className="text-white/50"
              >
                {desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Divider stat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-16 p-8 rounded-sm border border-[#FF5E0E]/20 bg-[#FF5E0E]/5 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <p
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "1.1rem" }}
            className="text-white text-center md:text-left"
          >
            Over 95% of the world's manufacturing businesses are small enterprises —
            yet they have access to less than 5% of advanced automation tools.
          </p>
          <div className="shrink-0 text-center">
            <div
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "3rem", color: "#FF5E0E", lineHeight: 1 }}
            >
              95%
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif" }} className="text-white/40 text-sm mt-1">
              locked out
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
