import { Product, Category, ToolConfig3D } from "./types";

export const CATEGORIES: Category[] = [
  {
    id: "sanitary",
    name: "Sanitary & Plumbing Items",
    slug: "sanitary",
    description: "Premium European & Italian style mixers, Grohe products, RAK Ceramics WCs, durable wash basins and plumbing essentials for contractors.",
    itemCount: 11,
    iconType: "ruler",
    accentColor: "bg-teal-500 text-white border-teal-500/20"
  },
  {
    id: "electrical",
    name: "Electric & Circulation Items",
    slug: "electrical",
    description: "High-grade LED Panel lights (60x60), ceiling air circulation fans, Philips fittings, PVC conduits, cable fittings and universal insulation wires.",
    itemCount: 10,
    iconType: "welder",
    accentColor: "bg-yellow-500 text-black border-yellow-500/20"
  },
  {
    id: "power-tools",
    name: "Stanley & HKH Power Tools",
    slug: "power-tools",
    description: "Heavy-duty grinders, Hilti high-performance rotary hammers, variable speed air blowers, and precision impact drills for mechanical workshops.",
    itemCount: 7,
    iconType: "drill",
    accentColor: "bg-orange-500 text-white border-orange-500/20"
  },
  {
    id: "hand-tools",
    name: "Professional Hand Tools",
    slug: "hand-tools",
    description: "Stanley hand tools, FatMax aviation snip cutters, high-speed riveting rivet guns, stapler guns, and high-impact steel measuring tapes.",
    itemCount: 4,
    iconType: "wrench",
    accentColor: "bg-amber-500 text-black border-amber-500/30"
  },
  {
    id: "building-materials",
    name: "Sealants, Paints & Compounds",
    slug: "building-materials",
    description: "National paint gloss and emulsion ranges, high-bonding epoxy floors, oil finishes, Dulux paints, premium Asmaco GP silicones, and Dr. Fixit PU sealants.",
    itemCount: 10,
    iconType: "shield",
    accentColor: "bg-blue-500 text-white border-blue-505/20"
  }
];

