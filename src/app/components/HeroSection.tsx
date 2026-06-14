import { motion } from "motion/react";
import { ArrowRight, Cpu, GitBranch, Zap } from "lucide-react";
import robotArm from "../../imports/0000_ALT.png";
import { GeometricBackground } from "./GeometricBackground";

const badges = [
  { icon: Cpu, label: "3D Printed CNC Units" },
  { icon: GitBranch, label: "Open Source Ecosystem" },
  { icon: Zap, label: "Blender Integration" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0b10]">
      {/* Parametric node network + rotating joint rings */}
      <GeometricBackground />

      {/* Radial glow behind arm */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#FF5E0E]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-6"
            >
              <div className="h-px w-8 bg-[#FF5E0E]" />
              <span
                style={{ fontFamily: "'Space Mono', monospace" }}
                className="text-[#FF5E0E] text-xs tracking-[0.2em] uppercase"
              >
                Advanced Manufacturing. Open Source.
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-white mb-6"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(2.6rem, 6vw, 4.8rem)",
                fontWeight: 700,
                lineHeight: 1.05,
              }}
            >
              Bridging the{" "}
              <span className="text-[#FF5E0E]">Manufacturing Gap</span>{" "}
              for Small Business
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-white/60 mb-10 max-w-xl"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "1.1rem",
                lineHeight: 1.7,
              }}
            >
              A.R.I.E.S. delivers 3D-printable modular robotic units paired with an
              open-source Blender-based ecosystem — giving small businesses access
              to advanced automation that was once reserved for industrial giants.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <button
                onClick={() =>
                  document.querySelector("#units")?.scrollIntoView({ behavior: "smooth" })
                }
                className="group flex items-center gap-2 px-7 py-3.5 bg-[#FF5E0E] hover:bg-[#e54d00] text-white transition-all duration-200 rounded-sm"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
              >
                Explore the Solution
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() =>
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-7 py-3.5 border border-white/20 text-white/80 hover:border-white/40 hover:text-white transition-all duration-200 rounded-sm"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Request Early Access
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-3"
            >
              {badges.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
                >
                  <Icon size={14} className="text-[#FF5E0E]" />
                  <span
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    className="text-white/70 text-sm"
                  >
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: product render */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="relative flex items-center justify-center"
          >
            <motion.img
              src={robotArm}
              alt="MINOS — A.R.I.E.S. robotic arm"
              className="relative z-10 w-full max-w-sm lg:max-w-md drop-shadow-2xl"
              style={{ filter: "drop-shadow(0 0 40px rgba(255,94,14,0.15))" }}
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            />

            {/* Floating label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="absolute bottom-4 right-4 px-4 py-2.5 rounded-sm border border-[#FF5E0E]/30 bg-[#0a0b10]/90 backdrop-blur-sm"
            >
              <div style={{ fontFamily: "'Space Mono', monospace" }} className="text-[#FF5E0E] text-xs tracking-widest uppercase">
                MINOS
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif" }} className="text-white/40 text-xs mt-0.5">
                7-DOF Modular Robotic Arm
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span style={{ fontFamily: "'Space Mono', monospace" }} className="text-white/25 text-xs tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-white/25 to-transparent"
        />
      </motion.div>
    </section>
  );
}
