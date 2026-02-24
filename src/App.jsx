import { useState } from "react";

const CREDENTIALS = { username: "admin", password: "admin" };

const PAGES = {
  rapport: {
    title: "Rapport Genereren",
    icon: "📊",
    description: "Genereer rapporten over batterijprestaties en statusoverzichten.",
  },
  advies: {
    title: "Advies Batterijcombinaties",
    icon: "🔋",
    description: "Ontvang advies over optimale combinaties van batterijen.",
  },
  predictive: {
    title: "Predictive Maintenance",
    icon: "⚙️",
    description: "Inzicht in voorspellend onderhoud van batterijsystemen.",
  },
};

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
      onLogin();
    } else {
      setError("Ongeldige inloggegevens. Probeer admin / admin.");
    }
  };

  return (
    <div style={styles.loginContainer}>
      <div style={styles.loginCard}>
        <div style={styles.loginHeader}>
          <div style={styles.logoMark}>⚡</div>
          <h1 style={styles.loginTitle}>Portabolt/MLC</h1>
          <p style={styles.loginSubtitle}>Batterij Management Platform</p>
        </div>
        <div onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Gebruikersnaam</label>
            <input
              style={styles.input}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Voer gebruikersnaam in"
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Wachtwoord</label>
            <input
              style={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Voer wachtwoord in"
            />
          </div>
          {error && <p style={styles.error}>{error}</p>}
          <button style={styles.loginButton} onClick={handleSubmit}>
            Inloggen
          </button>
        </div>
        <p style={styles.hint}>Demo: admin / admin</p>
      </div>
    </div>
  );
}

function Sidebar({ activePage, onNavigate, onLogout }) {
  return (
    <div style={styles.sidebar}>
      <div style={styles.sidebarHeader}>
        <span style={styles.sidebarLogo}>⚡</span>
        <span style={styles.sidebarTitle}>Portabolt/MLC</span>
      </div>
      <nav style={styles.nav}>
        {Object.entries(PAGES).map(([key, page]) => (
          <button
            key={key}
            style={{
              ...styles.navItem,
              ...(activePage === key ? styles.navItemActive : {}),
            }}
            onClick={() => onNavigate(key)}
          >
            <span style={styles.navIcon}>{page.icon}</span>
            <span style={styles.navLabel}>{page.title}</span>
          </button>
        ))}
      </nav>
      <button style={styles.logoutButton} onClick={onLogout}>
        Uitloggen
      </button>
    </div>
  );
}

const MOCK_BATTERY_PACKS = [
  {
    id: "BP-2024-001",
    name: "Battery Pack Alpha",
    manufacturer: "Samsung SDI",
    chemistry: "NMC 811",
    nominalVoltage: 48,
    nominalCapacity: 100,
    installedDate: "2023-03-15",
    cycleCount: 847,
    maxCycles: 3000,
    soh: 94.2,
    avgTemperature: 28.3,
    maxTemperature: 41.7,
    avgEfficiency: 96.1,
    totalEnergyDelivered: 78420,
    lastMaintenance: "2025-01-10",
    score: "A",
  },
  {
    id: "BP-2024-002",
    name: "Battery Pack Bravo",
    manufacturer: "CATL",
    chemistry: "LFP",
    nominalVoltage: 51.2,
    nominalCapacity: 200,
    installedDate: "2022-06-20",
    cycleCount: 1823,
    maxCycles: 4000,
    soh: 82.5,
    avgTemperature: 31.6,
    maxTemperature: 48.2,
    avgEfficiency: 91.3,
    totalEnergyDelivered: 312500,
    lastMaintenance: "2024-11-22",
    score: "B",
  },
  {
    id: "BP-2024-003",
    name: "Battery Pack Charlie",
    manufacturer: "BYD",
    chemistry: "LFP",
    nominalVoltage: 48,
    nominalCapacity: 150,
    installedDate: "2021-01-08",
    cycleCount: 2950,
    maxCycles: 3500,
    soh: 68.4,
    avgTemperature: 34.1,
    maxTemperature: 52.6,
    avgEfficiency: 84.7,
    totalEnergyDelivered: 445200,
    lastMaintenance: "2024-08-05",
    score: "C",
  },
  {
    id: "BP-2024-004",
    name: "Battery Pack Delta",
    manufacturer: "LG Energy",
    chemistry: "NMC 622",
    nominalVoltage: 48,
    nominalCapacity: 120,
    installedDate: "2020-04-12",
    cycleCount: 2780,
    maxCycles: 2500,
    soh: 52.1,
    avgTemperature: 36.8,
    maxTemperature: 58.3,
    avgEfficiency: 76.2,
    totalEnergyDelivered: 298100,
    lastMaintenance: "2024-05-18",
    score: "D",
  },
];

const SCORE_CONFIG = {
  A: { color: "#22c55e", bg: "rgba(34,197,94,0.12)", label: "Uitstekend" },
  B: { color: "#3b82f6", bg: "rgba(59,130,246,0.12)", label: "Goed" },
  C: { color: "#f59e0b", bg: "rgba(245,158,11,0.12)", label: "Matig" },
  D: { color: "#ef4444", bg: "rgba(239,68,68,0.12)", label: "Onvoldoende" },
};

