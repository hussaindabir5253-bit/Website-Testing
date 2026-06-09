import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PRODUCTS, CATEGORIES, TRUST_BRANDS } from "./data";
import { Product, QuoteItem, QuoteInquiry } from "./types";
import TechnicalSimulator3D from "./components/TechnicalSimulator3D";
import AiAssistant from "./components/AiAssistant";
import RfqForm from "./components/RfqForm";
import SuppliersDashboard from "./components/SuppliersDashboard";
import {
  Wrench,
  Flame,
  Search,
  ShoppingCart,
  Cpu,
  BadgeAlert,
  Sparkles,
  ClipboardList,
  Building2,
  HardHat,
  Scale,
  ChevronRight,
  ShieldCheck,
  Star,
  Info,
  Layers,
  FileText,
  ArrowUpRight,
  PackageCheck,
  Phone,
  Mail,
  MapPin,
  Clock,
  User,
  LogOut,
  Moon,
  Sun,
  Award,
  Plus,
  Minus,
  Trash2,
  ChevronDown,
  Briefcase,
  Sparkle,
  Check,
  BookOpen,
  Menu,
  Lock
} from "lucide-react";

export function NoorAlMaqdisLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg
      id="noor-maqdis-logo-svg"
      viewBox="0 0 100 100"
      className={`${className} filter drop-shadow-md select-none`}
    >
      <defs>
        <radialGradient id="sealGrad" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
          <stop offset="0%" stopColor="#4f46e5" />
          <stop offset="60%" stopColor="#1e1b4b" />
          <stop offset="100%" stopColor="#0f172a" />
        </radialGradient>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="50%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
      </defs>
      {/* Circle seal */}
      <circle cx="50" cy="50" r="48" fill="url(#sealGrad)" stroke="url(#goldGrad)" strokeWidth="3" />
      <circle cx="50" cy="50" r="44" fill="none" stroke="#000000" strokeWidth="1.2" opacity="0.3" />
      <circle cx="50" cy="50" r="43" fill="none" stroke="url(#goldGrad)" strokeWidth="0.8" opacity="0.75" />
      
      {/* Monogram letters N and H */}
      <g transform="translate(0, 2)">
        <text
          x="40"
          y="63"
          fontFamily="'Playfair Display', 'Georgia', 'Times New Roman', serif"
          fontSize="46"
          fontWeight="900"
          fill="#f9fafb"
          textAnchor="middle"
          style={{ textShadow: "1px 2px 4px rgba(0,0,0,0.6)" }}
        >
          N
        </text>
        <text
          x="58"
          y="69"
          fontFamily="'Playfair Display', 'Georgia', 'Times New Roman', serif"
          fontSize="35"
          fontWeight="800"
          fill="url(#goldGrad)"
          textAnchor="middle"
          style={{ textShadow: "2px 2px 5px rgba(0,0,0,0.7)" }}
        >
          H
        </text>
      </g>
    </svg>
  );
}

export function NoorAlMaqdisSectionFooter() {
  return (
    <div className="border-t border-slate-200/40 dark:border-slate-850 pt-8 mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono select-none">
      <div className="flex items-center gap-2.5">
        <NoorAlMaqdisLogo className="w-8 h-8 opacity-90 shrink-0" />
        <div className="text-left">
          <span className="font-sans font-black tracking-tight text-[11px] text-slate-850 dark:text-white uppercase block leading-none mb-0.5">
            NOOR AL MAQDIS HARDWARE & ELECTRIC
          </span>
          <span className="text-[9px] text-slate-450 dark:text-slate-550 font-bold uppercase tracking-widest block leading-none">
            ESTABLISHED 2007 • SHARJAH INDUSTRIAL AREA 14
          </span>
        </div>
      </div>
      <div className="text-[9px] uppercase tracking-wider text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-800/80 rounded-lg px-2.5 py-1 bg-slate-50 dark:bg-slate-900/40">
        Strictly adhering to ISO 9001 / DIN metrics tool specifications
      </div>
    </div>
  );
}

interface UserProfile {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  clientType: "contractor" | "workshop" | "retail" | "guest";
  isLoggedIn: boolean;
  tradeLicense?: string;
  shippingAddress?: string;
}

const renderBrandLogo = (brandName: string) => {
  // Use simple text-based branding instead of fake SVG logos
  const displayName = brandName.toUpperCase();
  return (
    <span className="font-sans font-black text-xs tracking-tight uppercase text-white">
      {displayName}
    </span>
  );
};

