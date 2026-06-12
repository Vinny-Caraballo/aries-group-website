import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", type: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" ref={ref} className="bg-[#0a0b10] py-28 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF5E0E]/30 to-transparent" />

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#FF5E0E]/5 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-8 bg-[#FF5E0E]" />
            <span
              style={{ fontFamily: "'Space Mono', monospace" }}
              className="text-[#FF5E0E] text-xs tracking-[0.2em] uppercase"
            >
              Early Access
            </span>
            <div className="h-px w-8 bg-[#FF5E0E]" />
          </div>
          <h2
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", lineHeight: 1.2 }}
            className="text-white mb-4"
          >
            Ready to close the gap?
          </h2>
          <p
            style={{ fontFamily: "'Inter', sans-serif", lineHeight: 1.7 }}
            className="text-white/50 max-w-lg mx-auto"
          >
            Join our early access program and be among the first businesses
            to deploy A.R.I.E.S. units. We're selecting pilot partners now.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-[#0d0e14] border border-white/10 rounded-sm p-8 md:p-10"
        >
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <CheckCircle size={48} className="text-[#FF5E0E]" />
              <h3
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
                className="text-white text-xl"
              >
                You're on the list
              </h3>
              <p
                style={{ fontFamily: "'Inter', sans-serif" }}
                className="text-white/50 text-center max-w-sm"
              >
                We'll be in touch shortly to discuss how A.R.I.E.S. can fit
                your business. Thank you for your interest.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem" }}
                  className="text-white/50 tracking-wide uppercase"
                >
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-[#FF5E0E]/50 transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem" }}
                  className="text-white/50 tracking-wide uppercase"
                >
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@company.com"
                  className="bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-[#FF5E0E]/50 transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                />
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem" }}
                  className="text-white/50 tracking-wide uppercase"
                >
                  I'm most interested in
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {["Units (Hardware)", "Program (Software)", "Service (Consulting)"].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setForm({ ...form, type: opt })}
                      className={`px-4 py-3 rounded-sm border text-sm transition-all duration-200 text-left ${
                        form.type === opt
                          ? "border-[#FF5E0E] bg-[#FF5E0E]/10 text-white"
                          : "border-white/10 text-white/50 hover:border-white/20 hover:text-white/70"
                      }`}
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem" }}
                  className="text-white/50 tracking-wide uppercase"
                >
                  Tell us about your project
                </label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="What are you trying to make or automate?"
                  className="bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-[#FF5E0E]/50 transition-colors resize-none"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                />
              </div>

              <div className="md:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="group flex items-center gap-2 px-8 py-3.5 bg-[#FF5E0E] hover:bg-[#e54d00] text-white rounded-sm transition-colors duration-200"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
                >
                  Request Early Access
                  <Send size={15} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