function ScoreBadge({ score }) {
  const cfg = SCORE_CONFIG[score];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
      <div
        style={{
          width: 88,
          height: 88,
          borderRadius: 16,
          background: cfg.bg,
          border: `2px solid ${cfg.color}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 44,
          fontWeight: 800,
          color: cfg.color,
          letterSpacing: "-0.03em",
        }}
      >
        {score}
      </div>
      <div>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#f1f5f9" }}>{cfg.label}</div>
        <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 2 }}>Prestatieclassificatie</div>
      </div>
    </div>
  );
}

function MetaRow({ label, value, unit }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #1e293b" }}>
      <span style={{ color: "#94a3b8", fontSize: 14 }}>{label}</span>
      <span style={{ color: "#f1f5f9", fontSize: 14, fontWeight: 500 }}>
        {value}{unit && <span style={{ color: "#64748b", marginLeft: 4 }}>{unit}</span>}
      </span>
    </div>
  );
}

function generateRandomPack() {
  const manufacturers = ["Samsung SDI", "CATL", "BYD", "LG Energy", "Panasonic", "EVE Energy", "CALB", "Gotion"];
  const chemistries = ["NMC 811", "NMC 622", "LFP", "NCA", "LTO"];
  const names = ["Echo", "Foxtrot", "Golf", "Hotel", "India", "Juliet", "Kilo", "Lima", "Mike", "November"];
  const voltages = [48, 51.2, 96, 400];
  const capacities = [50, 100, 120, 150, 200, 280];

  const manufacturer = manufacturers[Math.floor(Math.random() * manufacturers.length)];
  const chemistry = chemistries[Math.floor(Math.random() * chemistries.length)];
  const name = names[Math.floor(Math.random() * names.length)];
  const maxCycles = chemistry === "LFP" || chemistry === "LTO" ? 4000 + Math.floor(Math.random() * 2000) : 2000 + Math.floor(Math.random() * 1500);
  const cycleCount = Math.floor(Math.random() * maxCycles);
  const soh = Math.max(40, 100 - (cycleCount / maxCycles) * 60 + (Math.random() * 10 - 5));
  const score = soh >= 90 ? "A" : soh >= 75 ? "B" : soh >= 60 ? "C" : "D";

  return {
    id: `BP-${Date.now()}-${Math.floor(Math.random() * 1000).toString().padStart(3, "0")}`,
    name: `Battery Pack ${name}`,
    manufacturer,
    chemistry,
    nominalVoltage: voltages[Math.floor(Math.random() * voltages.length)],
    nominalCapacity: capacities[Math.floor(Math.random() * capacities.length)],
    installedDate: new Date(2020 + Math.floor(Math.random() * 5), Math.floor(Math.random() * 12), 1 + Math.floor(Math.random() * 28)).toISOString().slice(0, 10),
    cycleCount,
    maxCycles,
    soh: parseFloat(soh.toFixed(1)),
    avgTemperature: parseFloat((25 + Math.random() * 15).toFixed(1)),
    maxTemperature: parseFloat((40 + Math.random() * 20).toFixed(1)),
    avgEfficiency: parseFloat((75 + Math.random() * 23).toFixed(1)),
    totalEnergyDelivered: Math.floor(Math.random() * 500000),
    lastMaintenance: new Date(2024 + Math.floor(Math.random() * 2), Math.floor(Math.random() * 12), 1 + Math.floor(Math.random() * 28)).toISOString().slice(0, 10),
    score,
    generatedAt: new Date().toLocaleString("nl-NL"),
  };
}

const INITIAL_REPORTS = MOCK_BATTERY_PACKS.map((pack, i) => ({
  ...pack,
  generatedAt: new Date(2025, 1, 20 + i, 9 + i, 30).toLocaleString("nl-NL"),
}));

function tempToColor(temp) {
  const t = Math.max(20, Math.min(60, temp));
  if (t <= 30) {
    const ratio = (t - 20) / 10;
    const r = Math.round(59 + ratio * (34 - 59));
    const g = Math.round(130 + ratio * (197 - 130));
    const b = Math.round(246 + ratio * (94 - 246));
    return `rgb(${r},${g},${b})`;
  } else if (t <= 42) {
    const ratio = (t - 30) / 12;
    const r = Math.round(34 + ratio * (245 - 34));
    const g = Math.round(197 + ratio * (158 - 197));
    const b = Math.round(94 + ratio * (11 - 94));
    return `rgb(${r},${g},${b})`;
  } else {
    const ratio = (t - 42) / 18;
    const r = Math.round(245 + ratio * (239 - 245));
    const g = Math.round(158 + ratio * (68 - 158));
    const b = Math.round(11 + ratio * (68 - 11));
    return `rgb(${r},${g},${b})`;
  }
}

function BatteryHeatmap({ pack }) {
  const [timeSeconds, setTimeSeconds] = useState(0);
  const progress = timeSeconds / 120; // 0 to 1

  const baseTemp = pack.avgTemperature;
  const maxT = pack.maxTemperature;
  const spread = maxT - baseTemp;
  const seed = pack.id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const ambientTemp = 21;

  // Target temps at full progress (120s)
  const targetTemps = [
    parseFloat((baseTemp - spread * 0.3 + ((seed * 7) % 10) * 0.2).toFixed(1)),
    parseFloat((baseTemp + spread * 0.1 + ((seed * 3) % 10) * 0.15).toFixed(1)),
    parseFloat((baseTemp + spread * 0.6 + ((seed * 11) % 10) * 0.1).toFixed(1)),
    parseFloat((baseTemp - spread * 0.1 + ((seed * 13) % 10) * 0.18).toFixed(1)),
    parseFloat((baseTemp + spread * 0.4 + ((seed * 17) % 10) * 0.12).toFixed(1)),
    parseFloat((maxT - ((seed * 5) % 10) * 0.15).toFixed(1)),
  ];

  // Sensors positioned on the upright 3D front face
  const sensors = targetTemps.map((target, i) => {
    // Ease-in curve for more realistic heating
    const ease = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
    const temp = parseFloat((ambientTemp + (target - ambientTemp) * ease).toFixed(1));
    const col = i % 2;
    const row = Math.floor(i / 2);
    return {
      label: `Punt ${i + 1}`,
      // Positions on the front face of the 3D battery
      fx: 75 + col * 90,
      fy: 85 + row * 90,
      temp,
    };
  });

  const allTemps = sensors.map((s) => s.temp);
  const minTemp = Math.min(...allTemps);
  const maxTemp = Math.max(...allTemps);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  // 3D isometric battery dimensions
  const fw = 200; // front width
  const fh = 340; // front height
  const depth = 60; // 3D depth
  const ox = 50; // origin x
  const oy = 20; // origin y
  const dx = depth * 0.7; // x offset for depth
  const dy = depth * 0.4; // y offset for depth

  // Front face points (bottom-left origin, going clockwise)
  const frontPath = `M${ox},${oy + dy} L${ox + fw},${oy + dy} L${ox + fw},${oy + dy + fh} L${ox},${oy + dy + fh} Z`;
  // Top face
  const topPath = `M${ox},${oy + dy} L${ox + dx},${oy} L${ox + fw + dx},${oy} L${ox + fw},${oy + dy} Z`;
  // Right side face
  const rightPath = `M${ox + fw},${oy + dy} L${ox + fw + dx},${oy} L${ox + fw + dx},${oy + fh} L${ox + fw},${oy + dy + fh} Z`;

  // Terminal on top
  const termW = 40;
  const termH = 18;
  const termX = ox + fw / 2 - termW / 2 + dx / 2;
  const termY = oy - termH;

  return (
    <div>
      <svg width="100%" viewBox={`0 0 ${ox + fw + dx + 40} ${oy + dy + fh + 60}`} style={{ maxWidth: 420 }}>
        <defs>
          <linearGradient id="frontGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="topGrad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <linearGradient id="sideGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          {sensors.map((s, i) => (
            <radialGradient key={`hg-${i}`} id={`heat3d-${i}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={tempToColor(s.temp)} stopOpacity={0.5} />
              <stop offset="100%" stopColor={tempToColor(s.temp)} stopOpacity={0} />
            </radialGradient>
          ))}
        </defs>

        {/* Shadow */}
        <ellipse cx={ox + fw / 2 + dx / 2} cy={oy + dy + fh + 20} rx={fw / 2 + 10} ry={12} fill="rgba(0,0,0,0.3)" />

        {/* Right side face */}
        <path d={rightPath} fill="url(#sideGrad)" stroke="#334155" strokeWidth={1.5} />
        {/* Top face */}
        <path d={topPath} fill="url(#topGrad)" stroke="#334155" strokeWidth={1.5} />
        {/* Front face */}
        <path d={frontPath} fill="url(#frontGrad)" stroke="#475569" strokeWidth={1.5} />

        {/* Terminal (3D) */}
        <rect x={termX} y={termY + dy} width={termW} height={termH} rx={4} fill="#475569" stroke="#64748b" strokeWidth={1} />
        <polygon
          points={`${termX},${termY + dy} ${termX + dx * 0.3},${termY + dy - dy * 0.3} ${termX + termW + dx * 0.3},${termY + dy - dy * 0.3} ${termX + termW},${termY + dy}`}
          fill="#3d4f63" stroke="#64748b" strokeWidth={1}
        />
        <text x={termX + termW / 2} y={termY + dy + termH / 2 + 1} textAnchor="middle" dominantBaseline="middle" fill="#94a3b8" fontSize={11} fontWeight={700}>+ −</text>

        {/* Heat blobs on front face */}
        {sensors.map((s, i) => (
          <circle key={`hb-${i}`} cx={s.fx} cy={s.fy} r={50} fill={`url(#heat3d-${i})`} />
        ))}

        {/* Sensor points on front face */}
        {sensors.map((s, i) => (
          <g key={i}>
            <circle cx={s.fx} cy={s.fy} r={20} fill={tempToColor(s.temp)} opacity={0.9} />
            <circle cx={s.fx} cy={s.fy} r={20} fill="none" stroke={tempToColor(s.temp)} strokeWidth={2} opacity={0.5} />
            <text x={s.fx} y={s.fy + 1} textAnchor="middle" dominantBaseline="middle" fill="#fff" fontSize={11} fontWeight={700}>
              {s.temp}°
            </text>
            <text x={s.fx} y={s.fy + 32} textAnchor="middle" fill="#64748b" fontSize={9}>
              {s.label}
            </text>
          </g>
        ))}
      </svg>

      {/* Time slider */}
      <div style={{ marginTop: 16, padding: "16px 20px", background: "#0f172a", borderRadius: 10, border: "1px solid #1e293b" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#f1f5f9" }}>Tijdsverloop</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#60a5fa", fontVariantNumeric: "tabular-nums" }}>{formatTime(timeSeconds)}</span>
        </div>
        <input
          type="range"
          min={0}
          max={120}
          value={timeSeconds}
          onChange={(e) => setTimeSeconds(parseInt(e.target.value))}
          style={{
            width: "100%",
            height: 6,
            appearance: "none",
            background: `linear-gradient(to right, #3b82f6 ${progress * 100}%, #334155 ${progress * 100}%)`,
            borderRadius: 3,
            outline: "none",
            cursor: "pointer",
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
          <span style={{ fontSize: 11, color: "#475569" }}>0:00</span>
          <span style={{ fontSize: 11, color: "#475569" }}>0:30</span>
          <span style={{ fontSize: 11, color: "#475569" }}>1:00</span>
          <span style={{ fontSize: 11, color: "#475569" }}>1:30</span>
          <span style={{ fontSize: 11, color: "#475569" }}>2:00</span>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 12, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12 }}>
          <div style={{ width: 12, height: 12, borderRadius: 3, background: tempToColor(22) }} />
          <span style={{ color: "#94a3b8" }}>Koel (&lt;30°C)</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12 }}>
          <div style={{ width: 12, height: 12, borderRadius: 3, background: tempToColor(35) }} />
          <span style={{ color: "#94a3b8" }}>Warm (30-42°C)</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12 }}>
          <div style={{ width: 12, height: 12, borderRadius: 3, background: tempToColor(50) }} />
          <span style={{ color: "#94a3b8" }}>Heet (&gt;42°C)</span>
        </div>
        <div style={{ fontSize: 12, color: "#64748b", marginLeft: "auto" }}>
          Range: {minTemp}°C — {maxTemp}°C
        </div>
      </div>
    </div>
  );
}

