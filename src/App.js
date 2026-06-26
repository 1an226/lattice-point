import { useState, useEffect } from "react";
import LogisticsPanel from "./LogisticsPanel";

// eslint-disable-next-line
const COLORS = {
  bg: "#0A0A0F",
  navy: "#1A1A2E",
  orange: "#FF6B00",
  cyan: "#00D4FF",
  white: "#FFFFFF",
  grey: "#8A8A9A",
  card: "#12121A",
  border: "#2A2A3A",
};

const SERVICES = [
  {
    icon: "◈",
    title: "Sales & Merchandising",
    desc: "We ensure availability, visibility and communication of your brand at shelf to drive growth across channels.",
    sub: ["Field Sales", "Store Audit", "POS Asset Tracking", "Shelf Placement"],
  },
  {
    icon: "◉",
    title: "Activation & Experience",
    desc: "We craft impactful experiences that influence consumers' brand choices at the point of purchase.",
    sub: ["Brand Ambassadors", "Product Demos", "Sampling", "Retail Store Design"],
  },
  {
    icon: "◎",
    title: "Logistics D2D",
    desc: "Door-to-door logistics solutions ensuring your brand reaches every channel across 11 African markets.",
    sub: ["Distribution", "Warehousing", "Last Mile", "Cross-border"],
  },
  {
    icon: "◇",
    title: "Experiential Campaigns",
    desc: "Influencer campaigns, youth activations, content creation, and integrated promotional campaigns.",
    sub: ["Influencer Campaigns", "Youth Activations", "Unboxing Moments", "Content Creation"],
  },
  {
    icon: "◈",
    title: "Digital Commerce",
    desc: "Data-driven digital marketing and commerce solutions that amplify your brand in phygital environments.",
    sub: ["Digital Marketing", "Data Insights", "Crowdsourcing", "Virtual Advisors"],
  },
  {
    icon: "◉",
    title: "Events & Outdoor",
    desc: "End-to-end management of billboards, roadshows, and events that create unforgettable brand moments.",
    sub: ["Billboards", "Roadshows", "Events Management", "Brand Installations"],
  },
];

const MARKETS = [
  { name: "Kenya", x: 62, y: 52 },
  { name: "Uganda", x: 58, y: 50 },
  { name: "Tanzania", x: 61, y: 57 },
  { name: "Rwanda", x: 57, y: 54 },
  { name: "South Sudan", x: 59, y: 45 },
  { name: "DRC", x: 53, y: 55 },
  { name: "Zambia", x: 57, y: 63 },
  { name: "Mozambique", x: 62, y: 67 },
  { name: "Malawi", x: 62, y: 63 },
  { name: "Nigeria", x: 35, y: 47 },
  { name: "South Africa", x: 55, y: 78 },
];

const STATS = [
  { value: "11", label: "African Markets" },
  { value: "3+", label: "Global Brands" },
  { value: "360°", label: "Brand Solutions" },
  { value: "D2D", label: "Logistics Reach" },
];

const WHY = [
  { title: "Exceptional Offer", desc: "A broad range of services and integrated solutions tailored to your brand's unique needs." },
  { title: "Global Reach", desc: "We work locally and regionally, delivering consistent quality across 11 African markets." },
  { title: "Advanced Operations", desc: "Agility, pace, precision and insight — directed by data, enabled by technology." },
  { title: "People-First", desc: "Highly engaged professionals who drive performance at every point of purchase." },
];

