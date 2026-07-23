import { useState, useEffect, useRef } from "react";
import axios from "axios";   // <-- added for M‑Pesa
import truck01 from './assets/truck-01.jpg';
import truck02 from './assets/truck-02.jpg';
import truck03 from './assets/truck-03.jpg';
import truck04 from './assets/truck-04.jpg';
import banner1 from './assets/banner1.jpg';
import trailer01 from './assets/trailer01.jpg';

const COLORS = {
  bg: "#0A0A0F",
  navy: "#1A1A2E",
  card: "#12121A",
  border: "#2A2A3A",
  orange: "#FF6B00",
  cyan: "#00D4FF",
  green: "#00C853",
  red: "#FF5252",
  yellow: "#FFC107",
  white: "#FFFFFF",
  grey: "#8A8A9A",
};

// eslint-disable-next-line no-unused-vars
const BIO_HQ = {
  name: "Bio Foods HQ",
  address: "Off Road C, Industrial Area, Nairobi",
  lat: -1.3127,
  lng: 36.8516,
};

const NAIVAS_STORES = [
  { id: 1, name: "Naivas Westlands", area: "Westlands", lat: -1.2676, lng: 36.8043, distance: 8.2 },
  { id: 2, name: "Naivas Mountain Mall", area: "Thika Road", lat: -1.2194, lng: 36.8855, distance: 12.4 },
  { id: 3, name: "Naivas Greenspan", area: "Donholm", lat: -1.2951, lng: 36.8830, distance: 6.1 },
  { id: 4, name: "Naivas Embakasi", area: "Embakasi", lat: -1.3192, lng: 36.9001, distance: 5.8 },
  { id: 5, name: "Naivas Gateway Mall", area: "Syokimau", lat: -1.3589, lng: 36.9201, distance: 9.3 },
  { id: 6, name: "Naivas Waterfront", area: "Karen", lat: -1.3387, lng: 36.7423, distance: 14.2 },
  { id: 7, name: "Naivas Lifestyle", area: "Langata", lat: -1.3421, lng: 36.7589, distance: 11.7 },
  { id: 8, name: "Naivas Kangemi", area: "Kangemi", lat: -1.2614, lng: 36.7312, distance: 13.8 },
  { id: 9, name: "Naivas Imara", area: "Imara Daima", lat: -1.3298, lng: 36.8912, distance: 7.4 },
  { id: 10, name: "Naivas Airport View", area: "South B", lat: -1.3156, lng: 36.8634, distance: 3.9 },
  { id: 11, name: "Naivas Embakasi Nyayo", area: "Embakasi", lat: -1.3201, lng: 36.8876, distance: 5.2 },
  { id: 12, name: "Naivas Aga Khan Walk", area: "CBD", lat: -1.2833, lng: 36.8167, distance: 10.6 },
  { id: 13, name: "Naivas Muindi Mbingu", area: "CBD", lat: -1.2841, lng: 36.8219, distance: 10.8 },
  { id: 14, name: "Naivas Spur Mall", area: "Thika Road", lat: -1.2301, lng: 36.8712, distance: 11.9 },
  { id: 15, name: "Naivas Kilimani", area: "Kilimani", lat: -1.2921, lng: 36.7834, distance: 9.1 },
  { id: 16, name: "Naivas Katani", area: "Katani", lat: -1.3891, lng: 36.9234, distance: 15.3 },
];

const TRUCKS = [
  { id: "TRK-001", driver: "James Mwangi", phone: "+254 712 345 678", capacity: 2000, route: [1, 2] },
  { id: "TRK-002", driver: "Peter Kamau", phone: "+254 722 456 789", capacity: 2000, route: [3, 4] },
  { id: "TRK-003", driver: "John Otieno", phone: "+254 733 567 890", capacity: 2000, route: [5, 6] },
  { id: "TRK-004", driver: "David Njoroge", phone: "+254 744 678 901", capacity: 2000, route: [7, 8] },
  { id: "TRK-005", driver: "Samuel Kiprop", phone: "+254 755 789 012", capacity: 2000, route: [9, 10] },
  { id: "TRK-006", driver: "Michael Ochieng", phone: "+254 766 890 123", capacity: 2000, route: [11, 12] },
  { id: "TRK-007", driver: "Robert Mutua", phone: "+254 777 901 234", capacity: 2000, route: [13, 14] },
  { id: "TRK-008", driver: "Francis Wambua", phone: "+254 788 012 345", capacity: 2000, route: [15, 16] },
];

const STATUSES = ["Departed", "In Transit", "Delivered", "Delayed", "Loading"];
const STATUS_COLORS = {
  "Departed": COLORS.cyan,
  "In Transit": COLORS.orange,
  "Delivered": COLORS.green,
  "Delayed": COLORS.red,
  "Loading": COLORS.grey,
};

const PRODUCTS = [
  { name: "Bio Fresh Milk 1L", sku: "BIO-MLK-001", temp: "2-6°C", units: 120 },
  { name: "Bio Fresh Milk 2L", sku: "BIO-MLK-002", temp: "2-6°C", units: 80 },
  { name: "Bio Yoghurt 450ml", sku: "BIO-YGT-001", temp: "2-6°C", units: 200 },
  { name: "Bio Yoghurt 1L", sku: "BIO-YGT-002", temp: "2-6°C", units: 150 },
  { name: "Bio Whipping Cream 500ml", sku: "BIO-CRM-001", temp: "2-6°C", units: 60 },
  { name: "Bio Mozzarella 250g", sku: "BIO-CHS-001", temp: "2-6°C", units: 40 },
];
// Truck images mapping
const TRUCK_IMAGES = {
  "TRK-001": truck01,
  "TRK-002": truck02,
  "TRK-003": truck03,
  "TRK-004": truck04,
  "TRK-005": truck01,
  "TRK-006": truck02,
  "TRK-007": truck03,
  "TRK-008": truck04,
};