function generatePDF(pack) {
  const cyclePercent = ((pack.cycleCount / pack.maxCycles) * 100).toFixed(1);
  const scoreLabels = { A: "Uitstekend", B: "Goed", C: "Matig", D: "Onvoldoende" };

  // Minimal PDF builder
  const lines = [];
  let y = 770;
  const lh = 18; // line height
  const lhSmall = 15;

  const addLine = (text, size = 11, bold = false) => {
    const font = bold ? "/F2" : "/F1";
    lines.push(`BT ${font} ${size} Tf 50 ${y} Td (${text}) Tj ET`);
    y -= size === 16 ? lh + 8 : size === 13 ? lh + 2 : lhSmall;
  };

  const addSpacer = (h = 10) => { y -= h; };

  const addRow = (label, value) => {
    lines.push(`BT /F1 10 Tf 50 ${y} Td (${label}) Tj ET`);
    lines.push(`BT /F2 10 Tf 300 ${y} Td (${value}) Tj ET`);
    y -= lhSmall;
  };

  const addSeparator = () => {
    lines.push(`0.6 0.6 0.6 RG`);
    lines.push(`50 ${y + 5} m 545 ${y + 5} l S`);
    lines.push(`0 0 0 RG`);
    y -= 8;
  };

  // Header
  addLine("Portabolt/MLC - Prestatierapport", 16, true);
  addSpacer(4);
  addLine(`${pack.name}`, 13, true);
  addLine(`Gegenereerd op ${pack.generatedAt}  |  Pack ID: ${pack.id}`, 9);
  addSpacer(6);
  addSeparator();
  addSpacer(6);

  // Score
  addLine("Score", 13, true);
  addSpacer(2);
  addRow("Classificatie:", `${pack.score} - ${scoreLabels[pack.score]}`);
  addSpacer(10);

  // Pack info
  addLine("Pack Informatie", 13, true);
  addSpacer(2);
  addRow("Fabrikant:", pack.manufacturer);
  addRow("Chemie:", pack.chemistry);
  addRow("Nominale spanning:", `${pack.nominalVoltage} V`);
  addRow("Nominale capaciteit:", `${pack.nominalCapacity} Ah`);
  addRow("Installatiedatum:", new Date(pack.installedDate).toLocaleDateString("nl-NL"));
  addRow("Laatste onderhoud:", new Date(pack.lastMaintenance).toLocaleDateString("nl-NL"));
  addSpacer(10);

  // Performance
  addLine("Prestatiecijfers", 13, true);
  addSpacer(2);
  addRow("State of Health (SoH):", `${pack.soh}%`);
  addRow("Cycli verbruikt:", `${pack.cycleCount} / ${pack.maxCycles} (${cyclePercent}%)`);
  addRow("Gem. efficientie:", `${pack.avgEfficiency}%`);
  addRow("Totaal geleverde energie:", `${pack.totalEnergyDelivered.toLocaleString("nl-NL")} kWh`);
  addRow("Gem. temperatuur:", `${pack.avgTemperature} C`);
  addRow("Max. temperatuur:", `${pack.maxTemperature} C`);
  addSpacer(10);

  // Heatmap info
  addLine("Hitteverdeling", 13, true);
  addSpacer(2);
  const seed = pack.id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const baseTemp = pack.avgTemperature;
  const maxT = pack.maxTemperature;
  const spread = maxT - baseTemp;
  const temps = [
    (baseTemp - spread * 0.3 + ((seed * 7) % 10) * 0.2).toFixed(1),
    (baseTemp + spread * 0.1 + ((seed * 3) % 10) * 0.15).toFixed(1),
    (baseTemp + spread * 0.6 + ((seed * 11) % 10) * 0.1).toFixed(1),
    (baseTemp - spread * 0.1 + ((seed * 13) % 10) * 0.18).toFixed(1),
    (baseTemp + spread * 0.4 + ((seed * 17) % 10) * 0.12).toFixed(1),
    (maxT - ((seed * 5) % 10) * 0.15).toFixed(1),
  ];
  temps.forEach((t, i) => addRow(`Meetpunt ${i + 1}:`, `${t} C`));
  addSpacer(16);

  // Footer
  addSeparator();
  addLine(`Portabolt/MLC  |  Batterij Management Platform  |  ${new Date().toLocaleDateString("nl-NL")}`, 8);

  const stream = lines.join("\n");
  const streamLen = stream.length;

  const pdf = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj

2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj

3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842]
   /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>
endobj

4 0 obj
<< /Length ${streamLen} >>
stream
${stream}
endstream
endobj

5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj

6 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>
endobj

