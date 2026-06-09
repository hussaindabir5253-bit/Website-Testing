import React, { useState, useEffect } from "react";
import { QuoteInquiry } from "../types";
import { Layers, ShieldCheck, Mail, Phone, Calendar, MapPin, BadgeAlert, AlertCircle, RefreshCw, FileText, Check, Clipboard, Clock, User } from "lucide-react";

export default function SuppliersDashboard() {
  const [inquiries, setInquiries] = useState<QuoteInquiry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState<QuoteInquiry | null>(null);

  const fetchInquiries = async () => {
    setIsLoading(true);
    setErrorStatus("");
    try {
      const res = await fetch("/api/inquiries");
      if (!res.ok) {
        throw new Error("Unable to contact backend database.");
      }
      const data = await res.json();
      setInquiries(data);
    } catch (err: any) {
      console.error("Fetch inquiries error:", err);
      setErrorStatus("Failed to synchronize ERP log files on server.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });

      if (!res.ok) {
        throw new Error("Failed to dispatch status command.");
      }

      // Sync local list state
      setInquiries((prev) =>
        prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus as any } : inq))
      );
      if (selectedInquiry?.id === id) {
        setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus as any } : null));
      }
    } catch (err: any) {
      alert("Error dispatching ERP status change: " + err.message);
    }
  };

  // Stat computations
  const totalInquiriesCount = inquiries.length;
  const criticalUrgencyCount = inquiries.filter((i) => i.urgency === "high").length;
  const pendingReviewCount = inquiries.filter((i) => i.status === "pending").length;
  const totalVolumeInvoiced = inquiries.reduce(
    (total, inq) => total + inq.items.reduce((sum, item) => sum + item.quantity, 0),
    0
  );

  const getUrgencyStyle = (urg: string) => {
    if (urg === "high") return "bg-red-950/80 text-red-400 border-red-500/20";
    if (urg === "medium") return "bg-orange-950/80 text-orange-400 border-orange-500/20";
    return "bg-blue-950/80 text-blue-400 border-blue-500/20";
  };

  const getStatusStyle = (status: string) => {
    if (status === "pending") return "bg-zinc-800 text-zinc-300";
    if (status === "reviewed") return "bg-indigo-950/80 text-indigo-400 border border-indigo-500/10";
    if (status === "approved") return "bg-emerald-950/80 text-emerald-400 border border-emerald-500/10";
    return "bg-amber-950/80 text-amber-400 border border-amber-500/10"; // Completed
  };

  return (
    <div id="suppliers-dashboard-root" className="space-y-6">
      {/* HUD metrics dashboard line */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Quotes */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 flex items-center justify-between shadow-sm">
          <div>
            <span className="font-mono text-[10px] text-zinc-500 uppercase block mb-1">Total RFQ Volume</span>
            <span className="font-sans font-bold text-2xl text-white">{totalInquiriesCount}</span>
          </div>
          <FileText className="w-8 h-8 text-amber-500/20 shrink-0" />
        </div>

        {/* Pending review */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 flex items-center justify-between shadow-sm">
          <div>
            <span className="font-mono text-[10px] text-zinc-500 uppercase block mb-1">Pending Evaluation</span>
            <span className="font-sans font-bold text-2xl text-white">{pendingReviewCount}</span>
          </div>
          <Clock className="w-8 h-8 text-indigo-500/20 shrink-0" />
        </div>

        {/* Critical Level */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 flex items-center justify-between shadow-sm">
          <div>
            <span className="font-mono text-[10px] text-zinc-500 uppercase block mb-1">Critical Urgency</span>
            <span className="font-sans font-bold text-2xl text-rose-500">{criticalUrgencyCount}</span>
          </div>
          <BadgeAlert className="w-8 h-8 text-rose-500/20 shrink-0 animate-pulse" />
        </div>

        {/* Sum quantities */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 flex items-center justify-between shadow-sm">
          <div>
            <span className="font-mono text-[10px] text-zinc-500 uppercase block mb-1">Metric Fastener Volume</span>
            <span className="font-sans font-bold text-2xl text-emerald-400">
              {totalVolumeInvoiced.toLocaleString()} units
            </span>
          </div>
          <Layers className="w-8 h-8 text-emerald-500/20 shrink-0" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT TAB: Inquiry Lists */}
        <div className="lg:col-span-7 bg-zinc-950 rounded-3xl p-6 border border-zinc-800 space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-4 mb-2">
            <h4 className="font-sans font-bold text-base text-white flex items-center gap-2">
              <Clipboard className="w-5 h-5 text-amber-500" />
              Incoming Contractor Inquiries
            </h4>
            <button
              id="refresh-erp-btn"
              onClick={fetchInquiries}
              disabled={isLoading}
              className="text-zinc-500 hover:text-white flex items-center gap-1 text-[10px] font-mono border border-zinc-800 px-2 py-1 rounded transition-all disabled:opacity-40"
            >
              <RefreshCw className={`w-3 h-3 ${isLoading ? "animate-spin" : ""}`} />
              <span>Sync ERP Log</span>
            </button>
          </div>

          {errorStatus && (
            <div className="bg-red-950/60 border border-red-500/20 p-4 rounded-2xl text-xs text-red-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              <span>{errorStatus}</span>
            </div>
          )}

          {isLoading && inquiries.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="font-mono text-[11px] text-zinc-500">Synchronizing pipeline data...</p>
            </div>
          ) : inquiries.length === 0 ? (
            <div className="text-center py-16 flex flex-col items-center justify-center gap-2">
              <Clipboard className="w-8 h-8 text-zinc-700 animate-pulse" />
              <p className="text-zinc-500 text-xs">No contract requests found.</p>
              <p className="text-zinc-600 text-[10px]">Log in as a contractor, pile your list, and submit a quote request to populate these logs.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {inquiries.map((inq) => (
                <div
                  key={inq.id}
                  id={`inquiry-tile-${inq.id}`}
                  onClick={() => setSelectedInquiry(inq)}
                  className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                    selectedInquiry?.id === inq.id
                      ? "bg-zinc-900 border-amber-500/50 shadow-md"
                      : "bg-zinc-900/50 border-zinc-800/80 hover:border-zinc-700"
                  }`}
                >
                  <div className="flex justify-between items-start gap-3">
                    <div className="min-w-0">
                      <h5 className="font-sans font-bold text-white text-xs truncate">{inq.companyName}</h5>
                      <span className="font-mono text-[10px] text-zinc-400 mt-1 block">
                        Attn: {inq.contactPerson}
                      </span>
                    </div>

                    <div className="shrink-0 flex flex-col gap-1 items-end">
                      <span className={`text-[9px] font-mono font-medium px-2 py-0.5 rounded-full border ${getUrgencyStyle(inq.urgency)}`}>
                        {inq.urgency.toUpperCase()}
                      </span>
                      <span className={`text-[9px] font-mono uppercase tracking-wide px-2 py-0.5 rounded-full ${getStatusStyle(inq.status)}`}>
                        {inq.status}
                      </span>
                    </div>
                  </div>

                  {/* Summary of items inside */}
                  <div className="mt-3 pt-3 border-t border-zinc-850 flex items-center justify-between gap-4">
                    <span className="font-mono text-[10px] text-zinc-500">
                      {inq.items.length} line items ({inq.items.reduce((s, i) => s + i.quantity, 0)} units)
                    </span>
                    <span className="font-mono text-[9px] text-zinc-500">
                      {new Date(inq.timestamp).toLocaleDateString()} {new Date(inq.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT TAB: Detail Inquiries View / Action Controller */}
        <div className="lg:col-span-5 bg-zinc-950 rounded-3xl p-6 border border-zinc-800 min-h-[380px] flex flex-col justify-between">
          {selectedInquiry ? (
            <div id="selected-inquiry-detail" className="space-y-6">
              <div>
                <span className="font-mono text-[9px] text-amber-500 uppercase block tracking-widest font-bold mb-1">
                  ERP Log Reference: {selectedInquiry.id}
                </span>
                <h4 className="font-sans font-bold text-base text-white">{selectedInquiry.companyName}</h4>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${getStatusStyle(selectedInquiry.status)}`}>
                    Status: {selectedInquiry.status.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Company metadata */}
              <div className="bg-zinc-900 border border-zinc-850 p-4 rounded-xl space-y-2 font-mono text-xs text-zinc-300">
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Contact: {selectedInquiry.contactPerson}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-zinc-500" />
                  <span className="truncate">Email: {selectedInquiry.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Phone: {selectedInquiry.phone}</span>
                </div>
                {selectedInquiry.projectLocation && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                    <span className="truncate">Location: {selectedInquiry.projectLocation}</span>
                  </div>
                )}
                {selectedInquiry.projectDeadline && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                    <span>Deadline: {selectedInquiry.projectDeadline}</span>
                  </div>
                )}
              </div>

              {/* Bill of materials catalog breakdown */}
              <div>
                <h5 className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block mb-2 font-bold">
                  Requested Materials Specifications
                </h5>
                <div className="space-y-2 border-t border-b border-zinc-900 py-3 max-h-[160px] overflow-y-auto">
                  {selectedInquiry.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between items-start gap-4 text-xs font-mono">
                      <div className="min-w-0">
                        <span className="text-white font-medium block truncate">{it.product.name}</span>
                        <span className="text-zinc-500 text-[10px] block font-mono mt-0.5">
                          {it.product.brand} • {it.product.model}
                        </span>
                        {it.notes && (
                          <span className="text-amber-500/85 text-[10px] block mt-0.5 italic">
                            Note: {it.notes}
                          </span>
                        )}
                      </div>
                      <span className="text-amber-400 font-bold shrink-0">x {it.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Special instructions */}
              {selectedInquiry.comments && (
                <div className="bg-zinc-900/40 p-3.5 rounded-xl border border-zinc-850">
                  <span className="font-mono text-[10px] text-zinc-500 block uppercase mb-1">Contractor Notes</span>
                  <p className="text-zinc-300 text-xs italic tracking-wide leading-relaxed">
                    "{selectedInquiry.comments}"
                  </p>
                </div>
              )}

              {/* Admin status togglers details */}
              <div className="border-t border-zinc-900 pt-4">
                <span className="font-mono text-[10px] text-zinc-500 block uppercase mb-2">
                  Update Supply Chain Stage
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {[
                    { id: "pending", style: "border-zinc-800 text-zinc-400 hover:text-white" },
                    { id: "reviewed", style: "border-indigo-500/20 text-indigo-400 hover:bg-indigo-950/20" },
                    { id: "approved", style: "border-emerald-500/20 text-emerald-400 hover:bg-emerald-950/20" },
                    { id: "completed", style: "border-amber-500/20 text-amber-400 hover:bg-amber-950/20" }
                  ].map((act) => (
                    <button
                      key={act.id}
                      id={`status-${act.id}`}
                      onClick={() => handleUpdateStatus(selectedInquiry.id, act.id)}
                      className={`py-1.5 rounded border text-[9px] font-mono font-medium tracking-wide transition-all ${
                        selectedInquiry.status === act.id
                          ? "bg-amber-500 text-black border-amber-500 font-bold"
                          : act.style
                      }`}
                    >
                      {act.id === "completed" ? "DISPATCH" : act.id.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-20 gap-3">
              <Layers className="w-10 h-10 text-zinc-700 animate-pulse" />
              <span className="font-mono text-zinc-400 text-xs font-bold uppercase tracking-widest">
                ERP Material Inspector
              </span>
              <p className="text-zinc-600 text-[10px] max-w-xs">
                Pick a contractor inquiry card from the log grid to inspect complete cargo dimensions, project targets, phone coordinates, or trigger state dispatch commands.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
