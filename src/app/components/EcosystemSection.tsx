import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";

// ─── Mock interface panels ───────────────────────────────────────────────────

function CreateMock() {
  const [activeDof, setActiveDof] = useState(7);
  const [activeJoint, setActiveJoint] = useState(3);
  const joints = [1, 2, 3, 4, 5, 6, 7];
  return (
    <div className="w-full h-full flex flex-col gap-3 p-4 text-[11px]" style={{ fontFamily: "'Space Mono', monospace" }}>
      <div className="text-[#FF5E0E] tracking-widest text-[10px] uppercase mb-1">ARIES — Arm Builder</div>
      {/* DOF selector */}
      <div className="bg-white/5 rounded p-3 border border-white/8">
        <div className="text-white/40 text-[9px] mb-2 uppercase tracking-wider">Degrees of Freedom</div>
        <div className="flex gap-1.5 flex-wrap">
          {[2,4,6,7,8].map(d => (
            <button key={d} onClick={() => setActiveDof(d)}
              className={`px-3 py-1 rounded text-[10px] border transition-all ${activeDof===d ? "border-[#FF5E0E] text-[#FF5E0E] bg-[#FF5E0E]/10" : "border-white/15 text-white/40 hover:border-white/25"}`}>
              {d}DOF
            </button>
          ))}
        </div>
      </div>
      {/* Arm silhouette + joint selector */}
      <div className="flex gap-3 flex-1">
        <div className="bg-white/5 rounded border border-white/8 p-3 flex-1 flex flex-col gap-1.5">
          <div className="text-white/40 text-[9px] mb-1 uppercase tracking-wider">Select Joint</div>
          {joints.slice(0, activeDof).map(j => (
            <button key={j} onClick={() => setActiveJoint(j)}
              className={`flex items-center gap-2 px-2 py-1 rounded transition-all text-left ${activeJoint===j ? "bg-[#FF5E0E]/15 text-[#FF5E0E]" : "text-white/30 hover:text-white/50"}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${activeJoint===j ? "bg-[#FF5E0E]" : "bg-white/20"}`} />
              J{j} — {j<=2?"NOMOS 225:1":"NIMIOS 100:1"}
            </button>
          ))}
        </div>
        {/* Joint config panel */}
        <div className="bg-white/5 rounded border border-white/8 p-3 w-28 flex flex-col gap-2">
          <div className="text-white/40 text-[9px] uppercase tracking-wider">J{activeJoint} Config</div>
          <div className="text-[10px] text-white/60">Type</div>
          <div className="text-[#FF5E0E] text-[10px]">{activeJoint<=2?"NOMOS":"NIMIOS"}</div>
          <div className="text-[10px] text-white/60 mt-1">Ratio</div>
          <div className="text-white/80 text-[10px]">{activeJoint<=2?"225:1":"100:1"}</div>
          <div className="text-[10px] text-white/60 mt-1">Axis</div>
          <div className="text-white/80 text-[10px]">Z + {activeJoint%2===0?"X":"Y"}</div>
        </div>
      </div>
      <div className="bg-[#FF5E0E]/10 border border-[#FF5E0E]/30 rounded px-3 py-2 text-[#FF5E0E] text-[10px]">
        ✓ {activeDof}-DOF configuration ready — {activeDof} joints detected
      </div>
    </div>
  );
}