xref
0 7
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000266 00000 n 
trailer
<< /Size 7 /Root 1 0 R >>
startxref
0
%%EOF`;

  const blob = new Blob([pdf], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Prestatierapport_${pack.name.replace(/\s+/g, "_")}_${pack.id}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function RapportDetailPage({ pack, onBack }) {
  const cyclePercent = ((pack.cycleCount / pack.maxCycles) * 100).toFixed(1);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <button onClick={onBack} style={{ ...styles.cardButton, display: "inline-flex", alignItems: "center", gap: 6, margin: 0 }}>
          ← Terug naar overzicht
        </button>
        <button
          onClick={() => generatePDF(pack)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 18px",
            fontSize: 13,
            fontWeight: 600,
            border: "none",
            borderRadius: 6,
            background: "linear-gradient(135deg, #3b82f6, #2563eb)",
            color: "#fff",
            cursor: "pointer",
            transition: "opacity 0.2s",
          }}
        >
          📄 Download PDF
        </button>
      </div>
      <h2 style={styles.pageTitle}>Prestatierapport: {pack.name}</h2>
      <p style={{ ...styles.pageDescription, marginBottom: 28 }}>
        Gegenereerd op {pack.generatedAt} — Pack ID: {pack.id}
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={{ ...styles.card, gridColumn: "1 / -1" }}>
          <h3 style={styles.cardTitle}>Score</h3>
          <ScoreBadge score={pack.score} />
        </div>

        <div style={{ ...styles.card, gridColumn: "1 / -1" }}>
          <h3 style={styles.cardTitle}>Hitteverdeling Battery Pack</h3>
          <p style={{ fontSize: 13, color: "#94a3b8", margin: "0 0 16px", lineHeight: 1.5 }}>
            Temperatuurverdeling over 6 meetpunten in het battery pack. De kleuren tonen de geleidelijke hitteverdeling van koel (blauw) naar heet (rood).
          </p>
          <BatteryHeatmap pack={pack} />
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Pack Informatie</h3>
          <MetaRow label="Fabrikant" value={pack.manufacturer} />
          <MetaRow label="Chemie" value={pack.chemistry} />
          <MetaRow label="Nominale spanning" value={pack.nominalVoltage} unit="V" />
          <MetaRow label="Nominale capaciteit" value={pack.nominalCapacity} unit="Ah" />
          <MetaRow label="Installatiedatum" value={new Date(pack.installedDate).toLocaleDateString("nl-NL")} />
          <MetaRow label="Laatste onderhoud" value={new Date(pack.lastMaintenance).toLocaleDateString("nl-NL")} />
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Prestatiecijfers</h3>
          <MetaRow label="State of Health (SoH)" value={pack.soh} unit="%" />
          <MetaRow label="Cycli verbruikt" value={`${pack.cycleCount} / ${pack.maxCycles}`} unit={`(${cyclePercent}%)`} />
          <MetaRow label="Gem. efficiëntie" value={pack.avgEfficiency} unit="%" />
          <MetaRow label="Totaal geleverde energie" value={pack.totalEnergyDelivered.toLocaleString("nl-NL")} unit="kWh" />
          <MetaRow label="Gem. temperatuur" value={pack.avgTemperature} unit="°C" />
          <MetaRow label="Max. temperatuur" value={pack.maxTemperature} unit="°C" />
        </div>
      </div>
    </div>
  );
}

function RapportPage() {
  const [reports, setReports] = useState(INITIAL_REPORTS);
  const [selectedPack, setSelectedPack] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const handleGenerate = () => {
    if (loading) return;
    setLoading(true);
    const delay = 5000 + Math.random() * 2000; // 5-7 seconds
    setTimeout(() => {
      const newPack = generateRandomPack();
      setReports((prev) => [newPack, ...prev]);
      setLoading(false);
    }, delay);
  };

  if (selectedPack) {
    return <RapportDetailPage pack={selectedPack} onBack={() => setSelectedPack(null)} />;
  }

  return (
    <div>
      <h2 style={styles.pageTitle}>Rapporten</h2>
      <p style={styles.pageDescription}>
        Overzicht van alle gegenereerde prestatierapporten.
      </p>

      {loading && (
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px",
          marginBottom: 20,
          background: "#1e293b",
          border: "1px solid #334155",
          borderRadius: 10,
        }}>
          <div style={{
            width: 40,
            height: 40,
            border: "3px solid #334155",
            borderTop: "3px solid #3b82f6",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <div style={{ marginTop: 16, fontSize: 14, fontWeight: 500, color: "#94a3b8" }}>Rapport wordt gegenereerd...</div>
          <div style={{ marginTop: 6, fontSize: 12, color: "#64748b" }}>Metingen worden uitgelezen en geanalyseerd</div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {reports.map((pack) => {
          const cfg = SCORE_CONFIG[pack.score];
          return (
            <div
              key={pack.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "16px 20px",
                background: "#1e293b",
                border: "1px solid #334155",
                borderRadius: 10,
              }}
            >
              <span
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  background: cfg.bg,
                  border: `1.5px solid ${cfg.color}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  fontWeight: 800,
                  color: cfg.color,
                  flexShrink: 0,
                }}
              >
                {pack.score}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#f1f5f9" }}>{pack.name}</div>
              </div>
              <div style={{ fontSize: 12, color: "#64748b", flexShrink: 0, textAlign: "right", minWidth: 100 }}>
                {pack.generatedAt.split(" ")[0]}
              </div>
              <button
                style={{ ...styles.cardButton, flexShrink: 0, margin: 0 }}
                onClick={() => setSelectedPack(pack)}
              >
                Toon Rapport
              </button>
              <button
                style={{ ...styles.cardButton, flexShrink: 0, margin: 0 }}
                onClick={() => generatePDF(pack)}
                title="Download PDF"
              >
                📄 PDF
              </button>
            </div>
          );
        })}
      </div>

      <div style={{ position: "relative", marginTop: 28 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={handleGenerate}
            disabled={loading}
            style={{
              flex: 1,
              padding: "14px 0",
              fontSize: 15,
              fontWeight: 600,
              border: "none",
              borderRadius: 8,
              background: loading ? "#334155" : "linear-gradient(135deg, #3b82f6, #2563eb)",
              color: loading ? "#64748b" : "#fff",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.2s",
            }}
          >
            {loading ? "Bezig met genereren..." : "Genereer Rapport"}
          </button>
          <button
            onClick={() => setShowInfo((prev) => !prev)}
            style={{
              width: 46,
              height: 46,
              borderRadius: 8,
              border: "1.5px solid #334155",
              background: showInfo ? "rgba(59,130,246,0.15)" : "#1e293b",
              color: showInfo ? "#60a5fa" : "#94a3b8",
              fontSize: 18,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "all 0.15s",
            }}
          >
            ?
          </button>
        </div>

        {showInfo && (
          <div style={{
            marginTop: 10,
            padding: "16px 20px",
            background: "#1e293b",
            border: "1px solid #334155",
            borderRadius: 10,
            fontSize: 13,
            color: "#cbd5e1",
            lineHeight: 1.7,
          }}>
            <div style={{ fontWeight: 600, color: "#f1f5f9", marginBottom: 8 }}>Hoe werkt rapport genereren?</div>
            Door op deze knop te klikken worden de volgende stappen uitgevoerd:
            <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ display: "flex", gap: 10 }}>
                <span style={{ color: "#3b82f6", fontWeight: 700, flexShrink: 0 }}>a)</span>
                <span>Het algoritme leest de map uit waar de metingen in staan opgeslagen.</span>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <span style={{ color: "#3b82f6", fontWeight: 700, flexShrink: 0 }}>b)</span>
                <span>Het algoritme analyseert de data en genereert een score.</span>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <span style={{ color: "#3b82f6", fontWeight: 700, flexShrink: 0 }}>c)</span>
                <span>Het rapport wordt voorbereid.</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const AVAILABLE_BATTERIES = [
  { id: "BAT-001", name: "Samsung SDI NMC 811", chemistry: "NMC 811", voltage: 3.7, capacity: 94, manufacturer: "Samsung SDI", addedAt: "20-02-2026 09:14" },
  { id: "BAT-002", name: "CATL LFP Prismatic", chemistry: "LFP", voltage: 3.2, capacity: 280, manufacturer: "CATL", addedAt: "20-02-2026 10:32" },
  { id: "BAT-003", name: "LG Energy NMC 622", chemistry: "NMC 622", voltage: 3.6, capacity: 65, manufacturer: "LG Energy", addedAt: "21-02-2026 08:45" },
  { id: "BAT-004", name: "BYD Blade LFP", chemistry: "LFP", voltage: 3.2, capacity: 138, manufacturer: "BYD", addedAt: "21-02-2026 11:20" },
  { id: "BAT-005", name: "Panasonic NCA 2170", chemistry: "NCA", voltage: 3.6, capacity: 50, manufacturer: "Panasonic", addedAt: "22-02-2026 13:05" },
  { id: "BAT-006", name: "Samsung SDI NMC 622", chemistry: "NMC 622", voltage: 3.6, capacity: 78, manufacturer: "Samsung SDI", addedAt: "22-02-2026 14:50" },
  { id: "BAT-007", name: "EVE Energy LFP", chemistry: "LFP", voltage: 3.2, capacity: 304, manufacturer: "EVE Energy", addedAt: "23-02-2026 09:30" },
  { id: "BAT-008", name: "CATL NMC 811", chemistry: "NMC 811", voltage: 3.7, capacity: 117, manufacturer: "CATL", addedAt: "23-02-2026 16:15" },
];

