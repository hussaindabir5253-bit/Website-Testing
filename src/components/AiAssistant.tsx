import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PRODUCTS } from "../data";
import { Product } from "../types";
import { MessageSquare, Send, Sparkles, AlertCircle, ShoppingCart, ArrowRight, User, Cpu } from "lucide-react";

interface Message {
  role: "user" | "model";
  text: string;
}

interface AiAssistantProps {
  onAddToBasket: (product: Product) => void;
}

export default function AiAssistant({ onAddToBasket }: AiAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Hello! I am the **Noor Al Maqdis AI Technical Specialist**. I can help you select exact hardware specs, calculate galvanic compatibilities for marine environments, decipher DIN/ANSI standards, or compile your Request for Quote (RFQ). Ask me any technical product queries!"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Smooth scroll to the START of the assistant's response
  useEffect(() => {
    if (scrollRef.current && messages.length > 0) {
      const scrollContainer = scrollRef.current;
      const lastMessage = messages[messages.length - 1];

      if (lastMessage.role === "model") {
        setTimeout(() => {
          const lastEl = messageRefs.current[messages.length - 1];
          if (lastEl) {
            // Bring the start of the response bubble into the browser window viewport safely
            lastEl.scrollIntoView({ behavior: "smooth", block: "start" });
            // Align the top of the message bubble inside the scroll container
            scrollContainer.scrollTo({
              top: lastEl.offsetTop - 14,
              behavior: "smooth"
            });
          } else {
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
          }
        }, 150);
      } else {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isLoading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = { role: "user", text: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // package previous 4 messages for conversational context
      const chatHistory = messages.slice(-4);

      const res = await fetch("/api/assistant/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: chatHistory
        })
      });

      if (!res.ok) {
        throw new Error("Server transmission error.");
      }

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "model", text: data.reply }]);
    } catch (error) {
      console.error("AI chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "I experienced a signal interruption when communicating with my deep core intelligence. Rest assured, you can find our Premium Wedge anchors (M12) and dual-voltage inverter arc welders below or submit a manual inquiry request!"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper custom parser to format Markdown strings elegantly back to HTML components
  const renderMarkdown = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, lIdx) => {
      // Headings
      if (line.startsWith("### ")) {
        return <h4 key={lIdx} className="text-slate-900 dark:text-white font-bold text-sm mt-3 mb-1.5">{line.substring(4)}</h4>;
      }
      if (line.startsWith("## ")) {
        return <h3 key={lIdx} className="text-slate-900 dark:text-white font-bold text-base mt-4 mb-2 border-b border-slate-205 dark:border-slate-800 pb-1">{line.substring(3)}</h3>;
      }

      // Bullet points
      if (line.startsWith("- ") || line.startsWith("* ")) {
        const content = formatLineText(line.substring(2));
        return <li key={lIdx} className="text-slate-700 dark:text-slate-300 text-xs ml-4 list-disc mb-1 leading-relaxed">{content}</li>;
      }

      // Empty Lines
      if (!line.trim()) {
        return <div key={lIdx} className="h-2" />;
      }

      // Standard lines
      return <p key={lIdx} className="text-slate-700 dark:text-slate-300 text-xs mb-2 leading-relaxed">{formatLineText(line)}</p>;
    });
  };

  // Format bold lines **text** and inline codes `code`
  const formatLineText = (lineText: string) => {
    // Regex for bold ** and inline `
    const boldRegex = /\*\*(.*?)\*\*/g;
    const codeRegex = /`(.*?)`/g;

    const parts: React.ReactNode[] = [];
    let lastIndex = 0;

    // Combine matching tokens
    // Simple inline split helper for safety
    let text = lineText;
    const tempElements: { type: "bold" | "code" | "text"; content: string; key: number }[] = [];
    let counter = 0;

    // Simple tokens sweep
    // We'll replace markdown delimiters linearly or split using simple algorithm
    const words = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    
    return words.map((chunk, idx) => {
      if (chunk.startsWith("**") && chunk.endsWith("**")) {
        return <strong key={idx} className="text-yellow-600 font-bold">{chunk.substring(2, chunk.length - 2)}</strong>;
      }
      if (chunk.startsWith("`") && chunk.endsWith("`")) {
        return <code key={idx} className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded font-mono text-[10px] border border-slate-200">{chunk.substring(1, chunk.length - 1)}</code>;
      }
      return chunk;
    });
  };

  // Inspect generated text for matches with products from catalog so user can add them directly
  const extractMatchingCatalogItems = (text: string) => {
    const uppercaseText = text.toUpperCase();
    const matched: Product[] = [];

    PRODUCTS.forEach((prod) => {
      const idMatch = prod.id.toUpperCase();
      const nameMatch = prod.name.toUpperCase();
      const modelMatch = prod.model.toUpperCase();

      if (
        uppercaseText.includes(idMatch) ||
        uppercaseText.includes(modelMatch) ||
        uppercaseText.includes(prod.brand.toUpperCase()) && uppercaseText.includes(prod.category.toUpperCase().split("-")[0])
      ) {
        if (!matched.some((m) => m.id === prod.id)) {
          matched.push(prod);
        }
      }
    });

    return matched;
  };

  const samplePromptChips = [
    { label: "Milano basin mixer features?", prompt: "What are the material specs and certifications of the Milano Luxury Basin Mixer?" },
    { label: "Philips LED Panel effiency?", prompt: "Does the Philips 60x60 LED Panel light come with anti-flicker drivers? What are its lumen ratings?" },
    { label: "Hilti TE-30 rotary specs?", prompt: "Tell me about the Hilti TE-30 Rotary Hammer. Does it feature active vibration isolation?" },
    { label: "Asmaco silicone sealant cure?", prompt: "Can you detail the joint elastomeric and cure rates for the Asmaco GP Silicone Sealant clear?" }
  ];

  return (
    <div id="ai-assistant-root" className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-900 rounded-3xl overflow-hidden shadow-sm flex flex-col h-[580px] relative">
      {/* Grid Pattern Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-5 dark:opacity-[0.02] bg-size-24"
        style={{
          backgroundImage: `linear-gradient(to right, #cbd5e1 1px, transparent 1px), linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)`,
          backgroundSize: '16px 16px'
        }}
      />

      {/* Glowing title head */}
      <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-yellow-400/10 border border-yellow-500/20 flex items-center justify-center text-yellow-600 dark:text-yellow-400 shadow-sm">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-emerald-600 rounded-full animate-ping shrink-0" />
              <h4 className="font-sans font-black text-sm text-slate-900 dark:text-white uppercase leading-none">Noor Al Maqdis AI Engine</h4>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-[10px] font-mono uppercase tracking-wide mt-1.5 leading-none">
              Level 3 AI Engineering Specialist
            </p>
          </div>
        </div>

        {/* Informational Warning about Sandbox APIs */}
        <div className="text-[10px] font-mono text-slate-550 dark:text-slate-400 bg-slate-100 dark:bg-slate-950 px-2.5 py-1 rounded border border-slate-200 dark:border-slate-800">
          GEMINI-3.5-FLASH
        </div>
      </div>

      {/* Scrollable messages dialog */}
      <div 
        id="ai-messages-container"
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-6 py-6 space-y-4 z-10 bg-slate-50/20 dark:bg-slate-950/40"
      >
        {messages.map((msg, index) => {
          const isModel = msg.role === "model";
          const matchedProducts = isModel ? extractMatchingCatalogItems(msg.text) : [];

          return (
            <div 
              key={index} 
              ref={(el) => { messageRefs.current[index] = el; }}
              className={`flex gap-3 max-w-[85%] ${
                isModel ? "mr-auto" : "ml-auto flex-row-reverse"
              }`}
            >
              {/* Profile Avatar */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                isModel 
                  ? "bg-slate-100 dark:bg-slate-905 border-slate-200 dark:border-slate-800 text-yellow-600 dark:text-yellow-405" 
                  : "bg-slate-900 dark:bg-slate-800 border-transparent text-white"
                }`}
              >
                {isModel ? <Cpu className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              {/* Text cloud bubble */}
              <div className="flex flex-col gap-2">
                <div className={`rounded-2xl px-4 py-3 border text-xs shadow-sm leading-relaxed ${
                  isModel
                    ? "bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800/80 text-slate-800 dark:text-slate-100"
                    : "bg-yellow-400/10 dark:bg-yellow-450/5 border-yellow-400/15 dark:border-yellow-400/10 text-slate-800 dark:text-slate-100"
                  }`}
                >
                  {renderMarkdown(msg.text)}
                </div>

                {/* If AI output contains recommended product names, offer direct shopping additions */}
                {matchedProducts.length > 0 && (
                  <div className="flex flex-col gap-2 mt-1.5 pl-2">
                    <span className="font-mono text-[9px] text-yellow-600 dark:text-yellow-405 uppercase tracking-widest font-extrabold">
                      Linked specifications matching your prompt:
                    </span>
                    {matchedProducts.map((prod) => (
                      <div 
                        key={prod.id}
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 flex items-center justify-between gap-3 shadow-sm hover:border-yellow-450 dark:hover:border-yellow-450/40 transition-all"
                      >
                        <div className="min-w-0">
                          <h5 className="font-sans font-black text-slate-900 dark:text-white text-[11px] uppercase truncate">{prod.name}</h5>
                          <p className="font-mono text-[9px] text-slate-500 dark:text-slate-400 mt-1">
                            {prod.brand} • {prod.model}
                          </p>
                        </div>
                        <button
                          id={`ai-add-catalog-${prod.id}`}
                          onClick={() => onAddToBasket(prod)}
                          className="shrink-0 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white px-2.5 py-1.5 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                        >
                          <ShoppingCart className="w-3 h-3 animate-pulse text-yellow-400" />
                          <span>Add to RFQ</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Streaming/Loading pulse */}
        {isLoading && (
          <div className="flex gap-3 max-w-[80%] mr-auto">
            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-yellow-600 dark:text-yellow-400 flex items-center justify-center shrink-0">
              <Cpu className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-2xl px-4 py-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-yellow-550 dark:bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 bg-yellow-550 dark:bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-1.5 h-1.5 bg-yellow-550 dark:bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}
      </div>

      {/* Input controls & Prompt Chip drawers */}
      <div className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4 z-10 space-y-3">
        {/* Chips suggestion drawer */}
        {messages.length === 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1 max-w-full scrollbar-none">
            {samplePromptChips.map((chip, idx) => (
              <button
                key={idx}
                id={`chip-btn-${idx}`}
                onClick={() => handleSend(chip.prompt)}
                className="shrink-0 bg-white dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-[10px] font-mono text-slate-600 dark:text-slate-350 px-3 py-1.5 rounded-lg transition-all hover:text-slate-950 dark:hover:text-white cursor-pointer shadow-sm animate-fade-in"
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
            id="ai-prompt-input"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
            placeholder="Ask about thread limits, stainless selection, welders, calibration..."
            className="flex-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-yellow-450 dark:focus:border-yellow-450 transition-all disabled:opacity-50 font-sans shadow-inner"
          />
          <button
            id="ai-send-btn"
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white px-4 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer shadow-sm shrink-0"
          >
            <Send className="w-3.5 h-3.5 text-yellow-400" />
            <span className="md:inline hidden">Transmit</span>
          </button>
        </form>
      </div>
    </div>
  );
}