export const PRODUCTS: Product[] = [
  // ==================== SANITARY ITEMS ====================
  {
    id: "san-shower-mix-1",
    name: "Milano Premium Shower Mixer",
    model: "MLN-SM-404",
    category: "sanitary",
    brand: "Milano",
    description: "Premium heavy-brass chrome plated shower mixer faucet featuring advanced hot/cold water balancing, smooth ceramic disc valves, and acoustic decoupling properties.",
    iconType: "ruler",
    isFeatured: true,
    material: "Solid Brass Alloy / Chrome Finish",
    certification: "WRAS Approved, ISO 9001",
    popularityRating: 95,
    priceAED: 0
  },
  {
    id: "san-basin-mix-1",
    name: "Milano Luxury Basin Mixer",
    model: "MLN-BM-202",
    category: "sanitary",
    brand: "Milano",
    description: "Elegant single-lever basin mixer with water-saving aerated spout. Certified ceramic core prevents friction wear and ensures a lifetime of drip-free operation.",
    iconType: "ruler",
    isFeatured: false,
    material: "Satin DZR Brass / Polished Chrome",
    certification: "DIN EN 817 Compliance",
    popularityRating: 92,
    priceAED: 0
  },
  {
    id: "san-kitchen-mix-1",
    name: "Milano Flexible Sink Kitchen Mixer",
    model: "MLN-KM-303",
    category: "sanitary",
    brand: "Milano",
    description: "Premium deck-mounted kitchen faucet featuring a 360-degree flexible gooseneck spout, dual spray patterns (jet & shower), and quick-connect coupling system.",
    iconType: "ruler",
    isFeatured: true,
    material: "Braided SS304 Neck / Brass Core",
    certification: "CE Mechanical Standard",
    popularityRating: 97,
    priceAED: 0
  },
  {
    id: "san-wc-rak-floor",
    name: "RAK Ceramics Standing WC Suite",
    model: "RAK-WC-STD",
    category: "sanitary",
    brand: "RAK Ceramics",
    description: "Premium vitreous china floor-standing WC suite featuring a wash-down flushing system, dual-flush water-saving cistern (3L/6L), and soft-close ergonomic seat cover.",
    iconType: "ruler",
    isFeatured: true,
    material: "Vitreous China Glossy Glaze",
    certification: "ESMA Certified UAE Standard",
    popularityRating: 96,
    priceAED: 0
  },
  {
    id: "san-basin-rak-std",
    name: "RAK Ceramics Elegant Hand Basin",
    model: "RAK-HB-EL",
    category: "sanitary",
    brand: "RAK Ceramics",
    description: "Elegant wall-mounted ceramics vanity hand wash basin with integrated overflow hole and single standard faucet punch hole. Thick glaze minimizes scale buildup.",
    iconType: "ruler",
    isFeatured: false,
    material: "Vitreous Ceramic Composite",
    certification: "BS EN 14688 Approved",
    popularityRating: 89,
    priceAED: 0
  },
  {
    id: "san-wc-rak-rk",
    name: "RAK Ceramics RK Series WC Suite",
    model: "RAK-WC-RK9",
    category: "sanitary",
    brand: "RAK Ceramics",
    description: "Luxury premium back-to-wall close-coupled WC suite from the exclusive RK Series. Features rimless flushing tech, high-velocity dual jet nozzles, and concealed plumbing.",
    iconType: "ruler",
    isFeatured: true,
    material: "High-Strength Sanitized Vitreous Ceramics",
    certification: "EN 997 European Standard",
    popularityRating: 98,
    priceAED: 0
  },
  {
    id: "san-basin-rak-rk",
    name: "RAK Ceramics RK Wash Basin",
    model: "RAK-WB-RK9",
    category: "sanitary",
    brand: "RAK Ceramics",
    description: "Premium vanity-top counter-mounted wash basin from the RK Ceramics signature collection. Deep rectangular design with rounded splash-safe borders.",
    iconType: "ruler",
    isFeatured: false,
    material: "Dense Fine Fireclay Ceramics",
    certification: "ISO 14001, CE Certified",
    popularityRating: 91,
    priceAED: 0
  },
  {
    id: "san-milano-ext-bm",
    name: "Milano Classic High-Neck Basin Mixer",
    model: "MLN-HN-BM",
    category: "sanitary",
    brand: "Milano",
    description: "Extended long-pillar basin mixer tap designed specifically for table-top wash basins. Premium zinc shell with high durability ceramic cartridge.",
    iconType: "ruler",
    isFeatured: false,
    material: "Melt-Cast Brass / Brushed Gold Effect",
    certification: "DIN 4109 Noise Class I",
    popularityRating: 90,
    priceAED: 0
  },
  {
    id: "san-shower-mix-2",
    name: "Milano Double-Handle Shower Mixer",
    model: "MLN-DH-880",
    category: "sanitary",
    brand: "Milano",
    description: "Traditional dual knurled handle shower mixer for exact separate hot and cold adjustments. Full brass build ensures resistance to aggressive hard water.",
    iconType: "ruler",
    isFeatured: false,
    material: "Forged Yellow Brass / Mirror Chrome",
    certification: "UPC Approved Standard",
    popularityRating: 87,
    priceAED: 0
  },
  {
    id: "san-kitchen-mix-2",
    name: "Milano Gooseneck Kitchen Sink Mixer",
    model: "MLN-KGN-21",
    category: "sanitary",
    brand: "Milano",
    description: "Classic gooseneck shape sink mixer tap featuring an extra long reach spout, double O-ring seals, and smooth rotational joint.",
    iconType: "ruler",
    isFeatured: false,
    material: "Lead-Free Brass Inner / Electroplated Chrome",
    certification: "NSF/ANSI 61 Lead-Safe",
    popularityRating: 88,
    priceAED: 0
  },
  {
    id: "san-grohe-set",
    name: "Grohe Premium All-In-One Sanitary Suite",
    model: "GRH-SAN-990",
    category: "sanitary",
    brand: "Grohe All",
    description: "Consolidated developer pack from Grohe. Includes Tempesta shower set, Eurosmart basin mixer with EcoJoy 5.7 L/min speed reducer, and dynamic matching angle valves and waste traps.",
    iconType: "ruler",
    isFeatured: true,
    material: "Grohe StarLight Chrome / Solid German Brass",
    certification: "DVGW, WRAS, CE Standard",
    popularityRating: 99,
    priceAED: 0
  },

  // ==================== ELECTRICAL ITEMS ====================
  {
    id: "elec-led-panel-60x60",
    name: "Philips Pro LED Panel Light 60x60",
    model: "PHL-PL-6060",
    category: "electrical",
    brand: "Philips",
    description: "High-spec 40W architectural LED lay-in panel light (60x60cm). Features uniform glare-free diffused distribution, high lumen efficiency (120 lm/W), and active flicker-free electronic driver.",
    iconType: "welder",
    isFeatured: true,
    material: "Extruded Aluminum Frame / PMMA Diffuser",
    certification: "CB, CE, DEKRA, Emirates Quality Mark (EQM)",
    popularityRating: 98,
    priceAED: 0
  },
  {
    id: "elec-fan-60x60",
    name: "Centrifugal Ceiling Ventilation Fan 60x60",
    model: "NMQ-CF-6060",
    category: "electrical",
    brand: "NoorAlMaqdis-Premium",
    description: "High-velocity lay-in exhaust ceiling fan perfectly matching 60x60 panel slots. Includes heavy duty induction copper motor with thermal overload fuse protection.",
    iconType: "welder",
    isFeatured: true,
    material: "ABS Polymer Face / Galvanized Steel Body",
    certification: "SGS Safety Certified, SASO Approved",
    popularityRating: 95,
    priceAED: 0
  },
  {
    id: "elec-philips-fitt-led",
    name: "Philips Essential LED Batten Light Fitting",
    model: "PHL-LED-BATTEN",
    category: "electrical",
    brand: "Philips",
    description: "Integrated LED batten conduit luminaire with pre-wired internal brackets. Delivers optimal lumen output with a significant lifetime of up to 20,000 corporate hours.",
    iconType: "welder",
    isFeatured: false,
    material: "Flame-Retardant Polycarbonate Conduit",
    certification: "CE, RoHS Compliant",
    popularityRating: 91,
    priceAED: 0
  },
  {
    id: "elec-pvc-conduit-fitt",
    name: "PVC Conduit & Pipe Fittings Multi-Pack Bundle",
    model: "NMQ-PVC-FITT",
    category: "electrical",
    brand: "VETO",
    description: "Comprehensive commercial assortment pack including 20mm and 25mm PVC conduit adapters, bends, junction boxes, coupling joints, and saddle clamps.",
    iconType: "welder",
    isFeatured: false,
    material: "High-Impact Rigid U-PVC",
    certification: "BS 4607, ESMA Standard",
    popularityRating: 90,
    priceAED: 0
  },

  // ==================== POWER TOOLS ====================
  {
    id: "pow-stanley-grinder",
    name: "Stanley Professional Heavy Angle Grinder",
    model: "STN-SG-850",
    category: "power-tools",
    brand: "Stanley Power tools",
    description: "Highly robust 850W angle grinder with dense steel gears, 100/115mm disc capacity, toggle lock switch, and advanced thermal ventilation grids for metal fabrication.",
    iconType: "drill",
    isFeatured: true,
    material: "Cast Alloy Gearcase / High Glass Polyamide Shell",
    certification: "CE Approved, Intertek GS",
    popularityRating: 96,
    priceAED: 0
  },
  {
    id: "pow-hilti-hammer-drill",
    name: "Hilti TE-30 High-Performance SDS Rotary Hammer",
    model: "HLT-TE-30-AVR",
    category: "power-tools",
    brand: "Hilti",
    description: "Most powerful SDS rotary hammer in its class. Features Active Vibration Reduction (AVR), robust hammering action for steel reinforcement drilling, and slip mechanical safety clutch.",
    iconType: "drill",
    isFeatured: true,
    material: "Heavy Steel Alloy Drive / Vibration Isolation Housing",
    certification: "UL Safety Listed, OSHA Compliant",
    popularityRating: 99,
    priceAED: 0
  },
  {
    id: "pow-hilti-blower",
    name: "Hilti Heavy-Duty Industrial Air Dust Blower",
    model: "HLT-BL-180",
    category: "power-tools",
    brand: "Hilti",
    description: "Variable speed cordless industrial air blower suitable for clearing anchors, structural steel dust, and carpentry chips. Produces wind velocity up to 220 km/h.",
    iconType: "drill",
    isFeatured: false,
    material: "High-Impact Polyurethane Core",
    certification: "CE Compliant",
    popularityRating: 90,
    priceAED: 0
  },
  {
    id: "pow-hkh-hammer-sds",
    name: "HKH Professional Heavy-Duty SDS Rotary Hammer",
    model: "HKH-RH-900W",
    category: "power-tools",
    brand: "HKH power tools",
    description: "Heavy commercial 3-mode rotary hammer (drill, hammer, chisel) built specifically for intense concrete masonry drilling. Supplied with tough storage cases.",
    iconType: "drill",
    isFeatured: true,
    material: "High-Hardness Chrome Alloys / Anti-slip Grips",
    certification: "Emirates Quality Mark Tested",
    popularityRating: 94,
    priceAED: 0
  },
  {
    id: "pow-hkh-grinder-pro",
    name: "HKH Professional Angle Grinder",
    model: "HKH-AG-100",
    category: "power-tools",
    brand: "HKH power tools",
    description: "Authentic HKH 100mm angle grinder. Precision armature insulation provides exceptional durability under continuous slag removal and metallic grinding sessions.",
    iconType: "drill",
    isFeatured: false,
    material: "Steel Gear Face / Lightweight Thermoplastic",
    certification: "DIN/ISO 9002 Standard",
    popularityRating: 88,
    priceAED: 0
  },
  {
    id: "pow-hkh-blower-var",
    name: "HKH Variable Speed Industrial Air Blower",
    model: "HKH-BL-650",
    category: "power-tools",
    brand: "HKH power tools",
    description: "Dynamic air volume blower with lock button and dust extraction collection adapter. Ideal for workbench cleanups and electric wiring dust sweep.",
    iconType: "drill",
    isFeatured: false,
    material: "Polypropylene Stator / Copper Armature",
    certification: "CE Standard Electrical",
    popularityRating: 86,
    priceAED: 0
  },
  {
    id: "pow-hkh-impact-drill",
    name: "HKH Pro Speed Impact Hammer Drill",
    model: "HKH-ID-750",
    category: "power-tools",
    brand: "HKH power tools",
    description: "Dynamic variable impact drill with dual selector mode: standard rotation or hammering. Features steel chuck key and metal reverse bar limiters.",
    iconType: "drill",
    isFeatured: false,
    material: "Hardened Steel Geartrain / Rubberized Grip",
    certification: "TUV GS Safety Approved",
    popularityRating: 89,
    priceAED: 0
  },

  // ==================== HAND TOOLS ====================
  {
    id: "han-stanley-snip",
    name: "Stanley FatMax Aviation Snip Cutter",
    model: "STN-FM-14563",
    category: "hand-tools",
    brand: "Stanley Hand tools",
    description: "Highly durable drop-forged chrome molybdenum steel snip blade. Cuts up to 18-gauge cold-rolled carbon steel, featuring a comfortable bi-material spring-assisted handle.",
    iconType: "wrench",
    isFeatured: true,
    material: "Chrome Molybdenum Steel (Cr-Mo)",
    certification: "ANSI B107.11M Compliance",
    popularityRating: 97,
    priceAED: 0
  },
  {
    id: "han-riveter-gun",
    name: "Heavy Duty Carbon Steel Rabit Gun / Riveter",
    model: "NMQ-RG-44",
    category: "hand-tools",
    brand: "Stanley Hand tools",
    description: "Professional manual pop-rivet riveting gun. Built with structural steel limbs, high leverage comfort arms, and four interchangeable nozzle tips (2.4mm - 4.8mm).",
    iconType: "wrench",
    isFeatured: false,
    material: "Cast Steel Body / Cr-V Jaw Insert",
    certification: "DIN 7337 Approved Standard",
    popularityRating: 91,
    priceAED: 0
  },
  {
    id: "han-stapler-gun",
    name: "Professional Steel Hand Stapler Gun",
    model: "NMQ-SG-T50",
    category: "hand-tools",
    brand: "Stanley Hand tools",
    description: "Heavy duty rapid manual tacker stapler gun with visual re-load window. Features adjustable drive force depth and dynamic anti-jam technology.",
    iconType: "wrench",
    isFeatured: false,
    material: "Triple-Chrome Plated All-Steel Body",
    certification: "US Federal Specification",
    popularityRating: 90,
    priceAED: 0
  },
  {
    id: "han-stanley-tape",
    name: "Stanley Classic 5m Chrome Measuring Tape",
    model: "STN-MT-5M",
    category: "hand-tools",
    brand: "Stanley Hand tools",
    description: "Premium high-impact chrome cases measuring tape containing Tru-Zero hook systems and Mylar coating protecting scales against heavy corrosion and humidity.",
    iconType: "wrench",
    isFeatured: true,
    material: "Hard Carbon Steel Ribbon / ABS Shell",
    certification: "MID Class II Certifications",
    popularityRating: 94,
    priceAED: 0
  },

  // ==================== BUILDING MATERIALS & COUNDS ====================
  {
    id: "bld-asmaco-sil-clear",
    name: "Asmaco GP Silicone Sealant Clear",
    model: "ASM-GP-CLR",
    category: "building-materials",
    brand: "Silicon",
    description: "High quality structural GP acetic cure silicone sealant. Provides maximum seal elasticity, UV protection insulation, and long term thermal resistance for window and sanitary joints.",
    iconType: "shield",
    isFeatured: true,
    material: "100% Acetic Cure RTV Silicone Polymer",
    certification: "ASTM C-920, BS 5889",
    popularityRating: 98,
    priceAED: 0
  },
  {
    id: "bld-asmaco-gp-white",
    name: "Asmaco GP Universal Sealant White",
    model: "ASM-GP-WHT",
    category: "building-materials",
    brand: "GP asmaco",
    description: "General purpose architectural grade silicone sealant from Asmaco. Delivers seamless white waterproof barriers for wash basins and kitchen backsplashes.",
    iconType: "shield",
    isFeatured: false,
    material: "Flexible Siloxane Composition",
    certification: "ISO 11600 Compliance",
    popularityRating: 93,
    priceAED: 0
  },
  {
    id: "bld-fixit-liquid-waterproof",
    name: "Dr. Fixit Pidiproof LW+ Waterproofing Liquid",
    model: "FIX-LW-PEDI",
    category: "building-materials",
    brand: "Dr. Fixit",
    description: "Specially formulated concrete waterproofing admixture liquid. Dramatically reduces water permeability, prevents sand segregation and stops saltpetre attacks on wet concrete surfaces.",
    iconType: "shield",
    isFeatured: true,
    material: "Superplasticising Co-polymers",
    certification: "IS 2645 Quality Standards",
    popularityRating: 96,
    priceAED: 0
  },
  {
    id: "bld-fixit-pu-sealant",
    name: "Dr. Fixit Polyurethane PU Sealant",
    model: "FIX-PU-SEAL",
    category: "building-materials",
    brand: "Dr. Fixit pu sealant",
    description: "Professional high-performance polyurethane elastomeric sealant for joint gaps. Offers extreme bubble-free cure, excellent adhesion, and heavy load expansion resistance.",
    iconType: "shield",
    isFeatured: false,
    material: "Single Component Polyurethane Resin",
    certification: "ISO 11600 Class-25LM",
    popularityRating: 91,
    priceAED: 0
  },
  {
    id: "bld-dulux-exterior-paint",
    name: "Dulux WeatherShield Premium Exterior Paint",
    model: "DLX-WS-EXT",
    category: "building-materials",
    brand: "Dulux paint All products",
    description: "Highly defensive advanced exterior emulsion paint. Protects facades from salt-spray humidity, concrete micro-cracking, dynamic UV-fading, and dirt adhesion for up to 10 solid years.",
    iconType: "shield",
    isFeatured: true,
    material: "Acrylic Co-polymer Latex Dispersion",
    certification: "Green Label Singapore, ESMA Approved",
    popularityRating: 97,
    priceAED: 0
  },
  {
    id: "bld-wall-sealer-primer",
    name: "All-Purpose Acrylic Wall Sealer Primer Paint",
    model: "NMQ-WS-PRIME",
    category: "building-materials",
    brand: "Paint All Building materials",
    description: "Commercial binder water-proofing primer sealer for concrete drywall. Prevents moisture capillary action, improving top-coat paint coverage rate and finish quality.",
    iconType: "shield",
    isFeatured: false,
    material: "Waterborne Alkylic Compounds",
    certification: "ISO 12944 Protective Paint Standard",
    popularityRating: 88,
    priceAED: 0
  },
  {
    id: "bld-nat-paints-gloss",
    name: "National Paints Synthetic Gloss Enamel Paint",
    model: "NAT-SYN-GLS",
    category: "building-materials",
    brand: "National paint",
    description: "Premium high-grade synthetic gloss paint available in standard 10 kg and 7 kg sizes. Specializes in producing glossy hard protective films over wood structures and metal pipes.",
    iconType: "shield",
    isFeatured: true,
    material: "Premium Alkyd Resin Base / Solvents",
    certification: "Emirates Quality Seal (EQS)",
    popularityRating: 95,
    priceAED: 0
  },
  {
    id: "bld-nat-paint-emul",
    name: "National Paints Acrylic Emulsion Interior",
    model: "NAT-ACM-EMUL",
    category: "building-materials",
    brand: "National paint",
    description: "Odor-safe high-coverage waterborne emulsion wall paint. Forms rich, ultra-matte, washable, aesthetic layers over plaster, perfect for building projects.",
    iconType: "shield",
    isFeatured: false,
    material: "Acrylic Terpolymer Latex Emulsion",
    certification: "UAE VOC Compliance Approved",
    popularityRating: 91,
    priceAED: 0
  },
  {
    id: "bld-nat-paint-epoxy",
    name: "National Paints Industrial Self-Leveling Epoxy Flooring",
    model: "NAT-EPX-FLOOR",
    category: "building-materials",
    brand: "National paint",
    description: "Heavy load mechanical epoxy floor coating system. Forms dense, glossy, oil-resistant, seamlessly sanitizable resin matrices designed for workshops.",
    iconType: "shield",
    isFeatured: true,
    material: "Two-Pack Thermosetting Epoxy Polyamine Coating",
    certification: "ASTM D-4060 Taber Abrasion Resistant",
    popularityRating: 94,
    priceAED: 0
  },
  {
    id: "bld-nat-paint-oil",
    name: "National Paints Superior Oil Enamel Paint",
    model: "NAT-OIL-ENML",
    category: "building-materials",
    brand: "National paint",
    description: "Advanced defense oil enamel paint providing maximum rust protection on sheet metal ducts, steel tubes, and ventilation grills.",
    iconType: "shield",
    isFeatured: false,
    material: "Long-oil Alkyd Chemical Composite",
    certification: "DIN 55944 Paint Specification",
    popularityRating: 89,
    priceAED: 0
  }
];