function generateShipments() {
  return TRUCKS.map((truck, i) => {
    const status = STATUSES[Math.floor(Math.random() * STATUSES.length)];
    const stores = truck.route.map(id => NAIVAS_STORES.find(s => s.id === id));
    const progress = status === "Delivered" ? 100 : status === "In Transit" ? Math.floor(Math.random() * 60) + 20 : status === "Departed" ? Math.floor(Math.random() * 20) : 0;
    return {
      id: `SHP-${String(i + 1).padStart(4, "0")}`,
      truck: truck.id,
      driver: truck.driver,
      phone: truck.phone,
      stores,
      status,
      progress,
      departureTime: `0${4 + i}:${Math.random() > 0.5 ? "30" : "00"} AM`,
      eta: `${8 + i}:${Math.random() > 0.5 ? "45" : "15"} AM`,
      totalKg: Math.floor(Math.random() * 800) + 800,
      products: PRODUCTS.slice(0, Math.floor(Math.random() * 3) + 3),
      temperature: (Math.random() * 2 + 3).toFixed(1),
      invoiceValue: Math.floor(Math.random() * 50000) + 30000,
    };
  });
}

export default function LogisticsPanel({ onClose }) {
  const [shipments, setShipments] = useState(generateShipments());
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [time, setTime] = useState(new Date());
  const [alerts, setAlerts] = useState([
    { id: 1, type: "warning", msg: "TRK-003 temperature rising — 5.8°C", time: "04:23 AM" },
    { id: 2, type: "info", msg: "TRK-007 departed Bio HQ on schedule", time: "04:15 AM" },
    { id: 3, type: "danger", msg: "TRK-005 delayed — traffic on Mombasa Rd", time: "04:10 AM" },
    { id: 4, type: "success", msg: "TRK-002 delivered to Naivas Greenspan", time: "04:02 AM" },
  ]);
  const [filterStatus, setFilterStatus] = useState("All");
  const intervalRef = useRef(null);

  const [lightboxImage, setLightboxImage] = useState(null);
  // --- M-Pesa payment states ---
  const [paymentPhone, setPaymentPhone] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const tick = setInterval(() => setTime(new Date()), 1000);
    intervalRef.current = setInterval(() => {
      setShipments(prev => prev.map(s => ({
        ...s,
        progress: s.status === "In Transit" ? Math.min(s.progress + Math.floor(Math.random() * 3), 99) : s.progress,
        temperature: (parseFloat(s.temperature) + (Math.random() - 0.5) * 0.2).toFixed(1),
      })));
    }, 3000);
    return () => { clearInterval(tick); clearInterval(intervalRef.current); };
  }, []);

  // --- Payment handler ---
  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setPaymentStatus('Initiating payment...');

    try {
      const response = await axios.post('http://localhost:5000/api/stk-push', {
        phoneNumber: paymentPhone,
        amount: parseFloat(paymentAmount)
      });

      if (response.data.success) {
        setPaymentStatus(`✅ STK Push sent! Check your phone (${paymentPhone}) and enter your M-Pesa PIN to complete the payment.`);
      } else {
        setPaymentStatus(`❌ Error: ${response.data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus('❌ Payment request failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const delivered = shipments.filter(s => s.status === "Delivered").length;
  const inTransit = shipments.filter(s => s.status === "In Transit").length;
  const delayed = shipments.filter(s => s.status === "Delayed").length;
  const totalValue = shipments.reduce((a, b) => a + b.invoiceValue, 0);
  const filtered = filterStatus === "All" ? shipments : shipments.filter(s => s.status === filterStatus);

  const inputStyle = {
    background: COLORS.card, border: `1px solid ${COLORS.border}`,
    borderRadius: 6, padding: "6px 12px",
    fontFamily: "Inter, sans-serif", fontSize: 12,
    color: COLORS.white, outline: "none",
    cursor: "pointer",
  };

  return (
    <div className="logistics-panel" style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)",
      zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "Inter, sans-serif",
    }}>
      <div style={{
        background: COLORS.bg, borderRadius: 16,
        border: `1px solid ${COLORS.border}`,
        width: "96vw", height: "92vh",
        display: "flex", flexDirection: "column",
        overflow: "hidden",
      }}>

        {/* TOP BAR */}
        <div style={{
          background: COLORS.navy, borderBottom: `1px solid ${COLORS.border}`,
          padding: "12px 24px", display: "flex",
          alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 8,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <div style={{
              background: COLORS.orange, borderRadius: 8,
              padding: "6px 12px", fontWeight: 700,
              fontSize: 13, color: COLORS.white, letterSpacing: 1,
            }}>LPA LOGISTICS</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.white }}>
                Bio Foods Distribution — Nairobi
              </div>
              <div style={{ fontSize: 11, color: COLORS.grey }}>
                {NAIVAS_STORES.length} Naivas Stores · {TRUCKS.length} Active Trucks
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.cyan, fontFamily: "monospace" }}>
                {time.toLocaleTimeString()}
              </div>
              <div style={{ fontSize: 11, color: COLORS.grey }}>
                {time.toLocaleDateString("en-KE", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}
              </div>
            </div>
            <div style={{
              width: 8, height: 8, borderRadius: "50%",
              background: COLORS.green, boxShadow: `0 0 8px ${COLORS.green}`,
              animation: "pulse 2s infinite",
            }} />
            <span style={{ fontSize: 11, color: COLORS.green, fontWeight: 600 }}>LIVE</span>
            <button onClick={onClose} style={{
              background: "transparent", border: `1px solid ${COLORS.border}`,
              borderRadius: 6, color: COLORS.grey, cursor: "pointer",
              padding: "6px 12px", fontSize: 12,
            }}>✕ Close</button>
          </div>
        </div>

        {/* TABS */}
        <div style={{
          background: COLORS.navy, borderBottom: `1px solid ${COLORS.border}`,
          padding: "0 24px", display: "flex", gap: 4, overflowX: "auto",
        }}>
          {["dashboard", "shipments", "fleet", "routes", "alerts", "reports"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              background: activeTab === tab ? COLORS.orange : "transparent",
              border: "none", borderRadius: "6px 6px 0 0",
              color: activeTab === tab ? COLORS.white : COLORS.grey,
              padding: "10px 18px", fontSize: 12, fontWeight: 600,
              cursor: "pointer", textTransform: "uppercase", letterSpacing: 1,
              whiteSpace: "nowrap",
              transition: "all 0.2s",
            }}>{tab}</button>
          ))}
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex: 1, overflow: "auto", padding: 24 }}>

          {/* DASHBOARD TAB */}
          {activeTab === "dashboard" && (
            <div>
              {/* Banner and Trailer Images */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
                <img src={banner1} alt="Advertising Banner" onClick={() => setLightboxImage(banner1)} style={{
                  width: "100%", height: 200, objectFit: "cover",
                  borderRadius: 8, border: `1px solid ${COLORS.border}`,
                }} />
                <img src={trailer01} alt="Trailer" onClick={() => setLightboxImage(trailer01)} style={{
                  width: "100%", height: 200, objectFit: "cover",
                  borderRadius: 8, border: `1px solid ${COLORS.border}`,
                }} />
              </div>
              {/* KPI CARDS */}
              <div className="kpi-grid" style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12, marginBottom: 24 }}>
                {[
                  { label: "Total Shipments", value: shipments.length, color: COLORS.cyan },
                  { label: "Delivered", value: delivered, color: COLORS.green },
                  { label: "In Transit", value: inTransit, color: COLORS.orange },
                  { label: "Delayed", value: delayed, color: COLORS.red },
                  { label: "Stores Covered", value: NAIVAS_STORES.length, color: COLORS.orange },
                  { label: "Invoice Value", value: `KES ${(totalValue / 1000).toFixed(0)}K`, color: COLORS.cyan },
                ].map(kpi => (
                  <div key={kpi.label} style={{
                    background: COLORS.card, border: `1px solid ${COLORS.border}`,
                    borderRadius: 12, padding: "16px",
                    borderTop: `3px solid ${kpi.color}`,
                  }}>
                    <div style={{ fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 800, color: kpi.color }}>{kpi.value}</div>
                    <div style={{ fontSize: 11, color: COLORS.grey, marginTop: 4 }}>{kpi.label}</div>
                  </div>
                ))}
              </div>

              {/* LIVE SHIPMENTS + ALERTS */}
              <div className="dashboard-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
                {/* Shipment List */}
                <div style={{
                  background: COLORS.card, border: `1px solid ${COLORS.border}`,
                  borderRadius: 12, overflow: "hidden",
                }}>
                  <div style={{
                    padding: "14px 18px", borderBottom: `1px solid ${COLORS.border}`,
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    flexWrap: "wrap", gap: 8,
                  }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.white }}>
                      Live Shipment Tracker
                    </span>
                    <span style={{ fontSize: 11, color: COLORS.green }}>● Auto-refreshing</span>
                  </div>
                  <div style={{ maxHeight: 420, overflowY: "auto" }}>
                    {shipments.map(s => (
                      <div key={s.id} onClick={() => { setSelectedShipment(s); setActiveTab("shipments"); }}
                        style={{
                          padding: "12px 18px", borderBottom: `1px solid ${COLORS.border}`,
                          cursor: "pointer", transition: "background 0.2s",
                          display: "grid", gridTemplateColumns: "80px 1fr 100px 80px 80px",
                          alignItems: "center", gap: 12,
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = COLORS.navy}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                      >
                        <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.cyan, fontFamily: "monospace" }}>
                          {s.id}
                        </div>
                        <div>
                          <div style={{ fontSize: 12, color: COLORS.white, fontWeight: 600 }}>
                            {s.driver}
                          </div>
                          <div style={{ fontSize: 10, color: COLORS.grey }}>
                            {s.stores.map(st => st?.name).join(" → ")}
                          </div>
                          <div style={{
                            marginTop: 4, height: 4, background: COLORS.border,
                            borderRadius: 2, overflow: "hidden",
                          }}>
                            <div style={{
                              height: "100%", width: `${s.progress}%`,
                              background: STATUS_COLORS[s.status],
                              borderRadius: 2, transition: "width 1s",
                            }} />
                          </div>
                        </div>
                        <div style={{
                          fontSize: 10, fontWeight: 700, padding: "3px 8px",
                          borderRadius: 4, textAlign: "center",
                          background: `${STATUS_COLORS[s.status]}20`,
                          color: STATUS_COLORS[s.status],
                          border: `1px solid ${STATUS_COLORS[s.status]}40`,
                        }}>{s.status}</div>
                        <div style={{ fontSize: 10, color: COLORS.grey, textAlign: "center" }}>
                          {s.progress}%
                        </div>
                        <div style={{ fontSize: 10, color: COLORS.orange, textAlign: "right" }}>
                          {s.temperature}°C
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Alerts Panel */}
                <div style={{
                  background: COLORS.card, border: `1px solid ${COLORS.border}`,
                  borderRadius: 12, overflow: "hidden",
                }}>
                  <div style={{
                    padding: "14px 18px", borderBottom: `1px solid ${COLORS.border}`,
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                  }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.white }}>Live Alerts</span>
                    <span style={{
                      fontSize: 10, background: `${COLORS.red}20`, color: COLORS.red,
                      padding: "2px 8px", borderRadius: 4, border: `1px solid ${COLORS.red}40`,
                    }}>{alerts.length} Active</span>
                  </div>
                  <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                    {alerts.map(a => (
                      <div key={a.id} style={{
                        padding: "10px 12px", borderRadius: 8,
                        background: COLORS.navy,
                        borderLeft: `3px solid ${
                          a.type === "danger" ? COLORS.red :
                          a.type === "warning" ? COLORS.orange :
                          a.type === "success" ? COLORS.green : COLORS.cyan
                        }`,
                      }}>
                        <div style={{ fontSize: 11, color: COLORS.white, marginBottom: 4 }}>{a.msg}</div>
                        <div style={{ fontSize: 10, color: COLORS.grey }}>{a.time}</div>
                      </div>
                    ))}
                  </div>

                  {/* Temperature Summary */}
                  <div style={{
                    margin: 12, padding: 12, borderRadius: 8,
                    background: COLORS.navy, border: `1px solid ${COLORS.border}`,
                  }}>
                    <div style={{ fontSize: 11, color: COLORS.grey, marginBottom: 8, fontWeight: 600 }}>
                      COLD CHAIN MONITOR
                    </div>
                    {shipments.slice(0, 5).map(s => (
                      <div key={s.id} style={{
                        display: "flex", justifyContent: "space-between",
                        alignItems: "center", marginBottom: 6,
                      }}>
                        <span style={{ fontSize: 10, color: COLORS.grey, fontFamily: "monospace" }}>
                          {s.truck}
                        </span>
                        <div style={{ flex: 1, margin: "0 8px", height: 4, background: COLORS.border, borderRadius: 2 }}>
                          <div style={{
                            height: "100%",
                            width: `${(parseFloat(s.temperature) / 8) * 100}%`,
                            background: parseFloat(s.temperature) > 6 ? COLORS.red :
                              parseFloat(s.temperature) > 5 ? COLORS.orange : COLORS.green,
                            borderRadius: 2,
                          }} />
                        </div>
                        <span style={{
                          fontSize: 10, fontWeight: 700,
                          color: parseFloat(s.temperature) > 6 ? COLORS.red :
                            parseFloat(s.temperature) > 5 ? COLORS.orange : COLORS.green,
                          fontFamily: "monospace", minWidth: 40, textAlign: "right",
                        }}>{s.temperature}°C</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* === M‑PESA PAYMENT FORM (new) === */}
              <div style={{
                background: COLORS.card,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 12,
                padding: 24,
                marginTop: 24,
                maxWidth: 480,
              }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.white, marginBottom: 12 }}>
                  💳 Pay for Logistics (M-Pesa)
                </div>
                <form onSubmit={handlePayment} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <input
                    type="tel"
                    placeholder="Phone Number (e.g., 254712345678)"
                    value={paymentPhone}
                    onChange={(e) => setPaymentPhone(e.target.value)}
                    required
                    style={{
                      background: COLORS.navy,
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: 8,
                      padding: '12px 16px',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 13,
                      color: COLORS.white,
                      outline: 'none',
                    }}
                  />
                  <input
                    type="number"
                    placeholder="Amount (KES)"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    required
                    min="1"
                    style={{
                      background: COLORS.navy,
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: 8,
                      padding: '12px 16px',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 13,
                      color: COLORS.white,
                      outline: 'none',
                    }}
                  />
                  <button
                    type="submit"
                    disabled={isProcessing}
                    style={{
                      background: COLORS.orange,
                      color: COLORS.white,
                      border: 'none',
                      borderRadius: 8,
                      padding: '14px 24px',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 14,
                      fontWeight: 700,
                      cursor: isProcessing ? 'not-allowed' : 'pointer',
                      opacity: isProcessing ? 0.6 : 1,
                      transition: 'opacity 0.2s',
                    }}
                  >
                    {isProcessing ? 'Processing...' : 'Pay Now'}
                  </button>
                  {paymentStatus && (
                    <div style={{
                      fontSize: 12,
                      color: paymentStatus.includes('✅') ? COLORS.green : paymentStatus.includes('❌') ? COLORS.red : COLORS.grey,
                      marginTop: 8,
                    }}>
                      {paymentStatus}
                    </div>
                  )}
                </form>
              </div>
              {/* ================================== */}
            </div>
          )}

          {/* SHIPMENTS TAB (unchanged) */}
          {activeTab === "shipments" && (
            <div>
              <div style={{ display: "flex", gap: 12, marginBottom: 16, alignItems: "center", flexWrap: "wrap" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.white }}>All Shipments</div>
                <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={inputStyle}>
                  <option>All</option>
                  {STATUSES.map(s => <option key={s}>{s}</option>)}
                </select>
                <div style={{ marginLeft: "auto", fontSize: 11, color: COLORS.grey }}>
                  Showing {filtered.length} of {shipments.length}
                </div>
              </div>

              <div className="shipments-grid" style={{ display: "grid", gridTemplateColumns: selectedShipment ? "1fr 380px" : "1fr", gap: 16 }}>
                <div style={{
                  background: COLORS.card, border: `1px solid ${COLORS.border}`,
                  borderRadius: 12, overflow: "hidden",
                }}>
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
                      <thead>
                        <tr style={{ background: COLORS.navy }}>
                          {["Shipment ID", "Truck", "Driver", "Route", "Status", "Progress", "Temp", "ETA", "Value (KES)"].map(h => (
                            <th key={h} style={{
                              padding: "12px 14px", textAlign: "left",
                              fontSize: 10, color: COLORS.grey, fontWeight: 600,
                              letterSpacing: 1, textTransform: "uppercase",
                              borderBottom: `1px solid ${COLORS.border}`,
                              whiteSpace: "nowrap",
                            }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filtered.map(s => (
                          <tr key={s.id} onClick={() => setSelectedShipment(selectedShipment?.id === s.id ? null : s)}
                            style={{
                              borderBottom: `1px solid ${COLORS.border}`,
                              cursor: "pointer",
                              background: selectedShipment?.id === s.id ? `${COLORS.orange}15` : "transparent",
                            }}
                            onMouseEnter={e => { if (selectedShipment?.id !== s.id) e.currentTarget.style.background = COLORS.navy; }}
                            onMouseLeave={e => { if (selectedShipment?.id !== s.id) e.currentTarget.style.background = "transparent"; }}
                          >
                            <td style={{ padding: "11px 14px", fontSize: 11, color: COLORS.cyan, fontFamily: "monospace", fontWeight: 700 }}>{s.id}</td>
                            <td style={{ padding: "11px 14px", fontSize: 11, color: COLORS.white, fontFamily: "monospace" }}>{s.truck}</td>
                            <td style={{ padding: "11px 14px", fontSize: 11, color: COLORS.white }}>{s.driver}</td>
                            <td style={{ padding: "11px 14px", fontSize: 10, color: COLORS.grey }}>
                              {s.stores.map(st => st?.area).join(" → ")}
                            </td>
                            <td style={{ padding: "11px 14px" }}>
                              <span style={{
                                fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 4,
                                background: `${STATUS_COLORS[s.status]}20`,
                                color: STATUS_COLORS[s.status],
                                border: `1px solid ${STATUS_COLORS[s.status]}40`,
                              }}>{s.status}</span>
                            </td>
                            <td style={{ padding: "11px 14px", minWidth: 80 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                <div style={{ flex: 1, height: 4, background: COLORS.border, borderRadius: 2 }}>
                                  <div style={{
                                    height: "100%", width: `${s.progress}%`,
                                    background: STATUS_COLORS[s.status], borderRadius: 2,
                                  }} />
                                </div>
                                <span style={{ fontSize: 10, color: COLORS.grey, minWidth: 28 }}>{s.progress}%</span>
                              </div>
                            </td>
                            <td style={{
                              padding: "11px 14px", fontSize: 11, fontFamily: "monospace", fontWeight: 700,
                              color: parseFloat(s.temperature) > 6 ? COLORS.red :
                                parseFloat(s.temperature) > 5 ? COLORS.orange : COLORS.green,
                            }}>{s.temperature}°C</td>
                            <td style={{ padding: "11px 14px", fontSize: 11, color: COLORS.orange }}>{s.eta}</td>
                            <td style={{ padding: "11px 14px", fontSize: 11, color: COLORS.white, fontFamily: "monospace" }}>
                              {s.invoiceValue.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {selectedShipment && (
                  <div style={{
                    background: COLORS.card, border: `1px solid ${COLORS.orange}40`,
                    borderRadius: 12, padding: 20, height: "fit-content",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                      <div>
                        <div style={{ fontSize: 16, fontWeight: 800, color: COLORS.white }}>
                          {selectedShipment.id}
                        </div>
                        <div style={{ fontSize: 11, color: COLORS.grey }}>{selectedShipment.truck}</div>
                      </div>
                      <span style={{
                        fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 6,
                        background: `${STATUS_COLORS[selectedShipment.status]}20`,
                        color: STATUS_COLORS[selectedShipment.status],
                        border: `1px solid ${STATUS_COLORS[selectedShipment.status]}40`,
                        height: "fit-content",
                      }}>{selectedShipment.status}</span>
                    </div>

                    {[
                      { label: "Driver", value: selectedShipment.driver },
                      { label: "Phone", value: selectedShipment.phone },
                      { label: "Departed", value: selectedShipment.departureTime },
                      { label: "ETA", value: selectedShipment.eta },
                      { label: "Total Load", value: `${selectedShipment.totalKg} kg` },
                      { label: "Temperature", value: `${selectedShipment.temperature}°C` },
                      { label: "Invoice Value", value: `KES ${selectedShipment.invoiceValue.toLocaleString()}` },
                    ].map(item => (
                      <div key={item.label} style={{
                        display: "flex", justifyContent: "space-between",
                        padding: "8px 0", borderBottom: `1px solid ${COLORS.border}`,
                        fontSize: 12,
                      }}>
                        <span style={{ color: COLORS.grey }}>{item.label}</span>
                        <span style={{ color: COLORS.white, fontWeight: 600 }}>{item.value}</span>
                      </div>
                    ))}

                    <div style={{ marginTop: 16 }}>
                      <div style={{ fontSize: 11, color: COLORS.grey, marginBottom: 8, fontWeight: 600 }}>
                        DELIVERY ROUTE
                      </div>
                      {selectedShipment.stores.map((store, i) => (
                        <div key={i} style={{
                          display: "flex", alignItems: "center", gap: 10,
                          padding: "8px 0", borderBottom: `1px solid ${COLORS.border}`,
                        }}>
                          <div style={{
                            width: 24, height: 24, borderRadius: "50%",
                            background: `${COLORS.orange}20`, border: `1px solid ${COLORS.orange}`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 10, color: COLORS.orange, fontWeight: 700,
                          }}>{i + 1}</div>
                          <div>
                            <div style={{ fontSize: 11, color: COLORS.white, fontWeight: 600 }}>
                              {store?.name}
                            </div>
                            <div style={{ fontSize: 10, color: COLORS.grey }}>
                              {store?.area} · {store?.distance} km from HQ
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{ marginTop: 16 }}>
                      <div style={{ fontSize: 11, color: COLORS.grey, marginBottom: 8, fontWeight: 600 }}>
                        PRODUCTS LOADED
                      </div>
                      {selectedShipment.products.map((p, i) => (
                        <div key={i} style={{
                          display: "flex", justifyContent: "space-between",
                          padding: "6px 0", borderBottom: `1px solid ${COLORS.border}`,
                          fontSize: 11,
                        }}>
                          <span style={{ color: COLORS.white }}>{p.name}</span>
                          <span style={{ color: COLORS.cyan, fontFamily: "monospace" }}>{p.units} units</span>
                        </div>
                      ))}
                    </div>

                    <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
                      <button style={{
                        flex: 1, background: COLORS.orange, color: COLORS.white,
                        border: "none", borderRadius: 6, padding: "8px",
                        fontSize: 11, fontWeight: 700, cursor: "pointer",
                      }}>Call Driver</button>
                      <button style={{
                        flex: 1, background: "transparent", color: COLORS.cyan,
                        border: `1px solid ${COLORS.cyan}40`, borderRadius: 6, padding: "8px",
                        fontSize: 11, fontWeight: 700, cursor: "pointer",
                      }}>View Invoice</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* FLEET TAB (unchanged) */}
          {activeTab === "fleet" && (
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.white, marginBottom: 16 }}>
                Fleet Management — {TRUCKS.length} Trucks
              </div>
              <div className="fleet-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
                {TRUCKS.map((truck, i) => {
                  const shipment = shipments[i];
                  return (
                    <div key={truck.id} style={{
                      background: COLORS.card, border: `1px solid ${COLORS.border}`,
                      borderRadius: 12, padding: 16,
                      borderTop: `3px solid ${STATUS_COLORS[shipment?.status] || COLORS.grey}`,
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                        <div style={{ fontSize: 14, fontWeight: 800, color: COLORS.white, fontFamily: "monospace" }}>
                          {truck.id}
                        </div>
                        <span style={{
                          fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 4,
                          background: `${STATUS_COLORS[shipment?.status]}20`,
                          color: STATUS_COLORS[shipment?.status],
                        }}>{shipment?.status}</span>
                      </div>
                      <img
                        src={TRUCK_IMAGES[truck.id]}
                        alt={truck.id}
                        style={{
                          width: "100%",
                          height: 180,
                          objectFit: "cover",
                          borderRadius: 8,
                          marginBottom: 12,
                        }}
                      />
                      {[ 
                        { label: "Driver", value: truck.driver },
                        { label: "Phone", value: truck.phone },
                        { label: "Capacity", value: `${truck.capacity} kg` },
                        { label: "Loaded", value: `${shipment?.totalKg} kg` },
                        { label: "Temperature", value: `${shipment?.temperature}°C` },
                        { label: "Departure", value: shipment?.departureTime },
                      ].map(item => (
                        <div key={item.label} style={{
                          display: "flex", justifyContent: "space-between",
                          padding: "5px 0", borderBottom: `1px solid ${COLORS.border}`,
                          fontSize: 11,
                        }}>
                          <span style={{ color: COLORS.grey }}>{item.label}</span>
                          <span style={{ color: COLORS.white }}>{item.value}</span>
                        </div>
                      ))}
                      <div style={{ marginTop: 10 }}>
                        <div style={{ fontSize: 10, color: COLORS.grey, marginBottom: 4 }}>Load capacity</div>
                        <div style={{ height: 6, background: COLORS.border, borderRadius: 3 }}>
                          <div style={{
                            height: "100%",
                            width: `${((shipment?.totalKg || 0) / truck.capacity) * 100}%`,
                            background: COLORS.orange, borderRadius: 3,
                          }} />
                        </div>
                        <div style={{ fontSize: 10, color: COLORS.orange, marginTop: 4, textAlign: "right" }}>
                          {Math.round(((shipment?.totalKg || 0) / truck.capacity) * 100)}% utilized
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ROUTES TAB (unchanged) */}
          {activeTab === "routes" && (
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.white, marginBottom: 16 }}>
                Nairobi Route Map — {NAIVAS_STORES.length} Naivas Stores
              </div>
              <div className="routes-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={{
                  background: COLORS.card, border: `1px solid ${COLORS.border}`,
                  borderRadius: 12, padding: 20,
                }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.orange, marginBottom: 12 }}>
                    ORIGIN: Bio Foods HQ — Industrial Area
                  </div>
                  {TRUCKS.map((truck, i) => (
                    <div key={truck.id} style={{
                      padding: "10px 0", borderBottom: `1px solid ${COLORS.border}`,
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: COLORS.cyan, fontFamily: "monospace" }}>
                          {truck.id}
                        </span>
                        <span style={{ fontSize: 10, color: COLORS.grey }}>{truck.driver}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                        <span style={{
                          fontSize: 9, padding: "2px 6px", borderRadius: 4,
                          background: `${COLORS.orange}20`, color: COLORS.orange,
                          border: `1px solid ${COLORS.orange}40`,
                        }}>BIO HQ</span>
                        {truck.route.map(storeId => {
                          const store = NAIVAS_STORES.find(s => s.id === storeId);
                          return (
                            <span key={storeId} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                              <span style={{ color: COLORS.grey, fontSize: 10 }}>→</span>
                              <span style={{
                                fontSize: 9, padding: "2px 6px", borderRadius: 4,
                                background: `${COLORS.cyan}10`, color: COLORS.cyan,
                                border: `1px solid ${COLORS.cyan}20`,
                              }}>{store?.name.replace("Naivas ", "")}</span>
                            </span>
                          );
                        })}
                      </div>
                      <div style={{ fontSize: 10, color: COLORS.grey, marginTop: 4 }}>
                        Total distance: {truck.route.reduce((a, id) => {
                          const s = NAIVAS_STORES.find(st => st.id === id);
                          return a + (s?.distance || 0);
                        }, 0).toFixed(1)} km
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{
                  background: COLORS.card, border: `1px solid ${COLORS.border}`,
                  borderRadius: 12, padding: 20,
                }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.orange, marginBottom: 12 }}>
                    ALL NAIVAS STORES — NAIROBI
                  </div>
                  <div className="stores-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {NAIVAS_STORES.map(store => {
                      const truck = TRUCKS.find(t => t.route.includes(store.id));
                      const shipment = shipments[TRUCKS.indexOf(truck)];
                      return (
                        <div key={store.id} style={{
                          padding: "8px 10px", borderRadius: 8,
                          background: COLORS.navy, border: `1px solid ${COLORS.border}`,
                        }}>
                          <div style={{ fontSize: 11, color: COLORS.white, fontWeight: 600, marginBottom: 2 }}>
                            {store.name.replace("Naivas ", "")}
                          </div>
                          <div style={{ fontSize: 10, color: COLORS.grey }}>{store.area}</div>
                          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                            <span style={{ fontSize: 9, color: COLORS.cyan, fontFamily: "monospace" }}>
                              {truck?.id}
                            </span>
                            <span style={{
                              fontSize: 9, padding: "1px 5px", borderRadius: 3,
                              background: `${STATUS_COLORS[shipment?.status]}20`,
                              color: STATUS_COLORS[shipment?.status],
                            }}>{shipment?.status}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ALERTS TAB (unchanged) */}
          {activeTab === "alerts" && (
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.white, marginBottom: 16 }}>
                Operations Alerts & Notifications
              </div>
              <div className="alerts-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={{
                  background: COLORS.card, border: `1px solid ${COLORS.border}`,
                  borderRadius: 12, padding: 16,
                }}>
                  {alerts.map(a => (
                    <div key={a.id} style={{
                      padding: "12px", borderRadius: 8, marginBottom: 8,
                      background: COLORS.navy,
                      borderLeft: `3px solid ${
                        a.type === "danger" ? COLORS.red :
                        a.type === "warning" ? COLORS.orange :
                        a.type === "success" ? COLORS.green : COLORS.cyan
                      }`,
                      display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                    }}>
                      <div>
                        <div style={{ fontSize: 12, color: COLORS.white, marginBottom: 4 }}>{a.msg}</div>
                        <div style={{ fontSize: 10, color: COLORS.grey }}>{a.time}</div>
                      </div>
                      <button onClick={() => setAlerts(prev => prev.filter(al => al.id !== a.id))}
                        style={{
                          background: "transparent", border: "none",
                          color: COLORS.grey, cursor: "pointer", fontSize: 14,
                        }}>✕</button>
                    </div>
                  ))}
                  {alerts.length === 0 && (
                    <div style={{ textAlign: "center", padding: 40, color: COLORS.grey, fontSize: 12 }}>
                      No active alerts
                    </div>
                  )}
                </div>
                <div style={{
                  background: COLORS.card, border: `1px solid ${COLORS.border}`,
                  borderRadius: 12, padding: 16,
                }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.white, marginBottom: 12 }}>
                    Cold Chain Status
                  </div>
                  {shipments.map(s => (
                    <div key={s.id} style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      padding: "8px 0", borderBottom: `1px solid ${COLORS.border}`,
                    }}>
                      <span style={{ fontSize: 11, color: COLORS.white, fontFamily: "monospace" }}>{s.truck}</span>
                      <span style={{ fontSize: 11, color: COLORS.grey }}>{s.driver.split(" ")[0]}</span>
                      <span style={{
                        fontSize: 11, fontWeight: 700, fontFamily: "monospace",
                        color: parseFloat(s.temperature) > 6 ? COLORS.red :
                          parseFloat(s.temperature) > 5 ? COLORS.orange : COLORS.green,
                      }}>{s.temperature}°C</span>
                      <span style={{
                        fontSize: 9, padding: "2px 6px", borderRadius: 4,
                        background: parseFloat(s.temperature) > 6 ? `${COLORS.red}20` :
                          parseFloat(s.temperature) > 5 ? `${COLORS.orange}20` : `${COLORS.green}20`,
                        color: parseFloat(s.temperature) > 6 ? COLORS.red :
                          parseFloat(s.temperature) > 5 ? COLORS.orange : COLORS.green,
                      }}>{parseFloat(s.temperature) > 6 ? "BREACH" : parseFloat(s.temperature) > 5 ? "WARNING" : "OK"}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* REPORTS TAB (unchanged) */}
          {activeTab === "reports" && (
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.white, marginBottom: 16 }}>
                Operations Report — Bio Foods Nairobi Distribution
              </div>
              <div className="reports-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 16 }}>
                {[
                  { label: "Total Delivery Value", value: `KES ${totalValue.toLocaleString()}`, sub: "Today's dispatch" },
                  { label: "Avg Delivery Progress", value: `${Math.round(shipments.reduce((a, b) => a + b.progress, 0) / shipments.length)}%`, sub: "Across all trucks" },
                  { label: "On-Time Rate", value: `${Math.round((shipments.filter(s => s.status !== "Delayed").length / shipments.length) * 100)}%`, sub: "Excluding delays" },
                  { label: "Total Distance", value: `${NAIVAS_STORES.reduce((a, b) => a + b.distance, 0).toFixed(0)} km`, sub: "All routes combined" },
                  { label: "Cold Chain Compliance", value: `${Math.round((shipments.filter(s => parseFloat(s.temperature) <= 6).length / shipments.length) * 100)}%`, sub: "Within 2-6°C range" },
                  { label: "Stores Served", value: `${NAIVAS_STORES.length}`, sub: "Nairobi county" },
                ].map(r => (
                  <div key={r.label} style={{
                    background: COLORS.card, border: `1px solid ${COLORS.border}`,
                    borderRadius: 12, padding: 20,
                  }}>
                    <div style={{ fontSize: "clamp(20px, 2.5vw, 24px)", fontWeight: 800, color: COLORS.orange, marginBottom: 4 }}>
                      {r.value}
                    </div>
                    <div style={{ fontSize: 13, color: COLORS.white, marginBottom: 4 }}>{r.label}</div>
                    <div style={{ fontSize: 11, color: COLORS.grey }}>{r.sub}</div>
                  </div>
                ))}
              </div>

              <div style={{
                background: COLORS.card, border: `1px solid ${COLORS.border}`,
                borderRadius: 12, overflow: "hidden",
              }}>
                <div style={{ padding: "14px 18px", borderBottom: `1px solid ${COLORS.border}` }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.white }}>
                    Per-Route Performance Report
                  </span>
                </div>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
                    <thead>
                      <tr style={{ background: COLORS.navy }}>
                        {["Truck", "Driver", "Stores", "Distance", "Load (kg)", "Temp", "Status", "Invoice (KES)"].map(h => (
                          <th key={h} style={{
                            padding: "10px 14px", textAlign: "left",
                            fontSize: 10, color: COLORS.grey, fontWeight: 600,
                            letterSpacing: 1, textTransform: "uppercase",
                          }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {shipments.map((s, i) => (
                        <tr key={s.id} style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                          <td style={{ padding: "10px 14px", fontSize: 11, color: COLORS.cyan, fontFamily: "monospace" }}>{s.truck}</td>
                          <td style={{ padding: "10px 14px", fontSize: 11, color: COLORS.white }}>{s.driver}</td>
                          <td style={{ padding: "10px 14px", fontSize: 10, color: COLORS.grey }}>
                            {s.stores.map(st => st?.name.replace("Naivas ", "")).join(", ")}
                          </td>
                          <td style={{ padding: "10px 14px", fontSize: 11, color: COLORS.white }}>
                            {TRUCKS[i].route.reduce((a, id) => {
                              const st = NAIVAS_STORES.find(s => s.id === id);
                              return a + (st?.distance || 0);
                            }, 0).toFixed(1)} km
                          </td>
                          <td style={{ padding: "10px 14px", fontSize: 11, color: COLORS.white }}>{s.totalKg}</td>
                          <td style={{
                            padding: "10px 14px", fontSize: 11, fontFamily: "monospace", fontWeight: 700,
                            color: parseFloat(s.temperature) > 6 ? COLORS.red :
                              parseFloat(s.temperature) > 5 ? COLORS.orange : COLORS.green,
                          }}>{s.temperature}°C</td>
                          <td style={{ padding: "10px 14px" }}>
                            <span style={{
                              fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 4,
                              background: `${STATUS_COLORS[s.status]}20`,
                              color: STATUS_COLORS[s.status],
                            }}>{s.status}</span>
                          </td>
                          <td style={{ padding: "10px 14px", fontSize: 11, color: COLORS.white, fontFamily: "monospace" }}>
                            {s.invoiceValue.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                      <tr style={{ background: COLORS.navy }}>
                        <td colSpan={7} style={{ padding: "10px 14px", fontSize: 11, fontWeight: 700, color: COLORS.white }}>
                          TOTAL
                        </td>
                        <td style={{ padding: "10px 14px", fontSize: 11, fontWeight: 800, color: COLORS.orange, fontFamily: "monospace" }}>
                          {totalValue.toLocaleString()}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Lightbox overlay */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10000,
            cursor: "pointer",
          }}
        >
          <img
            src={lightboxImage}
            alt="Expanded view"
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              objectFit: "contain",
              borderRadius: 12,
              boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
            }}
          />
        </div>
      )}
      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #12121A; }
        ::-webkit-scrollbar-thumb { background: #2A2A3A; border-radius: 3px; }

        /* --- RESPONSIVE BREAKPOINTS --- */
        @media (max-width: 1024px) {
          .logistics-panel .kpi-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .logistics-panel .fleet-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .logistics-panel .dashboard-grid { grid-template-columns: 1fr !important; }
          .logistics-panel .routes-grid { grid-template-columns: 1fr !important; }
          .logistics-panel .alerts-grid { grid-template-columns: 1fr !important; }
          .logistics-panel .reports-grid { grid-template-columns: 1fr 1fr !important; }
          .logistics-panel .fleet-grid { grid-template-columns: 1fr 1fr !important; }
          .logistics-panel .shipments-grid { grid-template-columns: 1fr !important; }
          .logistics-panel .stores-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .logistics-panel .kpi-grid { grid-template-columns: 1fr 1fr !important; }
          .logistics-panel .fleet-grid { grid-template-columns: 1fr !important; }
          .logistics-panel .reports-grid { grid-template-columns: 1fr !important; }
          .logistics-panel .stores-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}