function AfricaMap() {
  const [activeNode, setActiveNode] = useState(null);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((p) => (p + 1) % MARKETS.length);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 420, margin: "0 auto" }}>
      <svg viewBox="0 0 100 100" style={{ width: "100%", opacity: 0.95 }}>
        <path
          d="M38,8 L45,7 L52,9 L58,8 L65,12 L70,18 L72,25 L74,32 L73,40 L70,46 L68,52 L70,58 L68,64 L65,70 L62,76 L58,82 L54,86 L50,88 L46,86 L42,82 L38,76 L35,70 L32,64 L30,58 L28,52 L26,46 L24,40 L24,32 L26,25 L28,18 L32,12 Z"
          fill="none"
          stroke="#2A2A3A"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        {MARKETS.map((m, i) =>
          MARKETS.slice(i + 1, i + 3).map((m2, j) => (
            <line
              key={`line-${i}-${j}`}
              x1={m.x} y1={m.y}
              x2={m2.x} y2={m2.y}
              stroke="#00D4FF"
              strokeWidth="0.15"
              opacity="0.2"
            />
          ))
        )}
        {MARKETS.map((m, i) => (
          <g key={m.name} onMouseEnter={() => setActiveNode(i)} onMouseLeave={() => setActiveNode(null)}>
            {pulse === i && (
              <circle cx={m.x} cy={m.y} r="3" fill="none" stroke="#FF6B00" strokeWidth="0.5" opacity="0.6">
                <animate attributeName="r" from="2" to="5" dur="0.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.6" to="0" dur="0.8s" repeatCount="indefinite" />
              </circle>
            )}
            <circle
              cx={m.x} cy={m.y}
              r={activeNode === i ? 2 : 1.2}
              fill={activeNode === i ? "#FF6B00" : "#00D4FF"}
              style={{ transition: "all 0.2s", cursor: "pointer" }}
            />
            {activeNode === i && (
              <text x={m.x + 3} y={m.y + 1} fontSize="3" fill="#FFFFFF" fontFamily="Inter, sans-serif">
                {m.name}
              </text>
            )}
          </g>
        ))}
      </svg>
      <div style={{ textAlign: "center", color: "#8A8A9A", fontSize: 11, marginTop: 8, fontFamily: "Inter, sans-serif" }}>
        Hover nodes to explore markets
      </div>
    </div>
  );
}

