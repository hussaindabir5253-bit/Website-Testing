import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Path for file-based inquiries database
const DB_FILE = path.join(process.cwd(), "inquiries_store.json");

// Helper to read database
function readInquiries() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error reading inquiries database file:", error);
  }
  return [];
}

// Helper to write database
function writeInquiries(data: any[]) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing inquiries to database file:", error);
  }
}

// Initialize inquiries database if empty
if (!fs.existsSync(DB_FILE)) {
  writeInquiries([
    {
      id: "inq-mock-1",
      companyName: "Al Marfaa Building Contracting LLC",
      contactPerson: "Eng. Tareq Al-Hussain",
      email: "tareq@almarfaa-const.ae",
      phone: "+971 50 123 4567",
      projectDeadline: "2026-08-15",
      projectLocation: "Deira Industrial Area 2, Dubai",
      urgency: "high",
      comments: "Need urgent high-tensile structural flange bolts for bridge substructure. Requesting material test report and ISO/DIN certifications.",
      items: [
        {
          product: {
            id: "fs-bolt-09",
            name: "High-Tensile Structural Heavy Hex Flange Bolt",
            model: "NMQ-FB-109",
            category: "fasteners-hardware",
            brand: "NoorAlMaqdis-Premium",
            description: "High tensile structural engineering bolts with built-in hexagonal flange interfaces.",
            iconType: "screw",
            material: "Grade 10.9 Medium Carbon Steel Alloy",
            popularityRating: 97,
            specs: [
              { label: "Thread Size", value: "M16 Pitch 2.0" },
              { label: "Tensile Strength", value: "1040 MPa minimum" }
            ]
          },
          quantity: 2500,
          notes: "Need hot-dip galvanized finish rather than standard black oxide if possible."
        },
        {
          product: {
            id: "fs-anchor-10",
            name: "Stainless Steel SS316 Heavy Wedge Anchor",
            model: "NMQ-WA-316",
            category: "fasteners-hardware",
            brand: "HILTI Structural",
            description: "Premium through-fixture metal expansion anchors.",
            iconType: "screw",
            material: "Marine Grade 316 Stainless Steel (A4)",
            popularityRating: 93,
            specs: [
              { label: "Anchor Diameter", value: "M12" },
              { label: "Embedment Depth", value: "85 mm" }
            ]
          },
          quantity: 1200,
          notes: "Seawater application - S316 is a hard mandate."
        }
      ],
      timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(), // 36 hours ago
      status: "reviewed"
    },
    {
      id: "inq-mock-2",
      companyName: "Emirates Steel Fabrication Co.",
      contactPerson: "Fatima Al-Mansoori",
      email: "procurement@emiratessteel-fab.ae",
      phone: "+971 4 888 9012",
      projectDeadline: "2026-06-30",
      projectLocation: "Mussafah ICAD I, Abu Dhabi",
      urgency: "medium",
      comments: "Request quote for welder inverter and auto darkening masks for our shipyard expansion project.",
      items: [
        {
          product: {
            id: "wl-welder-11",
            name: "IGBT Dual-Voltage Pro Inverter Arc Welder",
            model: "NMQ-MMA-200D",
            category: "welding-equipment",
            brand: "NoorAlMaqdis-Premium",
            description: "Advanced MMA/SMAW and lift TIG inverter welding appliance.",
            iconType: "welder",
            material: "Powder Coated Steel / Copper Core Transformer",
            popularityRating: 95,
            specs: [
              { label: "Output Current Range", value: "20 - 200 Amperes" }
            ]
          },
          quantity: 15,
          notes: "Standard warranty support info requested."
        }
      ],
      timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(), // 10 hours ago
      status: "pending"
    }
  ]);
}