function analyzeCombo(selected, batteryList) {
  const source = batteryList || AVAILABLE_BATTERIES;
  const batteries = selected.map((id) => source.find((b) => b.id === id));
  const chemistries = [...new Set(batteries.map((b) => b.chemistry))];
  const voltages = [...new Set(batteries.map((b) => b.voltage))];
  const capacities = batteries.map((b) => b.capacity);

  const warnings = [];
  let compatible = true;

  if (chemistries.length > 1) {
    warnings.push({ level: "error", message: `Verschillende chemieën gedetecteerd (${chemistries.join(", ")}). Het combineren van verschillende chemieën is sterk afgeraden vanwege verschil in ontlaadkarakteristieken en veiligheidsrisico's.` });
    compatible = false;
  }
  if (voltages.length > 1) {
    warnings.push({ level: "error", message: `Verschillende celspanningen (${voltages.map((v) => v + "V").join(", ")}). Parallelle aansluiting vereist gelijke spanning om circulatiestromen te voorkomen.` });
    compatible = false;
  }
  const maxCap = Math.max(...capacities);
  const minCap = Math.min(...capacities);
  if (maxCap / minCap > 1.3 && compatible) {
    warnings.push({ level: "warning", message: `Capaciteitsverschil van ${((maxCap / minCap - 1) * 100).toFixed(0)}% gedetecteerd. Bij serie-aansluiting beperkt de kleinste cel de totale capaciteit. Overweeg cellen met gelijkere capaciteit.` });
  }
  if (batteries.length > 6) {
    warnings.push({ level: "warning", message: "Groot aantal cellen geselecteerd. Zorg voor adequate Battery Management System (BMS) capaciteit." });
  }
  if (compatible && warnings.filter((w) => w.level === "warning").length === 0) {
    warnings.push({ level: "success", message: "Alle geselecteerde cellen zijn compatibel. Goede combinatie voor zowel serie- als parallelschakeling." });
  }

  const seriesVoltage = batteries.reduce((s, b) => s + b.voltage, 0);
  const seriesCapacity = minCap;
  const parallelVoltage = batteries[0].voltage;
  const parallelCapacity = capacities.reduce((s, c) => s + c, 0);

  const recommendation = compatible
    ? capacities.every((c) => c === capacities[0])
      ? "both"
      : "parallel"
    : "none";

  return { batteries, warnings, compatible, seriesVoltage, seriesCapacity, parallelVoltage, parallelCapacity, recommendation };
}

function ConfigSchema({ batteries, mode }) {
  const count = batteries.length;
  const isSeries = mode === "series";
  const cellW = 56;
  const cellH = 32;
  const gap = isSeries ? 12 : 20;

  if (isSeries) {
    const totalW = count * cellW + (count - 1) * gap + 60;
    const h = 100;
    return (
      <svg width={totalW} height={h} viewBox={`0 0 ${totalW} ${h}`} style={{ maxWidth: "100%" }}>
        {batteries.map((b, i) => {
          const x = 30 + i * (cellW + gap);
          const y = (h - cellH) / 2;
          return (
            <g key={b.id}>
              <rect x={x} y={y} width={cellW} height={cellH} rx={4} fill="rgba(59,130,246,0.15)" stroke="#3b82f6" strokeWidth={1.5} />
              <text x={x + cellW / 2} y={y + cellH / 2 + 1} textAnchor="middle" dominantBaseline="middle" fill="#60a5fa" fontSize={10} fontWeight={600}>
                {b.voltage}V
              </text>
              <text x={x + cellW / 2} y={y + cellH + 14} textAnchor="middle" fill="#64748b" fontSize={9}>
                {b.capacity}Ah
              </text>
              {i < count - 1 && <line x1={x + cellW} y1={h / 2} x2={x + cellW + gap} y2={h / 2} stroke="#475569" strokeWidth={2} />}
            </g>
          );
        })}
        <line x1={10} y1={h / 2} x2={30} y2={h / 2} stroke="#ef4444" strokeWidth={2} />
        <text x={6} y={h / 2 - 8} fill="#ef4444" fontSize={12} fontWeight={700}>+</text>
        <line x1={30 + count * cellW + (count - 1) * gap} y1={h / 2} x2={30 + count * cellW + (count - 1) * gap + 20} y2={h / 2} stroke="#3b82f6" strokeWidth={2} />
        <text x={30 + count * cellW + (count - 1) * gap + 16} y={h / 2 - 8} fill="#3b82f6" fontSize={12} fontWeight={700}>−</text>
      </svg>
    );
  }

  const totalH = count * (cellH + gap) - gap + 60;
  const w = 160;
  return (
    <svg width={w} height={totalH} viewBox={`0 0 ${w} ${totalH}`} style={{ maxWidth: "100%" }}>
      {batteries.map((b, i) => {
        const x = (w - cellW) / 2;
        const y = 30 + i * (cellH + gap);
        return (
          <g key={b.id}>
            <rect x={x} y={y} width={cellW} height={cellH} rx={4} fill="rgba(34,197,94,0.15)" stroke="#22c55e" strokeWidth={1.5} />
            <text x={x + cellW / 2} y={y + cellH / 2 + 1} textAnchor="middle" dominantBaseline="middle" fill="#4ade80" fontSize={10} fontWeight={600}>
              {b.capacity}Ah
            </text>
            <line x1={x - 20} y1={y + cellH / 2} x2={x} y2={y + cellH / 2} stroke="#475569" strokeWidth={1.5} />
            <line x1={x + cellW} y1={y + cellH / 2} x2={x + cellW + 20} y2={y + cellH / 2} stroke="#475569" strokeWidth={1.5} />
          </g>
        );
      })}
      <line x1={(w - cellW) / 2 - 20} y1={30 + cellH / 2} x2={(w - cellW) / 2 - 20} y2={30 + (count - 1) * (cellH + gap) + cellH / 2} stroke="#475569" strokeWidth={1.5} />
      <line x1={(w + cellW) / 2 + 20} y1={30 + cellH / 2} x2={(w + cellW) / 2 + 20} y2={30 + (count - 1) * (cellH + gap) + cellH / 2} stroke="#475569" strokeWidth={1.5} />
      <line x1={(w - cellW) / 2 - 20} y1={30 + cellH / 2} x2={(w - cellW) / 2 - 40} y2={30 + cellH / 2} stroke="#ef4444" strokeWidth={2} />
      <text x={(w - cellW) / 2 - 48} y={30 + cellH / 2 + 4} fill="#ef4444" fontSize={12} fontWeight={700}>+</text>
      <line x1={(w + cellW) / 2 + 20} y1={30 + cellH / 2} x2={(w + cellW) / 2 + 40} y2={30 + cellH / 2} stroke="#3b82f6" strokeWidth={2} />
      <text x={(w + cellW) / 2 + 42} y={30 + cellH / 2 + 4} fill="#3b82f6" fontSize={12} fontWeight={700}>−</text>
    </svg>
  );
}

