import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useState } from "react";
import { ChevronRight } from "lucide-react";

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
      "A fully 3D-printable 7-degree-of-freedom robotic arm built for precision automation in small business environments. Every structural component is printable in-house; assembly uses off-the-shelf fasteners and bearings.",
    specs: [
      "7 degrees of freedom",
      "NOMOS harmonic drive at each joint",
      "Fully open hardware BOM",
      "Blender-native programming via ARIES add-on",
      "Scalable from desktop prototype to workshop cell",
    ],
  },
  {
    id: "nomos",
    name: "NOMOS",
    tag: "225:1 Harmonic Drive Reducer",
    color: "#00D4FF",
    mainImg: nomosMain,
    imgBg: "#f8f8f8",
    gallery: [nomos1, nomos2, nomos3, nomos4],
    description:
      "A high-ratio harmonic drive gear reducer engineered for zero-backlash torque transmission. Designed from the ground up to be 3D-printable in PETG or Nylon, NOMOS is the precision backbone of each MINOS joint.",
    specs: [
      "225:1 gear ratio",
      "Zero-backlash harmonic transmission",
      "3D-printable flexspline & wave generator",
      "Crossed-roller output bearing",
      "Standard joint interface — hot-swappable",
    ],
  },
  {
    id: "nimios",
    name: "NIMIOS",
    tag: "100:1 Compact Reducer",
    color: "#A855F7",
    mainImg: nimiosMain,
    imgBg: "#ffffff",
    gallery: [nimios1, nimios2, nimios3],
    description:
      "A compact 100:1 harmonic drive reducer for lighter-duty axes and end-effector positions. Same standard interface as NOMOS, significantly reduced footprint — ideal for wrist and tool-mount joints.",
    specs: [
      "100:1 gear ratio",
      "Compact wrist-optimized form factor",
      "Compatible with NOMOS output interface",
      "Reduced weight for distal arm positions",
      "3D-printable in PLA, PETG or Nylon",
    ],
  },
];

export function ProductShowcase() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState(products[0].id);
  const [hovering, setHovering] = useState(false);
  const [galleryIdx, setGalleryIdx] = useState(0);

  const product = products.find((p) => p.id === active)!;

  const handleProductChange = (id: string) => {
    setActive(id);
    setHovering(false);
    setGalleryIdx(0);
  };

  return (
    <section ref={ref} id="units-detail" className="bg-[#0d0e14] py-28 px-6 relative overflow-hidden">
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
              Product Line
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
            {/* Image + gallery hover */}
            <div
              className="relative rounded-sm overflow-hidden aspect-[4/3] cursor-crosshair"
              style={{ backgroundColor: product.imgBg }}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => { setHovering(false); setGalleryIdx(0); }}
            >
              {/* Main image */}
              <AnimatePresence mode="wait">
                {!hovering ? (
                  <motion.img
                    key="main"
                    src={product.mainImg}
                    alt={product.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="w-full h-full object-contain p-6"
                  />
                ) : (
                  <motion.div
                    key="gallery"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full flex flex-col"
                  >
                    {/* Large selected gallery image */}
                    <div className="flex-1 flex items-center justify-center p-4" style={{ backgroundColor: product.imgBg }}>
                      <img
                        src={product.gallery[galleryIdx]}
                        alt={`${product.name} render ${galleryIdx + 1}`}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    {/* Thumbnail strip */}
                    <div className="flex gap-1.5 p-2 bg-black/40 backdrop-blur-sm">
                      {product.gallery.map((img, i) => (
                        <button
                          key={i}
                          onMouseEnter={() => setGalleryIdx(i)}
                          className={`w-14 h-14 rounded border flex-shrink-0 overflow-hidden transition-all ${
                            i === galleryIdx ? "border-white/60" : "border-white/15 opacity-60 hover:opacity-90"
                          }`}
                          style={{ backgroundColor: product.imgBg }}
                        >
                          <img src={img} alt="" className="w-full h-full object-contain p-1" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hover hint */}
              {!hovering && (
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded text-[10px] bg-black/50 backdrop-blur-sm text-white/40"
                  style={{ fontFamily: "'Space Mono', monospace" }}>
                  hover for gallery
                </div>
              )}

              {/* Product badge */}
              <div
                className="absolute top-3 left-3 px-3 py-1.5 rounded-sm text-[10px] tracking-widest font-bold"
                style={{ fontFamily: "'Space Mono', monospace", backgroundColor: `${product.color}20`, color: product.color, border: `1px solid ${product.color}40` }}
              >
                {product.name}
              </div>
            </div>

            {/* Text content */}
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
              <p style={{ fontFamily: "'Inter', sans-serif", lineHeight: 1.75, fontSize: "0.95rem" }} className="text-white/55 mb-8">
                {product.description}
              </p>
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
  );
}