// Lazy load Gemini API
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is not configured. Please add it in the secrets settings.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// -----------------------------------------------------------------------------
// API ENDPOINTS
// -----------------------------------------------------------------------------

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Retrieve all inquiries
app.get("/api/inquiries", (req, res) => {
  try {
    const inqs = readInquiries();
    // Sort youngest first
    inqs.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    res.json(inqs);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to load inquiries", details: error.message });
  }
});

// Save a new inquiry (RFQ basket)
app.post("/api/inquiries", (req, res) => {
  try {
    const {
      companyName,
      contactPerson,
      email,
      phone,
      projectDeadline,
      projectLocation,
      urgency,
      comments,
      items,
    } = req.body;

    if (!companyName || !contactPerson || !email || !phone || !items || !items.length) {
      return res.status(400).json({ error: "Missing required contact details or basket items." });
    }

    const newInquiry = {
      id: "inq-" + Math.random().toString(36).substr(2, 9),
      companyName,
      contactPerson,
      email,
      phone,
      projectDeadline: projectDeadline || "",
      projectLocation: projectLocation || "",
      urgency: urgency || "medium",
      comments: comments || "",
      items,
      timestamp: new Date().toISOString(),
      status: "pending"
    };

    const inqs = readInquiries();
    inqs.push(newInquiry);
    writeInquiries(inqs);

    res.status(201).json({ success: true, inquiry: newInquiry });
  } catch (error: any) {
    res.status(500).json({ error: "Failed to store inquiry", details: error.message });
  }
});

// Update inquiry status
app.patch("/api/inquiries/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !["pending", "reviewed", "approved", "completed"].includes(status)) {
      return res.status(400).json({ error: "Invalid status code value." });
    }

    const inqs = readInquiries();
    const index = inqs.findIndex((i: any) => i.id === id);

    if (index === -1) {
      return res.status(404).json({ error: "Inquiry not found." });
    }

    inqs[index].status = status;
    writeInquiries(inqs);

    res.json({ success: true, inquiry: inqs[index] });
  } catch (error: any) {
    res.status(500).json({ error: "Failed to update status", details: error.message });
  }
});

// Reset inquiries (Utility)
app.post("/api/inquiries/reset", (req, res) => {
  try {
    fs.unlinkSync(DB_FILE);
    res.json({ success: true, message: "Inquiry database reset successfully." });
  } catch (e) {
    res.json({ success: true, message: "No database to clear." });
  }
});

