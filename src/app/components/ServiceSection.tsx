import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { ChevronRight, TrendingUp, Users, DollarSign, Wrench } from "lucide-react";

const stats = [
  {
    value: "70%",
    label: "of SMBs cite cost as the #1 barrier to automation adoption",
    source: "McKinsey Global Institute, 2023",
  },
  {
    value: "$46K",
    label: "average entry-level industrial robot — before installation, licensing, or training",
    source: "IFR World Robotics Report, 2023",
  },
  {
    value: "34%",
    label: "productivity gain reported by SMBs that successfully adopted automation",
    source: "McKinsey Manufacturing Survey, 2023",
  },
  {
    value: "72%",
    label: "of small manufacturers say skilled labor shortage is their top operational challenge",
    source: "NAM Manufacturers Outlook Survey, 2024",
  },
];

const tiers = [
  {
    icon: TrendingUp,
    name: "Consulting",
    tag: "Tier 01",
    color: "#FF5E0E",
    price: "On request",
    description:
      "An expert audit of your current production workflow. We identify where automation can reduce bottlenecks, cut costs, and increase throughput — with a full CNC integration roadmap tailored to your business.",
    includes: [
      "On-site or remote workflow audit",
      "Automation readiness assessment",
      "CNC integration roadmap",
      "ROI projection report",
    ],
  },
  {
    icon: Wrench,
    name: "Implementation",
    tag: "Tier 02",
    color: "#00D4FF",
    price: "Project-based",
    description:
      "Full hands-on support to deploy your ARIES unit. We handle hardware setup, software configuration, toolpath programming, and validation — handing you a production-ready cell.",
    includes: [
      "Hardware assembly & calibration",
      "ARIES software setup & configuration",
      "First toolpath programming session",
      "Production validation & sign-off",
    ],
  },
  {
    icon: Users,
    name: "Courses",
    tag: "Tier 03",
    color: "#A855F7",
    price: "Per-seat",
    description:
      "Structured training for operators and engineers. From beginner (what is CNC?) to advanced (custom ARIES add-on development). All courses use the ARIES ecosystem and real hardware.",
    includes: [
      "Operator fundamentals (CNC basics, safety)",
      "ARIES program: Blender add-on mastery",
      "Toolpath design & optimization",
      "Advanced: custom add-on development",
    ],
  },
  {
    icon: DollarSign,
    name: "Full Integration",
    tag: "Tier 04",
    color: "#22C55E",
    price: "Enterprise",
    description:
      "End-to-end automation for your business. We design, build, deploy, and maintain a complete ARIES manufacturing cell — scaled to your volume, facility, and production targets.",
    includes: [
      "Full cell design & build",
      "Custom toolpath & process development",
      "Operator team training & certification",
      "Ongoing maintenance & support SLA",
    ],
  },
];

export function ServiceSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="service-detail" ref={ref} className="bg-[#0d0e14] py-28 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-[#A855F7]" />
            <span style={{ fontFamily: "'Space Mono', monospace" }} className="text-[#A855F7] text-xs tracking-[0.2em] uppercase">
              Service
            </span>
          </div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", lineHeight: 1.15 }} className="text-white max-w-2xl mb-4">
            Automation is the opportunity. The gap is implementation.
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", lineHeight: 1.7 }} className="text-white/50 max-w-2xl">
            Most small businesses understand that automation could transform their operations — but lack the capital, knowledge, or support to get there. ARIES Service exists to close that gap at every stage.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20"
        >
          {stats.map(({ value, label, source }, i) => (
            <motion.div
              key={value}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="p-6 rounded-sm border border-white/8 bg-white/3"
            >
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "2.2rem", color: "#A855F7", lineHeight: 1 }} className="mb-3">
                {value}
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", lineHeight: 1.6 }} className="text-white/60 mb-3">
                {label}
              </p>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", letterSpacing: "0.08em" }} className="text-white/20">
                {source}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Service tiers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-6"
        >
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "1.2rem" }} className="text-white mb-1">
            Four ways to work with us
          </h3>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem" }} className="text-white/40">
            Start at any tier — upgrade as your needs grow.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {tiers.map(({ icon: Icon, name, tag, color, price, description, includes }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.35 + i * 0.08 }}
              className="group p-6 rounded-sm border border-white/8 bg-white/3 hover:border-white/15 transition-all duration-300 flex flex-col gap-5"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-sm flex items-center justify-center" style={{ backgroundColor: `${color}18` }}>
                    <Icon size={18} style={{ color }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", letterSpacing: "0.14em", color }} className="uppercase mb-0.5">{tag}</div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "white" }}>{name}</div>
                  </div>
                </div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: "rgba(255,255,255,0.3)" }} className="text-right">
                  {price}
                </div>
              </div>

              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", lineHeight: 1.7 }} className="text-white/55">
                {description}
              </p>

              <ul className="space-y-2">
                {includes.map(item => (
                  <li key={item} className="flex items-start gap-2.5">
                    <ChevronRight size={12} style={{ color }} className="shrink-0 mt-1" />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.825rem" }} className="text-white/60">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
