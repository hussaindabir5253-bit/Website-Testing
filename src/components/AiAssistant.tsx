import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { PRODUCTS, CATEGORIES } from "../data";
import { Product } from "../types";
import { Send, Sparkles, ShoppingCart, User, Cpu } from "lucide-react";

interface Message {
  role: "user" | "model";
  text: string;
  productIds?: string[];
}

interface AiAssistantProps {
  onAddToBasket: (product: Product) => void;
}

// Local knowledge base for deterministic responses - NO API required
const KNOWLEDGE_BASE: { keywords: string[]; response: string; productIds?: string[] }[] = [
  {
    keywords: ["milano", "basin", "mixer", "shower"],
    response: `**Milano Premium Sanitary Collection**

Our Milano line includes premium brass mixers with WRAS and DIN certifications:

- **Milano Premium Shower Mixer** (MLN-SM-404): Heavy-brass chrome plated with ceramic disc valves
- **Milano Luxury Basin Mixer** (MLN-BM-202): Single-lever with water-saving aerated spout
- **Milano Flexible Kitchen Mixer** (MLN-KM-303): 360-degree gooseneck with dual spray patterns

All Milano products feature solid DZR brass construction with polished chrome finish, certified to BS EN 817 standards.`,
    productIds: ["san-shower-mix-1", "san-basin-mix-1", "san-kitchen-mix-1"]
  },
  {
    keywords: ["rak", "ceramics", "wc", "toilet", "basin", "wash"],
    response: `**RAK Ceramics Collection**

RAK Ceramics offers premium vitreous china sanitary ware:

- **RAK WC Standing Suite** (RAK-WC-STD): Dual-flush 3L/6L, wash-down system
- **RAK RK Series WC** (RAK-WC-RK9): Rimless flushing with high-velocity dual jets
- **RAK Elegant Hand Basin** (RAK-HB-EL): Wall-mounted with integrated overflow

All RAK products are ESMA certified UAE Standard with vitreous ceramic glossy glaze finish.`,
    productIds: ["san-wc-rak-floor", "san-wc-rak-rk", "san-basin-rak-std"]
  },
  {
    keywords: ["philips", "led", "light", "panel", "lamp"],
    response: `**Philips LED Lighting Solutions**

Philips professional LED panels deliver exceptional efficiency:

- **Philips Pro LED Panel 60x60** (PHL-PL-6060): 40W, 120 lm/W efficiency
- **Philips Essential LED Batten** (PHL-LED-BATTEN): Up to 20,000 hours lifetime

Features include flicker-free electronic drivers, uniform diffused distribution, and CB/CE/DEKRA certifications with Emirates Quality Mark (EQM).`,
    productIds: ["elec-led-panel-60x60", "elec-philips-fitt-led"]
  },
  {
    keywords: ["hilti", "rotary", "hammer", "drill", "sds"],
    response: `**HILTI Power Tools**

HILTI represents the pinnacle of professional construction tools:

- **HILTI TE-30 SDS Rotary Hammer** (HLT-TE-30-AVR): Active Vibration Reduction (AVR), electro-pneumatic hammering piston
  - 0-1100 RPM, 0-4500 BPM
  - UL Safety Listed, OSHA Compliant
  - Features slip mechanical safety clutch for reinforcement drilling

- **HILTI Industrial Blower** (HLT-BL-180): Variable speed, 220 km/h wind velocity`,
    productIds: ["pow-hilti-hammer-drill", "pow-hilti-blower"]
  },
  {
    keywords: ["stanley", "angle", "grinder", "snip", "cutter", "fatmax"],
    response: `**Stanley Professional Tools**

Stanley provides trusted durability for industrial applications:

- **Stanley Heavy Angle Grinder** (STN-SG-850): 850W, 100mm disc capacity, thermal ventilation
- **Stanley FatMax Aviation Snip** (STN-FM-14563): Chrome Molybdenum (Cr-Mo) blades, cuts 18-gauge steel
- **Stanley 5m Chrome Measuring Tape** (STN-MT-5M): Mylar coating, Tru-Zero hook

Stanley tools carry ANSI compliance and Intertek GS certifications.`,
    productIds: ["pow-stanley-grinder", "han-stanley-snip", "han-stanley-tape"]
  },
  {
    keywords: ["asmaco", "silicone", "sealant", "rtv", "gp"],
    response: `**Asmaco Sealants**

Asmaco GP Silicone is a premium acetic-cure RTV sealant:

- **Asmaco GP Silicone Clear** (ASM-GP-CLR): 100% acetic cure, ASTM C-920 certified
- **Asmaco GP White** (ASM-GP-WHT): ISO 11600 compliant

Technical specs:
- Elongation: 250%+ longitudinal
- Temperature range: -20C to +120C
- Cure rate: 2-3mm depth per 24 hours

Ideal for window joints, sanitary applications, and thermal insulation.`,
    productIds: ["bld-asmaco-sil-clear", "bld-asmaco-gp-white"]
  },
  {
    keywords: ["dr", "fixit", "waterproof", "pidiproof", "pu"],
    response: `**Dr. Fixit Waterproofing Solutions**

Dr. Fixit offers professional-grade waterproofing:

- **Pidiproof LW+** (FIX-LW-PEDI): Concrete admixture, reduces permeability, IS 2645 certified
- **PU Sealant** (FIX-PU-SEAL): ISO 11600 Class-25LM, bubble-free cure

Applications:
- Basement waterproofing
- Roof and terrace protection
- Wet area sealing (bathrooms, kitchens)`,
    productIds: ["bld-fixit-liquid-waterproof", "bld-fixit-pu-sealant"]
  },
  {
    keywords: ["dulux", "paint", "exterior", "weathershield"],
    response: `**Dulux Premium Coatings**

Dulux WeatherShield provides long-lasting exterior protection:

- **Dulux WeatherShield Exterior** (DLX-WS-EXT): 10-year protection warranty
  - Salt-spray humidity resistant
  - UV-fade protection
  - Anti-dirt adhesion technology
  - Green Label Singapore, ESMA Approved`,
    productIds: ["bld-dulux-exterior-paint"]
  },
  {
    keywords: ["national", "paints", "gloss", "enamel", "epoxy", "floor"],
    response: `**National Paints Industrial Range**

National Paints offers comprehensive coating solutions:

- **Synthetic Gloss Enamel** (NAT-SYN-GLS): Alkyd resin, 7kg/10kg sizes
- **Acrylic Emulsion Interior** (NAT-ACM-EMUL): Waterborne, washable matte finish
- **Industrial Epoxy Flooring** (NAT-EPX-FLOOR): Two-pack thermosetting, abrasion resistant

All carry Emirates Quality Seal (EQS) certification.`,
    productIds: ["bld-nat-paints-gloss", "bld-nat-paint-emul", "bld-nat-paint-epoxy"]
  },
  {
    keywords: ["hkh", "power", "blower", "impact"],
    response: `**HKH Power Tools**

HKH delivers reliable power tools for commercial use:

- **HKH SDS Rotary Hammer** (HKH-RH-900W): 3-mode (drill/hammer/chisel)
- **HKH Angle Grinder** (HKH-AG-100): 100mm disc, precision armature insulation
- **HKH Variable Blower** (HKH-BL-650): Lock button, dust extraction adapter
- **HKH Impact Drill** (HKH-ID-750): Dual selector mode with steel chuck`,
    productIds: ["pow-hkh-hammer-sds", "pow-hkh-grinder-pro", "pow-hkh-blower-var"]
  },
  {
    keywords: ["grohe", "mixer", "shower", "german"],
    response: `**GROHE German Engineering**

GROHE represents premium German sanitary engineering:

- **GROHE All-In-One Suite** (GRH-SAN-990):
  - Tempesta shower set
  - Eurosmart basin mixer with EcoJoy 5.7 L/min
  - Dynamic matching angle valves and waste traps

Certifications: DVGW, WRAS, CE Standard`,
    productIds: ["san-grohe-set"]
  },
  {
    keywords: ["fastener", "bolt", "anchor", "screw", "hex", "tensile", "grade"],
    response: `**High-Tensile Fasteners and Anchors**

We supply premium structural fasteners:

**Wedge Anchors:**
- SS316 Marine Grade for seawater applications
- Hot-dip galvanized finish available

**Structural Bolts:**
- Grade 8.8 and 10.9 carbon steel alloy
- DIN/ISO certification available
- Material test reports on request

**Technical Notes:**
- Avoid coupling stainless steel (A4/316) with bare carbon steel in outdoor settings
- Galvanic potential difference causes accelerated corrosion
- Use hot-dip zinc insulation or matching stainless flanges`
  },
  {
    keywords: ["certification", "iso", "din", "certificate", "compliance", "test"],
    response: `**Certification and Compliance**

We provide comprehensive documentation:

**Available Certifications:**
- ISO 9001 Quality Management
- WRAS (Water Regulations Advisory Scheme)
- BS EN Standards
- ESMA UAE Certification
- DIN German Standards
- Mill Test Certificates for fasteners

**On Request:**
- SGS Testing Sheets
- ANSI Compliance Documents
- Material Composition Reports`
  },
  {
    keywords: ["delivery", "ship", "uae", "dubai", "abu dhabi", "sharjah", "logistics"],
    response: `**Delivery and Logistics**

**Coverage:**
- Sharjah (Same-day delivery available)
- Dubai (Next business day)
- Ajman (Next business day)
- Abu Dhabi (1-2 business days)

**Free Delivery:**
- Orders above AED 300: Free delivery
- Orders below AED 300: AED 50 delivery fee

**Warehouse Location:**
Muweileh Industrial Area 14, Near Fire Station Road, Sharjah`
  },
  {
    keywords: ["discount", "contractor", "wholesale", "price", "vip"],
    response: `**Wholesale Pricing and Discounts**

**Registered Client Discounts:**
- **Contractor**: 10% flat discount on all items
- **Workshop**: 5% member discount
- **Retail**: Standard pricing

**Registration Benefits:**
- Priority quotation processing
- Extended credit terms (approved clients)
- Custom bulk pricing negotiations

Register as a contractor to activate your immediate 10% discount!`
  },
  {
    keywords: ["rivet", "riveter", "pop", "gun"],
    response: `**Riveter and Fastening Tools**

We offer professional riveting solutions:

- **Heavy Duty Riveter Gun** (NMQ-RG-44): Structural steel limbs, high leverage, 2.4mm-4.8mm nozzle tips

Ideal for sheet metal work and structural panel fastening.`,
    productIds: ["han-riveter-gun"]
  },
  {
    keywords: ["stapler", "staple", "tacker", "t50"],
    response: `**Professional Stapling Tools**

- **Steel Hand Stapler Gun** (NMQ-SG-T50):
  - Rapid manual tacker with visual re-load window
  - Adjustable drive force depth
  - Dynamic anti-jam technology`,
    productIds: ["han-stapler-gun"]
  },
  {
    keywords: ["ventilation", "fan", "ceiling", "exhaust"],
    response: `**Ventilation Solutions**

- **Centrifugal Ceiling Fan 60x60** (NMQ-CF-6060):
  - Heavy duty induction copper motor
  - Thermal overload fuse protection
  - Perfectly matches 60x60 panel slots`,
    productIds: ["elec-fan-60x60"]
  },
  {
    keywords: ["conduit", "pvc", "pipe", "electrical", "junction"],
    response: `**Electrical Conduit Systems**

- **PVC Conduit and Fittings Bundle** (NMQ-PVC-FITT):
  - 20mm and 25mm conduit adapters
  - Bends, junction boxes, coupling joints
  - BS 4607, ESMA Standard certified`,
    productIds: ["elec-pvc-conduit-fitt"]
  }
];