// intelligent AI assistant proxy
app.post("/api/assistant/chat", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message content cannot be blank." });
    }

    // Check if key is set
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "MY_GEMINI_API_KEY") {
      return res.json({
        reply: "Hello! I am **Noor Al Maqdis's AI Engineering Assistant**. Currently, my AI brain requires a Gemini API key to query deep industrial standards, ANSI/DIN parameters, and make technical catalog mapping calls.\n\n*To enable me instantly, please insert your personal Gemini API key in **Settings > Secrets** panel in the AI Studio environment.* \n\nIn the meantime, I can advise you standard mechanical engineering fundamentals: Chrome Vanadium Steel (Cr-V) is standard for spanners with high fatigue limit, while M35 Cobalt bits are superior for drilling high-grade stainless steels because cobalt prevents thermal friction annealing up to 600°C!"
      });
    }

    const client = getGeminiClient();

    const systemPrompt = `You are "AI Technical Engineering Specialist" for NOOR AL MAQDIS HARDWARE & ELECTRIC (A leading supplier associated with premium industrial equipment, sanitary mixers, RAK Ceramics WCs, Philips LEDs, Stanley power/hand tools, Hilti hammers, Asmaco silicone sealants, National Paints, and Dr. Fixit waterproofing).
Your job is to assist engineers, marine suppliers, construction contractors, purchasing managers, and general technicians with technical inquiries. Recommend matching products, materials, and technical specifications from our catalog.

CRITICAL INSTRUCTIONS FOR CONCISENESS & SPEED:
- Be extremely smart, direct, and efficient.
- Provide SHORT, PRECISE, and CONCISE answers (max 2 short paragraphs or 3-4 bullet points absolute maximum).
- Avoid fluff, excessive greetings, polite preambles, or general conversational filler. Resolve the user's inquiry with high-density technical accuracy instantly.

Our Product Catalog includes:
1. "Milano Premium Shower Mixer" (Model: MLN-SM-404, Brass, WRAS Approved)
2. "Milano Luxury Basin Mixer" (Model: MLN-BM-202, Chrome, Single lever)
3. "Milano Flexible Sink Kitchen Mixer" (Model: MLN-KM-303, Braided SS304)
4. "RAK Ceramics Standing WC Suite" (Model: RAK-WC-STD, Vitreous china, Dual flush)
5. "RAK Ceramics Elegant Hand Basin" (Model: RAK-HB-EL, Vitreous glazes)
6. "RAK Ceramics RK Series WC Suite" (Model: RAK-WC-RK9, Rimless, Rimless jet)
7. "RAK Ceramics RK Wash Basin" (Model: RAK-WB-RK9, Fireclay ceramics)
8. "Philips Pro LED Panel Light 60x60" (Model: PHL-PL-6060, 40W, 120 lm/W)
9. "Centrifugal Ceiling Ventilation Fan 60x60" (Model: NMQ-CF-6060, ABS Stator)
10. "Stanley Professional Heavy Angle Grinder" (Model: STN-SG-850, 850W, 100mm disc)
11. "Hilti TE-30 High-Performance SDS Rotary Hammer" (Model: HLT-TE-30-AVR, AVR dampening)
12. "Stanley FatMax Aviation Snip Cutter" (Model: STN-FM-14563, Cr-Mo blades)
13. "Asmaco GP Silicone Sealant Clear" (Model: ASM-GP-CLR, Acetic cure siloxane)
14. "Dr. Fixit Pidiproof LW+ Waterproofing Liquid" (Model: FIX-LW-PEDI, Admixture compound)
15. "Dr. Fixit Polyurethane PU Sealant" (Model: FIX-PU-SEAL, 25LM expansion)
16. "Dulux WeatherShield Premium Exterior Paint" (Model: DLX-WS-EXT, 10-yr latex)
17. "National Paints Synthetic Gloss Enamel Paint" (Model: NAT-SYN-GLS, Alkyd, 7kg/10kg)
18. "National Paints Industrial Self-Leveling Epoxy Flooring" (Model: NAT-EPX-FLOOR, 2-pack)

Refer explicitly to products from our catalog when relevant, and suggest adding them to their RFQ Inquiry Basket. Keep the tone professional, helpful, and highly accurate. Keep answers formatted in highly clean Markdown.`;

    // Package conversation history
    const contents: any[] = [];
    if (history && Array.isArray(history)) {
      history.forEach((msg: any) => {
        contents.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.text }]
        });
      });
    }
    contents.push({ role: "user", parts: [{ text: message }] });

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    const reply = response.text || "I was unable to complete the response. Please check back shortly.";
    res.json({ reply });
  } catch (error: any) {
    console.error("Gemini API assistant error:", error);
    res.json({
      reply: `I encountered an unexpected error when processing your intelligent assistance query. Let me respond locally: 

For stainless-steel fastener configurations, always avoid linking them to bare carbon steel in outdoor structural settings, as galvanic potential indices differ by over 0.15V, accelerating structural corrosion of the carbon flange plate. Recommend using hot-dip zinc insulation layer or selecting Stainless A4/316 matching flanges.

*(Technical Error details: ${error.message || "Unknown error contact system administrator"})*`
    });
  }
});


// -----------------------------------------------------------------------------
// VITE AND ASSETS STATIC ROUTING
// -----------------------------------------------------------------------------

async function initializeServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT MODE. Loading Vite dev middleware.");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION MODE. Serving static files.");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`NOOR AL MAQDIS HARDWARE Server boot. Running dynamically at http://localhost:${PORT}`);
  });
}

initializeServer();