export const TRUST_BRANDS = [
  { name: "MILANO", category: "Bathrooms & Sanitary", logoText: "Milano", color: "from-blue-600 to-cyan-800", rating: "★★★★★" },
  { name: "RAK CERAMICS", category: "Global Tile & Sanit", logoText: "RAK", color: "from-red-700 to-rose-900", rating: "★★★★★" },
  { name: "GROHE", category: "German Engineering", logoText: "GROHE", color: "from-slate-700 to-slate-900", rating: "★★★★★" },
  { name: "PHILIPS", category: "Architectural Lighting", logoText: "Philips", color: "from-blue-800 to-blue-950", rating: "★★★★★" },
  { name: "STANLEY", category: "Heavy Durability Hardware", logoText: "STANLEY", color: "from-yellow-400 to-amber-500", rating: "★★★★★" },
  { name: "HILTI", category: "Construction Drilling", logoText: "Hilti", color: "from-red-600 to-red-800", rating: "★★★★★" },
  { name: "HKH", category: "Dynamic Power Series", logoText: "HKH", color: "from-teal-600 to-teal-850", rating: "★★★★★" },
  { name: "ASMACO", category: "Professional Sealants", logoText: "Asmaco", color: "from-orange-500 to-orange-700", rating: "★★★★★" },
  { name: "DR. FIXIT", category: "Waterproofing Tech", logoText: "Dr.Fixit", color: "from-yellow-500 to-amber-600", rating: "★★★★★" },
  { name: "DULUX", category: "Weatherproof Coating", logoText: "Dulux", color: "from-purple-650 to-indigo-805", rating: "★★★★★" },
  { name: "NATIONAL PAINTS", category: "Protective Coatings", logoText: "NATIONAL", color: "from-blue-900 to-indigo-950", rating: "★★★★★" },
  { name: "VETO", category: "Electrical Specialties", logoText: "Veto", color: "from-sky-700 to-teal-800", rating: "★★★★★" }
];