const DEFAULT_RESPONSE = `I can help you with:

- **Product Specifications**: Ask about any brand or product model
- **Technical Data**: Material compositions, certifications, standards
- **Application Guidance**: Proper usage for marine, structural, or general applications
- **Pricing and Orders**: Wholesale terms, bulk discounts, delivery options

**Our Brands:** Milano, RAK Ceramics, GROHE, Philips, Stanley, HILTI, HKH, Asmaco, Dr. Fixit, Dulux, National Paints

Ask me anything about our product catalog or technical specifications!`;

function generateLocalResponse(query: string): { text: string; productIds: string[] } {
  const queryLower = query.toLowerCase();

  // Search knowledge base for matching keywords
  for (const entry of KNOWLEDGE_BASE) {
    const matchCount = entry.keywords.filter(kw => queryLower.includes(kw.toLowerCase())).length;
    if (matchCount >= 1) {
      return {
        text: entry.response,
        productIds: entry.productIds || []
      };
    }
  }

  // Check for product-specific queries
  const matchedProducts: Product[] = [];
  const queryWords = queryLower.split(' ').filter(w => w.length > 2);

  PRODUCTS.forEach(product => {
    const searchTerms = [product.name, product.model, product.brand, product.material].join(' ').toLowerCase();
    const hasMatch = queryWords.some(word => searchTerms.includes(word));
    if (hasMatch && matchedProducts.length < 3) {
      matchedProducts.push(product);
    }
  });

  if (matchedProducts.length > 0) {
    let response = `**Found ${matchedProducts.length} matching product(s):**\n\n`;
    matchedProducts.forEach(p => {
      response += `**${p.name}** (${p.model})\n`;
      response += `- Brand: ${p.brand}\n`;
      response += `- Material: ${p.material}\n`;
      if (p.certification) {
        response += `- Certification: ${p.certification}\n`;
      }
      response += `\n`;
    });
    return {
      text: response,
      productIds: matchedProducts.map(p => p.id)
    };
  }

  // Category query
  for (const cat of CATEGORIES) {
    if (queryLower.includes(cat.name.toLowerCase().split(' ')[0]) || queryLower.includes(cat.id)) {
      const categoryProducts = PRODUCTS.filter(p => p.category === cat.id);
      let response = `**${cat.name}**\n\n${cat.description}\n\nWe carry ${categoryProducts.length} items in this category.\n`;

      if (categoryProducts.length > 0) {
        response += `\n**Featured Items:**\n`;
        categoryProducts.slice(0, 3).forEach(p => {
          response += `- ${p.name} (${p.model})\n`;
        });
      }

      return {
        text: response,
        productIds: categoryProducts.slice(0, 3).map(p => p.id)
      };
    }
  }

  return { text: DEFAULT_RESPONSE, productIds: [] };
}

