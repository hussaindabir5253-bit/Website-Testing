import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

// Path for file-based inquiries database
const DB_FILE = path.join(process.cwd(), "inquiries_store.json");

// Helper to read database
function readInquiries(): any[] {
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

// Initialize inquiries database with mock data
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
            id: "pow-stanley-grinder",
            name: "Stanley Professional Heavy Angle Grinder",
            model: "STN-SG-850",
            category: "power-tools",
            brand: "Stanley Power tools",
            description: "Highly robust 850W angle grinder with dense steel gears.",
            iconType: "drill",
            material: "Cast Alloy Gearcase",
            popularityRating: 96
          },
          quantity: 2500,
          notes: "Need hot-dip galvanized finish."
        },
        {
          product: {
            id: "pow-hilti-hammer-drill",
            name: "Hilti TE-30 High-Performance SDS Rotary Hammer",
            model: "HLT-TE-30-AVR",
            category: "power-tools",
            brand: "Hilti",
            description: "Most powerful SDS rotary hammer in its class.",
            iconType: "drill",
            material: "Heavy Steel Alloy Drive",
            popularityRating: 99
          },
          quantity: 1200,
          notes: "Seawater application - S316 materials needed."
        }
      ],
      timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
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
      comments: "Request quote for welding equipment for our shipyard expansion project.",
      items: [
        {
          product: {
            id: "elec-led-panel-60x60",
            name: "Philips Pro LED Panel Light 60x60",
            model: "PHL-PL-6060",
            category: "electrical",
            brand: "Philips",
            description: "High-spec 40W architectural LED lay-in panel light.",
            iconType: "welder",
            material: "Extruded Aluminum Frame",
            popularityRating: 98
          },
          quantity: 15,
          notes: "Standard warranty support info requested."
        }
      ],
      timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
      status: "pending"
    }
  ]);
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
    inqs.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    res.json(inqs);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to load inquiries", details: error.message });
  }
});

// Save a new inquiry (RFQ basket)
app.post("/api/inquiries", (req, res) => {
  try {
    const { companyName, contactPerson, email, phone, projectDeadline, projectLocation, urgency, comments, items } = req.body;

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
    if (fs.existsSync(DB_FILE)) {
      fs.unlinkSync(DB_FILE);
    }
    res.json({ success: true, message: "Inquiry database reset successfully." });
  } catch (e) {
    res.json({ success: true, message: "No database to clear." });
  }
});

// AI Assistant endpoint - returns info that local AI is now used
app.post("/api/assistant/chat", (req, res) => {
  res.json({
    reply: "The AI assistant now runs 100% locally in your browser for instant responses. No server API calls are needed. Ask me about products, specifications, certifications, or applications!"
  });
});

// -----------------------------------------------------------------------------
// VITE AND ASSETS STATIC ROUTING
// -----------------------------------------------------------------------------

async function initializeServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting Noor Al Maqdis server in DEVELOPMENT MODE.");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting Noor Al Maqdis server in PRODUCTION MODE.");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`NOOR AL MAQDIS HARDWARE Server running at http://localhost:${PORT}`);
  });
}

initializeServer();
