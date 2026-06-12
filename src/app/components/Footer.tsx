import { Github, Twitter, Linkedin } from "lucide-react";

const links = {
  Platform: ["Units", "Program", "Service", "Open Source"],
  Company: ["About", "Mission", "Team", "Blog"],
  Resources: ["Documentation", "Community", "GitHub", "Early Access"],
};

export function Footer() {
  return (
    <footer className="bg-[#0a0b10] border-t border-white/6 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-sm bg-[#FF5E0E] flex items-center justify-center">
                <span style={{ fontFamily: "'Space Mono', monospace" }} className="text-white text-xs font-bold">AR</span>
              </div>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif" }} className="text-white font-semibold tracking-widest text-sm">A.R.I.E.S.</span>
            </div>
            <p
              style={{ fontFamily: "'Inter', sans-serif", lineHeight: 1.7, fontSize: "0.875rem" }}
              className="text-white/40 max-w-xs mb-6"
            >
              Closing the manufacturing gap for small businesses through open-source hardware, software, and training.
            </p>
            <div className="flex items-center gap-3">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-sm border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/25 transition-all"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h4
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "0.8rem" }}
                className="text-white tracking-widest uppercase mb-4"
              >
                {section}
              </h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem" }}
                      className="text-white/40 hover:text-white/75 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/6 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem" }}
            className="text-white/25"
          >
            © 2026 A.R.I.E.S. All rights reserved.
          </p>
          <p
            style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem" }}
            className="text-white/20 tracking-wider"
          >
            OPEN SOURCE · OPEN HARDWARE · OPEN ACCESS
          </p>
        </div>
      </div>
    </footer>
  );
}
