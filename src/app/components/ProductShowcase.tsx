import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, X, ZoomIn } from "lucide-react";

// MINOS — 7DOF arm renders
import minosMain from "../../imports/0000_ALT.png";
import minos1 from "../../imports/0001_ALT.png";
import minos2 from "../../imports/0002_ALT.png";
import minos3 from "../../imports/0003_ALT.png";
import minos4 from "../../imports/0004_ALT.png";
import minos5 from "../../imports/0005_ALT.png";

// NOMOS — 225:1 reducer renders (SolidWorks)
import nomosMain from "../../imports/SW_4.png";
import nomos1 from "../../imports/SW_5.png";
import nomos2 from "../../imports/SW_6.png";
import nomos3 from "../../imports/16_ALT.png";
import nomos4 from "../../imports/17_ALT.png";

// NIMIOS — 100:1 compact reducer
import nimiosMain from "../../imports/Reductor_Peque_o_Explotado_Isom_trico.PNG";
import nimios1 from "../../imports/20_ALT.png";
import nimios2 from "../../imports/21_ALT.png";
import nimios3 from "../../imports/22_ALT.png";

const products = [
  {
    id: "minos",
    name: "MINOS",
    tag: "7-DOF Modular Robotic Arm",
    color: "#FF5E0E",
    mainImg: minosMain,
    imgBg: "#111218",
    gallery: [minos1, minos2, minos3, minos4, minos5],
    description:
      "A 7-degree-of-freedom robotic arm with structural components printed in Stron4000 industrial resin (FormLabs), hybridized with tool-steel fasteners and precision bearings. Designed for precision automation in small business environments — every part reproducible in-house.",
    highlights: [
      { value: "7", label: "Degrees of Freedom" },
      { value: "Stron4000", label: "FormLabs Resin" },
      { value: "Open", label: "Hardware License" },
    ],
    specs: [
      "7 degrees of freedom",
      "NOMOS cycloidal reducer at each joint",
      "Stron4000 resin structural body (FormLabs SLA)",
      "Tool-steel fasteners & precision bearings throughout",
      "Blender-native programming via ARIES add-on",
    ],
  },
  {
    id: "nomos",
    name: "NOMOS",
    tag: "225:1 Multiplicative Cycloidal Reducer",
    color: "#00D4FF",
    mainImg: nomosMain,
    imgBg: "#f8f8f8",
    gallery: [nomos1, nomos2, nomos3, nomos4],
    description:
      "A two-chamber multiplicative cycloidal transmission achieving 225:1 reduction with near-zero backlash. Cycloidal discs and housing printed in Stron4000 industrial resin (FormLabs), paired with precision steel bearings — NOMOS is the backbone of every MINOS joint.",
    highlights: [
      { value: "225:1", label: "Gear Ratio" },
      { value: "2", label: "Cycloidal Stages" },
      { value: "Stron4000", label: "FormLabs Resin" },
    ],
    specs: [
      "225:1 gear ratio — two multiplicative cycloidal stages",
      "Near-zero backlash cycloidal transmission",
      "Stron4000 resin cycloidal discs & housing (FormLabs SLA)",
      "Precision steel bearings & tool-steel fasteners",
      "Crossed-roller output bearing — standard hot-swap interface",
    ],
  },
  {
    id: "nimios",
    name: "NIMIOS",
    tag: "100:1 Compact Cycloidal Reducer",
    color: "#A855F7",
    mainImg: nimiosMain,
    imgBg: "#ffffff",
    gallery: [nimios1, nimios2, nimios3],
    description:
      "A compact two-chamber multiplicative cycloidal transmission at 100:1 reduction, printed in Stron4000 resin (FormLabs) and hybridized with precision steel bearings. Shares the same output interface as NOMOS — purpose-built for wrist and tool-mount joints.",
    highlights: [
      { value: "100:1", label: "Gear Ratio" },
      { value: "2", label: "Cycloidal Stages" },
      { value: "Stron4000", label: "FormLabs Resin" },
    ],
    specs: [
      "100:1 gear ratio — two multiplicative cycloidal stages",
      "Compact wrist-optimized form factor",
      "Stron4000 resin body & cycloidal discs (FormLabs SLA)",
      "Precision steel bearings & tool-steel fasteners",
      "Compatible with NOMOS output interface — hot-swappable",
    ],
  },
];