function ProcessMock() {
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const [samples, setSamples] = useState(152);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { setRunning(false); clearInterval(id); return 100; }
        return p + 2;
      });
    }, 40);
    return () => clearInterval(id);
  }, [running]);

  const handleRun = () => { setProgress(0); setRunning(true); };

  return (
    <div className="w-full h-full flex flex-col gap-3 p-4 text-[11px]" style={{ fontFamily: "'Space Mono', monospace" }}>
      <div className="text-[#00D4FF] tracking-widest text-[10px] uppercase mb-1">ARIES — Slicer / Toolpath</div>
      <div className="flex gap-2">
        <div className="bg-white/5 rounded border border-white/8 p-3 flex-1">
          <div className="text-white/40 text-[9px] mb-2 uppercase tracking-wider">Parameters</div>
          {[
            ["Layer height", "0.2 mm"],
            ["Speed", "40 mm/s"],
            ["Attack angle", "ADAPTIVE"],
            ["Sampling", "AUTO (RDP)"],
          ].map(([k,v]) => (
            <div key={k} className="flex justify-between items-center py-0.5 border-b border-white/5 last:border-0">
              <span className="text-white/40 text-[9px]">{k}</span>
              <span className="text-[#00D4FF] text-[9px]">{v}</span>
            </div>
          ))}
        </div>
        <div className="bg-white/5 rounded border border-white/8 p-3 w-24 flex flex-col items-center justify-center gap-2">
          <div className="text-white/40 text-[9px] text-center">Samples</div>
          <div className="text-[#00D4FF] text-lg font-bold">{samples}</div>
          <div className="flex gap-1">
            <button onClick={() => setSamples(s=>Math.max(2,s-10))} className="px-2 py-0.5 bg-white/10 rounded text-white/50 hover:text-white">−</button>
            <button onClick={() => setSamples(s=>s+10)} className="px-2 py-0.5 bg-white/10 rounded text-white/50 hover:text-white">+</button>
          </div>
        </div>
      </div>
      {/* Progress bar */}
      <div className="bg-white/5 rounded border border-white/8 p-3">
        <div className="flex justify-between mb-2">
          <span className="text-white/40 text-[9px] uppercase tracking-wider">Toolpath generation</span>
          <span className="text-[#00D4FF] text-[9px]">{progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-white/10 rounded overflow-hidden">
          <motion.div className="h-full bg-[#00D4FF] rounded" animate={{ width: `${progress}%` }} transition={{ duration: 0.1 }} />
        </div>
        {progress === 100 && <div className="text-[#00D4FF] text-[9px] mt-1.5">✓ {samples} waypoints generated — G-code ready</div>}
      </div>
      <button onClick={handleRun} disabled={running}
        className="bg-[#00D4FF]/20 border border-[#00D4FF]/40 text-[#00D4FF] rounded px-4 py-2 text-[10px] hover:bg-[#00D4FF]/30 transition-all disabled:opacity-50">
        {running ? "Processing…" : "Generate Toolpath"}
      </button>
    </div>
  );
}

function SimulateMock() {
  const [playing, setPlaying] = useState(false);
  const [frame, setFrame] = useState(0);
  const [mode, setMode] = useState<"IK"|"FK">("IK");
  const totalFrames = 60;

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setFrame(f => {
        if (f >= totalFrames) { setPlaying(false); return 0; }
        return f + 1;
      });
    }, 50);
    return () => clearInterval(id);
  }, [playing]);

  const angle = (frame / totalFrames) * 120;

  return (
    <div className="w-full h-full flex flex-col gap-3 p-4 text-[11px]" style={{ fontFamily: "'Space Mono', monospace" }}>
      <div className="text-[#A855F7] tracking-widest text-[10px] uppercase mb-1">ARIES — Simulation</div>
      {/* Arm visualizer */}
      <div className="flex-1 bg-white/5 rounded border border-white/8 flex items-center justify-center relative overflow-hidden">
        <svg viewBox="0 0 200 160" width="200" height="160">
          {/* Base */}
          <rect x="85" y="140" width="30" height="8" rx="2" fill="#A855F7" opacity="0.4" />
          {/* Arm segments */}
          <g transform={`rotate(${angle * 0.5 - 30}, 100, 136)`}>
            <rect x="97" y="90" width="6" height="46" rx="3" fill="#A855F7" opacity="0.7" />
            <circle cx="100" cy="90" r="5" fill="#A855F7" />
            <g transform={`rotate(${-angle * 0.8 + 20}, 100, 90)`}>
              <rect x="97" y="52" width="6" height="38" rx="3" fill="#A855F7" opacity="0.85" />
              <circle cx="100" cy="52" r="4" fill="#A855F7" />
              <g transform={`rotate(${angle * 0.6}, 100, 52)`}>
                <rect x="98" y="26" width="4" height="26" rx="2" fill="#A855F7" opacity="1" />
                <circle cx="100" cy="26" r="3" fill="#A855F7" />
                <circle cx="100" cy="24" r="2" fill="white" opacity="0.8" />
              </g>
            </g>
          </g>
          {/* Grid */}
          {[0,40,80,120,160,200].map(x=><line key={x} x1={x} y1="0" x2={x} y2="160" stroke="white" strokeOpacity="0.04" strokeWidth="1"/>)}
          {[0,40,80,120,160].map(y=><line key={y} x1="0" y1={y} x2="200" y2={y} stroke="white" strokeOpacity="0.04" strokeWidth="1"/>)}
        </svg>
        <div className="absolute top-2 right-2 flex gap-1">
          {(["IK","FK"] as const).map(m=>(
            <button key={m} onClick={()=>setMode(m)}
              className={`px-2 py-0.5 rounded text-[9px] border transition-all ${mode===m?"border-[#A855F7] text-[#A855F7] bg-[#A855F7]/10":"border-white/15 text-white/30"}`}>
              {m}
            </button>
          ))}
        </div>
      </div>
      {/* Timeline */}
      <div className="bg-white/5 rounded border border-white/8 p-2">
        <div className="flex items-center gap-2 mb-1.5">
          <button onClick={()=>setPlaying(p=>!p)}
            className="w-6 h-6 rounded bg-[#A855F7]/20 border border-[#A855F7]/40 text-[#A855F7] flex items-center justify-center text-[10px]">
            {playing?"⏸":"▶"}
          </button>
          <div className="flex-1 h-1 bg-white/10 rounded overflow-hidden">
            <div className="h-full bg-[#A855F7] rounded transition-all" style={{width:`${(frame/totalFrames)*100}%`}}/>
          </div>
          <span className="text-white/30 text-[9px]">{frame}/{totalFrames}</span>
        </div>
      </div>
    </div>
  );
}

