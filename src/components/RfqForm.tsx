import React, { useState } from "react";
import { QuoteItem, Product } from "../types";
import { ShoppingCart, Trash2, Mail, Phone, Building, User, MapPin, Calendar, Clock, Send, CheckCircle } from "lucide-react";

interface RfqFormProps {
  basket: QuoteItem[];
  onRemoveFromBasket: (productId: string) => void;
  onUpdateQuantity: (productId: string, qty: number) => void;
  onClearBasket: () => void;
  onInquirySubmitted: () => void;
}

export default function RfqForm({
  basket,
  onRemoveFromBasket,
  onUpdateQuantity,
  onClearBasket,
  onInquirySubmitted
}: RfqFormProps) {
  // Client details
  const [companyName, setCompanyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [projectDeadline, setProjectDeadline] = useState("");
  const [projectLocation, setProjectLocation] = useState("");
  const [urgency, setUrgency] = useState<"low" | "medium" | "high">("medium");
  const [comments, setComments] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitTarget, setSubmitTarget] = useState<"whatsapp" | "email">("whatsapp");

  const generateMessageText = () => {
    let text = `NOOR AL MAQDIS HARDWARE & ELECTRICAL CO. - RFQ INQUIRY\n`;
    text += `==========================================\n`;
    text += `Company Name: ${companyName}\n`;
    text += `Contact Person: ${contactPerson}\n`;
    text += `Email Address: ${email}\n`;
    text += `Phone Contact: ${phone}\n`;
    if (projectLocation) text += `Project Site: ${projectLocation}\n`;
    if (projectDeadline) text += `Target Deadline: ${projectDeadline}\n`;
    text += `Urgency Priority: ${urgency.toUpperCase()}\n`;
    if (comments) text += `Additional Specs: ${comments}\n`;
    text += `==========================================\n`;
    text += `BASKET INQUIRY LIST:\n`;
    
    basket.forEach((item, index) => {
      text += `[${index + 1}] Brand: ${item.product.brand} - ${item.product.name}\n`;
      text += `    Model: ${item.product.model} | Qty: ${item.quantity} units\n`;
    });
    text += `==========================================\n`;
    text += `Sent from Noor Al Maqdis Web Portal`;
    return text;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!basket.length) {
      setErrorMessage("Your RFQ Basket is empty. Please add products from our catalog first.");
      return;
    }

    if (!companyName || !contactPerson || !email || !phone) {
      setErrorMessage("Please fill in all mandatory company contact fields.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // 1. Submit to server-side central dashboard for local ledger sync
      try {
        await fetch("/api/inquiries", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            companyName,
            contactPerson,
            email,
            phone,
            projectDeadline,
            projectLocation,
            urgency,
            comments,
            items: basket
          })
        });
      } catch (dbErr) {
        console.warn("DB logging unsuccessful, proceeding to direct transmission:", dbErr);
      }

      // 2. Open communication channels based on selected button
      const textToTransmit = generateMessageText();
      
      if (submitTarget === "whatsapp") {
        const waUrl = `https://wa.me/971506773318?text=${encodeURIComponent(textToTransmit)}`;
        window.open(waUrl, "_blank");
      } else {
        const mailUrl = `mailto:h.jhopdiwala@gmail.com?subject=Corporate RFQ Inquiry - ${encodeURIComponent(companyName)}&body=${encodeURIComponent(textToTransmit)}`;
        window.open(mailUrl, "_blank");
      }

      setSubmitSuccess(true);
      onClearBasket();
      // Clear fields
      setCompanyName("");
      setContactPerson("");
      setEmail("");
      setPhone("");
      setProjectDeadline("");
      setProjectLocation("");
      setComments("");
    } catch (err: any) {
      console.error("RFQ Submit Error:", err);
      setErrorMessage("Unable to submit quote. " + (err.message || "Please check communication configuration."));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div id="rfq-submission-success" className="bg-slate-900 border border-emerald-500/20 rounded-3xl p-8 text-center max-w-xl mx-auto my-8 shadow-sm">
        <div className="w-16 h-16 bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h3 className="font-sans font-black text-xl text-white uppercase mb-2">Inquiry Transmitted Successfully</h3>
        <p className="text-slate-400 text-xs leading-relaxed mb-6">
          Your Request for Quote (RFQ) has been logged in Noor Al Maqdis's central ERP database. Our procurement coordinators and logistics team will evaluate structural load specs and email your project pricing within 4-6 business hours.
        </p>
        <button
          id="rfq-reset-btn"
          onClick={() => {
            setSubmitSuccess(false);
            onInquirySubmitted();
          }}
          className="bg-yellow-400 hover:bg-yellow-500 text-slate-950 px-6 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer shadow-sm"
        >
          Build Another RFQ
        </button>
      </div>
    );
  }

  return (
    <div id="rfq-form-root" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT COL: Basket overview */}
      <div className="lg:col-span-7 bg-slate-900 border border-slate-850 rounded-3xl p-6 shadow-sm">
        <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-yellow-400" />
            <h4 className="font-sans font-black text-base text-white uppercase">Your RFQ Bill of Materials ({basket.length} lines)</h4>
          </div>
          {basket.length > 0 && (
            <button
              id="clear-basket-btn"
              onClick={onClearBasket}
              className="text-slate-350 hover:text-white text-[10px] font-mono uppercase tracking-wide border border-slate-800 bg-slate-950 hover:bg-slate-900 px-2.5 py-1 rounded cursor-pointer"
            >
              Clear Basket
            </button>
          )}
        </div>

        {basket.length === 0 ? (
          <div className="text-center py-16 flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full border border-slate-800 bg-slate-950/40 flex items-center justify-center text-slate-550">
              <ShoppingCart className="w-6 h-6 animate-pulse" />
            </div>
            <p className="text-slate-400 text-xs font-bold">Your inquiry basket is empty.</p>
            <p className="text-slate-500 text-[10px] max-w-xs mx-auto leading-relaxed">
              Browse our industrial product catalog across spanners, wedge concrete anchors, and IGBT welders, then append them to your quote query.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {basket.map((item) => (
              <div 
                key={item.product.id}
                className="bg-slate-950 border border-slate-850/60 p-4 rounded-2xl flex md:flex-row flex-col md:items-center justify-between gap-4 transition-all hover:border-slate-800 shadow-inner"
              >
                <div>
                  <h5 className="font-sans font-black text-white text-xs uppercase">{item.product.name}</h5>
                  <div className="flex flex-wrap gap-2 text-[10px] font-mono text-slate-450 mt-1">
                    <span className="text-yellow-400">{item.product.brand}</span>
                    <span>•</span>
                    <span>Model: {item.product.model}</span>
                    <span>•</span>
                    <span className="text-slate-300 font-bold bg-slate-900 px-1.5 py-0.5 rounded">{item.product.material}</span>
                  </div>
                </div>

                {/* Adjustments row */}
                <div className="flex items-center gap-4 shrink-0 md:justify-end justify-between border-t md:border-t-0 border-slate-850 md:pt-0 pt-2 grid grid-cols-2 md:grid-cols-none">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-slate-450 font-bold">QTY:</span>
                    <input
                      id={`gty-input-${item.product.id}`}
                      type="number"
                      min="1"
                      max="100000"
                      value={item.quantity}
                      onChange={(e) => onUpdateQuantity(item.product.id, Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-20 bg-slate-900 border border-slate-800 text-white font-mono text-center rounded py-1 text-xs focus:outline-none focus:border-yellow-450 font-bold"
                    />
                  </div>
                  <button
                    id={`remove-item-${item.product.id}`}
                    onClick={() => onRemoveFromBasket(item.product.id)}
                    className="text-slate-500 hover:text-red-400 p-1.5 rounded hover:bg-slate-905 justify-self-end md:justify-self-auto cursor-pointer"
                    title="Delete item line"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT COL: Contact specifications */}
      <div className="lg:col-span-5 bg-slate-900 border border-slate-850 rounded-3xl p-6 shadow-sm">
        <h4 className="font-sans font-black text-base text-white border-b border-slate-800 pb-4 mb-4 uppercase">
          Corporate Procurement Details
        </h4>

        {errorMessage && (
          <div className="bg-red-950/40 border border-red-900/40 text-red-400 p-3 rounded-xl text-xs mb-4 flex items-center gap-2 shadow-sm animate-pulse">
            <Trash2 className="w-4 h-4 shrink-0 text-red-500" />
            <span className="font-semibold">{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Company name */}
            <div>
              <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Company Name *</label>
              <div className="relative">
                <Building className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
                <input
                  id="rfq-com-name"
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Al Habtoor Contracting"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-yellow-450 transition-all shadow-inner"
                />
              </div>
            </div>

            {/* Contact person */}
            <div>
              <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Contact Person *</label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
                <input
                  id="rfq-contact-person"
                  type="text"
                  required
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  placeholder="e.g. Eng. Mansoor"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-yellow-450 transition-all shadow-inner"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email */}
            <div>
              <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Email Address *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
                <input
                  id="rfq-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.ae"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-yellow-450 transition-all shadow-inner"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Corporate Phone *</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
                <input
                  id="rfq-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+971 50 XXXXXX"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-yellow-450 transition-all shadow-inner"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Delivery location */}
            <div>
              <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Delivery / Project Site</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
                <input
                  id="rfq-location"
                  type="text"
                  value={projectLocation}
                  onChange={(e) => setProjectLocation(e.target.value)}
                  placeholder="e.g. Jebel Ali Industrial 1"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-yellow-450 transition-all shadow-inner"
                />
              </div>
            </div>

            {/* Target Deadline */}
            <div>
              <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Target Deadline</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
                <input
                  id="rfq-deadline"
                  type="date"
                  value={projectDeadline}
                  onChange={(e) => setProjectDeadline(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-yellow-450 transition-all shadow-inner"
                />
              </div>
            </div>
          </div>

          {/* Urgency selection */}
          <div>
            <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1.5 flex items-center gap-1 font-bold">
              <Clock className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
              RFQ Urgency Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { level: "low", label: "Standard (3-5 days)" },
                { level: "medium", label: "Priority (24-48h)" },
                { level: "high", label: "CRITICAL (Immediate)" }
              ].map((urg) => (
                <button
                  key={urg.level}
                  id={`urgency-${urg.level}`}
                  type="button"
                  onClick={() => setUrgency(urg.level as any)}
                  className={`py-2 rounded-xl text-[10px] font-mono border transition-all cursor-pointer ${
                    urgency === urg.level
                      ? "bg-yellow-400 text-slate-950 border-yellow-405 font-bold shadow-sm"
                      : "bg-slate-950 text-slate-400 border border-slate-800 hover:bg-slate-900"
                  }`}
                >
                  {urg.label.split(" (")[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Comments & special specs */}
          <div>
            <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Additional Project Specifications / Cert requests</label>
            <textarea
              id="rfq-comments"
              rows={3}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="List specific mechanical load metrics, packaging requests, split delivery schedules, or ISO certifications..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-yellow-450 transition-all resize-none shadow-inner"
            />
          </div>

          {/* Dual Action Submit Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            <button
              id="rfq-submit-whatsapp-btn"
              type="submit"
              disabled={isSubmitting || !basket.length}
              onClick={() => setSubmitTarget("whatsapp")}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl font-mono text-[11px] font-black flex items-center justify-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer text-center shadow-md uppercase"
            >
              {isSubmitting && submitTarget === "whatsapp" ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <span className="text-sm">💬</span>
              )}
              <span>Send over WhatsApp</span>
            </button>

            <button
              id="rfq-submit-email-btn"
              type="submit"
              disabled={isSubmitting || !basket.length}
              onClick={() => setSubmitTarget("email")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-mono text-[11px] font-black flex items-center justify-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer text-center shadow-md uppercase"
            >
              {isSubmitting && submitTarget === "email" ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <span className="text-sm">✉️</span>
              )}
              <span>Send over Email</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
