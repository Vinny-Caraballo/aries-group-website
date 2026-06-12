import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useState } from "react";
import img16 from "../../imports/16_ALT.png";
import img17 from "../../imports/17_ALT.png";
import img18 from "../../imports/18_ALT.png";
import img19 from "../../imports/19_ALT.png";
import img20 from "../../imports/20_ALT.png";
import img21 from "../../imports/21_ALT.png";
import imgReductor from "../../imports/Reductor_Peque_o_Explotado_Isom_trico.PNG";

const modules = [
  {
    id: "joint-a",
    label: "NOMOS — Harmonic Drive Reducer",
    sublabel: "Exploded isometric — NOMOS gear reducer assembly",
    img: imgReductor,
    bg: "#ffffff",
    textColor: "#111",
    desc: "NOMOS is the core transmission element of MINOS: a custom harmonic drive reducer achieving high torque-to-weight ratio from 3D-printed parts and standard bearings.",
  },
  {
    id: "joint-b",
    label: "Joint Module — Full Assembly",
    sublabel: "Exploded view — all layers",
    img: img18,
    bg: "#f8f8f8",
    textColor: "#111",
    desc: "Complete joint stack from motor face to output flange, showing every layer: motor plate, strain wave gear, crossed-roller bearing, and output cap.",
  },
  {
    id: "joint-c",
    label: "Joint Module — Transparent View",
    sublabel: "Top-down section render",
    img: img20,
    bg: "#1a1c24",
    textColor: "#fff",
    desc: "Top-down section cut showing the crossed-roller bearing race and output flange holes. All structural parts are 3D-printable in PETG or Nylon.",
  },
  {
    id: "joint-d",
    label: "Compact Joint — Side Profile",
    sublabel: "Assembled module, side view",
    img: img19,
    bg: "#1a1c24",
    textColor: "#fff",
    desc: "Side profile of the assembled joint, showing the minimal footprint — each module is self-contained, stackable, and replaceable in the field.",
  },
  {
    id: "joint-e",
    label: "Flexspline & Wave Generator",
    sublabel: "Isometric exploded — internal mechanism",
    img: img17,
    bg: "#111218",
    textColor: "#fff",
    desc: "The flexspline and wave generator components that enable the harmonic drive's zero-backlash transmission — all designed for FDM/resin printing.",
  },
  {
    id: "joint-f",
    label: "Joint Module — Compact Explode",
    sublabel: "Exploded view — small form factor",
    img: img21,
    bg: "#f4f4f4",
    textColor: "#111",
    desc: "Small-form-factor version of the joint module for lighter-duty axes. Same interface standard, reduced size for wrist and end-effector positions.",
  },
  {
    id: "joint-g",
    label: "Base Drive Assembly",
    sublabel: "Full exploded — base joint",
    img: img16,
    bg: "#f4f4f4",
    textColor: "#111",
    desc: "The base joint assembly — highest torque in the kinematic chain, built with an oversized harmonic drive and double-row bearing for rigidity.",
  },
];

export function ProductShowcase() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState(modules[0].id);

  const activeModule = modules.find((m) => m.id === active)!;

  return (
    <section ref={ref} className="bg-[#0d0e14] py-28 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-[#FF5E0E]" />
            <span
              style={{ fontFamily: "'Space Mono', monospace" }}
              className="text-[#FF5E0E] text-xs tracking-[0.2em] uppercase"
            >
              Engineering Detail
            </span>
          </div>
          <h2
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", lineHeight: 1.15 }}
            className="text-white max-w-2xl mb-3"
          >
            MINOS — every joint a modular, printable precision actuator
          </h2>
          <p
            style={{ fontFamily: "'Inter', sans-serif", lineHeight: 1.7, fontSize: "1rem" }}
            className="text-white/50 max-w-xl"
          >
            MINOS is built around NOMOS — a custom harmonic drive reducer. Every
            joint is independently designed, open-sourced, and field-replaceable,
            delivering industrial-grade precision from 3D-printed parts.
          </p>
        </motion.div>

        {/* Main viewer + sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Active large view */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35 }}
                className="rounded-sm overflow-hidden relative"
                style={{ backgroundColor: activeModule.bg }}
              >
                <div className="aspect-[16/10] flex items-center justify-center p-8">
                  <img
                    src={activeModule.img}
                    alt={activeModule.label}
                    className="max-h-full max-w-full object-contain"
                    style={{
                      filter: activeModule.bg === "#ffffff" || activeModule.bg === "#f4f4f4" || activeModule.bg === "#f8f8f8"
                        ? "none"
                        : "drop-shadow(0 0 30px rgba(255,94,14,0.1))",
                    }}
                  />
                </div>
                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-gradient-to-t from-black/60 to-transparent">
                  <div
                    style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: "white" }}
                    className="text-sm"
                  >
                    {activeModule.label}
                  </div>
                  <div
                    style={{ fontFamily: "'Space Mono', monospace", color: "#FF5E0E" }}
                    className="text-xs mt-0.5 tracking-wide"
                  >
                    {activeModule.sublabel}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Description */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active + "-desc"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 p-5 rounded-sm border border-white/8 bg-white/3"
              >
                <p
                  style={{ fontFamily: "'Inter', sans-serif", lineHeight: 1.7, fontSize: "0.9rem" }}
                  className="text-white/55"
                >
                  {activeModule.desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Thumbnail grid */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 lg:max-h-[560px] lg:overflow-y-auto pr-1 content-start">
            {modules.map((mod, i) => (
              <motion.button
                key={mod.id}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
                onClick={() => setActive(mod.id)}
                className={`group rounded-sm overflow-hidden border transition-all duration-200 text-left ${
                  active === mod.id
                    ? "border-[#FF5E0E]/60 ring-1 ring-[#FF5E0E]/30"
                    : "border-white/8 hover:border-white/20"
                }`}
              >
                <div
                  className="aspect-square flex items-center justify-center p-3"
                  style={{ backgroundColor: mod.bg }}
                >
                  <img
                    src={mod.img}
                    alt={mod.label}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="px-3 py-2 bg-[#111218]">
                  <div
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", fontWeight: 500 }}
                    className={`transition-colors line-clamp-1 ${active === mod.id ? "text-[#FF5E0E]" : "text-white/60 group-hover:text-white/80"}`}
                  >
                    {mod.label}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