export default function App() {
  // Theme locked of the website as requested by the user
  const theme = "dark";

  // Navigation tab state
  const [activeTab, setActiveTab] = useState<
    "home" | "about" | "catalog" | "3d-lab" | "ai-chat" | "checkout" | "contact" | "auth" | "admin"
  >("home");

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMilestone, setActiveMilestone] = useState(3);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  
  // Shopping Cart state
  const [basket, setBasket] = useState<QuoteItem[]>([]);
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "shipping" | "receipt">("cart");
  const [createdReceipt, setCreatedReceipt] = useState<any>(null);
  const [checkoutTarget, setCheckoutTarget] = useState<"whatsapp" | "email">("whatsapp");

  // Secure Passcode authorization for proprietary ERP ledger
  const [erpPasscode, setErpPasscode] = useState("");
  const [isErpAuthenticated, setIsErpAuthenticated] = useState(false);
  const [erpAuthError, setErpAuthError] = useState("");

  // Authenticated State for User Accounts / Corporate client
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem("nmq-user");
    if (saved) return JSON.parse(saved);
    return {
      companyName: "",
      contactPerson: "",
      email: "",
      phone: "",
      clientType: "guest",
      isLoggedIn: false,
      tradeLicense: "",
      shippingAddress: ""
    };
  });

  const [menuOpen, setMenuOpen] = useState(false);

  // Login form controllers
  const [loginCompany, setLoginCompany] = useState("");
  const [loginPerson, setLoginPerson] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPhone, setLoginPhone] = useState("");
  const [loginType, setLoginType] = useState<"contractor" | "workshop" | "retail">("contractor");

  // Contact Us Map & Form State
  const [contactSubject, setContactSubject] = useState("Bulk Fastener Inquiry");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [selectedMapLandmark, setSelectedMapLandmark] = useState<"warehouse" | "firestation" | "mainroad">("warehouse");

  // Notification Alerts
  const [recentNotification, setRecentNotification] = useState<string | null>(null);

  // Write theme modifications
  useEffect(() => {
    localStorage.setItem("nmq-theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Persist user modifications
  useEffect(() => {
    localStorage.setItem("nmq-user", JSON.stringify(user));
  }, [user]);

  // Clear notify
  useEffect(() => {
    if (recentNotification) {
      const timer = setTimeout(() => {
        setRecentNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [recentNotification]);

  // Mobile Scroll-to-Hide Navbar State
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // On mobile view (innerWidth < 768px), we want to show/hide based on scroll direction
      if (window.innerWidth < 768) {
        if (currentScrollY > lastScrollY && currentScrollY > 80) {
          setShowNavbar(false);
        } else if (lastScrollY - currentScrollY > 10 || currentScrollY <= 20) {
          setShowNavbar(true);
        }
      } else {
        setShowNavbar(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Pricing constants & subtotal arithmetic
  const getCorporateDiscountRate = () => {
    if (user.isLoggedIn && user.clientType === "contractor") return 0.10; // 10%
    if (user.isLoggedIn && user.clientType === "workshop") return 0.05; // 5%
    return 0.00;
  };

  const getBasketCalculations = () => {
    const subtotal = basket.reduce((sum, item) => sum + item.product.priceAED * item.quantity, 0);
    const discountRate = getCorporateDiscountRate();
    const discountAmount = subtotal * discountRate;
    const discountedSubtotal = subtotal - discountAmount;
    const vat = discountedSubtotal * 0.05; // 5% UAE VAT
    const shipping = discountedSubtotal > 300 || subtotal === 0 ? 0 : 50; // Free delivery above 300 AED
    const total = discountedSubtotal + vat + shipping;

    return {
      subtotal,
      discountAmount,
      discountedSubtotal,
      vat,
      shipping,
      total
    };
  };

  // Cart operations
  const handleAddToBasket = (product: Product, quantitySelected: number = 100) => {
    setBasket((prev) => {
      const ind = prev.findIndex((item) => item.product.id === product.id);
      if (ind !== -1) {
        const u = [...prev];
        u[ind].quantity += quantitySelected;
        return u;
      }
      return [...prev, { product, quantity: quantitySelected, notes: "" }];
    });
    setRecentNotification(`Appended ${quantitySelected} items of ${product.name} to your procurement cart.`);
  };

  const handleRemoveFromBasket = (id: string) => {
    setBasket((prev) => prev.filter((it) => it.product.id !== id));
    setRecentNotification("Product line detached from procurement cart.");
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    setBasket((prev) =>
      prev.map((it) => (it.product.id === id ? { ...it, quantity: Math.max(1, newQty) } : it))
    );
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!basket.length) return;

    // Simulate placing order
    const { subtotal, discountAmount, vat, shipping, total } = getBasketCalculations();
    const orderId = "NMQ-OR-" + Math.floor(100000 + Math.random() * 900000);
    const dateStamp = new Date().toLocaleDateString("en-AE", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });
    const customerCompany = user.isLoggedIn ? user.companyName : "Guest Corporate Procurement";
    const deliverySite = user.shippingAddress || "Muweileh Structural Sector 14, Sharjah";

    const receiptObj = {
      orderId,
      customerName: user.contactPerson,
      customerCompany,
      customerPhone: user.phone,
      customerEmail: user.email,
      items: [...basket],
      subtotal,
      discountAmount,
      contractorDiscountPercent: getCorporateDiscountRate() * 100,
      vat,
      shipping,
      total,
      deliverySite,
      dateStamp,
      status: "Dispatched to Logistics"
    };

    // Construct text block for Whatsapp or Email
    let text = `NOOR AL MAQDIS HARDWARE & ELECTRICAL CO. - RFQ PROCUREMENT INQUIRY\n`;
    text += `==========================================\n`;
    text += `Inquiry Ref ID: ${orderId}\n`;
    text += `Company: ${customerCompany}\n`;
    text += `Contractor Rep: ${user.contactPerson}\n`;
    text += `Phone: ${user.phone}\n`;
    text += `Email: ${user.email}\n`;
    text += `Construction Site: ${deliverySite}\n`;
    text += `Date Stamp: ${dateStamp}\n`;
    text += `==========================================\n`;
    text += `ENCLOSED PROCUREMENT ITEMS:\n`;
    
    basket.forEach((item, index) => {
      text += `[${index + 1}] ${item.product.name} (Model: ${item.product.model}) [Brand: ${item.product.brand}] - Qty: ${item.quantity} Units\n`;
    });
    
    text += `==========================================\n`;
    text += `PRICING MEMORANDUM: Wholesaler Direct Contract / Pricing on Inquiry (RFQ)\n`;
    text += `==========================================\n`;
    text += `Please compile our bulk pricing structure and return a formal stamp quoting sheet for the items above. Thank you!`;

    if (checkoutTarget === "whatsapp") {
      const waUrl = `https://wa.me/971506773318?text=${encodeURIComponent(text)}`;
      window.open(waUrl, "_blank");
    } else {
      const mailUrl = `mailto:h.jhopdiwala@gmail.com?subject=Corporate Procurement Order ${orderId}&body=${encodeURIComponent(text)}`;
      window.open(mailUrl, "_blank");
    }

    setCreatedReceipt(receiptObj);
    setCheckoutStep("receipt");
    setBasket([]);
    setRecentNotification(`RFQ Inquiry dispatched to ${checkoutTarget.toUpperCase()} successfully! Document ${orderId} compiled.`);
  };

  const handleUserLogout = () => {
    setUser({
      companyName: "",
      contactPerson: "",
      email: "",
      phone: "",
      clientType: "guest",
      isLoggedIn: false
    });
    setRecentNotification("Corporate session terminated successfully.");
  };

  const handleUserLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginPerson || !loginEmail) {
      alert("Please specify contact name and email parameters.");
      return;
    }
    setUser({
      companyName: loginCompany || "Retail Purchasing Entity",
      contactPerson: loginPerson,
      email: loginEmail,
      phone: loginPhone || "0500000000",
      clientType: loginType,
      isLoggedIn: true,
      tradeLicense: loginType !== "retail" ? "TR-" + Math.floor(10000 + Math.random() * 90000) : undefined,
      shippingAddress: "Sharjah, United Arab Emirates"
    });
    setRecentNotification(`Welcome back, ${loginPerson}! Corporate session authenticated.`);
    setActiveTab("home");
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) {
      alert("Please complete the required contact items.");
      return;
    }
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactName("");
      setContactEmail("");
      setContactMessage("");
      alert("Thank you! Your structural inquiry has been routed to our managing director Mustafa Hamid.");
    }, 2000);
  };

  // Filter Catalog Products
  const filteredProducts = PRODUCTS.filter((p) => {
    const catMatch = selectedCategory === "all" || p.category === selectedCategory;
    const brandMatch = selectedBrand === "all" || p.brand.toLowerCase() === selectedBrand.toLowerCase();
    const searchMatch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.material.toLowerCase().includes(searchQuery.toLowerCase());
    return catMatch && brandMatch && searchMatch;
  });

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${
      theme === "dark" 
        ? "bg-slate-950 text-slate-100 dark" 
        : "bg-slate-50 text-slate-900"
    }`}>
      
      {/* ----------------- DYNAMIC FLOATING ALERT TOAST ----------------- */}
      <AnimatePresence>
        {recentNotification && (
          <motion.div
            id="global-alert-toast"
            initial={{ opacity: 0, y: -80, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 bg-yellow-400 text-slate-950 border border-yellow-500 px-6 py-4 rounded-2xl text-xs font-semibold shadow-2xl flex items-center gap-3 z-50 max-w-lg min-w-80"
          >
            <Sparkles className="w-4 h-4 shrink-0 animate-spin text-slate-950" />
            <span className="flex-1 font-mono">{recentNotification}</span>
            <button onClick={() => setRecentNotification(null)} className="font-bold text-xs pl-2 hover:opacity-75">✕</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ----------------- SUB-NAVBAR AND HEADER BRANDING ----------------- */}
      <nav className={`border-b sticky top-0 z-40 backdrop-blur-md transition-all duration-300 ${
        theme === "dark" ? "border-slate-800 bg-slate-950/90" : "border-slate-200 bg-white/95"
      } ${
        !showNavbar ? "-translate-y-full opacity-0 pointer-events-none md:translate-y-0 md:opacity-100 md:pointer-events-auto" : "translate-y-0 opacity-100"
      }`}>
        {/* Top ribbon containing contact and theme toggle */}
        <div className={`border-b text-[10px] font-mono px-4 lg:px-8 py-2.5 flex flex-col sm:flex-row justify-center items-center relative gap-2 ${
          theme === "dark" ? "border-slate-850 text-slate-400 bg-slate-900/40" : "border-slate-100 text-slate-500 bg-slate-100/60"
        }`}>
          {/* Centered Contact details */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1.5 text-center">
            <span className="flex items-center justify-center gap-1">
              <MapPin className="w-3 h-3 text-red-500" /> Sharjah Industrial Area 14, UAE
            </span>
            <span className="flex items-center justify-center gap-1 hover:text-yellow-600 transition-all cursor-pointer">
              <Phone className="w-3 h-3 text-emerald-500" /> <a id="top-phone-call-1" href="tel:0506773318">050 677 3318</a> / <a id="top-phone-call-2" href="tel:0555265277">055 526 5277</a>
            </span>
            <span className="flex items-center justify-center gap-1">
              <Mail className="w-3 h-3 text-blue-500" /> <a id="top-email-send" href="mailto:h.jhopdiwala@gmail.com">h.jhopdiwala@gmail.com</a>
            </span>
          </div>

          <div className="sm:absolute sm:right-4 lg:right-8 flex items-center gap-3">
            <span className="text-[9px] uppercase font-bold tracking-widest bg-yellow-400/15 text-yellow-500 dark:text-yellow-400 px-2 py-0.5 rounded sm:inline hidden">
              ESTD 2007
            </span>
          </div>
        </div>

        {/* Primary Navbar Controls */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Main Title Corporate Logo (Noor Al Maqdis swapped before tagline) */}
          <div id="company-main-brand" onClick={() => setActiveTab("home")} className="flex items-center gap-3 cursor-pointer group">
            <NoorAlMaqdisLogo className="w-11 h-11 shrink-0 group-hover:scale-105 transition-all duration-300" />
            <div>
              <h1 className="font-sans font-black tracking-tight text-lg md:text-xl text-slate-900 dark:text-white leading-none mb-1">
                NOOR AL MAQDIS <span className="text-yellow-600 dark:text-yellow-405 font-medium font-mono text-xs tracking-wide">CO.</span>
              </h1>
              <div className="flex items-center gap-1 pb-0.5">
                <span className="font-mono text-[9px] tracking-widest text-slate-500 dark:text-slate-400 font-bold uppercase block">
                  Hardware & Electrical Wholesalers
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Display Currently Active Section */}
          <div className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-900/60 font-mono text-[11px] font-bold leading-none shrink-0 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse shrink-0" />
            <span className="text-slate-400 dark:text-slate-500">CURRENT DISPLAY:</span>
            <span className="text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-1.5 font-sans font-black">
              {(() => {
                const activeMap: { [key: string]: { label: string; icon: any } } = {
                  home: { label: "Corporate Suite", icon: <Award className="w-3.5 h-3.5 text-yellow-500" /> },
                  about: { label: "Our History", icon: <BookOpen className="w-3.5 h-3.5 text-yellow-500" /> },
                  catalog: { label: "Procure Catalog", icon: <Layers className="w-3.5 h-3.5 text-yellow-500" /> },
                  "3d-lab": { label: "3D CAD Lab", icon: <Cpu className="w-3.5 h-3.5 text-yellow-500" /> },
                  "ai-chat": { label: "Consult AI", icon: <Sparkles className="w-3.5 h-3.5 text-yellow-500" /> },
                  checkout: { label: "Procurement Cart", icon: <ShoppingCart className="w-3.5 h-3.5 text-yellow-500" /> },
                  contact: { label: "Contact Us", icon: <Mail className="w-3.5 h-3.5 text-yellow-500" /> },
                  auth: { label: "Cabinet Session", icon: <User className="w-3.5 h-3.5 text-yellow-500" /> },
                  admin: { label: "Supplier Console", icon: <Lock className="w-3.5 h-3.5 text-yellow-500" /> },
                };
                const val = activeMap[activeTab] || { label: "Active", icon: <Award className="w-3.5 h-3.5" /> };
                return (
                  <>
                    {val.icon}
                    <span>{val.label}</span>
                  </>
                );
              })()}
            </span>
          </div>

          {/* Action Buttons: Unified Menu Option Dropdown */}
          <div className="relative">
            <button
              id="top-nav-menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold bg-slate-900 hover:bg-slate-850 dark:bg-slate-800 dark:hover:bg-slate-700 text-white transition-all cursor-pointer shadow-md"
            >
              <Menu className="w-4 h-4 text-yellow-400" />
              <span>Menu Options</span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`} />
            </button>

            {menuOpen && (
              <div
                id="mobile-menu-overlay"
                className="absolute right-0 mt-2 w-56 max-h-[80vh] overflow-y-auto rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 shadow-xl z-50 space-y-1 animate-scale-in origin-top-right">
                {/* Corporate Navigation Sections */}
                <div className="border-b border-slate-100 dark:border-slate-850 pb-1.5 mb-1.5 space-y-0.5">
                  <span className="px-3 py-1 font-mono text-[9px] text-slate-450 dark:text-slate-500 uppercase tracking-widest font-black block">
                    Corporate Sections
                  </span>
                  {[
                    { id: "home", label: "Corporate Suite", icon: <Award className="w-3.5 h-3.5 text-yellow-500" /> },
                    { id: "about", label: "Our History", icon: <BookOpen className="w-3.5 h-3.5 text-yellow-500" /> },
                    { id: "catalog", label: "Procure Catalog", icon: <Layers className="w-3.5 h-3.5 text-yellow-500" /> },
                    { id: "3d-lab", label: "3D CAD Lab", icon: <Cpu className="w-3.5 h-3.5 text-yellow-500" /> },
                    { id: "ai-chat", label: "Consult AI", icon: <Sparkles className="w-3.5 h-3.5 text-yellow-500" /> },
                    { id: "contact", label: "Contact Us", icon: <Mail className="w-3.5 h-3.5 text-yellow-500" /> },
                  ].map((tab) => {
                    const uActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        id={`menu-nav-${tab.id}`}
                        onClick={() => {
                          setActiveTab(tab.id as any);
                          setMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all text-left ${
                          uActive
                            ? "bg-yellow-450/20 text-yellow-650 dark:text-yellow-405 font-black"
                            : theme === "dark"
                              ? "text-slate-300 hover:bg-slate-800 hover:text-white"
                              : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                        }`}
                      >
                        {tab.icon}
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="pb-1.5 mb-1.5 space-y-0.5 border-b border-slate-100 dark:border-slate-850">
                  <span className="px-3 py-1 font-mono text-[9px] text-slate-450 dark:text-slate-500 uppercase tracking-widest font-black block">
                    Procurement Basket
                  </span>

                  {/* RFQ Cart Item */}
                  <button
                    id="top-nav-cart"
                    onClick={() => {
                      setCheckoutStep("cart");
                      setActiveTab("checkout");
                      setMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono font-bold hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-left transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4 text-yellow-600 dark:text-yellow-400 font-bold" />
                      <span>RFQ Procurement Cart</span>
                    </div>
                    <span className="px-1.5 py-0.2 rounded-full bg-slate-900 dark:bg-yellow-440 text-white dark:text-slate-950 text-[10px] font-black">
                      {basket.length}
                    </span>
                  </button>
                </div>

                {/* Authentication Account */}
                {user.isLoggedIn ? (
                  <>
                    <button
                      id="top-client-panel-btn"
                      onClick={() => {
                        setActiveTab("auth");
                        setMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-mono font-bold hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-left transition-all"
                    >
                      <User className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                      <span>Cabinet (Eng. {user.contactPerson.split(" ")[0]})</span>
                    </button>
                    <button
                      id="logout-btn"
                      onClick={() => {
                        handleUserLogout();
                        setMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-mono font-bold hover:bg-red-50 dark:hover:bg-red-950/20 text-red-500 text-left transition-all"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Term Cabinet Session</span>
                    </button>
                  </>
                ) : (
                  <button
                    id="top-login-nav"
                    onClick={() => {
                      setActiveTab("auth");
                      setMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-mono font-bold hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-left transition-all"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    <span>Trading Client Login</span>
                  </button>
                )}

                <div className="border-t border-slate-100 dark:border-slate-800 my-1" />

                {/* ERP admin portal */}
                <button
                  id="top-vault-btn"
                  onClick={() => {
                    setActiveTab("admin");
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-mono font-bold hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-850 dark:text-slate-350 text-left transition-all"
                >
                  <ClipboardList className="w-4 h-4 text-emerald-500" />
                  <span>Access ERP Ledger</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* ----------------- PRIMARY INTERACTIVE VIEWS / PAGES ----------------- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">

          {/* ==================== PAGE A: HOME SUITE LANDING ==================== */}
          {activeTab === "home" && (
            <motion.div
              key="view-home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-16"
            >
              {/* Grand Corporate Hero with 3D feel */}
              <div className={`rounded-[36px] overflow-hidden border p-8 sm:p-14 relative ${
                theme === "dark" ? "bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950/40 border-slate-800" : "bg-gradient-to-br from-slate-100 via-slate-50 to-yellow-50 border-slate-250"
              } shadow-sm`}>
                
                {/* Visual grid decorations representing engineering background layout */}
                <div className="absolute inset-0 pointer-events-none opacity-5 bg-size-20"
                  style={{
                    backgroundImage: `linear-gradient(to right, #475569 1px, transparent 1px), linear-gradient(to bottom, #475569 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }}
                />

                <div className="relative z-10 max-w-4xl space-y-6">
                  <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-500/25 px-4 py-1.5 rounded-full text-xs font-mono font-bold text-yellow-600 dark:text-yellow-400 shadow-sm">
                    <ShieldCheck className="w-3.5 h-3.5 text-yellow-500 animate-bounce" />
                    <span>ESTABLISHED & TRUSTED REGISTERED CR-V / HSS / DOUBLE-WELD DISTRIBUTOR SINCE 2007</span>
                  </div>

                  <h2 className="font-sans font-black tracking-tight text-3xl sm:text-6xl text-slate-900 dark:text-white leading-[1.0] uppercase italic">
                    Trusted Structural <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-amber-500 to-amber-600">
                      Hardware & Electric
                    </span> <br />
                    Solutions in UAE.
                  </h2>

                  <p className="max-w-2xl text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                    Established in 2007, Noor Al Maqdis supplies a pristine, verified portfolio of high-tensile hardware, electrical accessories, HKK drop-forged open spanners, SATA sockets, and genuine Dongcheng power tools. We support contractors, workshops, and traders across Dubai and Sharjah with honesty, outstanding service, and competitive pricing.
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-4">
                    <button
                      id="hero-procure-btn"
                      onClick={() => setActiveTab("catalog")}
                      className="bg-yellow-400 hover:bg-yellow-500 text-slate-950 px-7 py-3.5 rounded-2xl font-mono text-xs font-black flex items-center gap-2 hover:scale-102 transition-all cursor-pointer shadow-lg shadow-yellow-550/20"
                    >
                      <span>Retrieve Material Catalog</span>
                      <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                    </button>
                    <button
                      id="hero-contact-btn"
                      onClick={() => setActiveTab("contact")}
                      className={`px-7 py-3.5 rounded-2xl font-mono text-xs font-bold flex items-center gap-2 transition-all cursor-pointer border ${
                        theme === "dark" 
                          ? "bg-slate-850 hover:bg-slate-800 border-slate-700 text-white" 
                          : "bg-white hover:bg-slate-100 border-slate-300 text-slate-800"
                      }`}
                    >
                      <Phone className="w-4 h-4 text-emerald-500" />
                      <span>Contact Muweileh Central</span>
                    </button>
                  </div>
                </div>

                {/* Grid stats counter widgets with 3D-like hover shadow */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-14 border-t border-slate-200 dark:border-slate-800 mt-14 relative z-10">
                  {[
                    { label: "FOUNDING HISTORY", value: "Established 2007", desc: "Sharjah, UAE" },
                    { label: "GENUINE PARTNERSHIPS", value: "16 Premium Brands", desc: "HKK & Dongcheng Stockists" },
                    { label: "ANNUAL DELIVERED DOCKETS", value: "15,000+ Fulfilled", desc: "Industrial & Marine Clients" },
                    { label: "LOGISTICS EFFICIENCY", value: "Muweileh Sharjah", desc: "Industrial Sharjah Area 14" }
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className={`p-4 rounded-2xl border transition-all ${
                        theme === "dark" 
                          ? "bg-slate-900/50 border-slate-800 hover:bg-slate-900 hover:border-yellow-400/30" 
                          : "bg-white/60 border-slate-200 hover:bg-white hover:border-yellow-400/30"
                      }`}
                    >
                      <span className="font-mono text-[8px] text-slate-400 block tracking-wider font-bold mb-1">{stat.label}</span>
                      <span className="font-sans font-black text-slate-900 dark:text-white text-base block">{stat.value}</span>
                      <span className="font-mono text-[10px] text-yellow-600 block mt-0.5">{stat.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ================== DYNAMIC 12 BRAND LOGOS COLLAGE ================== */}
              <div className="space-y-6">
                <div className="text-center space-y-1 animate-slide-up">
                  <span className="font-mono text-[10px] text-yellow-400 uppercase font-black tracking-widest block">
                    MANUFACTURER BRAND ROSTER
                  </span>
                  <h3 className="font-sans font-black text-2xl sm:text-3xl tracking-tight text-white uppercase">
                    Our Associated Brands Portfolio
                  </h3>
                  <p className="text-xs text-slate-400 max-w-xl mx-auto leading-relaxed">
                    Noor Al Maqdis is proud to stock, import, and distribute genuine parts from these 12 premier, internationally recognized hardware, adhesive, paint, and power tool brands.
                  </p>
                </div>

                {/* Brand Panels Grid - Fixed symmetrical 6x2 layout */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                  {TRUST_BRANDS.map((br, index) => (
                    <div
                      key={br.name}
                      onClick={() => {
                        setSelectedBrand(br.name);
                        setActiveTab("catalog");
                      }}
                      className={`p-4 rounded-2xl border flex flex-col justify-between items-center text-center cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:border-yellow-400 animate-fade-in ${
                        theme === "dark"
                          ? "bg-slate-900 border-slate-800"
                          : "bg-white border-slate-200"
                      }`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {/* Brand Logo Container */}
                      <div className={`w-full py-3 px-1 rounded-xl text-center font-sans font-black tracking-tighter text-xs text-white uppercase bg-gradient-to-r ${br.color} shadow-sm overflow-hidden flex items-center justify-center min-h-[52px] transitions-all duration-300 hover:scale-105`}>
                        {renderBrandLogo(br.name)}
                      </div>

                      <div className="mt-3 space-y-1">
                        <span className="font-sans font-extrabold text-[10px] tracking-tight text-white block truncate w-24">
                          {br.name}
                        </span>
                        <span className="font-mono text-[8.5px] text-slate-400 block line-clamp-1">
                          {br.category}
                        </span>
                        <span className="font-mono text-[8px] text-yellow-400 block">
                          {br.rating}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Core Corporate Strengths Cards with animations */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Quality Products Assured",
                    desc: "Genuine and authentic tools only. We source directly from brands such as Dongcheng and HKK so you never compromise on the performance, safety, and durability of your site components.",
                    icon: <ShieldCheck className="w-7 h-7 text-yellow-400" />,
                    delay: "0ms"
                  },
                  {
                    title: "Competitive Local Pricing",
                    desc: "We understand industry needs. Offering contractors trade-grade pricing matrices on hex bolts, anchors, and electrical boards to guarantee cost efficiency inside your budgets.",
                    icon: <Scale className="w-7 h-7 text-teal-400" />,
                    delay: "100ms"
                  },
                  {
                    title: "Professional UAE Support",
                    desc: "Owned and operated by three brothers—Hakimuddin, Mustafa, and Shabbir Hamid. We run outstanding responsive customer support, building strong, reliable partnerships for years to come.",
                    icon: <Award className="w-7 h-7 text-indigo-400" />,
                    delay: "200ms"
                  }
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-3xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-slide-up ${
                      theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                    }`}
                    style={{ animationDelay: item.delay }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-yellow-400/10 mb-4 flex items-center justify-center shadow-inner hover:bg-yellow-400/20 transition-colors">
                      {item.icon}
                    </div>
                    <h4 className="font-sans font-bold text-white mb-2 text-md uppercase">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Highlight Call to Action */}
              <div className={`p-8 rounded-3xl text-center border overflow-hidden relative ${
                theme === "dark" ? "bg-slate-900/60 border-slate-800" : "bg-yellow-400/10 border-yellow-200"
              }`}>
                <h4 className="font-sans font-black text-xl sm:text-2xl text-slate-900 dark:text-white uppercase mb-2">
                  Have a Large-Scale Project Procurement List?
                </h4>
                <p className="text-slate-550 dark:text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed mb-6">
                  Log into our registered contractor panel to claim your persistent **10% Procurement Discount** off all spanners, power tools, safety gear, and industrial cables! Toggle to 'Inquiry-Mode' if you wish to prepare a custom bulk RFQ file instead.
                </p>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => setActiveTab("auth")}
                    className="bg-slate-900 hover:bg-slate-850 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-mono text-xs font-bold px-6 py-3 rounded-xl transition-all cursor-pointer shadow-sm"
                  >
                    Access Contractor Portal
                  </button>
                  <button
                    onClick={() => setActiveTab("catalog")}
                    className="bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-mono text-xs font-bold px-6 py-3 rounded-xl transition-all cursor-pointer shadow-md"
                  >
                    Browse Catalog
                  </button>
                </div>
              </div>

              {/* Interactive FAQ Corporate Segment */}
              <div className="space-y-6 pt-6">
                <div className="text-center space-y-1.5">
                  <span className="font-mono text-[9px] text-yellow-405 uppercase font-black tracking-widest block animate-pulse">
                    CUSTOMER RESOURCES
                  </span>
                  <h4 className="font-sans font-black text-xl sm:text-2.5xl tracking-tight text-white uppercase animate-fade-in">
                    FREQUENTLY ASKED QUESTIONS
                  </h4>
                  <p className="text-[11px] text-slate-400 max-w-md mx-auto">
                    Quickly find answers regarding bulk procurements, international standards calibration, and custom order dispatch.
                  </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-3">
                  {[
                    {
                      q: "What brands are officially stocked at Noor Al Maqdis?",
                      a: "We are authorized distributors and direct stockists of premium heavy-duty hardware including Dongcheng power tools, SATA mechanics gear, HKK drop-forged tools, and custom high-tensile fasteners adhering strictly to DIN/ISO guidelines."
                    },
                    {
                      q: "How can I submit a custom bulk project procurement order?",
                      a: "You can load our central Material Catalog, select your items, and click 'Inquiry Basket' to review items. Then directly submit the inquiry list over WhatsApp or Email. There is no automated credit card checkout needed - we handle queries offline on wholesale terms."
                    },
                    {
                      q: "Do you supply material compliance test reports or mill certificates?",
                      a: "Yes! For large commercial deliveries of high-tensile fasteners (e.g. Grade 8.8/10.9) and high-load structural steel brackets, we can provide manufacturer compliance certificates and ISO/SGS testing sheets upon request."
                    },
                    {
                      q: "Can you deliver hardware products to sites anywhere in the UAE?",
                      a: "Absolutely. Backed by our warehouse fleets based at Industrial Area 14, Sharjah and Muweileh, we execute scheduled delivery logistics directly to construction and fabrication yards across Sharjah, Dubai, Ajman, and Abu Dhabi."
                    },
                    {
                      q: "How does the Contractor Portal discount work?",
                      a: "Registered contractors can create corporate credentials or fill their registered license details under 'Contractor Login'. Once logged in, a flat 10% wholesale markdown is auto-calculated on all basket configurations before submitting."
                    }
                  ].map((faq, fIdx) => {
                    const isOpen = openFaqIndex === fIdx;
                    return (
                      <div
                        key={fIdx}
                        className="bg-slate-900 border border-slate-850 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm"
                      >
                        <button
                          onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                          className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-sans font-extrabold text-xs sm:text-sm text-white focus:outline-none hover:bg-slate-850/50 transition-all cursor-pointer"
                        >
                          <span className="uppercase tracking-tight leading-snug">{faq.q}</span>
                          <span className={`text-yellow-400 text-lg transform transition-transform duration-300 shrink-0 ${isOpen ? "rotate-45" : ""}`}>
                            ＋
                          </span>
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2, ease: "easeInOut" }}
                            >
                              <div className="px-5 pb-5 pt-1.5 border-t border-slate-850 text-xs text-slate-400 leading-relaxed font-sans">
                                {faq.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* ==================== PAGE B: ABOUT US ==================== */}
          {activeTab === "about" && (
            <motion.div
              key="view-about"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-12"
            >
              <div className="text-center space-y-2 max-w-2xl mx-auto">
                <span className="font-mono text-xs text-yellow-600 dark:text-yellow-400 uppercase font-black tracking-widest block">
                  OUR CORPORATE JOURNEY
                </span>
                <h3 className="font-sans font-black text-2xl sm:text-4.5xl tracking-tight text-slate-900 dark:text-white uppercase italic">
                  About Noor Al Maqdis
                </h3>
                <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed">
                  Trusted across the UAE since 2007. Family owned, operated by three dedicated brothers with a shared vision of outstanding service, honesty, and consistent quality metrics.
                </p>
              </div>

              {/* History and journey layout splits */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <h4 className="font-sans font-black text-lg text-slate-900 dark:text-white uppercase">
                    From Humble Beginnings to Premier Regional Distributors
                  </h4>
                  <div className="space-y-3.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    <p>
                      Noor Al Maqdis Hardware & Electric was established in 2007 with a vision to become a trusted, premier regional supplier of premium hardware, electrical parts, industrial tools, and associated marine solutions.
                    </p>
                    <p>
                      Since our inception in Sharjah, UAE, we have remained laser-focused on building long-term customer relationships through honesty, reliability, and outstanding professional service. Over the years, we have successfully partnered with builders, workshop owners, engineering traders, public contractors, maintenance teams, and retail clients.
                    </p>
                    <p>
                      Our explosive growth has been driven by repeat business, customer recommendations, and a reputation for supplying genuine, authentic brands. We never compromise on safety, and we continually strive to optimize our logistics to deliver the right products at the right time.
                    </p>
                  </div>
                </div>

                <div className={`lg:col-span-5 p-6 rounded-3xl border ${
                  theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                } shadow-sm`}>
                  <h4 className="font-sans font-black text-xs text-yellow-600 dark:text-yellow-400 tracking-wider uppercase mb-4 block">
                    FOUNDERS STATEMENT
                  </h4>
                  <p className="text-xs text-slate-550 dark:text-slate-350 italic leading-relaxed mb-4">
                    "Long-term success is built on integrity, consistency, and delivering outstanding value to every single customer. We proudly view ourselves not just as tool-sellers, but as engineering procurement partners contributing positively to your high-stakes structural safety dreams."
                  </p>
                  <div className="flex items-center gap-3 border-t border-slate-200 dark:border-slate-800 pt-3.5">
                    <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-xs text-slate-950">
                      3B
                    </div>
                    <div>
                      <h5 className="font-sans font-extrabold text-[11px] text-slate-900 dark:text-white uppercase leading-none">
                        The Three Brothers
                      </h5>
                      <span className="font-mono text-[9px] text-slate-400 block mt-0.5">
                        Hakimuddin, Mustafa & Shabbir Hamid
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Interactive Chronology History Timeline */}
              <div className={`p-8 rounded-3xl border ${
                theme === "dark" ? "bg-slate-900 border-slate-855" : "bg-white border-slate-100 shadow-sm"
              } space-y-8`}>
                <div className="space-y-1 text-center">
                  <span className="font-mono text-[9px] text-yellow-600 dark:text-yellow-405 uppercase font-black tracking-widest block animate-pulse">
                    CHRONOLOGY JOURNEY
                  </span>
                  <h4 className="font-sans font-black text-xl text-slate-900 dark:text-white uppercase italic">
                    Milestones of Excellence
                  </h4>
                  <p className="text-[11px] text-slate-500 max-w-md mx-auto">
                    Click on the milestone years below to traverse our evolutionary progress from a single Sharjah fastener locker to full UAE industrial distribution.
                  </p>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-stretch">
                  {/* Years select vertical list */}
                  <div className="flex md:flex-col justify-between md:justify-center gap-1.5 md:border-r border-slate-150 dark:border-slate-800 pr-0 md:pr-6 shrink-0">
                    {[
                      { year: "2007", label: "Establishment" },
                      { year: "2012", label: "Warehousing" },
                      { year: "2018", label: "Alliances" },
                      { year: "2026", label: "Digital Era" }
                    ].map((step, idx) => {
                      const isActive = activeMilestone === idx;
                      return (
                        <button
                          key={step.year}
                          onClick={() => setActiveMilestone(idx)}
                          className={`flex-1 md:flex-none text-left py-2.5 px-4 rounded-xl font-sans transition-all duration-300 text-xs flex flex-col md:flex-row items-center md:items-start gap-1 cursor-pointer ${
                            isActive
                              ? "bg-yellow-400 text-slate-950 font-black scale-102 shadow-sm"
                              : theme === "dark" ? "text-slate-400 hover:bg-slate-800 hover:text-white" : "text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          <span className="font-mono font-black text-xs">{step.year}</span>
                          <span className="hidden md:inline text-[9.5px] opacity-80 font-medium">| {step.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active milestone content display */}
                  {(() => {
                    const milObj = [
                      {
                        year: "2007",
                        title: "Foundational Incorporation",
                        badge: "The Dream",
                        desc: "The Hamid Brothers established Noor Al Maqdis in Sharjah with a focused mission: to supply durable, heavy-tensile fasteners, anchors, and basic plumbing items with unwavering honesty.",
                        highlights: ["Family-owned outset", "Fastener mastery focus", "First depot in Sharjah"]
                      },
                      {
                        year: "2012",
                        title: "Muweileh Storage Scale",
                        badge: "Expanding Footprint",
                        desc: "Acquired dedicated high-capacity storage warehouses in Muweileh Industrial area. Allowed us to stock, catalog, and inventory massive reserves of heavy valves, copper pipes, and heavy electric conduits.",
                        highlights: ["Expanded warehousing", "B2B wholesale model launch", "Direct procurement fleets"]
                      },
                      {
                        year: "2018",
                        title: "Global Brand Alliances",
                        badge: "Premium Quality Era",
                        desc: "Signed direct B2B trade agreements with premier manufacturers, including Milano Sanitary fittings, Grohe mixers, RAK Ceramics vitreous wares, National Paints, and premium Asmaco adhesives.",
                        highlights: ["Official brand stockist", "Contractor VIP tiers", "ESMA & CE certifications"]
                      },
                      {
                        year: "2026",
                        title: "Next-Gen AI Procurement",
                        badge: "Digital Pioneer",
                        desc: "Pioneered a state-of-the-art interactive digital experience: featuring our custom 3D technical simulator, live WhatsApp RFQ dispatching, and an advanced AI Procurement Specialist agent.",
                        highlights: ["AI assistant integration", "3D virtual tooling preview", "Zero-friction quotation dispatch"]
                      }
                    ][activeMilestone];

                    return (
                      <div className="flex-1 space-y-4 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-black text-yellow-600 dark:text-yellow-405">{milObj.year} AD</span>
                            <span className="bg-yellow-400/15 text-yellow-600 dark:text-yellow-405 text-[8.5px] font-mono uppercase px-2 py-0.5 rounded font-bold">{milObj.badge}</span>
                          </div>
                          <h5 className="font-sans font-black text-sm text-slate-900 dark:text-white uppercase leading-tight">
                            {milObj.title}
                          </h5>
                          <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed font-sans">
                            {milObj.desc}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-3.5 border-t border-slate-100 dark:border-slate-850">
                          {milObj.highlights.map((hlt) => (
                            <div key={hlt} className={`p-2.5 rounded-xl border flex items-center gap-1.5 ${
                              theme === "dark" ? "bg-slate-950/40 border-slate-850" : "bg-slate-50 border-slate-150"
                            }`}>
                              <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full shrink-0 animate-pulse" />
                              <span className="font-mono text-[9px] text-slate-700 dark:text-slate-300 font-semibold">{hlt}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Mission, Vision, Values Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className={`p-6 rounded-3xl border ${
                  theme === "dark" ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200"
                }`}>
                  <h4 className="font-sans font-black text-sm text-slate-900 dark:text-white uppercase mb-3 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full" />
                    Our Core Mission
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    To provide superior, technical, and durable hardware and electrical solutions through genuine products, responsive support, trade-competitive pricing matrices, and dependable regional delivery schedules that keep your infrastructure projects running safely.
                  </p>
                </div>

                <div className={`p-6 rounded-3xl border ${
                  theme === "dark" ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200"
                }`}>
                  <h4 className="font-sans font-black text-sm text-slate-900 dark:text-white uppercase mb-3 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-teal-500 rounded-full" />
                    Our Corporate Vision
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    To become the premier and trusted supplier of hardware and electrical products across the UAE by preserving deep standards of honest integrity and continuing to strengthen our logistics footprint with state-of-the-art interactive digital assistance portals.
                  </p>
                </div>
              </div>

              {/* Leadership Team Profiles (Hakimuddin Hamid, Mustafa Hamid, Shabbir Hamid) */}
              <div className="space-y-6">
                <div className="text-center space-y-1">
                  <span className="font-mono text-[9px] text-yellow-600 dark:text-yellow-400 uppercase font-black block">
                    OUR LEADERSHIP TEAM
                  </span>
                  <h4 className="font-sans font-black text-xl sm:text-2.5xl tracking-tight text-slate-900 dark:text-white uppercase">
                    Guiding Noor Al Maqdis Progress
                  </h4>
                  <p className="text-[11px] text-slate-500 max-w-md mx-auto">
                    A management board of three brothers combining deep hardware experience, commercial ethics, and logistics precision.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { name: "Hakimuddin Hamid", role: "Founder & Owner", bio: "Guides corporate strategy and brand alliances. Built Noor Al Maqdis from a modest local distribution center in 2007 into an expansive hardware stockist network.", initial: "HH" },
                    { name: "Mustafa Hamid", role: "Managing Director", bio: "Oversees daily sales, site-contractor procurement and custom invoice allocations. Committed to strict compliance with DIN standards and prompt customer care.", initial: "MH" },
                    { name: "Shabbir Hamid", role: "Director", bio: "Handles logistics execution, warehouse operations at Muweileh, and supplier network accounts. Focuses on shipping speed and high-tensile material reserves.", initial: "SH" }
                  ].map((lead, idx) => (
                    <div
                      key={idx}
                      className={`p-6 rounded-3xl border text-center relative group overflow-hidden ${
                        theme === "dark" ? "bg-slate-900 border-slate-850 hover:border-yellow-400" : "bg-white border-slate-200 hover:border-yellow-400"
                      } transition-all duration-300`}
                    >
                      <div className="w-20 h-20 rounded-full bg-yellow-400/10 border border-yellow-500/30 flex items-center justify-center font-mono text-slate-950 mx-auto mb-4 relative overflow-hidden group-hover:border-yellow-400 hover:rotate-3 transition-all shadow-inner">
                        <svg className="absolute inset-0 w-full h-full text-yellow-500/15 pointer-events-none" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="50" cy="38" r="15" fill="currentColor" />
                          <path d="M22 80 C22 61, 34 55, 50 55 C66 55, 78 61, 78 80" fill="currentColor" />
                        </svg>
                        <span className="relative z-10 font-mono font-black text-lg text-yellow-500 dark:text-yellow-400 uppercase tracking-tighter">
                          {lead.initial}
                        </span>
                      </div>
                      <h5 className="font-sans font-black text-sm text-slate-900 dark:text-white uppercase leading-none">
                        {lead.name}
                      </h5>
                      <span className="font-mono text-[9.5px] text-yellow-600 dark:text-yellow-400 font-bold uppercase tracking-wide block mt-1.5">
                        {lead.role}
                      </span>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mt-3">
                        {lead.bio}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ==================== PAGE C: MATERIAL CATALOG (ECOMMERCE & RFQ) ==================== */}
          {activeTab === "catalog" && (
            <motion.div
              key="view-catalog"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              {/* Filter controls row */}
              <div className="flex flex-col lg:flex-row items-center justify-between gap-4 py-4 border-b border-slate-200 dark:border-slate-800">
                <div className="space-y-1">
                  <h3 className="font-sans font-black text-lg text-slate-900 dark:text-white uppercase flex items-center gap-1.5">
                    <Layers className="w-5 h-5 text-yellow-600" />
                    Procurement Material Catalog
                  </h3>
                  <p className="text-[10px] text-slate-450 uppercase font-mono font-bold">
                    Showing {filteredProducts.length} verified listings available for immediate delivery
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
                  {/* Category dropdown selector */}
                  <div className="relative flex-1 md:flex-none">
                    <select
                      id="cat-select"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className={`w-full py-2.5 pl-3 pr-8 rounded-xl text-xs font-mono font-bold focus:outline-none appearance-none border cursor-pointer ${
                        theme === "dark" ? "bg-slate-900 border-slate-800 text-white focus:border-yellow-400" : "bg-white border-slate-200 text-slate-900 focus:border-yellow-500"
                      }`}
                    >
                      <option value="all">📁 All Categories</option>
                      {CATEGORIES.map((c) => (
                        <option key={c.id} value={c.slug}>{c.name}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2.5 top-3.5 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                  </div>

                  {/* Brand dropdown selector */}
                  <div className="relative flex-1 md:flex-none">
                    <select
                      id="brand-select"
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                      className={`w-full py-2.5 pl-3 pr-8 rounded-xl text-xs font-mono font-bold focus:outline-none appearance-none border cursor-pointer ${
                        theme === "dark" ? "bg-slate-900 border-slate-800 text-white focus:border-yellow-400" : "bg-white border-slate-200 text-slate-900 focus:border-yellow-500"
                      }`}
                    >
                      <option value="all">🎖️ All Brands</option>
                      {TRUST_BRANDS.map((br) => (
                        <option key={br.name} value={br.name}>{br.name}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2.5 top-3.5 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                  </div>

                  {/* Instant Search query input */}
                  <div className="relative w-full md:w-60">
                    <Search className="absolute left-3 top-3 w-3.5 h-3.5 text-slate-450" />
                    <input
                      id="catalog-search"
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search SKU model or specs..."
                      className={`w-full py-2 pl-9 pr-3 rounded-xl text-xs focus:outline-none border ${
                        theme === "dark" ? "bg-slate-900 border-slate-800 text-white focus:border-yellow-400" : "bg-white border-slate-200 text-slate-900 focus:border-yellow-550 shadow-sm"
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Products Catalog grids */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20 bg-slate-100 dark:bg-slate-900/40 rounded-3xl border border-slate-200 dark:border-slate-850">
                  <Info className="w-8 h-8 mx-auto mb-3 text-slate-450 animate-pulse" />
                  <p className="text-xs font-mono text-slate-500 uppercase">No hardware listings matches your query.</p>
                  <button onClick={() => { setSelectedCategory("all"); setSelectedBrand("all"); setSearchQuery(""); }} className="mt-3.5 text-xs text-yellow-600 dark:text-yellow-400 font-bold underline">
                    Clear Active Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((p) => {
                    // Calculate special discount price preview
                    const discountPercent = getCorporateDiscountRate() * 100;
                    const discountPrice = p.priceAED * (1 - getCorporateDiscountRate());
                    
                    return (
                      <div
                        id={`cat-card-${p.id}`}
                        key={p.id}
                        className={`p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between gap-6 hover:shadow-md hover:border-yellow-400 relative ${
                          theme === "dark" ? "bg-slate-900 border-slate-850" : "bg-white border-slate-200"
                        }`}
                      >
                        {/* Featured banner */}
                        {p.isFeatured && (
                          <span className="absolute top-4 left-4 bg-yellow-400 text-slate-950 font-mono text-[8.5px] font-black px-2 py-0.5 rounded-full z-10">
                            BESTSELLER
                          </span>
                        )}

                        <div className="space-y-4">
                          {/* Visual Logo/Header container */}
                          <div className={`py-4 rounded-2xl flex items-center justify-center relative ${
                            theme === "dark" ? "bg-slate-950" : "bg-slate-50"
                          }`}>
                            <div className="text-slate-800 dark:text-white font-black uppercase text-[10px] tracking-widest font-mono select-none">
                              {p.brand} SPEC
                            </div>
                            <span className="absolute right-3 bottom-2.5 font-mono text-[8px] bg-yellow-500/10 text-yellow-605 dark:text-yellow-400 px-2 py-0.5 rounded font-extrabold">
                              {p.model}
                            </span>
                          </div>

                          {/* Product meta & name details */}
                          <div className="space-y-1.5">
                            <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest block font-bold leading-none">
                              {p.brand} • {p.category.replace("-", " ")}
                            </span>
                            <h4 className="font-sans font-extrabold text-sm text-slate-900 dark:text-white uppercase leading-snug line-clamp-1">
                              {p.name}
                            </h4>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                              {p.description}
                            </p>
                          </div>

                          {/* Tech parameters specs */}
                          <div className={`p-3 rounded-xl space-y-1 ${
                            theme === "dark" ? "bg-slate-950/70" : "bg-slate-50"
                          }`}>
                            <div className="flex justify-between font-mono text-[9.5px]">
                              <span className="text-slate-400">Certification:</span>
                              <span className="text-slate-900 dark:text-slate-200 font-semibold">{p.certification || "DIN Standard"}</span>
                            </div>
                            <div className="flex justify-between font-mono text-[9.5px]">
                              <span className="text-slate-400">Composition:</span>
                              <span className="text-slate-900 dark:text-slate-200 font-semibold truncate max-w-[130px]">{p.material}</span>
                            </div>
                          </div>
                        </div>

                        {/* Direct Pricing & Procurement Buttons */}
                        <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-850">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[10px] text-slate-400 font-bold block">ESTIMATE TARIFF:</span>
                            <span className="font-mono text-xs text-yellow-600 dark:text-yellow-400 font-black tracking-wide uppercase bg-yellow-450/10 dark:bg-yellow-400/5 px-2.5 py-1 rounded-lg">
                              RFQ Price On Inquiry
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            {/* Standard e-commerce Add to Cart */}
                            <button
                              id={`add-cart-list-${p.id}`}
                              onClick={() => handleAddToBasket(p, 50)}
                              className="bg-slate-900 hover:bg-slate-850 dark:bg-slate-800 dark:hover:bg-slate-700 text-white py-2.5 rounded-xl font-mono text-[10px] font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                            >
                              <ShoppingCart className="w-3.5 h-3.5" />
                              <span>Add to RFQ</span>
                            </button>

                            {/* RFQ custom quantity request */}
                            <button
                              id={`add-rfq-bulk-${p.id}`}
                              onClick={() => {
                                handleAddToBasket(p, 100);
                                setCheckoutStep("cart");
                                setActiveTab("checkout");
                              }}
                              className="bg-yellow-400 hover:bg-yellow-500 text-slate-950 py-2.5 rounded-xl font-mono text-[10px] font-black flex items-center justify-center gap-1 cursor-pointer select-none"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Custom Qty</span>
                            </button>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}

          {/* ==================== PAGE D: 3D CAD SIMULATOR LAB ==================== */}
          {activeTab === "3d-lab" && (
            <motion.div
              key="view-3d"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <TechnicalSimulator3D />
            </motion.div>
          )}

          {/* ==================== PAGE E: AI CONSULTING SPECIALIST ==================== */}
          {activeTab === "ai-chat" && (
            <motion.div
              key="view-ai"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <AiAssistant onAddToBasket={handleAddToBasket} />
            </motion.div>
          )}

          {/* ==================== PAGE F: CONTACT US (MAP, FORM & PARTICULARS) ==================== */}
          {activeTab === "contact" && (
            <motion.div
              key="view-contact"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-12"
            >
              <div className="text-center space-y-1 max-w-xl mx-auto">
                <span className="font-mono text-xs text-yellow-600 dark:text-yellow-400 uppercase font-bold tracking-widest block">
                  FAST REGIONAL COMMUNICATORS
                </span>
                <h3 className="font-sans font-black text-2xl sm:text-3.5xl tracking-tight text-slate-900 dark:text-white uppercase italic">
                  Contact Noor Al Maqdis
                </h3>
                <p className="text-xs text-slate-500">
                  Select your inquiry method or visit our centralized wholesale warehouses in Muweileh, Sharjah near Fire Station Road.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Contact particulars Left */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Address coordinates */}
                  <div className={`p-6 rounded-3xl border ${
                    theme === "dark" ? "bg-slate-900 border-slate-850" : "bg-white border-slate-200"
                  } shadow-sm space-y-4`}>
                    <h4 className="font-sans font-black text-sm text-slate-900 dark:text-white uppercase border-b border-slate-100 dark:border-slate-800 pb-3">
                      Wholesale Head Office
                    </h4>
                    
                    <div className="space-y-3.5 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                      <div className="flex gap-2.5 items-start">
                        <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                        <span>
                          <strong className="text-slate-900 dark:text-white uppercase font-sans">Physical Address:</strong><br />
                          Muweileh Industrial Area 14,<br />
                          Near Fire Station Road,<br />
                          Sharjah, United Arab Emirates
                        </span>
                      </div>

                      <div className="flex gap-2.5 items-start">
                        <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>
                          <strong className="text-slate-900 dark:text-white uppercase font-sans">Direct Telephone Lines:</strong><br />
                          <a href="tel:0506773318" className="hover:underline hover:text-yellow-600">050 677 3318</a> (Managing)<br />
                          <a href="tel:0555265277" className="hover:underline hover:text-yellow-600">055 526 5277</a> (Director)
                        </span>
                      </div>

                      <div className="flex gap-2.5 items-start">
                        <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                        <span>
                          <strong className="text-slate-900 dark:text-white uppercase font-sans">Corporate Emails:</strong><br />
                          <a href="mailto:h.jhopdiwala@gmail.com" className="hover:underline hover:text-yellow-600">h.jhopdiwala@gmail.com</a><br />
                          <a href="mailto:haidmohammed32@gmail.com" className="hover:underline hover:text-yellow-600">haidmohammed32@gmail.com</a>
                        </span>
                      </div>

                      <div className="flex gap-2.5 items-start">
                        <Clock className="w-4 h-4 text-yellow-500 shrink-0" />
                        <span>
                          <strong className="text-slate-900 dark:text-white uppercase font-sans">Operation Schedule:</strong><br />
                          Saturday - Thursday:<br />
                          08:00 AM - 08:30 PM (Continuous)<br />
                          Friday: Closed
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Brothers quick help box */}
                  <div className="p-6 rounded-3xl bg-yellow-400 text-slate-950 font-sans shadow-sm">
                    <h5 className="font-extrabold text-xs uppercase mb-1 tracking-wider leading-none">
                      DIRECT ASSISTING CHANNELS
                    </h5>
                    <p className="text-[11px] leading-relaxed mb-3">
                      Your technical bulk questions are routed directly to managing siblings Shabbir Hamid or Mustafa Hamid for competitive bids.
                    </p>
                    <span className="font-mono text-[9px] uppercase font-black bg-slate-900 text-yellow-400 px-2 py-0.5 rounded">
                      IMMEDIATE RESPONSE GAURANTEED
                    </span>
                  </div>

                </div>

                {/* Contact form Middle */}
                <div className="lg:col-span-4">
                  <form
                    onSubmit={handleContactSubmit}
                    className={`p-6 rounded-3xl border space-y-4 ${
                      theme === "dark" ? "bg-slate-900 border-slate-850" : "bg-white border-slate-200"
                    } shadow-sm`}
                  >
                    <h4 className="font-sans font-black text-sm text-slate-900 dark:text-white uppercase border-b border-slate-100 dark:border-slate-800 pb-3">
                      Dispatch Bulk Inquiry
                    </h4>

                    <div className="space-y-1">
                      <label className="block text-[9px] font-mono uppercase tracking-wide text-slate-400 font-bold">Contact Name *</label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="e.g. Eng. Mansoor Al-Hashimi"
                        className={`w-full py-2.5 px-3 rounded-xl text-xs focus:outline-none border ${
                          theme === "dark" ? "bg-slate-950 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
                        }`}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[9px] font-mono uppercase tracking-wide text-slate-400 font-bold">Business Email *</label>
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="procurement@buildingcom.ae"
                        className={`w-full py-2.5 px-3 rounded-xl text-xs focus:outline-none border ${
                          theme === "dark" ? "bg-slate-950 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
                        }`}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[9px] font-mono uppercase tracking-wide text-slate-400 font-bold">Subject Topic</label>
                      <select
                        value={contactSubject}
                        onChange={(e) => setContactSubject(e.target.value)}
                        className={`w-full py-2.5 px-3 rounded-xl text-xs focus:outline-none border font-mono ${
                          theme === "dark" ? "bg-slate-950 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
                        }`}
                      >
                        <option value="Bulk Fastener Inquiry">🔩 Bulk Fasteners / Anchor Inquiry</option>
                        <option value="Dongcheng Powertool Bids">⚡ Dongcheng Power Tools</option>
                        <option value="Electrical Supplies Distribution">🔌 Electrical conduit/breakers</option>
                        <option value="Joinery Resins and Paints">🎨 Fevicol SH / Paints</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[9px] font-mono uppercase tracking-wide text-slate-400 font-bold">Corporate Message details *</label>
                      <textarea
                        rows={4}
                        required
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="Please include exact quantities, metric sizes, and required certifications..."
                        className={`w-full p-3 rounded-xl text-xs focus:outline-none resize-none border ${
                          theme === "dark" ? "bg-slate-950 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
                        }`}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-slate-900 hover:bg-slate-850 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-mono text-xs font-bold py-3 rounded-xl transition-all uppercase cursor-pointer"
                    >
                      Transmit Form
                    </button>
                  </form>                {/* Embedded Real Google Maps Iframe Location Right */}
                <div className="lg:col-span-4 space-y-4">
                  <div className={`p-6 rounded-3xl border ${
                    theme === "dark" ? "bg-slate-900 border-slate-850" : "bg-white border-slate-200"
                  } shadow-sm space-y-4`}>
                    
                    <div className="flex justify-between items-center">
                      <h4 className="font-sans font-black text-sm text-slate-900 dark:text-white uppercase leading-none">
                        Company Location Map
                      </h4>
                      <span className="font-mono text-[8px] bg-red-500/10 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full font-bold">
                        SHARJAH INDUSTRIAL 14
                      </span>
                    </div>

                    {/* Real Embedded Google Maps Iframe */}
                    <div className="relative h-60 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-inner">
                      <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.3769185121405!2d55.4363248!3d25.3011782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5f4001ff2a0b%3A0x6b4fb6c189e47ed3!2sNoor%20Al%20Maqdis%20Hardware%20%26%20Electric!5e0!3m2!1sen!2sae!4v1717855000000!5m2!1sen!2sae"
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen={true} 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Noor Al Maqdis Location Map"
                      />
                    </div>

                    {/* External Navigation triggers */}
                    <div className="space-y-2">
                      <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest font-bold block">
                        Direct Navigation Link
                      </span>
                      <a
                        href="https://maps.app.goo.gl/4EuBUcZBKRebbT7Z9"
                        target="_blank"
                        referrerPolicy="no-referrer"
                        className="w-full bg-slate-900 hover:bg-slate-850 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-mono text-[11px] font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 border-none transition-all cursor-pointer shadow-sm text-center"
                      >
                        <MapPin className="w-4 h-4 text-yellow-400" />
                        <span>Launch Google Maps Route</span>
                      </a>
                    </div>
                    </div>

                  </div>
                </div>

              </div>

              {/* Corporate Logistics & Procurement FAQ Block */}
              <div className="border-t border-slate-200 dark:border-slate-800 pt-8 mt-12 space-y-6">
                <div className="text-center space-y-1">
                  <span className="font-mono text-[9px] text-yellow-600 dark:text-yellow-405 uppercase font-black tracking-widest block animate-pulse">
                    PROCUREMENT KNOWLEDGE DECK
                  </span>
                  <h4 className="font-sans font-black text-xl text-slate-900 dark:text-white uppercase italic">
                    Frequently Answered Inquiries
                  </h4>
                  <p className="text-xs text-slate-550 dark:text-slate-400 max-w-md mx-auto">
                    Essential insights on contract estimations, logistics shipping speed, and certification alignment.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      q: "How quick will our RFQ receive a quote sheet?",
                      a: "Noor Al Maqdis maintains a dedicated corporate fulfillment desk. Inquiries sent via WhatsApp or Email are estimated, formatted into official contracting stamps, and returned within 2 hours of dispatch.",
                      topic: "Fast TAT Turnaround"
                    },
                    {
                      q: "Can we request standardized trade compliance certifications?",
                      a: "Yes. All supplied plumbing, electrical, and industrial products are strictly sourced from certified genuine production lots. We supply official WRAS approval copies, BS/EN compliance sheets, and ESMA papers upon demand.",
                      topic: "Durable Compliance"
                    },
                    {
                      q: "Do you facilitate heavy freight dispatch across the UAE?",
                      a: "Indeed. Operating out of our central Muweileh warehouse, our heavy logistics trucks service daily distribution rounds throughout Dubai, Abu Dhabi, Sharjah, Ajman, and GCC sectors with fast-tracked site drops.",
                      topic: "Direct UAE Delivery"
                    }
                  ].map((faq, fIdx) => (
                    <div
                      key={fIdx}
                      className={`p-6 rounded-3xl border flex flex-col justify-between ${
                        theme === "dark" ? "bg-slate-900/40 border-slate-850 hover:border-yellow-450" : "bg-white border-slate-200 hover:border-yellow-500"
                      } transition-all duration-300 shadow-sm`}
                    >
                      <div className="space-y-3.5 text-left">
                        <span className="font-mono text-[8.5px] font-black text-yellow-600 dark:text-yellow-405 uppercase bg-yellow-400/10 px-2 py-1 rounded-full">
                          {faq.topic}
                        </span>
                        <h5 className="font-sans font-black text-xs text-slate-900 dark:text-white uppercase tracking-tight leading-relaxed">
                          "{faq.q}"
                        </h5>
                        <p className="text-[11px] text-slate-500 dark:text-slate-405 leading-relaxed font-sans">
                          {faq.a}
                        </p>
                      </div>
                      <div className="border-t border-slate-100 dark:border-slate-850/60 pt-3 mt-4 text-[9.5px] font-mono text-slate-400 text-left">
                        • Verified Trade Response
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ==================== PAGE G: CLIENT AUTH LOGIN REGISTRY ==================== */}
          {activeTab === "auth" && (
            <motion.div
              key="view-auth"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-md mx-auto space-y-6"
            >
              {user.isLoggedIn ? (
                <div className={`p-8 rounded-3xl border space-y-6 ${
                  theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                } shadow-sm`}>
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-yellow-400/10 text-yellow-605 dark:text-yellow-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
                      <User className="w-8 h-8" />
                    </div>
                    <h3 className="font-sans font-black text-lg text-slate-1000 dark:text-white uppercase leading-none">
                      Active Client Cabinet
                    </h3>
                    <p className="text-xs text-slate-500">
                      Welcome, Eng. {user.contactPerson}
                    </p>
                  </div>

                  <div className={`p-4 rounded-2xl space-y-3 font-mono text-[11px] ${
                    theme === "dark" ? "bg-slate-950" : "bg-slate-50 border border-slate-200"
                  }`}>
                    <div className="flex justify-between border-b border-slate-150/50 dark:border-slate-850 pb-2">
                      <span className="text-slate-400">Company Name:</span>
                      <strong className="text-slate-900 dark:text-white">{user.companyName}</strong>
                    </div>
                    <div className="flex justify-between border-b border-slate-150/50 dark:border-slate-850 pb-2">
                      <span className="text-slate-400">Account Category:</span>
                      <strong className="text-emerald-500 uppercase">{user.clientType}</strong>
                    </div>
                    {user.tradeLicense && (
                      <div className="flex justify-between border-b border-slate-150/50 dark:border-slate-850 pb-2">
                        <span className="text-slate-400">Trade License ID:</span>
                        <strong className="text-yellow-600 dark:text-yellow-400">{user.tradeLicense}</strong>
                      </div>
                    )}
                    <div className="flex justify-between border-b border-slate-150/50 dark:border-slate-850 pb-2">
                      <span className="text-slate-400">Verified Discount:</span>
                      <strong className="text-emerald-500 text-xs">
                        {user.clientType === "contractor" ? "10% VIP Discount" : "5% Member Discount"}
                      </strong>
                    </div>
                    <div className="flex justify-between pb-1">
                      <span className="text-slate-400 font-bold block">Wholesale Status:</span>
                      <strong className="text-blue-500">Pre-Approved Client</strong>
                    </div>
                  </div>

                  <p className="text-slate-400 text-[10.5px] leading-relaxed text-center font-mono">
                    *Your registered Contractor category rewards you with a persistent 10% subtotal deduction applied automatically inside your e-commerce checkouts!*
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setActiveTab("catalog")}
                      className="bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-mono text-xs font-bold py-2.5 rounded-xl cursor-pointer"
                    >
                      Browse Materials
                    </button>
                    <button
                      onClick={handleUserLogout}
                      className="bg-red-500 hover:bg-red-650 text-white font-mono text-xs font-bold py-2.5 rounded-xl cursor-pointer"
                    >
                      End Corporate Session
                    </button>
                  </div>
                </div>
              ) : (
                <div className={`p-8 rounded-3xl border space-y-6 ${
                  theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                } shadow-sm`}>
                  <div className="text-center space-y-1">
                    <h3 className="font-sans font-black text-xl text-slate-900 dark:text-white uppercase italic">
                      Client Authentication
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Register or login below to save quotes, track dockets, and claim your custom client discounts.
                    </p>
                  </div>

                  <form onSubmit={handleUserLogin} className="space-y-4">
                    <div className="space-y-1">
                      <label className="block text-[9px] font-mono uppercase tracking-wide text-slate-400 font-bold">Trading Company *</label>
                      <input
                        type="text"
                        required
                        value={loginCompany}
                        onChange={(e) => setLoginCompany(e.target.value)}
                        placeholder="e.g. Al Habtoor Contracting"
                        className={`w-full py-2.5 px-3 rounded-xl text-xs focus:outline-none border ${
                          theme === "dark" ? "bg-slate-950 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
                        }`}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[9px] font-mono uppercase tracking-wide text-slate-400 font-bold">Contact Person *</label>
                      <input
                        type="text"
                        required
                        value={loginPerson}
                        onChange={(e) => setLoginPerson(e.target.value)}
                        placeholder="e.g. Eng. Mansoor"
                        className={`w-full py-2.5 px-3 rounded-xl text-xs focus:outline-none border ${
                          theme === "dark" ? "bg-slate-950 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
                        }`}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[9px] font-mono uppercase tracking-wide text-slate-400 font-bold">Corporate Email *</label>
                      <input
                        type="email"
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="mansoor@habtoor.ae"
                        className={`w-full py-2.5 px-3 rounded-xl text-xs focus:outline-none border ${
                          theme === "dark" ? "bg-slate-950 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
                        }`}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[9px] font-mono uppercase tracking-wide text-slate-400 font-bold">Direct Phone Number</label>
                      <input
                        type="tel"
                        value={loginPhone}
                        onChange={(e) => setLoginPhone(e.target.value)}
                        placeholder="+971 50 XXXXXX"
                        className={`w-full py-2.5 px-3 rounded-xl text-xs focus:outline-none border ${
                          theme === "dark" ? "bg-slate-950 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
                        }`}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[9px] font-mono uppercase tracking-wide text-slate-400 font-bold">Business Category Type</label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: "contractor", label: "Contractor (10% Off)" },
                          { id: "workshop", label: "Workshop (5% Off)" },
                          { id: "retail", label: "Retail Cash" }
                        ].map((tp) => (
                          <button
                            key={tp.id}
                            type="button"
                            onClick={() => setLoginType(tp.id as any)}
                            className={`py-2 rounded-xl text-[9.5px] font-mono border font-extrabold transition-all cursor-pointer ${
                              loginType === tp.id
                                ? "bg-yellow-400 text-slate-950 border-yellow-405 font-bold"
                                : theme === "dark"
                                  ? "bg-slate-950 text-slate-400 border-slate-800"
                                  : "bg-slate-100 text-slate-650 border-slate-200"
                            }`}
                          >
                            {tp.label.split(" (")[0]}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-slate-900 hover:bg-slate-850 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-mono text-xs font-bold py-3 rounded-xl transition-all uppercase cursor-pointer"
                    >
                      Authenticate Contractor Session
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          )}

          {/* ==================== PAGE H: SHOPPING CART & INQUIRY CHECKOUT PROCESS ==================== */}
          {activeTab === "checkout" && (
            <motion.div
              key="view-checkout"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <h3 className="font-sans font-black text-lg text-slate-900 dark:text-white uppercase">
                      Procurement Cart & E-Commerce checkout
                    </h3>
                    <p className="text-xs text-slate-450 uppercase font-mono font-bold">
                      Switch between direct purchasing or custom high-volume custom quotation models
                    </p>
                  </div>
                  <button
                    onClick={() => setBasket([])}
                    disabled={basket.length === 0}
                    className="font-mono text-[10px] text-red-500 uppercase border border-red-500/20 px-3 py-1 bg-red-50/5 rounded hover:bg-red-500 hover:text-white transition-all cursor-pointer disabled:opacity-40"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>

              {basket.length === 0 && !createdReceipt ? (
                <div className="text-center py-20 bg-slate-100 dark:bg-slate-900/40 rounded-3xl border border-slate-200 dark:border-slate-850 space-y-4 max-w-xl mx-auto my-6">
                  <div className="w-12 h-12 rounded-full border border-slate-250 flex items-center justify-center text-slate-400 mx-auto animate-pulse">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  <h4 className="font-mono text-xs text-slate-500 uppercase">Your Procurement Basket is Empty</h4>
                  <p className="text-[11px] text-slate-400 max-w-sm mx-auto leading-relaxed">
                    Browse our high-tensile structural fasteners, dynamic drill bits, heavy duty spanners, and direct adhesives and add specifications to your queue.
                  </p>
                  <button
                    onClick={() => setActiveTab("catalog")}
                    className="bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-mono text-xs font-bold px-5 py-2 rounded-xl transition-all mt-2.5 cursor-pointer"
                  >
                    Load Material Catalogue
                  </button>
                </div>
              ) : !user.isLoggedIn ? (
                <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 space-y-5 max-w-xl mx-auto my-6 p-8 shadow-sm">
                  <div className="w-14 h-14 rounded-2xl bg-yellow-450/15 border border-yellow-450/20 flex items-center justify-center text-yellow-600 dark:text-yellow-405 mx-auto animate-pulse">
                    <ShieldCheck className="w-6 h-6 stroke-[2]" />
                  </div>
                  <h3 className="font-sans font-black text-slate-900 dark:text-white uppercase text-sm tracking-wide">Corporate Client Auth Required</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                    Under Noor Al Maqdis company guidelines, you must authenticate your corporate trading or contractor profile in order to submit a formal Request for Quote (RFQ) or download technical blueprints.
                  </p>
                  <div className="pt-4 space-y-3">
                    <button
                      onClick={() => setActiveTab("auth")}
                      className="w-full bg-slate-900 hover:bg-slate-850 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-mono text-xs font-bold py-3 px-5 rounded-xl transition-all cursor-pointer shadow-md uppercase"
                    >
                      Authenticate My Profile
                    </button>
                    <span className="text-[10px] text-slate-400 font-mono block">
                      Approved client representatives get automatic wholesale terms and local shipping privileges.
                    </span>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Cart lines column LHS */}
                  {checkoutStep !== "receipt" && (
                    <div className="lg:col-span-7 space-y-4">
                      <div className={`p-6 rounded-3xl border ${
                        theme === "dark" ? "bg-slate-900 border-slate-850" : "bg-white border-slate-200"
                      } shadow-sm space-y-4`}>
                        <h4 className="font-sans font-black text-xs text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800 pb-3">
                          Verified Cart Items ({basket.length} lines)
                        </h4>

                        <div className="space-y-3">
                          {basket.map((item) => {
                            const lineSubtotal = item.product.priceAED * item.quantity;
                            return (
                              <div
                                key={item.product.id}
                                className={`p-4 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-4 ${
                                  theme === "dark" ? "bg-slate-950 border-slate-850" : "bg-slate-50 border-slate-200"
                                }`}
                              >
                                <div>
                                  <h5 className="font-sans font-black text-xs text-slate-900 dark:text-white uppercase leading-none">
                                    {item.product.name}
                                  </h5>
                                  <span className="font-mono text-[9px] text-slate-400 block mt-1.5 leading-none">
                                    SKU Model: {item.product.model} • Brand: {item.product.brand}
                                  </span>
                                </div>

                                <div className="flex items-center gap-4">
                                  {/* Quantity adjust inputs */}
                                  <div className="flex items-center gap-1">
                                    <button
                                      onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 50)}
                                      className="p-1 rounded bg-slate-200 dark:bg-slate-850 hover:bg-yellow-400/20 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
                                    >
                                      <Minus className="w-3 h-3" />
                                    </button>
                                    <input
                                      type="number"
                                      value={item.quantity}
                                      onChange={(e) => handleUpdateQuantity(item.product.id, parseInt(e.target.value) || 1)}
                                      className="w-16 text-center font-mono text-[11px] bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded py-0.5"
                                    />
                                    <button
                                      onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 50)}
                                      className="p-1 rounded bg-slate-200 dark:bg-slate-850 hover:bg-yellow-400/20 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
                                    >
                                      <Plus className="w-3 h-3" />
                                    </button>
                                  </div>

                                  <div className="text-right font-mono text-xs w-20">
                                    <span className="text-slate-400 text-[9px] block">LINE TOTAL:</span>
                                    <strong className="text-slate-850 dark:text-yellow-400">{lineSubtotal.toFixed(1)} AED</strong>
                                  </div>

                                  <button
                                    onClick={() => handleRemoveFromBasket(item.product.id)}
                                    className="p-1.5 text-slate-400 hover:text-red-500 rounded hover:bg-red-50/10 cursor-pointer"
                                    title="Exclude line"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Alternate: Bulk RFQ quotation triggers */}
                      <div className={`p-6 rounded-3xl border ${
                        theme === "dark" ? "bg-slate-900/60 border-slate-800" : "bg-amber-50/30 border-yellow-200"
                      }`}>
                        <h4 className="font-sans font-black text-xs text-yellow-650 dark:text-yellow-400 uppercase tracking-widest mb-1 leading-none">
                          Inquiry Mode: Request a Custom Quote
                        </h4>
                        <p className="text-[11px] text-slate-500 leading-relaxed mb-4">
                          If your contractor team requires specific stress-certificates, custom metric threading offsets, or deferred cash terms, utilize our unified server-based RFQ quote transmitter instead.
                        </p>
                        
                        {/* Beautifully embedding standard RFQ form wrapper */}
                        <RfqForm
                          basket={basket}
                          onRemoveFromBasket={handleRemoveFromBasket}
                          onUpdateQuantity={handleUpdateQuantity}
                          onClearBasket={() => setBasket([])}
                          onInquirySubmitted={() => {
                            setActiveTab("admin");
                            setRecentNotification("Quotation recorded. Opening supplier ERP ledger.");
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Checkout summaries panel RHS */}
                  {checkoutStep !== "receipt" && (
                    <div className="lg:col-span-5">
                      <form
                        onSubmit={handleCheckoutSubmit}
                        className={`p-6 rounded-3xl border space-y-5 ${
                          theme === "dark" ? "bg-slate-900 border-slate-850" : "bg-white border-slate-200"
                        } shadow-sm`}
                      >
                         <h4 className="font-sans font-black text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800 pb-3">
                           Wholesale Procurement Protocol
                         </h4>

                         {/* Wholesale RFQ Guidelines Notice */}
                         <div className={`p-4 rounded-2xl border ${
                           theme === "dark" ? "bg-slate-950/60 border-slate-800" : "bg-yellow-400/5 border-yellow-400/20"
                         } space-y-3`}>
                           <div className="flex items-center gap-2">
                             <FileText className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                             <span className="font-sans font-extrabold text-slate-900 dark:text-white uppercase tracking-tight text-xs">Direct Wholesale RFQ</span>
                           </div>
                           <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                             Noor Al Maqdis operates on high-volume wholesale agreements. Pricing is custom-compiled on a direct <strong className="text-yellow-600 dark:text-yellow-400">Request for Quote (RFQ)</strong> basis according to the project size and company contract tier.
                           </p>
                           <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono space-y-1 bg-slate-50/50 dark:bg-slate-950 p-2.5 rounded-lg border border-slate-100 dark:border-slate-900">
                             <p className="flex justify-between">
                               <span>Cart Line Items:</span>
                               <strong className="text-slate-900 dark:text-white">{basket.length} Categories</strong>
                             </p>
                             <p className="flex justify-between">
                               <span>Minimum Order Value:</span>
                               <strong className="text-slate-900 dark:text-white">Wholesale MOQ Applies</strong>
                             </p>
                             <p className="flex justify-between">
                               <span>Estimated Pricing:</span>
                               <span className="font-sans font-extrabold text-yellow-600 dark:text-yellow-400">PRICE ON REQUEST</span>
                             </p>
                           </div>
                         </div>

                        {/* Customer shipment particulars form fields */}
                        <div className="space-y-3.5 pt-4 border-t border-slate-200 dark:border-slate-800">
                          <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest font-black block">
                            Billing / Delivery Location
                          </span>

                          <div className="space-y-1">
                            <label className="block text-[8.5px] font-mono uppercase text-slate-400">Contractor Representative *</label>
                            <input
                              type="text"
                              required
                              value={user.contactPerson}
                              onChange={(e) => setUser({ ...user, contactPerson: e.target.value })}
                              placeholder="Representative name"
                              className={`w-full py-2 px-3 rounded-lg text-xs focus:outline-none border ${
                                theme === "dark" ? "bg-slate-950 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
                              }`}
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[8.5px] font-mono uppercase text-slate-400">Corporate Phone *</label>
                            <input
                              type="text"
                              required
                              value={user.phone}
                              onChange={(e) => setUser({ ...user, phone: e.target.value })}
                              placeholder="Phone Contact"
                              className={`w-full py-2 px-3 rounded-lg text-xs focus:outline-none border ${
                                theme === "dark" ? "bg-slate-950 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
                              }`}
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[8.5px] font-mono uppercase text-slate-400">Project Delivery Site Address *</label>
                            <input
                              type="text"
                              required
                              value={user.shippingAddress || ""}
                              onChange={(e) => setUser({ ...user, shippingAddress: e.target.value })}
                              placeholder="e.g. Muweileh Industrial Area 14 Sharjah UAE"
                              className={`w-full py-2 px-3 rounded-lg text-xs focus:outline-none border ${
                                theme === "dark" ? "bg-slate-950 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
                              }`}
                            />
                          </div>
                        </div>

                        {/* Dual Action Submit Buttons */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                          <button
                            id="checkout-wa-submit-btn"
                            type="submit"
                            onClick={() => setCheckoutTarget("whatsapp")}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-[11px] font-black py-3.5 rounded-xl transition-all uppercase cursor-pointer text-center shadow-md flex items-center justify-center gap-1.5"
                          >
                            <span>💬 WhatsApp</span>
                          </button>
                          
                          <button
                            id="checkout-mail-submit-btn"
                            type="submit"
                            onClick={() => setCheckoutTarget("email")}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-mono text-[11px] font-black py-3.5 rounded-xl transition-all uppercase cursor-pointer text-center shadow-md flex items-center justify-center gap-1.5"
                          >
                            <span>✉️ Email</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* ==================== HIGH END INVOICE / RECEIPT SUMMARY ==================== */}
                  {checkoutStep === "receipt" && createdReceipt && (
                    <div className="lg:col-span-12 max-w-xl mx-auto w-full">
                      <div className={`p-8 rounded-[32px] border space-y-6 ${
                        theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-250"
                      } shadow-xl relative`}>
                        
                        {/* Decorative header ribbon */}
                        <div className="absolute top-0 left-0 right-0 h-2 bg-yellow-400 rounded-t-[32px]" />

                        <div className="text-center space-y-2">
                          <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-405 rounded-full flex items-center justify-center mx-auto shadow-inner">
                            <Check className="w-8 h-8 stroke-[3]" />
                          </div>
                          <h4 className="font-sans font-black text-xl text-slate-900 dark:text-white uppercase italic">
                            Procurement Docket Compiled
                          </h4>
                          <span className="font-mono text-[10px] text-slate-400 block">
                            Document Ref: <strong className="text-yellow-600 dark:text-yellow-400">{createdReceipt.orderId}</strong>
                          </span>
                        </div>

                        {/* Invoice Receipt Metadata details */}
                        <div className={`p-5 rounded-2xl space-y-3 font-mono text-[10.5px] border ${
                          theme === "dark" ? "bg-slate-950 border-slate-850" : "bg-slate-50 border-slate-200"
                        }`}>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Date Logged:</span>
                            <strong className="text-slate-900 dark:text-slate-200">{createdReceipt.dateStamp}</strong>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Enterprise Client:</span>
                            <strong className="text-slate-900 dark:text-slate-200">{createdReceipt.customerCompany}</strong>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Purchaser Rep:</span>
                            <strong className="text-slate-900 dark:text-slate-200">{createdReceipt.customerName}</strong>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Shipment Destination:</span>
                            <strong className="text-slate-900 dark:text-slate-200 text-right max-w-[240px] truncate">{createdReceipt.deliverySite}</strong>
                          </div>
                        </div>

                        {/* List of items purchased */}
                        <div className="space-y-2 border-t border-b border-slate-200 dark:border-slate-800 py-4">
                          <span className="font-sans font-extrabold text-[10px] text-slate-400 uppercase tracking-widest block">
                            Requested Component Lines
                          </span>
                          <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                            {createdReceipt.items.map((it: any) => (
                              <div key={it.product.id} className="flex justify-between font-mono text-[11px]">
                                <span className="text-slate-500 truncate max-w-[280px]">{it.product.name}</span>
                                <strong className="text-slate-900 dark:text-slate-200">Qty: {it.quantity} units</strong>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Receipt calculations logic */}
                        <div className="font-mono text-xs space-y-1.5 text-right bg-yellow-500/5 dark:bg-yellow-400/5 p-4 rounded-xl border border-yellow-400/25">
                          <div className="flex justify-between text-[11px]">
                            <span className="text-slate-450 font-bold">TARIFF COMPUTATION:</span>
                            <span className="text-yellow-650 dark:text-yellow-400 font-extrabold">Price On Inquiry (Bulk Terms)</span>
                          </div>
                          <div className="flex justify-between text-[11px] border-b border-yellow-400/10 pb-2">
                            <span className="text-slate-500 dark:text-slate-400">VIP Discount Schedule:</span>
                            <span className="text-emerald-500 font-bold">Applicable upon Approval</span>
                          </div>
                          <div className="flex justify-between text-xs pt-2 font-sans">
                            <strong className="text-slate-900 dark:text-white uppercase italic">ESTIMATED VALUATION:</strong>
                            <strong className="text-yellow-600 dark:text-yellow-400 font-mono text-md font-black">QUOTE ON INQUIRY</strong>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setCreatedReceipt(null);
                              setCheckoutStep("cart");
                              setActiveTab("catalog");
                            }}
                            className="flex-1 bg-slate-900 hover:bg-slate-850 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-mono text-xs font-bold py-3 rounded-xl cursor-pointer text-center"
                          >
                            Add More Materials
                          </button>
                          <button
                            onClick={() => {
                              window.print();
                            }}
                            className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-mono text-xs font-black py-3 rounded-xl cursor-pointer text-center"
                          >
                            Print Legal Draft
                          </button>
                        </div>

                      </div>
                    </div>
                  )}

                </div>
              )}
            </motion.div>
          )}

          {/* ==================== PAGE I: COOPERATE ERP MONITOR/DASHBOARD ==================== */}
          {activeTab === "admin" && (
            <motion.div
              key="view-admin"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-4xl mx-auto"
            >
              {!isErpAuthenticated ? (
                <div className="bg-slate-900 border border-slate-850 rounded-3xl p-8 max-w-md mx-auto text-center space-y-6 my-12 shadow-2xl">
                  <div className="w-16 h-16 bg-yellow-450/10 rounded-full border border-yellow-500/30 flex items-center justify-center mx-auto text-yellow-405">
                    <Lock className="w-8 h-8 shrink-0 animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-sans font-black text-lg text-white uppercase tracking-tight">
                      Confidential ERP Ledger
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      This partition contains wholesale contractor bid records, phone logs, and proprietary project materials lists under strict enterprise security guidelines.
                    </p>
                    <p className="font-mono text-[10px] text-yellow-400 bg-yellow-450/10 border border-yellow-500/10 py-1.5 px-3 rounded-lg text-center font-bold">
                      Owner Default Passcode: <span className="underline font-black">Noor2007</span> or <span className="underline font-black">1234</span>
                    </p>
                  </div>

                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (erpPasscode === "Noor2007" || erpPasscode === "1234") {
                      setIsErpAuthenticated(true);
                      setErpAuthError("");
                    } else {
                      setErpAuthError("Invalid passcode configured.");
                    }
                  }} className="space-y-4">
                    <input
                      type="password"
                      placeholder="ENTER PIN OR PASSCODE"
                      value={erpPasscode}
                      onChange={(e) => setErpPasscode(e.target.value)}
                      className="w-full text-center font-mono text-sm px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-yellow-400 tracking-widest placeholder-slate-650"
                    />
                    {erpAuthError && (
                      <p className="text-red-400 font-mono text-[10px] uppercase font-bold">
                        ⚠️ {erpAuthError}
                      </p>
                    )}
                    <button
                      type="submit"
                      className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-mono text-xs font-black py-3 rounded-xl cursor-pointer transition-all uppercase"
                    >
                      Authenticate Access
                    </button>
                  </form>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-850 pb-5 mb-6">
                    <div>
                      <span className="font-mono text-[9px] text-yellow-405 font-black uppercase tracking-widest block mb-1">
                        SECURE LOG PARTITION
                      </span>
                      <h3 className="font-sans font-black text-2xl text-white uppercase tracking-tight">
                        Noor Al Maqdis ERP System
                      </h3>
                      <p className="text-xs text-slate-400">
                        Proprietary procurement and corporate dispatch logs (Private local session).
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setIsErpAuthenticated(false);
                        setErpPasscode("");
                      }}
                      className="px-3 py-1.5 rounded-lg id-logout-lock font-mono text-[10px] text-red-400 border border-red-500/20 bg-red-950/20 hover:bg-red-950/40 cursor-pointer font-bold uppercase shrink-0 transition-all text-center self-start sm:self-center"
                    >
                      Lock Partition
                    </button>
                  </div>
                  <SuppliersDashboard />
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* ----------------- SEAMLESS COOPERATE FOOTER ----------------- */}
      <footer className={`border-t py-12 mt-20 relative overflow-hidden text-slate-400 leading-relaxed font-sans transition-colors ${
        theme === "dark" ? "border-slate-850 bg-slate-900/60" : "border-slate-200 bg-slate-100/50"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <NoorAlMaqdisLogo className="w-9 h-9 shrink-0 animate-pulse" />
              <span className="font-sans font-black tracking-tight text-slate-900 dark:text-white uppercase">
                NOOR AL MAQDIS HARDWARE & ELECTRIC
              </span>
            </div>
            
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
              Established in 2007, Noor Al Maqdis Trading supports contractors, workshops and traders across Sharjah and Deira with premium structural fasteners, electrical conduits, drop-forged spanners, auto auto-darkening masks, and wood adhesives of exceptional durability.
            </p>

            <div className="font-mono text-[9px] uppercase font-bold tracking-wider text-slate-400">
              STRICTLY FULFILLING ISO/DIN STANDARDS • © 2007-2026 CO. TRUSTED SUPPLY
            </div>
          </div>

          <div className="space-y-3 font-mono text-[11px] text-slate-550 dark:text-slate-400">
            <h5 className="font-sans font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider">
              Procurement Categories
            </h5>
            <ul className="space-y-2">
              <li><button onClick={() => { setSelectedCategory("hand-tools"); setActiveTab("catalog"); }} className="hover:text-yellow-600 dark:hover:text-yellow-400 transition-all text-left">HKK Drop-Forged Tools</button></li>
              <li><button onClick={() => { setSelectedCategory("power-tools"); setActiveTab("catalog"); }} className="hover:text-yellow-600 dark:hover:text-yellow-400 transition-all text-left">Dongcheng Power Tools</button></li>
              <li><button onClick={() => { setSelectedCategory("electrical"); setActiveTab("catalog"); }} className="hover:text-yellow-600 dark:hover:text-yellow-400 transition-all text-left">Electrical Accessories</button></li>
              <li><button onClick={() => { setSelectedCategory("bolts-fasteners"); setActiveTab("catalog"); }} className="hover:text-yellow-600 dark:hover:text-yellow-400 transition-all text-left font-bold">3M / Fevicol Resins & Fasteners</button></li>
            </ul>
          </div>

          <div className="space-y-3 font-mono text-[11px] text-slate-550 dark:text-slate-400">
            <h5 className="font-sans font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider">
              Muweileh Head Office
            </h5>
            <p className="leading-snug">
              Sharp Industrial Area 14,<br />
              Near Fire Station Road,<br />
              Sharjah, United Arab Emirates
            </p>
            <div className="pt-2 text-[10px] space-y-0.5">
              <div>Telephone: 0506773318 / 0555265277</div>
              <div>Inquiries: h.jhopdiwala@gmail.com</div>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