const ONEDRIVE_MOCK_IMPORTS = [
  { name: "Toshiba SCiB LTO", chemistry: "LTO", voltage: 2.3, capacity: 20, manufacturer: "Toshiba" },
  { name: "CALB LFP Prismatic", chemistry: "LFP", voltage: 3.2, capacity: 230, manufacturer: "CALB" },
  { name: "Gotion NMC 811", chemistry: "NMC 811", voltage: 3.7, capacity: 105, manufacturer: "Gotion" },
  { name: "Lishen LFP Cylindrical", chemistry: "LFP", voltage: 3.2, capacity: 160, manufacturer: "Lishen" },
  { name: "SK On NMC 9½½", chemistry: "NMC 811", voltage: 3.7, capacity: 88, manufacturer: "SK On" },
];

function AdviesPage() {
  const [batteries, setBatteries] = useState(AVAILABLE_BATTERIES);
  const [selected, setSelected] = useState([]);
  const [result, setResult] = useState(null);
  const [expandedBat, setExpandedBat] = useState(null);
  const [importing, setImporting] = useState(false);
  const [importIndex, setImportIndex] = useState(0);

  const toggleBattery = (id) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    setResult(null);
  };

  const toggleExpand = (e, id) => {
    e.stopPropagation();
    setExpandedBat((prev) => (prev === id ? null : id));
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    setBatteries((prev) => prev.filter((b) => b.id !== id));
    setSelected((prev) => prev.filter((s) => s !== id));
    setExpandedBat((prev) => (prev === id ? null : prev));
    setResult(null);
  };

  const handleImportOneDrive = () => {
    if (importIndex >= ONEDRIVE_MOCK_IMPORTS.length) return;
    setImporting(true);
    // Simulate OneDrive fetch delay
    setTimeout(() => {
      const mock = ONEDRIVE_MOCK_IMPORTS[importIndex];
      const now = new Date();
      const newBat = {
        ...mock,
        id: `BAT-${Date.now()}`,
        addedAt: now.toLocaleString("nl-NL", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }),
      };
      setBatteries((prev) => [...prev, newBat]);
      setImportIndex((prev) => prev + 1);
      setImporting(false);
    }, 800);
  };

  const handleAnalyze = () => {
    if (selected.length < 2) return;
    const sel = selected.filter((id) => batteries.find((b) => b.id === id));
    setResult(analyzeCombo(sel, batteries));
  };

  const handleFindOptimal = () => {
    const groups = {};
    batteries.forEach((b) => {
      const key = `${b.chemistry}_${b.voltage}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(b);
    });

    let bestGroup = null;
    let bestScore = -1;
    Object.values(groups).forEach((group) => {
      if (group.length < 2) return;
      const caps = group.map((b) => b.capacity);
      const maxCap = Math.max(...caps);
      const minCap = Math.min(...caps);
      const uniformity = minCap / maxCap;
      const totalEnergy = group[0].voltage * caps.reduce((s, c) => s + c, 0);
      const score = group.length * 10 + uniformity * 50 + totalEnergy / 100;
      if (score > bestScore) {
        bestScore = score;
        bestGroup = group;
      }
    });

    if (bestGroup) {
      const ids = bestGroup.map((b) => b.id);
      setSelected(ids);
      setResult(analyzeCombo(ids, batteries));
    }
  };

  return (
    <div>
      <h2 style={styles.pageTitle}>Advies Batterijcombinaties</h2>
      <p style={styles.pageDescription}>
        Selecteer minimaal 2 batterijcellen om een combinatie-advies te ontvangen.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 24 }}>
        {batteries.map((bat) => {
          const isSelected = selected.includes(bat.id);
          const isExpanded = expandedBat === bat.id;
          return (
            <div key={bat.id}>
              <div
                onClick={() => toggleBattery(bat.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "14px 18px",
                  background: isSelected ? "rgba(59,130,246,0.1)" : "#1e293b",
                  border: `1.5px solid ${isSelected ? "#3b82f6" : "#334155"}`,
                  borderRadius: isExpanded ? "10px 10px 0 0" : 10,
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 5,
                    border: `2px solid ${isSelected ? "#3b82f6" : "#475569"}`,
                    background: isSelected ? "#3b82f6" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontSize: 13,
                    color: "#fff",
                    fontWeight: 700,
                  }}
                >
                  {isSelected && "✓"}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#f1f5f9" }}>{bat.name}</div>
                </div>
                <div style={{ fontSize: 12, color: "#64748b", flexShrink: 0, marginRight: 4 }}>
                  {bat.addedAt}
                </div>
                <span
                  onClick={(e) => handleDelete(e, bat.id)}
                  style={{ color: "#64748b", fontSize: 16, flexShrink: 0, padding: "4px 8px", borderRadius: 4, cursor: "pointer", transition: "color 0.15s" }}
                  title="Verwijder batterijcel"
                >
                  🗑
                </span>
                <span
                  onClick={(e) => toggleExpand(e, bat.id)}
                  style={{ color: "#64748b", fontSize: 13, flexShrink: 0, padding: "4px 8px", borderRadius: 4, cursor: "pointer" }}
                >
                  {isExpanded ? "▲" : "▼"}
                </span>
              </div>

              {isExpanded && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    padding: "16px 20px",
                    background: "#1e293b",
                    borderLeft: `1.5px solid ${isSelected ? "#3b82f6" : "#334155"}`,
                    borderRight: `1.5px solid ${isSelected ? "#3b82f6" : "#334155"}`,
                    borderBottom: `1.5px solid ${isSelected ? "#3b82f6" : "#334155"}`,
                    borderRadius: "0 0 10px 10px",
                  }}
                >
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div style={{ padding: "10px 14px", background: "#0f172a", borderRadius: 8 }}>
                      <div style={{ fontSize: 11, color: "#64748b", marginBottom: 2 }}>Fabrikant</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#f1f5f9" }}>{bat.manufacturer}</div>
                    </div>
                    <div style={{ padding: "10px 14px", background: "#0f172a", borderRadius: 8 }}>
                      <div style={{ fontSize: 11, color: "#64748b", marginBottom: 2 }}>Chemie</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#f1f5f9" }}>{bat.chemistry}</div>
                    </div>
                    <div style={{ padding: "10px 14px", background: "#0f172a", borderRadius: 8 }}>
                      <div style={{ fontSize: 11, color: "#64748b", marginBottom: 2 }}>Spanning</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#f1f5f9" }}>{bat.voltage}V</div>
                    </div>
                    <div style={{ padding: "10px 14px", background: "#0f172a", borderRadius: 8 }}>
                      <div style={{ fontSize: 11, color: "#64748b", marginBottom: 2 }}>Capaciteit</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#f1f5f9" }}>{bat.capacity}Ah</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button
        onClick={handleImportOneDrive}
        disabled={importing || importIndex >= ONEDRIVE_MOCK_IMPORTS.length}
        style={{
          width: "100%",
          padding: "14px 0",
          fontSize: 15,
          fontWeight: 600,
          border: "1.5px dashed #475569",
          borderRadius: 8,
          background: "transparent",
          color: importing ? "#64748b" : importIndex >= ONEDRIVE_MOCK_IMPORTS.length ? "#475569" : "#f1f5f9",
          cursor: importing || importIndex >= ONEDRIVE_MOCK_IMPORTS.length ? "not-allowed" : "pointer",
          transition: "all 0.2s",
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        <span style={{ fontSize: 18 }}>☁️</span>
        {importing ? "Importeren vanuit OneDrive..." : importIndex >= ONEDRIVE_MOCK_IMPORTS.length ? "Geen nieuwe cellen op OneDrive" : "Importeer nieuwe batterijcel vanuit OneDrive"}
      </button>

      <button
        onClick={handleAnalyze}
        disabled={selected.length < 2}
        style={{
          width: "100%",
          padding: "14px 0",
          fontSize: 15,
          fontWeight: 600,
          border: "none",
          borderRadius: 8,
          background: selected.length >= 2 ? "linear-gradient(135deg, #3b82f6, #2563eb)" : "#334155",
          color: selected.length >= 2 ? "#fff" : "#64748b",
          cursor: selected.length >= 2 ? "pointer" : "not-allowed",
          transition: "all 0.2s",
          marginBottom: 8,
        }}
      >
        Analyseer Combinatie ({selected.length} geselecteerd)
      </button>

      <button
        onClick={handleFindOptimal}
        style={{
          width: "100%",
          padding: "14px 0",
          fontSize: 15,
          fontWeight: 600,
          border: "1.5px solid #3b82f6",
          borderRadius: 8,
          background: "transparent",
          color: "#60a5fa",
          cursor: "pointer",
          transition: "all 0.2s",
          marginBottom: 32,
        }}
      >
        Geef Optimale Combinatie
      </button>

      {result && (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Warnings */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Compatibiliteitscheck</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
              {result.warnings.map((w, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 10,
                    padding: "10px 14px",
                    borderRadius: 8,
                    background:
                      w.level === "error" ? "rgba(239,68,68,0.08)" : w.level === "warning" ? "rgba(245,158,11,0.08)" : "rgba(34,197,94,0.08)",
                    border: `1px solid ${w.level === "error" ? "rgba(239,68,68,0.25)" : w.level === "warning" ? "rgba(245,158,11,0.25)" : "rgba(34,197,94,0.25)"}`,
                  }}
                >
                  <span style={{ flexShrink: 0, fontSize: 16 }}>
                    {w.level === "error" ? "⛔" : w.level === "warning" ? "⚠️" : "✅"}
                  </span>
                  <span style={{ fontSize: 13, color: "#cbd5e1", lineHeight: 1.5 }}>{w.message}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Optimal config */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div style={{ ...styles.card, opacity: result.compatible ? 1 : 0.4 }}>
              <h3 style={styles.cardTitle}>Serie-schakeling</h3>
              <div style={{ margin: "12px 0" }}>
                <ConfigSchema batteries={result.batteries} mode="series" />
              </div>
              <MetaRow label="Totale spanning" value={result.seriesVoltage.toFixed(1)} unit="V" />
              <MetaRow label="Capaciteit (beperkt)" value={result.seriesCapacity} unit="Ah" />
              <MetaRow label="Totaal vermogen" value={((result.seriesVoltage * result.seriesCapacity) / 1000).toFixed(2)} unit="kWh" />
              {!result.compatible && (
                <div style={{ fontSize: 12, color: "#ef4444", marginTop: 8 }}>Niet aanbevolen — zie waarschuwingen</div>
              )}
              {result.compatible && result.recommendation !== "parallel" && (
                <div style={{ fontSize: 12, color: "#22c55e", marginTop: 8, fontWeight: 600 }}>✓ Aanbevolen configuratie</div>
              )}
            </div>

            <div style={{ ...styles.card, opacity: result.compatible ? 1 : 0.4 }}>
              <h3 style={styles.cardTitle}>Parallel-schakeling</h3>
              <div style={{ margin: "12px 0", display: "flex", justifyContent: "center" }}>
                <ConfigSchema batteries={result.batteries} mode="parallel" />
              </div>
              <MetaRow label="Spanning" value={result.parallelVoltage.toFixed(1)} unit="V" />
              <MetaRow label="Totale capaciteit" value={result.parallelCapacity} unit="Ah" />
              <MetaRow label="Totaal vermogen" value={((result.parallelVoltage * result.parallelCapacity) / 1000).toFixed(2)} unit="kWh" />
              {!result.compatible && (
                <div style={{ fontSize: 12, color: "#ef4444", marginTop: 8 }}>Niet aanbevolen — zie waarschuwingen</div>
              )}
              {result.compatible && result.recommendation === "parallel" && (
                <div style={{ fontSize: 12, color: "#22c55e", marginTop: 8, fontWeight: 600 }}>✓ Aanbevolen configuratie bij ongelijke capaciteit</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const MAINTENANCE_STATUS = {
  good: { color: "#22c55e", bg: "rgba(34,197,94,0.12)", label: "Gezond", icon: "●" },
  warning: { color: "#f59e0b", bg: "rgba(245,158,11,0.12)", label: "Aandacht vereist", icon: "●" },
  critical: { color: "#ef4444", bg: "rgba(239,68,68,0.12)", label: "Kritiek", icon: "●" },
};

const MOCK_COMBINATIONS = [
  {
    id: "COMB-001",
    name: "Warehouse A — Hoofdopslag",
    cells: "16S4P CATL LFP 3.2V/280Ah",
    status: "good",
    soh: 96.3,
    nextMaintenance: "2026-06-15",
    cyclesRemaining: 3120,
    lastInspection: "2026-01-20",
    avgTemp: 27.4,
    alerts: 0,
    prediction: "Geen onderhoud nodig tot juni 2026. Stabiele degradatiecurve.",
  },
  {
    id: "COMB-002",
    name: "Warehouse B — Piekopvang",
    cells: "14S2P Samsung SDI NMC 811 3.7V/94Ah",
    status: "good",
    soh: 89.1,
    nextMaintenance: "2026-04-10",
    cyclesRemaining: 1840,
    lastInspection: "2026-02-01",
    avgTemp: 29.8,
    alerts: 0,
    prediction: "Normale slijtage. Volgende balancering over ~2 maanden.",
  },
  {
    id: "COMB-003",
    name: "Productielijn 1 — UPS Backup",
    cells: "12S3P BYD Blade LFP 3.2V/138Ah",
    status: "warning",
    soh: 74.2,
    nextMaintenance: "2026-03-05",
    cyclesRemaining: 680,
    lastInspection: "2026-01-15",
    avgTemp: 33.6,
    alerts: 2,
    prediction: "Verhoogde degradatie gedetecteerd in cel groep 3. Inspectie aanbevolen binnen 2 weken.",
  },
  {
    id: "COMB-004",
    name: "Laadstation Oost — EV Fleet",
    cells: "96S1P Panasonic NCA 2170 3.6V/50Ah",
    status: "warning",
    soh: 71.8,
    nextMaintenance: "2026-03-01",
    cyclesRemaining: 420,
    lastInspection: "2026-02-10",
    avgTemp: 35.2,
    alerts: 3,
    prediction: "Temperatuurpieken gedetecteerd bij snelladen. Koelsysteem controleren. Capaciteit nadert ondergrens voor betrouwbare operatie.",
  },
  {
    id: "COMB-005",
    name: "Noodstroomvoorziening Kantoor",
    cells: "8S6P LG Energy NMC 622 3.6V/65Ah",
    status: "critical",
    soh: 52.4,
    nextMaintenance: "Onmiddellijk",
    cyclesRemaining: 85,
    lastInspection: "2026-02-18",
    avgTemp: 38.9,
    alerts: 7,
    prediction: "Kritieke degradatie. Meerdere cellen onder 50% SoH. Vervanging van pack noodzakelijk. Risico op onverwachte uitval.",
  },
];

function PredictivePage() {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div>
      <h2 style={styles.pageTitle}>Predictive Maintenance</h2>
      <p style={styles.pageDescription}>
        Overzicht van batterijcombinaties en hun voorspelde onderhoudsstatus.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {MOCK_COMBINATIONS.map((combo) => {
          const st = MAINTENANCE_STATUS[combo.status];
          const isExpanded = expandedId === combo.id;
          return (
            <div key={combo.id}>
              <div
                onClick={() => setExpandedId(isExpanded ? null : combo.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "16px 20px",
                  background: "#1e293b",
                  border: `1px solid ${isExpanded ? st.color : "#334155"}`,
                  borderRadius: isExpanded ? "10px 10px 0 0" : 10,
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                <span style={{ color: st.color, fontSize: 20, flexShrink: 0 }}>{st.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "#f1f5f9" }}>{combo.name}</div>
                  <div style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>{combo.cells}</div>
                </div>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: st.color,
                    background: st.bg,
                    padding: "4px 12px",
                    borderRadius: 6,
                    flexShrink: 0,
                  }}
                >
                  {st.label}
                </span>
                <span style={{ color: "#64748b", fontSize: 13, flexShrink: 0, marginLeft: 4 }}>
                  {isExpanded ? "▲" : "▼"}
                </span>
              </div>

              {isExpanded && (
                <div
                  style={{
                    padding: "20px 24px",
                    background: "#1e293b",
                    borderLeft: `1px solid ${st.color}`,
                    borderRight: `1px solid ${st.color}`,
                    borderBottom: `1px solid ${st.color}`,
                    borderRadius: "0 0 10px 10px",
                  }}
                >
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                    <div style={{ padding: "12px 16px", background: "#0f172a", borderRadius: 8 }}>
                      <div style={{ fontSize: 12, color: "#64748b", marginBottom: 4 }}>State of Health</div>
                      <div style={{ fontSize: 22, fontWeight: 700, color: st.color }}>{combo.soh}%</div>
                    </div>
                    <div style={{ padding: "12px 16px", background: "#0f172a", borderRadius: 8 }}>
                      <div style={{ fontSize: 12, color: "#64748b", marginBottom: 4 }}>Resterende cycli</div>
                      <div style={{ fontSize: 22, fontWeight: 700, color: "#f1f5f9" }}>{combo.cyclesRemaining}</div>
                    </div>
                    <div style={{ padding: "12px 16px", background: "#0f172a", borderRadius: 8 }}>
                      <div style={{ fontSize: 12, color: "#64748b", marginBottom: 4 }}>Gem. temperatuur</div>
                      <div style={{ fontSize: 22, fontWeight: 700, color: "#f1f5f9" }}>{combo.avgTemp}°C</div>
                    </div>
                    <div style={{ padding: "12px 16px", background: "#0f172a", borderRadius: 8 }}>
                      <div style={{ fontSize: 12, color: "#64748b", marginBottom: 4 }}>Actieve alerts</div>
                      <div style={{ fontSize: 22, fontWeight: 700, color: combo.alerts > 0 ? "#f59e0b" : "#22c55e" }}>{combo.alerts}</div>
                    </div>
                  </div>
                  <MetaRow label="Volgend onderhoud" value={combo.nextMaintenance} />
                  <MetaRow label="Laatste inspectie" value={new Date(combo.lastInspection).toLocaleDateString("nl-NL")} />
                  <div style={{ marginTop: 16, padding: "12px 16px", background: st.bg, border: `1px solid ${st.color}30`, borderRadius: 8 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: st.color, marginBottom: 4 }}>Voorspelling</div>
                    <div style={{ fontSize: 13, color: "#cbd5e1", lineHeight: 1.6 }}>{combo.prediction}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const PAGE_COMPONENTS = {
  rapport: RapportPage,
  advies: AdviesPage,
  predictive: PredictivePage,
};

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState("rapport");

  if (!loggedIn) return <LoginPage onLogin={() => setLoggedIn(true)} />;

  const ActiveComponent = PAGE_COMPONENTS[activePage];

  return (
    <div style={styles.appContainer}>
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
        onLogout={() => setLoggedIn(false)}
      />
      <main style={styles.main}>
        <ActiveComponent />
      </main>
    </div>
  );
}

const styles = {
  /* Login */
  loginContainer: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
  },
  loginCard: {
    background: "#1e293b",
    border: "1px solid #334155",
    borderRadius: 16,
    padding: "48px 40px",
    width: 380,
    maxWidth: "90vw",
    boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
  },
  loginHeader: {
    textAlign: "center",
    marginBottom: 32,
  },
  logoMark: {
    fontSize: 40,
    marginBottom: 8,
  },
  loginTitle: {
    margin: 0,
    fontSize: 28,
    fontWeight: 700,
    color: "#f1f5f9",
    letterSpacing: "-0.02em",
  },
  loginSubtitle: {
    margin: "4px 0 0",
    fontSize: 14,
    color: "#94a3b8",
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    display: "block",
    fontSize: 13,
    fontWeight: 500,
    color: "#94a3b8",
    marginBottom: 6,
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    fontSize: 15,
    border: "1px solid #334155",
    borderRadius: 8,
    background: "#0f172a",
    color: "#f1f5f9",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  },
  error: {
    color: "#f87171",
    fontSize: 13,
    margin: "0 0 16px",
  },
  loginButton: {
    width: "100%",
    padding: "12px 0",
    fontSize: 15,
    fontWeight: 600,
    border: "none",
    borderRadius: 8,
    background: "linear-gradient(135deg, #3b82f6, #2563eb)",
    color: "#fff",
    cursor: "pointer",
    transition: "opacity 0.2s",
  },
  hint: {
    textAlign: "center",
    fontSize: 12,
    color: "#64748b",
    marginTop: 20,
    marginBottom: 0,
  },

  /* App layout */
  appContainer: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    background: "#0f172a",
    color: "#f1f5f9",
  },
  sidebar: {
    width: 260,
    background: "#1e293b",
    borderRight: "1px solid #334155",
    display: "flex",
    flexDirection: "column",
    padding: "24px 0",
    flexShrink: 0,
  },
  sidebarHeader: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "0 24px",
    marginBottom: 32,
  },
  sidebarLogo: {
    fontSize: 24,
  },
  sidebarTitle: {
    fontSize: 20,
    fontWeight: 700,
    letterSpacing: "-0.02em",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    padding: "0 12px",
    flex: 1,
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 16px",
    border: "none",
    borderRadius: 8,
    background: "transparent",
    color: "#94a3b8",
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    textAlign: "left",
    transition: "all 0.15s",
  },
  navItemActive: {
    background: "rgba(59, 130, 246, 0.15)",
    color: "#60a5fa",
  },
  navIcon: {
    fontSize: 18,
  },
  navLabel: {},
  logoutButton: {
    margin: "0 12px",
    padding: "10px 16px",
    border: "1px solid #334155",
    borderRadius: 8,
    background: "transparent",
    color: "#94a3b8",
    fontSize: 13,
    cursor: "pointer",
    transition: "all 0.15s",
  },

  /* Main content */
  main: {
    flex: 1,
    padding: "40px 48px",
    overflowY: "auto",
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: 700,
    margin: "0 0 8px",
    letterSpacing: "-0.02em",
  },
  pageDescription: {
    fontSize: 15,
    color: "#94a3b8",
    margin: "0 0 32px",
    maxWidth: 600,
    lineHeight: 1.6,
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 20,
  },
  card: {
    background: "#1e293b",
    border: "1px solid #334155",
    borderRadius: 12,
    padding: "28px 24px",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  cardTitle: {
    margin: 0,
    fontSize: 17,
    fontWeight: 600,
  },
  cardText: {
    margin: 0,
    fontSize: 14,
    color: "#94a3b8",
    lineHeight: 1.6,
    flex: 1,
  },
  cardButton: {
    alignSelf: "flex-start",
    padding: "8px 18px",
    fontSize: 13,
    fontWeight: 600,
    border: "1px solid #334155",
    borderRadius: 6,
    background: "transparent",
    color: "#60a5fa",
    cursor: "pointer",
    marginTop: 4,
    transition: "all 0.15s",
  },
};
