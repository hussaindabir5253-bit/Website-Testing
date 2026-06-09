import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { INTERACTIVE_TOOLS_3D } from "../data";
import { ToolConfig3D, ToolPart3D } from "../types";
import { Rotate3d, Compass, Maximize2, Zap, Thermometer, ShieldAlert, Layers, RefreshCw } from "lucide-react";

export default function TechnicalSimulator3D() {
  const [selectedToolIndex, setSelectedToolIndex] = useState(0);
  const currentTool = INTERACTIVE_TOOLS_3D[selectedToolIndex];

  // Rotation angles in degrees
  const [rotX, setRotX] = useState(-20);
  const [rotY, setRotY] = useState(45);
  const [rotZ, setRotZ] = useState(0);

  // Zoom scale
  const [scale, setScale] = useState(1);

  // Active configurations
  const [exploded, setExploded] = useState(false);
  const [material, setMaterial] = useState<"satin" | "oxide" | "titanium">("satin");
  const [temperature, setTemperature] = useState(25); // Celsius, ranging 0 to 900
  const [autoRotate, setAutoRotate] = useState(true);
  const [selectedPart, setSelectedPart] = useState<ToolPart3D | null>(null);

  const dragRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number | null>(null);

  // Auto rotation effect
  useEffect(() => {
    if (!autoRotate) return;
    const animate = () => {
      setRotY((prev) => (prev + 0.4) % 360);
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [autoRotate]);

  // Pointer drag event handlers for direct 3D trackpad rotation
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    setAutoRotate(false);
    previousMousePosition.current = { x: e.clientX, y: e.clientY };
    if (dragRef.current) {
      dragRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - previousMousePosition.current.x;
    const deltaY = e.clientY - previousMousePosition.current.y;

    setRotY((prev) => prev + deltaX * 0.6);
    setRotX((prev) => Math.max(-80, Math.min(80, prev - deltaY * 0.6)));

    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  // Maps the component part to its aesthetic custom color
  const getPartColor = (part: ToolPart3D) => {
    return part.color; 
  };

  // Calculates additional hue/glow based on thermal state (metal temperature adjustment)
  const getThermalGlow = () => {
    if (temperature <= 100) return {};
    const intensity = Math.min(0.8, (temperature - 100) / 800);
    const color = temperature > 600 ? "rgb(254, 240, 138)" : "rgb(249, 115, 22)";
    return {
      boxShadow: `0 0 ${15 + intensity * 35}px ${color}`,
      background: `linear-gradient(135deg, rgba(239, 68, 68, ${intensity}) 0%, rgba(249, 115, 22, ${intensity * 0.5}) 100%)`,
    };
  };

  return (
    <div id="technical-simulator-root" className="bg-slate-900 border border-slate-850 rounded-3xl p-6 lg:p-8 relative overflow-hidden shadow-sm text-white">
      {/* Decorative High-tech Corner Grid overlay */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t border-l border-slate-800/80 pointer-events-none rounded-tl-3xl" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b border-r border-slate-800/80 pointer-events-none rounded-br-3xl" />

      {/* Control row with title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-block w-2.5 h-2.5 bg-yellow-450 rounded-full animate-pulse" />
            <span className="font-mono text-xs tracking-widest text-yellow-400 font-bold uppercase">Noor Al Maqdis Labs</span>
          </div>
          <h3 className="font-sans font-black tracking-tight text-2xl text-white uppercase">
            Interactive CAD 3D Simulator
          </h3>
          <p className="text-slate-400 text-sm mt-1">
            Toggle molecular materials, temperature stress tests, and explore real structural stress bounds.
          </p>
        </div>

        {/* Tab selection for products */}
        <div className="flex flex-wrap gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-850">
          {INTERACTIVE_TOOLS_3D.map((t, index) => (
            <button
              key={t.name}
              id={`3d-tab-${index}`}
              onClick={() => {
                setSelectedToolIndex(index);
                setSelectedPart(null);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                selectedToolIndex === index
                  ? "bg-yellow-405 text-slate-905 font-bold shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {t.name.split(" ")[1] || t.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Sandbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-8 flex flex-col justify-between gap-6">
          {/* Interactive CSS 3D Viewport wrapper */}
          <div
            id="viewport-3d-canvas"
            ref={dragRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="h-[380px] sm:h-[450px] bg-slate-950 rounded-2xl border border-slate-850 relative flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden group select-none shadow-inner text-white"
            style={{ perspective: 1200 }}
          >
            {/* Ambient grid system in perspective */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-10 transition-opacity group-hover:opacity-15 bg-size-24"
              style={{
                backgroundImage: `linear-gradient(to right, #475569 1px, transparent 1px), linear-gradient(to bottom, #475569 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}
            />

            {/* Instruction Badge */}
            <div className="absolute top-4 left-4 bg-slate-900/95 border border-slate-805 shadow-sm px-3 py-1.5 rounded-lg flex items-center gap-2 pointer-events-none z-10">
              <Rotate3d className="w-3.5 h-3.5 text-yellow-400" />
              <span className="font-mono text-[10px] text-slate-350 tracking-wide">
                Drag to rotate freely on XYZ
              </span>
            </div>

            {/* Calibration details */}
            <div className="absolute bottom-4 left-4 font-mono text-[10px] text-slate-400 pointer-events-none flex flex-col gap-0.5 z-10 leading-relaxed md:block hidden">
              <div>PITCH ROTATION: {Math.round(rotX)}° X</div>
              <div>YAW ROTATION: {Math.round(rotY)}° Y</div>
              <div>SCALE FACTOR: {scale.toFixed(1)}x</div>
              <div>COBALT ALLOY ENVELOPE: ACTIVE</div>
            </div>

            {/* Top Right Quick Stats */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 items-end z-10">
              {temperature > 200 && (
                <div className="bg-red-955 border border-red-900/40 px-2.5 py-1 rounded-md flex items-center gap-1.5 animate-pulse shadow-sm animate-flash">
                  <Thermometer className="w-3.5 h-3.5 text-red-400" />
                  <span className="font-mono text-[10px] text-red-400 font-bold">
                    THERMAL LOAD: {temperature}°C
                  </span>
                </div>
              )}
              {exploded && (
                <div className="bg-yellow-950/80 border border-yellow-800/40 px-2.5 py-1 rounded-md shadow-sm">
                  <span className="font-mono text-[10px] text-yellow-405 font-bold">
                    EXPLODED ASSEMBLY VIEW
                  </span>
                </div>
              )}
            </div>

            {/* ----------------- CSS 3D STAGE ----------------- */}
            <div
              className="w-full h-full flex items-center justify-center pointer-events-none transition-transform duration-100"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className="relative flex items-center justify-center transition-all duration-300"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg) scale3d(${scale}, ${scale}, ${scale})`,
                }}
              >
                {/* Simulated shadow on the floor of the perspective view */}
                <div
                  className="absolute w-44 h-44 bg-black/65 blur-xl pointer-events-none rounded-full"
                  style={{
                    transform: "rotateX(90deg) translateZ(-160px)",
                    transformStyle: "preserve-3d",
                  }}
                />

                {/* Draw CAD Tool Parts of 3D Model assembly */}
                {currentTool.parts.map((part, index) => {
                  const partColor = getPartColor(part);

                  // Calculate exploded space offset dynamically
                  // Spread along the Y axis or custom offsets
                  const explosionVectorY = exploded ? (part.translate[1] > 0 ? 85 : -85) : 0;
                  const explosionVectorX = exploded ? (part.translate[0] > 0 ? 40 : -40) : 0;
                  const explodedY = part.translate[1] + explosionVectorY;
                  const explodedX = part.translate[0] + explosionVectorX;
                  const explodedZ = part.translate[2] + (exploded ? (index % 2 === 0 ? 30 : -30) : 0);

                  // Cube dimensions scaled appropriately to keep container safe
                  const w = part.scale[0];
                  const h = part.scale[1];
                  const d = part.scale[2];

                  const isPartActive = selectedPart?.name === part.name;

                  return (
                    <div
                      key={part.name}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Trigger component select callback
                        setSelectedPart(part);
                      }}
                      className="absolute cursor-pointer pointer-events-auto transition-transform duration-500 ease-out preserve-3d"
                      style={{
                        transform: `translate3d(${explodedX}px, ${explodedY}px, ${explodedZ}px) rotateX(${part.rotate[0]}deg) rotateY(${part.rotate[1]}deg) rotateZ(${part.rotate[2]}deg)`,
                      }}
                    >
                      {/* 3D Box Construction */}
                      <div
                        className={`relative transition-all duration-300 group/part ${
                          isPartActive ? "ring-2 ring-amber-500 ring-offset-4 ring-offset-black scale-110" : ""
                        }`}
                        style={{
                          width: w,
                          height: h,
                          transformStyle: "preserve-3d",
                        }}
                      >
                        {/* FRONT FACE */}
                        <div
                          className="absolute inset-0 border border-white/10 shadow-inner flex items-center justify-center transition-all duration-300"
                          style={{
                            transform: `translateZ(${d / 2}px)`,
                            backgroundColor: partColor,
                            width: w,
                            height: h,
                            opacity: isPartActive ? 0.95 : 0.85,
                            backdropFilter: "blur(2px)",
                            backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, transparent 100%)",
                            ...getThermalGlow(),
                          }}
                        />

                        {/* BACK FACE */}
                        <div
                          className="absolute inset-0 border border-white/5 transition-all duration-300"
                          style={{
                            transform: `rotateY(180deg) translateZ(${d / 2}px)`,
                            backgroundColor: partColor,
                            width: w,
                            height: h,
                            opacity: 0.8,
                            ...getThermalGlow(),
                          }}
                        />

                        {/* LEFT FACE */}
                        <div
                          className="absolute inset-0 border border-white/5 transition-all duration-300"
                          style={{
                            transform: `rotateY(-90deg) translateZ(${w / 2}px)`,
                            backgroundColor: partColor,
                            width: d,
                            height: h,
                            left: (w - d) / 2,
                            opacity: 0.75,
                            ...getThermalGlow(),
                          }}
                        />

                        {/* RIGHT FACE */}
                        <div
                          className="absolute inset-0 border border-white/10 transition-all duration-300"
                          style={{
                            transform: `rotateY(90deg) translateZ(${w / 2}px)`,
                            backgroundColor: partColor,
                            width: d,
                            height: h,
                            left: (w - d) / 2,
                            opacity: 0.75,
                            ...getThermalGlow(),
                          }}
                        />

                        {/* TOP FACE */}
                        <div
                          className="absolute inset-0 border border-white/15 transition-all duration-300"
                          style={{
                            transform: `rotateX(90deg) translateZ(${h / 2}px)`,
                            backgroundColor: partColor,
                            width: w,
                            height: d,
                            top: (h - d) / 2,
                            opacity: 0.9,
                            ...getThermalGlow(),
                          }}
                        />

                        {/* BOTTOM FACE */}
                        <div
                          className="absolute inset-0 border border-white/5 transition-all duration-300"
                          style={{
                            transform: `rotateX(-90deg) translateZ(${h / 2}px)`,
                            backgroundColor: partColor,
                            width: w,
                            height: d,
                            top: (h - d) / 2,
                            opacity: 0.65,
                            ...getThermalGlow(),
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* Quick HUD controls for perspective sandbox */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-850">
            <div className="flex flex-wrap gap-2">
              <button
                id="btn-auto-rotate"
                onClick={() => setAutoRotate(!autoRotate)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs border transition-all cursor-pointer ${
                  autoRotate
                    ? "bg-yellow-450/15 text-yellow-400 border-yellow-450/20 font-bold"
                    : "text-slate-400 border-slate-800 bg-slate-900 hover:bg-slate-850 hover:text-white"
                }`}
              >
                <RefreshCw className={`w-3.5 h-3.5 ${autoRotate ? "animate-spin" : ""}`} />
                <span>Auto Spin</span>
              </button>

              <button
                id="btn-explode-assembly"
                onClick={() => setExploded(!exploded)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs border transition-all cursor-pointer ${
                  exploded
                    ? "bg-amber-450/15 text-amber-400 border-amber-450/20 font-bold"
                    : "text-slate-400 border-slate-800 bg-slate-900 hover:bg-slate-850 hover:text-white"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Explode assembly</span>
              </button>
            </div>

            <div className="flex items-center gap-4">
              {/* Zoom sliders */}
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-slate-550 font-bold">ZOOM</span>
                <input
                  id="3d-zoom-slider"
                  type="range"
                  min="0.5"
                  max="1.7"
                  step="0.05"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-20 md:w-28 accent-yellow-400 bg-slate-850 rounded-lg cursor-pointer h-1.5"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Technical Diagnostics Side Panel */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-6 bg-slate-950/40 rounded-2xl p-6 border border-slate-850 relative shadow-sm text-white">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Compass className="w-4 h-4 text-yellow-400" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-slate-400">
                Spectroscopes & Materials
              </span>
            </div>


            {/* Simulated Heat / Temperature Calibration stress test */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-mono text-slate-400 uppercase flex items-center gap-1">
                  <Thermometer className="w-3.5 h-3.5 text-orange-500" />
                  Metal stress temp
                </label>
                <span className={`text-xs font-mono font-bold ${temperature > 400 ? "text-orange-400 animate-pulse" : "text-slate-450"}`}>
                  {temperature}°C
                </span>
              </div>
              <input
                id="3d-temp-slider"
                type="range"
                min="25"
                max="850"
                step="25"
                value={temperature}
                onChange={(e) => setTemperature(parseInt(e.target.value))}
                className="w-full accent-orange-500 bg-slate-850 rounded-lg cursor-pointer h-1.5"
              />
              <div className="flex justify-between font-mono text-[9px] text-slate-500 mt-1">
                <span>25°C (Ambient)</span>
                <span>400°C (Stress)</span>
                <span>850°C (Annealing)</span>
              </div>
            </div>

            {/* Static specs list for current CAD item */}
            <div className="border-t border-slate-850 pt-4 mb-6">
              <label className="block text-xs font-mono text-slate-400 mb-2.5 uppercase">Engineering specs</label>
              <div className="space-y-1.5">
                {Object.entries(currentTool.technicalSpecs).map(([lbl, val]) => (
                  <div key={lbl} className="flex justify-between border-b border-slate-855 pb-1 font-mono text-xs">
                    <span className="text-slate-450">{lbl}:</span>
                    <span className="text-white font-bold">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive part inspector details */}
          <div className="bg-slate-950 rounded-xl p-4 border border-slate-855 min-h-[140px] flex flex-col justify-between shadow-sm">
            <AnimatePresence mode="wait">
              {selectedPart ? (
                <motion.div
                  key={selectedPart.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col h-full justify-between"
                >
                  <div>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Zap className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
                      <span className="font-mono text-[10px] text-yellow-400 uppercase tracking-widest font-extrabold">
                        Part Inspector
                      </span>
                    </div>
                    <h4 className="font-sans font-black text-sm text-white mb-2">{selectedPart.name}</h4>
                    <p className="text-slate-450 text-xs leading-relaxed">{selectedPart.label}</p>
                  </div>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center h-full gap-2 py-4">
                  <Layers className="w-5 h-5 text-slate-650 animate-pulse" />
                  <span className="font-mono text-[10px] text-slate-500">
                    Click any block on the 3D assembler to inspect technical characteristics
                  </span>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