export function ProductShowcase() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState(products[0].id);
  const [imgIdx, setImgIdx] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [lbIdx, setLbIdx] = useState(0);

  const product = products.find((p) => p.id === active)!;
  const allImages = [product.mainImg, ...product.gallery];

  const handleProductChange = (id: string) => {
    setActive(id);
    setImgIdx(0);
    setLightbox(false);
  };

  const openLightbox = (idx: number) => {
    setLbIdx(idx);
    setLightbox(true);
  };

  // Keyboard nav in lightbox
  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowRight") setLbIdx((i) => (i + 1) % allImages.length);
      if (e.key === "ArrowLeft") setLbIdx((i) => (i - 1 + allImages.length) % allImages.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, allImages.length]);

  // Prevent body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <>
      <section ref={ref} id="units" className="bg-[#0d0e14] py-28 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-[#FF5E0E]" />
              <span style={{ fontFamily: "'Space Mono', monospace" }} className="text-[#FF5E0E] text-xs tracking-[0.2em] uppercase">
                01 — Units
              </span>
            </div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", lineHeight: 1.15 }} className="text-white max-w-2xl mb-3">
              Three products. One integrated system.
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", lineHeight: 1.7 }} className="text-white/50 max-w-xl">
              MINOS, NOMOS, and NIMIOS are designed as a family — the arm and its reducers share a common interface standard so every joint is independently replaceable.
            </p>
          </motion.div>

          {/* Product selector tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex gap-2 mb-10 flex-wrap"
          >
            {products.map((p) => (
              <button
                key={p.id}
                onClick={() => handleProductChange(p.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-sm border transition-all duration-200 ${
                  active === p.id
                    ? "border-current text-white bg-white/5"
                    : "border-white/10 text-white/40 hover:border-white/20 hover:text-white/60"
                }`}
                style={active === p.id ? { borderColor: p.color, color: p.color } : {}}
              >
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", letterSpacing: "0.15em" }}>
                  {p.name}
                </span>
                {active === p.id && (
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px" }} className="text-white/40 hidden sm:block">
                    {p.tag}
                  </span>
                )}
              </button>
            ))}
          </motion.div>

          {/* Product detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start"
            >
              {/* Left: image viewer */}
              <div>
                {/* Main image — click to open lightbox */}
                <div
                  className="relative rounded-sm overflow-hidden aspect-[4/3] cursor-zoom-in group"
                  style={{ backgroundColor: product.imgBg }}
                  onClick={() => openLightbox(imgIdx)}
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={imgIdx}
                      src={allImages[imgIdx]}
                      alt={`${product.name} view ${imgIdx + 1}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-full h-full object-contain p-6"
                    />
                  </AnimatePresence>

                  {/* Zoom hint overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-2 px-3 py-1.5 rounded-sm bg-black/60 backdrop-blur-sm">
                      <ZoomIn size={13} className="text-white/70" />
                      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px" }} className="text-white/60 tracking-wider uppercase">
                        Expand
                      </span>
                    </div>
                  </div>

                  {/* Product badge */}
                  <div
                    className="absolute top-3 left-3 px-3 py-1.5 rounded-sm text-[10px] tracking-widest font-bold"
                    style={{ fontFamily: "'Space Mono', monospace", backgroundColor: `${product.color}20`, color: product.color, border: `1px solid ${product.color}40` }}
                  >
                    {product.name}
                  </div>

                  {/* Image counter */}
                  <div className="absolute bottom-3 right-3 px-2 py-1 rounded text-[10px] bg-black/50 backdrop-blur-sm text-white/40"
                    style={{ fontFamily: "'Space Mono', monospace" }}>
                    {imgIdx + 1} / {allImages.length}
                  </div>
                </div>

                {/* Thumbnail strip */}
                <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                  {allImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIdx(i)}
                      className="shrink-0 w-16 h-16 rounded-sm overflow-hidden transition-all duration-200"
                      style={{
                        border: `2px solid ${i === imgIdx ? product.color : "rgba(255,255,255,0.1)"}`,
                        opacity: i === imgIdx ? 1 : 0.5,
                        backgroundColor: product.imgBg,
                      }}
                      onMouseEnter={(e) => { if (i !== imgIdx) (e.currentTarget as HTMLElement).style.opacity = "0.8"; }}
                      onMouseLeave={(e) => { if (i !== imgIdx) (e.currentTarget as HTMLElement).style.opacity = "0.5"; }}
                    >
                      <img src={img} alt="" className="w-full h-full object-contain p-1" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right: text content */}
              <div className="flex flex-col justify-center">
                <div className="mb-2">
                  <span style={{ fontFamily: "'Space Mono', monospace", color: product.color, fontSize: "11px", letterSpacing: "0.18em" }} className="uppercase">
                    {product.tag}
                  </span>
                </div>
                <h3
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem, 3vw, 2.4rem)", lineHeight: 1.1, color: "white" }}
                  className="mb-4"
                >
                  {product.name}
                </h3>
                <p style={{ fontFamily: "'Inter', sans-serif", lineHeight: 1.75, fontSize: "0.95rem" }} className="text-white/55 mb-6">
                  {product.description}
                </p>

                {/* Highlight stats */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {product.highlights.map((h) => (
                    <div
                      key={h.label}
                      className="p-3 rounded-sm border border-white/8 bg-white/3 text-center"
                    >
                      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.15rem", color: product.color, lineHeight: 1.1 }}>
                        {h.value}
                      </div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "9px", letterSpacing: "0.1em" }} className="text-white/35 uppercase mt-1">
                        {h.label}
                      </div>
                    </div>
                  ))}
                </div>

                <ul className="space-y-3">
                  {product.specs.map((spec) => (
                    <li key={spec} className="flex items-start gap-3">
                      <ChevronRight size={14} style={{ color: product.color }} className="shrink-0 mt-0.5" />
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem" }} className="text-white/70">
                        {spec}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-white/8">
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.12em" }} className="text-white/25 uppercase">
                    Full product page coming soon — join early access for specs &amp; pricing
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/92 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
            onClick={(e) => { if (e.target === e.currentTarget) setLightbox(false); }}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="w-full max-w-6xl max-h-[92vh] flex flex-col lg:flex-row rounded-sm overflow-hidden border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left: image pane */}
              <div className="relative flex flex-col flex-1 min-h-0" style={{ backgroundColor: product.imgBg }}>
                {/* Main image */}
                <div className="flex-1 flex items-center justify-center p-6 md:p-10 min-h-0 relative">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={lbIdx}
                      src={allImages[lbIdx]}
                      alt={`${product.name} render ${lbIdx + 1}`}
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="max-w-full max-h-full object-contain"
                      style={{ maxHeight: "55vh" }}
                    />
                  </AnimatePresence>

                  {/* Prev / Next arrows */}
                  {allImages.length > 1 && (
                    <>
                      <button
                        onClick={() => setLbIdx((i) => (i - 1 + allImages.length) % allImages.length)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-sm bg-black/40 border border-white/10 text-white/60 hover:text-white hover:bg-black/60 transition-all"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        onClick={() => setLbIdx((i) => (i + 1) % allImages.length)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-sm bg-black/40 border border-white/10 text-white/60 hover:text-white hover:bg-black/60 transition-all"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnail strip */}
                <div className="flex gap-2 px-4 py-3 overflow-x-auto bg-black/30 border-t border-white/6 shrink-0">
                  {allImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setLbIdx(i)}
                      className="shrink-0 w-14 h-14 rounded-sm overflow-hidden transition-all duration-200"
                      style={{
                        border: `2px solid ${i === lbIdx ? product.color : "rgba(255,255,255,0.1)"}`,
                        opacity: i === lbIdx ? 1 : 0.45,
                        backgroundColor: product.imgBg,
                      }}
                    >
                      <img src={img} alt="" className="w-full h-full object-contain p-1" />
                    </button>
                  ))}
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px" }} className="text-white/20 self-center pl-2 shrink-0 uppercase tracking-widest">
                    {lbIdx + 1} / {allImages.length}
                  </span>
                </div>
              </div>

              {/* Right: info panel */}
              <div className="bg-[#0a0b10] w-full lg:w-[360px] shrink-0 flex flex-col overflow-y-auto">
                {/* Header */}
                <div className="flex items-start justify-between p-6 pb-4 border-b border-white/6">
                  <div>
                    <div
                      className="text-[10px] uppercase tracking-[0.2em] mb-1"
                      style={{ fontFamily: "'Space Mono', monospace", color: product.color }}
                    >
                      {product.tag}
                    </div>
                    <h3
                      style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.8rem", color: "white", lineHeight: 1 }}
                    >
                      {product.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => setLightbox(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-sm border border-white/10 text-white/40 hover:text-white hover:border-white/25 transition-all shrink-0 ml-4 mt-1"
                  >
                    <X size={15} />
                  </button>
                </div>

                <div className="p-6 flex flex-col gap-6 flex-1">
                  {/* Description */}
                  <p style={{ fontFamily: "'Inter', sans-serif", lineHeight: 1.75, fontSize: "0.875rem" }} className="text-white/55">
                    {product.description}
                  </p>

                  {/* Highlight stats */}
                  <div>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", letterSpacing: "0.15em" }} className="text-white/25 uppercase mb-3">
                      Key Figures
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {product.highlights.map((h) => (
                        <div
                          key={h.label}
                          className="p-3 rounded-sm border border-white/8 bg-white/3 text-center"
                        >
                          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: product.color, lineHeight: 1 }}>
                            {h.value}
                          </div>
                          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "8px", letterSpacing: "0.1em" }} className="text-white/35 uppercase mt-1.5">
                            {h.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Specs */}
                  <div>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", letterSpacing: "0.15em" }} className="text-white/25 uppercase mb-3">
                      Specifications
                    </div>
                    <ul className="space-y-2.5">
                      {product.specs.map((spec) => (
                        <li key={spec} className="flex items-start gap-2.5">
                          <ChevronRight size={12} style={{ color: product.color }} className="shrink-0 mt-0.5" />
                          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.825rem" }} className="text-white/65">
                            {spec}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Keyboard hint */}
                  <div className="mt-auto pt-4 border-t border-white/6">
                    <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", letterSpacing: "0.1em" }} className="text-white/18 uppercase">
                      ← → Arrow keys to navigate · Esc to close
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