function OperateMock() {
  const [speed, setSpeed] = useState(80);
  const [status, setStatus] = useState<"READY"|"RUNNING"|"DONE">("READY");
  const log = [
    "G28 ; Home all axes",
    "G1 X0 Y0 Z5 F200",
    "M3 S1000 ; Spindle on",
    "G1 X10 Y15 Z2 F100",
    "G1 X20 Y25 Z1.5",
    "G1 X30 Y35 Z1.2",
    "M5 ; Spindle off",
    "G28 ; Return home",
  ];
  const [visibleLines, setVisibleLines] = useState(3);

  const handleRun = () => {
    setStatus("RUNNING");
    setVisibleLines(3);
    const id = setInterval(() => {
      setVisibleLines(v => {
        if (v >= log.length) { clearInterval(id); setStatus("DONE"); return log.length; }
        return v + 1;
      });
    }, 400);
  };

  return (
    <div className="w-full h-full flex flex-col gap-3 p-4 text-[11px]" style={{ fontFamily: "'Space Mono', monospace" }}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[#22C55E] tracking-widest text-[10px] uppercase">ARIES — Machine Control</span>
        <span className={`text-[9px] px-2 py-0.5 rounded border ${
          status==="RUNNING" ? "border-yellow-500/40 text-yellow-400 bg-yellow-500/10" :
          status==="DONE" ? "border-[#22C55E]/40 text-[#22C55E] bg-[#22C55E]/10" :
          "border-white/20 text-white/40"}`}>
          {status}
        </span>
      </div>
      {/* G-code console */}
      <div className="flex-1 bg-black/40 rounded border border-white/10 p-3 overflow-hidden font-mono">
        <div className="text-white/20 text-[9px] mb-2">// G-code output</div>
        {log.slice(0, visibleLines).map((line, i) => (
          <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`text-[10px] py-0.5 ${i === visibleLines - 1 && status === "RUNNING" ? "text-[#22C55E]" : "text-white/50"}`}>
            <span className="text-white/20 mr-2">{String(i+1).padStart(2,"0")}</span>{line}
          </motion.div>
        ))}
        {status === "RUNNING" && <span className="text-[#22C55E] animate-pulse">█</span>}
      </div>
      {/* Speed slider */}
      <div className="bg-white/5 rounded border border-white/8 p-3">
        <div className="flex justify-between mb-1.5">
          <span className="text-white/40 text-[9px] uppercase tracking-wider">Feed rate</span>
          <span className="text-[#22C55E] text-[9px]">{speed}%</span>
        </div>
        <input type="range" min={10} max={100} value={speed} onChange={e=>setSpeed(+e.target.value)}
          className="w-full accent-[#22C55E]" />
      </div>
      <button onClick={handleRun} disabled={status==="RUNNING"}
        className="bg-[#22C55E]/20 border border-[#22C55E]/40 text-[#22C55E] rounded px-4 py-2 text-[10px] hover:bg-[#22C55E]/30 transition-all disabled:opacity-50">
        {status==="RUNNING" ? "Executing…" : status==="DONE" ? "Run Again" : "Execute G-code"}
      </button>
    </div>
  );
}

// ─── Section data ─────────────────────────────────────────────────────────────