export default function AiAssistant({ onAddToBasket }: AiAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Hello! I am the **Noor Al Maqdis AI Technical Specialist**. I can help you select hardware specs, understand DIN/ANSI standards, or compile your Request for Quote (RFQ). Ask me any technical product queries!\n\n*I run locally in your browser - no API key required for instant responses.*",
      productIds: []
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const messageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll to the START of the assistant's response - CRITICAL FIX
  useEffect(() => {
    if (scrollRef.current && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === "model") {
        setTimeout(() => {
          const lastEl = messageRefs.current[messages.length - 1];
          if (lastEl && scrollRef.current) {
            // Scroll to the START of the response, NOT the bottom
            const containerRect = scrollRef.current.getBoundingClientRect();
            const elementRect = lastEl.getBoundingClientRect();
            const scrollOffset = elementRect.top - containerRect.top + scrollRef.current.scrollTop - 20;
            scrollRef.current.scrollTo({
              top: Math.max(0, scrollOffset),
              behavior: "smooth"
            });
          }
        }, 100);
      } else {
        // For user messages, scroll to bottom
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }
    }
  }, [messages]);

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMessage: Message = { role: "user", text: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Generate response locally (no API call)
    setTimeout(() => {
      const { text, productIds } = generateLocalResponse(textToSend);
      setMessages((prev) => [...prev, { role: "model", text, productIds }]);
    }, 200);
  };

  // Markdown renderer
  const renderMarkdown = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, lIdx) => {
      if (line.startsWith("### ")) {
        return <h4 key={lIdx} className="text-white font-bold text-sm mt-3 mb-1.5">{line.substring(4)}</h4>;
      }
      if (line.startsWith("## ")) {
        return <h3 key={lIdx} className="text-white font-bold text-base mt-4 mb-2 border-b border-slate-700 pb-1">{line.substring(3)}</h3>;
      }
      if (line.startsWith("- ")) {
        const content = formatLineText(line.substring(2));
        return <li key={lIdx} className="text-slate-300 text-xs ml-4 list-disc mb-1 leading-relaxed">{content}</li>;
      }
      if (line.startsWith("**") && line.endsWith("**") && !line.includes("*  ")) {
        return <p key={lIdx} className="text-yellow-400 font-bold text-xs mb-2">{line.slice(2, -2)}</p>;
      }
      if (!line.trim()) {
        return <div key={lIdx} className="h-2" />;
      }
      return <p key={lIdx} className="text-slate-300 text-xs mb-2 leading-relaxed">{formatLineText(line)}</p>;
    });
  };

  const formatLineText = (lineText: string) => {
    const parts = lineText.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, idx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={idx} className="text-yellow-400 font-bold">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return <code key={idx} className="bg-slate-700 text-slate-200 px-1.5 py-0.5 rounded font-mono text-[10px]">{part.slice(1, -1)}</code>;
      }
      return part;
    });
  };

  // Get products for last AI response
  const getLastProductIds = (): string[] => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === "model" && messages[i].productIds && messages[i].productIds!.length > 0) {
        return messages[i].productIds!;
      }
    }
    return [];
  };

  const matchedProducts = getLastProductIds()
    .map(id => PRODUCTS.find(p => p.id === id))
    .filter((p): p is Product => p !== undefined);

  const samplePromptChips = [
    { label: "Milano mixers?", prompt: "Tell me about Milano basin mixer features" },
    { label: "HILTI tools?", prompt: "What HILTI power tools do you stock?" },
    { label: "Stanley grinder?", prompt: "Stanley angle grinder specifications" },
    { label: "Waterproofing?", prompt: "Dr Fixit waterproofing solutions" }
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-sm flex flex-col h-[580px] relative">
      {/* Grid Pattern Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #475569 1px, transparent 1px), linear-gradient(to bottom, #475569 1px, transparent 1px)`,
          backgroundSize: '16px 16px'
        }}
      />

      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-yellow-400/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400 shadow-sm">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shrink-0" />
              <h4 className="font-sans font-black text-sm text-white uppercase leading-none">Noor Al Maqdis AI Engine</h4>
            </div>
            <p className="text-slate-400 text-[10px] font-mono uppercase tracking-wide mt-1.5 leading-none">
              Local Browser-Optimized Assistant
            </p>
          </div>
        </div>
        <div className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded border border-emerald-500/20">
          100% LOCAL
        </div>
      </div>

      {/* Scrollable messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-6 py-6 space-y-4 z-10"
      >
        {messages.map((msg, index) => {
          const isModel = msg.role === "model";
          const isLastModel = isModel && index === messages.length - 1;
          const showProducts = isLastModel && matchedProducts.length > 0;

          return (
            <div
              key={index}
              ref={(el) => { messageRefs.current[index] = el; }}
              className={`flex gap-3 max-w-[85%] ${
                isModel ? "mr-auto" : "ml-auto flex-row-reverse"
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                isModel
                  ? "bg-slate-800 border-slate-700 text-yellow-400"
                  : "bg-slate-700 border-transparent text-white"
              }`}>
                {isModel ? <Cpu className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              <div className="flex flex-col gap-2">
                <div className={`rounded-2xl px-4 py-3 border text-xs shadow-sm leading-relaxed ${
                  isModel
                    ? "bg-slate-800 border-slate-700 text-slate-100"
                    : "bg-yellow-400/10 border-yellow-400/20 text-slate-100"
                }`}>
                  {renderMarkdown(msg.text)}
                </div>

                {showProducts && (
                  <div className="flex flex-col gap-2 mt-1.5 pl-2 animate-fade-in">
                    <span className="font-mono text-[9px] text-yellow-400 uppercase tracking-widest font-bold">
                      Matching Products:
                    </span>
                    {matchedProducts.map((prod) => (
                      <div
                        key={prod.id}
                        className="bg-slate-800 border border-slate-700 rounded-xl p-3 flex items-center justify-between gap-3 shadow-sm hover:border-yellow-400/50 transition-all"
                      >
                        <div className="min-w-0">
                          <h5 className="font-sans font-black text-white text-[11px] uppercase truncate">{prod.name}</h5>
                          <p className="font-mono text-[9px] text-slate-400 mt-1">
                            {prod.brand} | {prod.model}
                          </p>
                        </div>
                        <button
                          onClick={() => onAddToBasket(prod)}
                          className="shrink-0 bg-slate-700 hover:bg-slate-600 text-white px-2.5 py-1.5 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                        >
                          <ShoppingCart className="w-3 h-3 text-yellow-400" />
                          <span>Add</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input controls */}
      <div className="bg-slate-900 border-t border-slate-800 p-4 z-10 space-y-3">
        {messages.length === 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1 max-w-full scrollbar-none">
            {samplePromptChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip.prompt)}
                className="shrink-0 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-[10px] font-mono text-slate-300 px-3 py-1.5 rounded-lg transition-all hover:text-white cursor-pointer shadow-sm"
              >
                {chip.label}
              </button>
            ))}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(inputValue);
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about products, specs, certifications..."
            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-yellow-400 transition-all font-sans shadow-inner"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer shadow-sm shrink-0"
          >
            <Send className="w-3.5 h-3.5 text-yellow-400" />
            <span className="hidden md:inline">Send</span>
          </button>
        </form>
      </div>
    </div>
  );
}