export const BRANDS = TRUST_BRANDS;

// Interactive 3D Structural Simulator Configurations
export const INTERACTIVE_TOOLS_3D: ToolConfig3D[] = [
  {
    name: "Milano Luxury Basin Mixer",
    type: "sanitary",
    technicalSpecs: {
      "Structure Style": "Deck Mounted Monobloc",
      "Core Mechanicals": "35mm Ceramic Disc Cartridge",
      "Dynamic Variable": "Smooth Lever Handle Pivot",
      "Water Efficiency": "EcoJoy 5.7 L/min Aerator fitted"
    },
    parts: [
      {
        name: "Brass Base Stand Collar",
        color: "#c0c0c0", // Polished Silver Chrome
        translate: [0, -40, 0],
        rotate: [0, 0, 0],
        scale: [24, 15, 24],
        shape: "cylinder",
        radius: 12,
        height: 15,
        label: "Secure Deck Base: Threaded fastening interface housing twin flexible inlet supply tubes safely."
      },
      {
        name: "Main Mixer Faucet Column",
        color: "#d4d4d8", // Silver Chrome
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        scale: [18, 70, 18],
        shape: "cylinder",
        radius: 8,
        height: 70,
        label: "Heavy Forged Brass Faucet Pillar: Solid anti-corrosive column casting containing thermal mixing channels."
      },
      {
        name: "Horizontal Spout Projection",
        color: "#a1a1aa", // Chrome metal
        translate: [10, 26, 0],
        rotate: [0, 0, 90],
        scale: [12, 35, 12],
        shape: "cylinder",
        radius: 5,
        height: 35,
        label: "Sleek Faucet Spout: Outward water delivery arm terminating in a premium scale-resistant filter aerator."
      },
      {
        name: "Top Mixed Handle Lever",
        color: "#f59e0b", // Yellow Gold Lever contrast for interface
        translate: [-4, 34, 0],
        rotate: [0, 0, -15],
        scale: [6, 28, 12],
        shape: "box",
        label: "Interactive Lever Handle: Calibrates flow rate and exact temperature ratio by pivoting ceramic internals."
      }
    ]
  },
  {
    name: "Philips LED Panel Light 60x60",
    type: "electrical",
    technicalSpecs: {
      "Dimensioning": "595 x 595 x 11 mm Layout",
      "Luminous Efficiency": "120 Lumens per Watt rating",
      "Electronic Driver": "Flicker-Free Constant Current",
      "Diffusion Uniformity": "LGP Matrix over Light guide plates"
    },
    parts: [
      {
        name: "White Opal PMMA Diffuser Face",
        color: "#fcfefc", // Radiant opal white
        translate: [0, 0, -2],
        rotate: [0, 0, 0],
        scale: [120, 120, 4],
        shape: "box",
        label: "Opal PMMA Diffusing Lens: Distributes high brightness LEDs smoothly across workspace grids."
      },
      {
        name: "Extruded Aluminum Border Frame",
        color: "#fbbf24", // Yellow safety frame indicator
        translate: [0, 0, 1],
        rotate: [0, 0, 0],
        scale: [124, 124, 6],
        shape: "box",
        label: "Anodized Structural Frame: Provides structural rigidity while acting as an efficient heat sink for LEDs."
      },
      {
        name: "Constant-Current Driver Module",
        color: "#27272a", // Charcoal plastic box
        translate: [0, 20, 10],
        rotate: [0, 0, 0],
        scale: [24, 38, 14],
        shape: "box",
        label: "External Power Supply: Converts 220V grid AC current to flat safe isolated DC feed for LEDs."
      }
    ]
  },
  {
    name: "Hilti TE-30 Rotary Hammer",
    type: "power-tools",
    technicalSpecs: {
      "Operating Mechanism": "Electro-pneumatic hammering piston",
      "Revs Under Load": "0 - 1100 RPM variable speed",
      "Blow Rate Capacity": "0 - 4500 Blows per Minute (BPM)",
      "Vibration Shielding": "Active AVR recoil shock absorbing"
    },
    parts: [
      {
        name: "Rotary Motor Stator Body",
        color: "#e11d48", // Red Hilti finish
        translate: [-10, 0, 0],
        rotate: [0, 0, 0],
        scale: [38, 55, 38],
        shape: "box",
        label: "Copper-wound Performance Motor: Generates dual-axis torque and high airflow cooling."
      },
      {
        name: "Pistol Grip Shock Handle",
        color: "#18181b", // Black anti-grip
        translate: [-24, -34, 0],
        rotate: [0, 0, -25],
        scale: [15, 65, 18],
        shape: "box",
        label: "AVR Handle Sleeve: Rubberized ergonomic handle containing a shock damper mount to guard hands."
      },
      {
        name: "Heavy-Steel Gearbox Housing",
        color: "#52525b", // Metallic steel grey
        translate: [10, 8, 0],
        rotate: [0, 0, 0],
        scale: [28, 40, 28],
        shape: "cylinder",
        radius: 14,
        height: 40,
        label: "Heavy Sealed Transmission Box: Hardened steel transfer gears bathed in high pressure grease."
      },
      {
        name: "SDS-Plus Quick-Release Chuck",
        color: "#f59e0b", // Gold accented chuck
        translate: [32, 8, 0],
        rotate: [0, 90, 0],
        scale: [18, 30, 18],
        shape: "cylinder",
        radius: 9,
        height: 30,
        label: "SDS Plus Hammer Mandrel: Toolless sliding collar locks SDS masonry drill bits while transferring hammer shock."
      }
    ]
  },
  {
    name: "Stanley FatMax Aviation Snips",
    type: "hand-tools",
    technicalSpecs: {
      "Steel Hardness": "Sub-zero quenched Cr-Mo blades",
      "Leverage Mechanism": "Compound double pivot jointing",
      "Shearing Capacity": "18-Gauge metal sheets, 22G SS",
      "Return System": "Double torsion coiled handle spring"
    },
    parts: [
      {
        name: "Upper Forged Shear Jaw",
        color: "#4b5563", // Dark alloy metal
        translate: [0, 24, 2],
        rotate: [10, 0, 0],
        scale: [12, 36, 6],
        shape: "box",
        label: "Quenched Molybdenum Blade: Micro-serrated edge bites thin duct steel and prevents slipping during long cuts."
      },
      {
        name: "Lower Recessed Shear Jaw",
        color: "#6b7280", // Lighter steel
        translate: [2, 24, -2],
        rotate: [-10, 0, 0],
        scale: [12, 36, 6],
        shape: "box",
        label: "Matching Shear Blade: Polished bevel clearances form exact pinch points for zero jagged metal burrs."
      },
      {
        name: "Double Pivot Joint Plate",
        color: "#27272a", // Black support plate
        translate: [0, 3, 0],
        rotate: [0, 0, 0],
        scale: [24, 18, 10],
        shape: "box",
        label: "High-Strength Linkage Plates: Double compound hinges multiply wrist force by five times."
      },
      {
        name: "Symmetric Comfort Grip Handle",
        color: "#eab308", // Golden Yellow FatMax style grip
        translate: [0, -38, 0],
        rotate: [0, 0, 0],
        scale: [28, 65, 14],
        shape: "box",
        label: "Comfort Lever Sleeves: Curved rubberized non-slip limits with finger guards for ultimate work protection."
      }
    ]
  },
  {
    name: "Asmaco GP Silicone Sealant Tube",
    type: "building-materials",
    technicalSpecs: {
      "Elastomeric Capacity": "Over 250% longitudinal elongation",
      "Cure rate standard": "2-3mm deep vulcanization per 24hrs",
      "Temperature range": "Resists -20°C up to +120°C standard",
      "Acoustic damping": "Seals noise vibrations efficiently"
    },
    parts: [
      {
        name: "Aerosol Cylindrical Cartridge",
        color: "#ffffff", // Clean plastic white
        translate: [0, -10, 0],
        rotate: [0, 0, 0],
        scale: [26, 95, 26],
        shape: "cylinder",
        radius: 13,
        height: 95,
        label: "Resilient HDPE Tube Body: Holds pressurized acetic cure siloxane paste, completely airtight."
      },
      {
        name: "Calibrated Conical Spray Nozzle",
        color: "#f59e0b", // Translucent Amber plastic look
        translate: [0, 52, 0],
        rotate: [0, 0, 0],
        scale: [12, 28, 12],
        shape: "cylinder",
        radius: 6,
        height: 28,
        label: "Cuttable Plastic Applicator: Tapered design allows cutting at 45-degree angles to adjust bead thickness."
      },
      {
        name: "Plunger Force Disc",
        color: "#3f3f46", // Dark plunger
        translate: [0, -56, 0],
        rotate: [0, 0, 0],
        scale: [25, 4, 25],
        shape: "cylinder",
        radius: 12.5,
        height: 4,
        label: "Back Press Compression Plate: Receives sealant gun thrust to advance chemical mixture smoothly."
      }
    ]
  },
  {
    name: "Pedrollo CP 160 Centrifugal Pump",
    type: "water-pumps",
    technicalSpecs: {
      "Head Capacity": "30 - 56 meters dynamic head",
      "Flow Rate Volumetrics": "20 - 120 liters/minute flow rate",
      "Suction / Delivery port": "1.25 inch standard thread",
      "Motor rating": "1.5 HP Constant RPM duty induction motor"
    },
    parts: [
      {
        name: "Cast-Iron Volute Housing",
        color: "#1d4ed8", // Corporate blue
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        scale: [36, 40, 36],
        shape: "cylinder",
        radius: 18,
        height: 40,
        label: "Cast-Iron Volute Plate: Houses precision-balanced fluid impellers transferring motor force into pressure."
      },
      {
        name: "Induction Motor Body",
        color: "#27272a", // Charcoal metal
        translate: [0, -32, 0],
        rotate: [0, 0, 0],
        scale: [30, 48, 30],
        shape: "cylinder",
        radius: 15,
        height: 48,
        label: "Heavy Induction Stator Body: Encloses high-silicon wound winding coils producing reliable continuous action."
      },
      {
        name: "Top Discharge Outlet spout",
        color: "#1e40af", // Accent Dark Blue
        translate: [0, 16, 20],
        rotate: [0, 0, 0],
        scale: [14, 18, 14],
        shape: "cylinder",
        radius: 7,
        height: 18,
        label: "Dynamic Threaded Outlet: Channels energized liquids upwards directly to main structural piping loops."
      },
      {
        name: "Terminal Connection Safety Box",
        color: "#eab308", // Yellow accent
        translate: [0, -18, 16],
        rotate: [0, 0, 0],
        scale: [18, 12, 18],
        shape: "box",
        label: "Dustproof Electrical Junction Box: Encloses safety capacitors and terminal connecting blocks."
      }
    ]
  },
  {
    name: "Schneider Acti9 MCB 3-Pole 32A",
    type: "electrical",
    technicalSpecs: {
      "Current rating": "32 Amps continuous thermal limit",
      "Tripping Curve Class": "Type C magnetic bypass trigger",
      "Interrupting Capacity": "10 kA breaking capability rating",
      "Pole Configurations": "3 Pole, Triple modular distribution slot"
    },
    parts: [
      {
        name: "Polycarbonate Din-Rail Chassis",
        color: "#f4f4f5", // Light Schneider off-white
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        scale: [54, 75, 54],
        shape: "box",
        label: "Impact-Resistant Enclosure Frame: Flame-retardant socket structure designed for quick grid DIN installation."
      },
      {
        name: "Symmetric Triple Toggle Lever",
        color: "#dc2626", // Red toggle accent
        translate: [0, 14, 28],
        rotate: [0, 0, 0],
        scale: [38, 12, 14],
        shape: "box",
        label: "Manual Master Toggle Switch: Bridges and terminates load circuits instantly on all three poles."
      },
      {
        name: "High-Alloy Terminal Screws",
        color: "#4b5563", // Dark grey metal
        translate: [0, -32, -18],
        rotate: [0, 0, 0],
        scale: [46, 8, 8],
        shape: "box",
        label: "High Torque Terminal Terminals: Copper-alloy binding screws that prevent wire slippage."
      }
    ]
  },
  {
    name: "Heco Multi-Fix Hex Anchor Bolt",
    type: "fasteners",
    technicalSpecs: {
      "Material Tensile Limit": "Grade 8.8 structural cold forged metal",
      "Thread Type Designation": "Self-tapping concrete flute spiral lines",
      "Corrosion Protection": "Zinc plated galvanization shield",
      "Maximum Torque Load": "45 Nm structural drive ceiling"
    },
    parts: [
      {
        name: "Hexagonal Flanged Core Head",
        color: "#a1a1aa", // Shiny metal
        translate: [0, 36, 0],
        rotate: [0, 0, 0],
        scale: [22, 10, 22],
        shape: "cylinder",
        radius: 11,
        height: 10,
        label: "Hex Bolt Upper Drive Head: Allows high-torque wrench transmission during concrete installation."
      },
      {
        name: "Galvanized Flange Spacer Circle",
        color: "#d4d4d8", // Lighter steel 
        translate: [0, 26, 0],
        rotate: [0, 0, 0],
        scale: [28, 4, 28],
        shape: "cylinder",
        radius: 14,
        height: 4,
        label: "Structural Spacer Flange: Distributes downforces evenly along structural concrete anchor surfaces."
      },
      {
        name: "Tapping Screw Anchor Flute Shank",
        color: "#52525b", // Heavy steel
        translate: [0, -20, 0],
        rotate: [0, 0, 0],
        scale: [14, 75, 14],
        shape: "cylinder",
        radius: 7,
        height: 75,
        label: "Concrete Thread Flutes: Micro-grooved spiral shank taps directly into masonry walls."
      }
    ]
  },
  {
    name: "Kirloskar Self-Priming Jalraaj Pump",
    type: "water-pumps",
    technicalSpecs: {
      "Suction Head capacity": "Max 8 meters natural priming lift",
      "Motor specification": "99.9% pure copper wound inductive cylinder",
      "Impeller casting": "Industrial-grade forged brass impeller setup",
      "Thermal Insulation Class": "Class B thermal rating built in"
    },
    parts: [
      {
        name: "Impeller Water Chamber",
        color: "#16a34a", // Jalraaj Green
        translate: [0, 12, 0],
        rotate: [0, 0, 0],
        scale: [28, 28, 28],
        shape: "cylinder",
        radius: 14,
        height: 28,
        label: "Snail-Shell Impeller Bowl: Redirects centripetal velocity to output structural stream pressure."
      },
      {
        name: "Electric Induction Drive Stator",
        color: "#3f3f46", // Dark grey motor
        translate: [0, -28, 0],
        rotate: [0, 0, 0],
        scale: [24, 46, 24],
        shape: "cylinder",
        radius: 12,
        height: 46,
        label: "High Torque Coil Engine: Delivers uninterrupted rotation for continuous plumbing distribution."
      },
      {
        name: "Cast Brass Hose Connector Spout",
        color: "#eab308", // Golden Brass
        translate: [0, 26, 12],
        rotate: [0, 0, 0],
        scale: [10, 16, 10],
        shape: "cylinder",
        radius: 5,
        height: 16,
        label: "Threaded Faucet Connector: Connects directly with supply flanges."
      }
    ]
  },
  {
    name: "Clipsal 13A Wall Switch Socket",
    type: "electrical",
    technicalSpecs: {
      "Switch Capacity Limit": "13 Amps continuous load line",
      "Installation Depth": "Mounts onto standard 35mm gang backboxes",
      "Safety Features": "Sinking slide shuttle child-safe shutters",
      "Regulatory Code": "BS 1363 safety compliant"
    },
    parts: [
      {
        name: "White Thermoplastic Socket Plate",
        color: "#f8fafc", // Flat smooth white
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        scale: [86, 86, 6],
        shape: "box",
        label: "Unbreakable Polycarbonate Case: Scratch-resistant faceplate providing absolute safety isolation."
      },
      {
        name: "Symmetric Triple Pin Receptacles",
        color: "#18181b", // Deep cavity grey
        translate: [-18, 5, 2],
        rotate: [0, 0, 0],
        scale: [10, 16, 6],
        shape: "box",
        label: "Safety-Shuttered Socket Receptacles: Contacts open only when earth pins register correct insertions."
      },
      {
        name: "Manual Neon Indicator Panel",
        color: "#ef4444", // Red vibrant light
        translate: [22, -18, 3],
        rotate: [0, 0, 0],
        scale: [8, 8, 2],
        shape: "box",
        label: "Neon Power Status Bulb: Highlights when active continuous load channels feed inputs."
      }
    ]
  },
  {
    name: "Deco Premium Acrylic Paint Can",
    type: "paints-adhesives",
    technicalSpecs: {
      "Polymer Blend Foundation": "100% weather-resistant pure premium acrylic",
      "Average Surface Cover": "14 - 16 sq. meters fluid coverage",
      "VOC emission ceiling": "Environment friendly, ultra-low VOC emissions",
      "Reaction Drying Time": "Skins over under 30 minutes flat"
    },
    parts: [
      {
        name: "Metal Gallon Cylinder Cover",
        color: "#d4d4d8", // Silver metallic tin
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        scale: [56, 75, 56],
        shape: "cylinder",
        radius: 28,
        height: 75,
        label: "Spun Tinplate Metal Gallon: Premium reinforced container that prevents direct oxidation of paint components."
      },
      {
        name: "Product Design Gloss Wrap Logo",
        color: "#4f46e5", // Indigo design stripe wrapping
        translate: [0, 1, 1],
        rotate: [0, 0, 0],
        scale: [58, 50, 58],
        shape: "cylinder",
        radius: 29,
        height: 50,
        label: "Water-safe Product Label: States active chemical ingredients and surface application methods."
      },
      {
        name: "Galvanized Tension Handle Grip",
        color: "#71717a", // Dark wire handle
        translate: [0, 24, 29],
        rotate: [0, 0, 0],
        scale: [2, 35, 2],
        shape: "cylinder",
        radius: 1,
        height: 35,
        label: "Heavy Gauge Metal Wire Handle: Snaps onto lateral pivot flanges for comfortable manual product transportation."
      }
    ]
  },
  {
    name: "Dongcheng DSM-100A Angle Grinder",
    type: "power-tools",
    technicalSpecs: {
      "Motor Input Power": "850 Watts solid copper armature",
      "No-load Rated Speed": "13,000 RPM maximum rotation",
      "Wheel Diameter": "100 mm reinforced abrasive disc",
      "Spindle Thread Metric": "Standard M10 threaded locking arbor"
    },
    parts: [
      {
        name: "Slim Cylinder Motor Body",
        color: "#0284c7", // Famous Dongcheng sky blue
        translate: [-15, 0, 0],
        rotate: [0, 0, 0],
        scale: [32, 65, 32],
        shape: "cylinder",
        radius: 14,
        height: 65,
        label: "850W Heavy Armature Body: High temperature-resistant continuous winding with double insulation protection."
      },
      {
        name: "Steel Gear Head Casing",
        color: "#d4d4d8", // Silver zinc alloy head
        translate: [22, 0, 0],
        rotate: [0, 90, 0],
        scale: [24, 20, 24],
        shape: "cylinder",
        radius: 12,
        height: 20,
        label: "Alloy Steel Transmission Housing: Heavy-duty helical gears grease bath providing long operational span."
      },
      {
        name: "Abrasive Fibreglass Cutting Wheel",
        color: "#3f3f46", // Dark abrasive texture
        translate: [26, -10, 0],
        rotate: [90, 0, 0],
        scale: [42, 3, 42],
        shape: "cylinder",
        radius: 21,
        height: 3,
        label: "Resin-Bonded Disc: Double-reinforced fiberglass mesh slices masonry struts and carbon steels with perfect precision."
      },
      {
        name: "Anti-Sparks Steel Wheel Guard",
        color: "#18181b", // Charcoal safety guard
        translate: [26, -6, 0],
        rotate: [90, 0, 0],
        scale: [46, 5, 23], // Half shell projection
        shape: "box",
        label: "Adjustable Protective Shield: Directs flying metal swarf/sparks safely away from operating technicians' faces."
      },
      {
        name: "Threaded Auxiliary Grip Handle",
        color: "#27272a", // Ergonomic grip
        translate: [22, 0, 16],
        rotate: [0, 0, 90],
        scale: [10, 25, 10],
        shape: "cylinder",
        radius: 5,
        height: 25,
        label: "Two-Position Lateral Handle: Shock dampening polymer grip ensures maximum operator stability under heavy load cuts."
      }
    ]
  },
  {
    name: "SATA Professional Ratchet Socket Set",
    type: "hand-tools",
    technicalSpecs: {
      "Alloy Metallurgy": "Premium Chrome-Vanadium (Cr-V) steel",
      "Socket Dimensioning": "10mm to 32mm 1/2-inch square drive",
      "Ratchet Mechanicals": "72-Tooth quick-release reverse gear",
      "Finish Treatment": "Mirror chrome high-luster rustproofing"
    },
    parts: [
      {
        name: "Heavy-Duty Molded Organiser Case",
        color: "#14532d", // Famous SATA Forest Green color
        translate: [0, 0, -4],
        rotate: [0, 0, 0],
        scale: [92, 75, 12],
        shape: "box",
        label: "Organized Heavy Blow-Molded Case: Rugged resin outer skin containing snap-lock sockets prevent tool wear during site carriage."
      },
      {
        name: "72-Tooth Flushed Ratchet Shank",
        color: "#e4e4e7", // Mirror-polished chrome silver
        translate: [10, 12, 6],
        rotate: [0, 0, -10],
        scale: [12, 54, 8],
        shape: "cylinder",
        radius: 5,
        height: 54,
        label: "Chrome Vanadium (Cr-V) Ratchet Lever: Multi-tooth design permits a tight 5-degree swing arc for narrow workspace situations."
      },
      {
        name: "Bi-Hexagonal Socket Block",
        color: "#a1a1aa", // Knurled dark chrome socket
        translate: [-18, 12, 6],
        rotate: [0, 0, 0],
        scale: [20, 18, 20],
        shape: "cylinder",
        radius: 10,
        height: 18,
        label: "Impact-Rated 22mm Socket Element: High surface-contact spline avoids corner rounding on stubborn corporate fasteners."
      }
    ]
  }
];