const tabs = [
  {
    id: "create",
    label: "Create",
    num: "01",
    color: "#FF5E0E",
    subtitle: "Design Your Arm & Configure Joints",
    description:
      "Start with your use case. Select the number of degrees of freedom, assign NOMOS or NIMIOS reducers to each joint, and configure axis directions. The arm builder generates a complete hardware manifest and Blender rig ready for simulation.",
    features: [
      "DOF selector: 2, 4, 6, 7, or 8-DOF configurations",
      "Joint-by-joint reducer assignment (NOMOS / NIMIOS)",
      "Auto-generated hardware BOM & print file list",
      "Instant Blender rig setup with correct bone hierarchy",
      "Export to STL for immediate 3D printing",
    ],
    Mock: CreateMock,
  },
  {
    id: "process",
    label: "Process",
    num: "02",
    color: "#00D4FF",
    subtitle: "Toolpath Generation & Non-Planar Slicing",
    description:
      "Generate robot-ready toolpaths from any 3D geometry. The ARIES slicer supports planar, continuous non-planar, and adaptive-sampled paths — with attack angle control for every point. G-code is output directly from Blender.",
    features: [
      "Planar, harmonic-field, and continuous non-planar slicing",
      "RDP adaptive sampling (auto sample count by tolerance in mm)",
      "4 attack angle modes: Fixed-Z, Normal-to-path, Adaptive, Tangent",
      "Real-time path preview with waypoint visualization",
      "Direct G-code export or post-processor output",
    ],
    Mock: ProcessMock,
  },
  {
    id: "simulate",
    label: "Simulate",
    num: "03",
    color: "#A855F7",
    subtitle: "IK/FK Simulation & Path Verification",
    description:
      "Simulate your robot's full movement before a single motor turns. IK and FK modes let you pose and animate the arm, verify reachability, and catch collisions — all inside Blender with sub-millimeter bake accuracy.",
    features: [
      "Full IK solver (CCD + DLS polish, <1mm accuracy on 7DOF)",
      "FK per-section jog with dual-axis control",
      "Bake animation along toolpath curves",
      "Collision detection and joint limit warnings",
      "Posture control: elbow up/down, wrist orientation",
    ],
    Mock: SimulateMock,
  },
  {
    id: "operate",
    label: "Operate",
    num: "04",
    color: "#22C55E",
    subtitle: "Machine Control & G-code Execution",
    description:
      "Send your verified programs directly to the machine. The ARIES operator interface handles G-code streaming, real-time feed rate override, manual jog, and machine status monitoring — no proprietary controller required.",
    features: [
      "G-code streaming to any GRBL/Marlin-compatible controller",
      "Real-time feed rate and speed override",
      "Manual jog controls per axis",
      "Machine status dashboard: position, speed, state",
      "Error recovery and safe-stop on fault detection",
    ],
    Mock: OperateMock,
  },
];

// ─── Main Section ─────────────────────────────────────────────────────────────

export function EcosystemSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState(tabs[0].id);
  const tab = tabs.find(t => t.id === active)!;

  return (
    <section id="program-detail" ref={ref} className="bg-[#0a0b10] py-28 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

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
              The Program
            </span>
          </div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", lineHeight: 1.15 }} className="text-white max-w-2xl mb-3">
            Four tools. One workflow.
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", lineHeight: 1.7 }} className="text-white/50 max-w-xl">
            The ARIES Blender add-on covers the complete manufacturing pipeline — from arm design to live machine control — without leaving the same open-source environment.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex gap-1 mb-10 border-b border-white/8 overflow-x-auto pb-0"
        >
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`flex items-center gap-2.5 px-5 py-3 border-b-2 transition-all duration-200 whitespace-nowrap ${
                active === t.id ? "border-current text-white" : "border-transparent text-white/35 hover:text-white/60"
              }`}
              style={active === t.id ? { borderColor: t.color, color: t.color } : {}}
            >
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: active === t.id ? t.color : "inherit" }} className="opacity-60">{t.num}</span>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "14px" }}>{t.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start"
          >
            {/* Mock interface */}
            <div
              className="rounded-sm border overflow-hidden"
              style={{ backgroundColor: "#0d0f1a", borderColor: `${tab.color}25`, minHeight: "340px" }}
            >
              {/* Mock header bar */}
              <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{ borderColor: `${tab.color}20`, backgroundColor: `${tab.color}08` }}>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
                </div>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: tab.color, letterSpacing: "0.1em" }}>
                  ARIES Add-on — {tab.label.toUpperCase()}
                </span>
              </div>
              <div style={{ minHeight: "300px" }}>
                <tab.Mock />
              </div>
            </div>

            {/* Text content */}
            <div className="flex flex-col justify-center">
              <div className="mb-2">
                <span style={{ fontFamily: "'Space Mono', monospace", color: tab.color, fontSize: "11px", letterSpacing: "0.18em" }} className="uppercase">
                  {tab.num} — {tab.subtitle}
                </span>
              </div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2.2rem)", lineHeight: 1.15, color: "white" }} className="mb-4">
                {tab.label}
              </h3>
              <p style={{ fontFamily: "'Inter', sans-serif", lineHeight: 1.75, fontSize: "0.95rem" }} className="text-white/55 mb-8">
                {tab.description}
              </p>
              <ul className="space-y-3">
                {tab.features.map(f => (
                  <li key={f} className="flex items-start gap-3">
                    <ChevronRight size={14} style={{ color: tab.color }} className="shrink-0 mt-0.5" />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem" }} className="text-white/70">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Open source philosophy strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Open Hardware", value: "100%" },
            { label: "Open Software", value: "100%" },
            { label: "Community Driven", value: "Always" },
            { label: "Vendor Lock-in", value: "Zero" },
          ].map(({ label, value }) => (
            <div key={label} className="p-5 rounded-sm bg-white/3 border border-white/8 text-center">
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.6rem", color: "#FF5E0E", lineHeight: 1 }} className="mb-1">{value}</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem" }} className="text-white/40">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