// ===== NAVBAR WITH HAMBURGER =====
function NavBar({ onOpenLogistics }) {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = ["Services", "Markets", "About", "Contact"];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(10,10,15,0.97)" : "transparent",
      borderBottom: scrolled ? "1px solid #2A2A3A" : "none",
      transition: "all 0.3s",
      padding: "0 5vw",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      height: 64,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 8,
          background: "linear-gradient(135deg, #FF6B00, #FF4500)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 900, color: "#FFFFFF", fontSize: 14,
          fontFamily: "Space Grotesk, sans-serif",
        }}>LP</div>
        <span style={{ color: "#FFFFFF", fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: 0.5 }}>
          LATTICE POINT
        </span>
      </div>

      {/* Desktop Menu */}
      <div className="desktop-menu" style={{ display: "flex", gap: 20, alignItems: "center" }}>
        {links.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} style={{
            color: "#8A8A9A", textDecoration: "none",
            fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 500,
            letterSpacing: 1, textTransform: "uppercase",
          }}>{l}</a>
        ))}
        <button onClick={onOpenLogistics} style={{
          background: "transparent",
          border: "1px solid #FF6B00",
          color: "#FF6B00",
          padding: "8px 16px", borderRadius: 6,
          fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 600,
          cursor: "pointer", letterSpacing: 0.5, textTransform: "uppercase",
          transition: "all 0.2s",
        }}
          onMouseEnter={e => { e.target.style.background = "#FF6B00"; e.target.style.color = "#FFFFFF"; }}
          onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "#FF6B00"; }}
        >Logistics Portal</button>
        <a href="#contact" style={{
          background: "#FF6B00", color: "#FFFFFF",
          padding: "8px 20px", borderRadius: 6,
          fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 600,
          textDecoration: "none", letterSpacing: 0.5, textTransform: "uppercase",
        }}>Get In Touch</a>
      </div>

      {/* Hamburger (mobile) */}
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)} style={{
        display: "none",
        flexDirection: "column",
        gap: "5px",
        cursor: "pointer",
        padding: "4px",
      }}>
        <span style={{ width: "24px", height: "2px", background: "#FFFFFF", borderRadius: "2px" }} />
        <span style={{ width: "24px", height: "2px", background: "#FFFFFF", borderRadius: "2px" }} />
        <span style={{ width: "24px", height: "2px", background: "#FFFFFF", borderRadius: "2px" }} />
      </div>

      {/* Dropdown (mobile) */}
      {isOpen && (
        <div style={{
          position: "absolute",
          top: 64,
          left: 0,
          right: 0,
          background: "#0A0A0F",
          borderBottom: "1px solid #2A2A3A",
          padding: "20px 5vw",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          boxShadow: "0 20px 40px rgba(0,0,0,0.8)",
        }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{
              color: "#FFFFFF",
              textDecoration: "none",
              fontFamily: "Inter, sans-serif",
              fontSize: 16,
              fontWeight: 500,
              padding: "8px 0",
              borderBottom: "1px solid #1A1A2E",
            }} onClick={() => setIsOpen(false)}>{l}</a>
          ))}
          <button onClick={() => { onOpenLogistics(); setIsOpen(false); }} style={{
            background: "transparent",
            border: "1px solid #FF6B00",
            color: "#FF6B00",
            padding: "12px 16px",
            borderRadius: 6,
            fontFamily: "Inter, sans-serif",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            textTransform: "uppercase",
            letterSpacing: 0.5,
            marginTop: 8,
          }}>Logistics Portal</button>
          <a href="#contact" onClick={() => setIsOpen(false)} style={{
            background: "#FF6B00",
            color: "#FFFFFF",
            padding: "12px 20px",
            borderRadius: 6,
            fontFamily: "Inter, sans-serif",
            fontSize: 14,
            fontWeight: 600,
            textDecoration: "none",
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}>Get In Touch</a>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-menu { display: none !important; }
          .hamburger { display: flex !important; }
        }
        @media (min-width: 901px) {
          .hamburger { display: none !important; }
        }
      `}</style>
    </nav>
  );
}

// ===== HERO — CURSOR DISAPPEARS =====
function Hero() {
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);
  const full = "Win at the point of purchase.";

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setTyped(full.slice(0, i));
      i++;
      if (i > full.length) {
        clearInterval(t);
        setDone(true);
      }
    }, 60);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{
      minHeight: "100vh", background: "#0A0A0F",
      display: "flex", alignItems: "center",
      padding: "80px 5vw 40px",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0, opacity: 0.03,
        backgroundImage: "linear-gradient(#00D4FF 1px, transparent 1px), linear-gradient(90deg, #00D4FF 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />
      <div style={{
        position: "absolute", top: "20%", right: "10%",
        width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, #FF6B0015 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        display: "flex", alignItems: "center",
        gap: "5vw", width: "100%", flexWrap: "wrap",
        position: "relative", zIndex: 1,
      }}>
        <div style={{ flex: "1 1 340px", maxWidth: 560 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "#FF6B0018", border: "1px solid #FF6B0040",
            borderRadius: 100, padding: "5px 14px", marginBottom: 28,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#FF6B00" }} />
            <span style={{ color: "#FF6B00", fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase" }}>
              Africa's Activation Partner
            </span>
          </div>
          <h1 style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: "clamp(36px, 5vw, 64px)",
            fontWeight: 800, color: "#FFFFFF",
            lineHeight: 1.1, margin: "0 0 24px",
          }}>
            {typed}
            {!done && <span style={{ color: "#FF6B00", animation: "blink 1s infinite" }}>|</span>}
          </h1>
          <p style={{
            fontFamily: "Inter, sans-serif", fontSize: 16,
            color: "#8A8A9A", lineHeight: 1.7, margin: "0 0 36px",
            maxWidth: 460,
          }}>
            Lattice Point Activation connects brands to consumers across 11 African markets — through merchandising, activation, logistics, and data-driven experiences.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a href="#contact" style={{
              background: "#FF6B00", color: "#FFFFFF",
              padding: "14px 28px", borderRadius: 8,
              fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 700,
              textDecoration: "none", letterSpacing: 0.5, display: "inline-block",
            }}>Start a Campaign</a>
            <a href="#services" style={{
              border: "1px solid #2A2A3A", color: "#FFFFFF",
              padding: "14px 28px", borderRadius: 8,
              fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600,
              textDecoration: "none", letterSpacing: 0.5, display: "inline-block",
            }}>Our Services</a>
          </div>
        </div>
        <div style={{ flex: "1 1 300px", maxWidth: 420 }}>
          <AfricaMap />
        </div>
      </div>
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </section>
  );
}

function Stats() {
  return (
    <section style={{
      background: "#1A1A2E",
      borderTop: "1px solid #2A2A3A",
      borderBottom: "1px solid #2A2A3A",
      padding: "40px 5vw",
    }}>
      <div style={{
        display: "flex", justifyContent: "space-around",
        flexWrap: "wrap", gap: 24, maxWidth: 900, margin: "0 auto",
      }}>
        {STATS.map(s => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <div style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800,
              color: "#FF6B00", lineHeight: 1,
            }}>{s.value}</div>
            <div style={{
              fontFamily: "Inter, sans-serif", fontSize: 12,
              color: "#8A8A9A", letterSpacing: 1.5,
              textTransform: "uppercase", marginTop: 6,
            }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Services() {
  const [hovered, setHovered] = useState(null);
  return (
    <section id="services" style={{ background: "#0A0A0F", padding: "100px 5vw" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: 60 }}>
          <div style={{ color: "#00D4FF", fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 16 }}>What We Do</div>
          <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, color: "#FFFFFF", margin: 0, lineHeight: 1.15 }}>
            Full-service brand activation,<br /><span style={{ color: "#FF6B00" }}>end to end.</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
          {SERVICES.map((s, i) => (
            <div key={s.title} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
              style={{
                background: hovered === i ? "#1A1A2E" : "#12121A",
                border: `1px solid ${hovered === i ? "#FF6B0060" : "#2A2A3A"}`,
                borderRadius: 12, padding: 28,
                transition: "all 0.25s",
                transform: hovered === i ? "translateY(-4px)" : "none",
              }}>
              <div style={{ fontSize: 24, color: "#FF6B00", marginBottom: 16, fontFamily: "monospace" }}>{s.icon}</div>
              <h3 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 18, fontWeight: 700, color: "#FFFFFF", margin: "0 0 10px" }}>{s.title}</h3>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#8A8A9A", lineHeight: 1.7, margin: "0 0 16px" }}>{s.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {s.sub.map(tag => (
                  <span key={tag} style={{
                    background: "#00D4FF12", border: "1px solid #00D4FF25",
                    color: "#00D4FF", borderRadius: 4, padding: "3px 8px",
                    fontSize: 10, fontFamily: "Inter, sans-serif", fontWeight: 600, letterSpacing: 0.5,
                  }}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Markets() {
  return (
    <section id="markets" style={{ background: "#1A1A2E", padding: "100px 5vw", borderTop: "1px solid #2A2A3A" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: 60 }}>
          <div style={{ color: "#00D4FF", fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 16 }}>Coverage</div>
          <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, color: "#FFFFFF", margin: 0 }}>
            One partner.<br /><span style={{ color: "#FF6B00" }}>11 markets.</span>
          </h2>
        </div>
        <div style={{ display: "flex", gap: "5vw", flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ flex: "1 1 300px", maxWidth: 420 }}><AfricaMap /></div>
          <div style={{ flex: "1 1 300px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {MARKETS.map(m => (
                <div key={m.name} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  background: "#12121A", border: "1px solid #2A2A3A",
                  borderRadius: 8, padding: "10px 14px",
                }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FF6B00", flexShrink: 0 }} />
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#FFFFFF", fontWeight: 500 }}>{m.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" style={{ background: "#0A0A0F", padding: "100px 5vw" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: 60 }}>
          <div style={{ color: "#00D4FF", fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 16 }}>Why Us</div>
          <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, color: "#FFFFFF", margin: 0 }}>
            Intelligence meets<br /><span style={{ color: "#FF6B00" }}>execution.</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 24, marginBottom: 80 }}>
          {WHY.map((w, i) => (
            <div key={w.title} style={{ borderLeft: "2px solid #FF6B00", paddingLeft: 20 }}>
              <div style={{ fontFamily: "monospace", fontSize: 11, color: "#FF6B00", marginBottom: 8, letterSpacing: 1 }}>0{i + 1}</div>
              <h3 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 17, fontWeight: 700, color: "#FFFFFF", margin: "0 0 8px" }}>{w.title}</h3>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#8A8A9A", lineHeight: 1.7, margin: 0 }}>{w.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 280px", background: "#FF6B0018", border: "1px solid #FF6B0030", borderRadius: 12, padding: 32 }}>
            <div style={{ color: "#FF6B00", fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Mission</div>
            <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 18, color: "#FFFFFF", lineHeight: 1.5, margin: 0, fontWeight: 600 }}>
              To drive growth through impactful merchandising and tailored marketing services.
            </p>
          </div>
          <div style={{ flex: "1 1 280px", background: "#00D4FF12", border: "1px solid #00D4FF25", borderRadius: 12, padding: 32 }}>
            <div style={{ color: "#00D4FF", fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Vision</div>
            <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 18, color: "#FFFFFF", lineHeight: 1.5, margin: 0, fontWeight: 600 }}>
              To revolutionize marketing through data-driven insights and seamless experiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Clients() {
  const clients = ["BIO", "ST. IVES", "NIMBUS"];
  return (
    <section style={{ background: "#1A1A2E", padding: "60px 5vw", borderTop: "1px solid #2A2A3A" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <div style={{ color: "#8A8A9A", fontFamily: "Inter, sans-serif", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginBottom: 32 }}>Trusted By</div>
        <div style={{ display: "flex", justifyContent: "center", gap: "5vw", flexWrap: "wrap", alignItems: "center" }}>
          {clients.map(c => (
            <div key={c} style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "clamp(18px, 3vw, 28px)",
              fontWeight: 800, color: "#2A2A3A", letterSpacing: 2, cursor: "default",
              transition: "color 0.2s",
            }}
              onMouseEnter={e => e.target.style.color = "#FFFFFF"}
              onMouseLeave={e => e.target.style.color = "#2A2A3A"}
            >{c}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== UPDATED CONTACT — WITH WHATSAPP BUTTON =====
function Contact() {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = () => { if (form.name && form.email && form.message) setSent(true); };

  const inputStyle = {
    background: "#12121A", border: "1px solid #2A2A3A",
    borderRadius: 8, padding: "12px 16px",
    fontFamily: "Inter, sans-serif", fontSize: 13,
    color: "#FFFFFF", outline: "none", width: "100%",
    boxSizing: "border-box", transition: "border-color 0.2s",
  };

  // WhatsApp number (international format, no + sign)
  const whatsappNumber = "254141763639";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hello%20I%27d%20like%20to%20know%20more%20about%20your%20services.`;

  return (
    <section id="contact" style={{ background: "#0A0A0F", padding: "100px 5vw", borderTop: "1px solid #2A2A3A" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: "6vw", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 280px" }}>
            <div style={{ color: "#00D4FF", fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 16 }}>Contact</div>
            <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: "#FFFFFF", margin: "0 0 32px", lineHeight: 1.15 }}>
              Let's activate<br /><span style={{ color: "#FF6B00" }}>your brand.</span>
            </h2>

            {/* Existing contact info */}
            {[
              { label: "Phone", value: "+254 722 218 633" },
              { label: "Phone", value: "+254 702 966 021" },
              { label: "Email", value: "kamw2007@gmail.com" },
              { label: "Email", value: "kengachanja@gmail.com" },
              { label: "Address", value: "T-Mall Kamukunji, 6th Floor, Room 24, Nairobi" },
              { label: "P.O. Box", value: "35472-00200, Nairobi" },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: 16, display: "flex", gap: 12 }}>
                <span style={{ fontFamily: "monospace", fontSize: 10, color: "#FF6B00", textTransform: "uppercase", letterSpacing: 1, minWidth: 56, paddingTop: 2 }}>{item.label}</span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#8A8A9A", lineHeight: 1.5 }}>{item.value}</span>
              </div>
            ))}

            {/* WhatsApp Button */}
            <div style={{ marginTop: 24, borderTop: "1px solid #2A2A3A", paddingTop: 24 }}>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "#25D366",
                  color: "#FFFFFF",
                  padding: "10px 20px",
                  borderRadius: 8,
                  textDecoration: "none",
                  fontFamily: "Inter, sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  transition: "all 0.2s",
                  border: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={e => { e.target.style.background = "#1DA851"; }}
                onMouseLeave={e => { e.target.style.background = "#25D366"; }}
              >
                <span style={{ fontSize: 18 }}>💬</span>
                Chat on WhatsApp
              </a>
              <div style={{ fontSize: 11, color: "#8A8A9A", marginTop: 8 }}>
                Click to start a conversation on WhatsApp
              </div>
            </div>
          </div>

          {/* Contact form (unchanged) */}
          <div style={{ flex: "1 1 340px" }}>
            {sent ? (
              <div style={{ background: "#FF6B0015", border: "1px solid #FF6B0040", borderRadius: 12, padding: 40, textAlign: "center" }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>✓</div>
                <h3 style={{ fontFamily: "Space Grotesk, sans-serif", color: "#FFFFFF", fontSize: 20, margin: "0 0 8px" }}>Message Sent</h3>
                <p style={{ color: "#8A8A9A", fontFamily: "Inter, sans-serif", fontSize: 13, margin: 0 }}>The Lattice Point team will reach out shortly.</p>
              </div>
            ) : (
              <div style={{ background: "#12121A", border: "1px solid #2A2A3A", borderRadius: 12, padding: 32, display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { name: "name", placeholder: "Your Name", type: "text" },
                  { name: "company", placeholder: "Company / Brand", type: "text" },
                  { name: "email", placeholder: "Email Address", type: "email" },
                  { name: "phone", placeholder: "Phone Number", type: "tel" },
                ].map(f => (
                  <input key={f.name} name={f.name} type={f.type} placeholder={f.placeholder}
                    value={form[f.name]} onChange={handle} style={inputStyle}
                    onFocus={e => e.target.style.borderColor = "#FF6B00"}
                    onBlur={e => e.target.style.borderColor = "#2A2A3A"}
                  />
                ))}
                <textarea name="message" placeholder="Tell us about your brand activation needs..."
                  value={form.message} onChange={handle} rows={4}
                  style={{ ...inputStyle, resize: "vertical" }}
                  onFocus={e => e.target.style.borderColor = "#FF6B00"}
                  onBlur={e => e.target.style.borderColor = "#2A2A3A"}
                />
                <button onClick={submit} style={{
                  background: "#FF6B00", color: "#FFFFFF", border: "none",
                  borderRadius: 8, padding: "14px 24px",
                  fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 700,
                  cursor: "pointer", letterSpacing: 0.5,
                }}>Send Message</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      background: "#1A1A2E", borderTop: "1px solid #2A2A3A",
      padding: "32px 5vw", display: "flex",
      justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 28, height: 28, borderRadius: 6,
          background: "linear-gradient(135deg, #FF6B00, #FF4500)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 900, color: "#FFFFFF", fontSize: 11,
          fontFamily: "Space Grotesk, sans-serif",
        }}>LP</div>
        <span style={{ color: "#8A8A9A", fontFamily: "Inter, sans-serif", fontSize: 12 }}>
          © 2025 Lattice Point Activation Limited. All rights reserved.
        </span>
      </div>
      <div style={{ color: "#8A8A9A", fontFamily: "Inter, sans-serif", fontSize: 11, letterSpacing: 1 }}>
        T-Mall Kamukunji, 6th Floor, Room 24, Nairobi
      </div>
    </footer>
  );
}

export default function App() {
  const [showLogistics, setShowLogistics] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.background = "#0A0A0F";
    document.body.style.overflowX = "hidden";
  }, []);

  return (
    <div style={{ background: "#0A0A0F", minHeight: "100vh" }}>
      <NavBar onOpenLogistics={() => setShowLogistics(true)} />
      <Hero />
      <Stats />
      <Services />
      <Markets />
      <About />
      <Clients />
      <Contact />
      <Footer />
      {showLogistics && <LogisticsPanel onClose={() => setShowLogistics(false)} />}
    </div>
  );
}