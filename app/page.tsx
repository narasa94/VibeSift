"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Loader2, Sparkles, Send, Briefcase, Smile, Hand, Coffee } from "lucide-react";

const VIBES = [
  { id: "Profesional & Tegas", label: "Profesional", icon: Briefcase, color: "bg-blue-500", text: "text-blue-500", border: "border-blue-200" },
  { id: "Ramah & Kooperatif", label: "Ramah", icon: Smile, color: "bg-green-500", text: "text-green-500", border: "border-green-200" },
  { id: "Menolak Halus", label: "Menolak Halus", icon: Hand, color: "bg-red-500", text: "text-red-500", border: "border-red-200" },
  { id: "Santai & Kasual", label: "Kasual", icon: Coffee, color: "bg-yellow-500", text: "text-yellow-600", border: "border-yellow-200" },
];

export default function Home() {
  const [text, setText] = useState("");
  const [vibe, setVibe] = useState(VIBES[0].id);
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async () => {
    if (!text.trim()) {
      setError("Pesan tidak boleh kosong.");
      return;
    }
    
    setIsLoading(true);
    setError("");
    setResult("");
    
    try {
      const res = await fetch("/api/vibe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, vibe }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Gagal memproses teks.");
      }
      
      setResult(data.result);
    } catch (err: any) {
      setError(err.message || "Oops, gagal menyambung ke AI. Coba lagi ya!");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const selectedVibeData = VIBES.find(v => v.id === vibe) || VIBES[0];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-200">
      <header className="px-8 py-6 flex items-center gap-3 border-b border-slate-200 bg-white shadow-sm sticky top-0 z-10">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-500 via-red-500 to-yellow-500">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800">VibeShift</h1>
          <p className="text-xs text-slate-500 font-medium tracking-wide">Ubah emosi menjadi komunikasi</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-8 lg:p-12">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 h-full">
          {/* Input Section */}
          <div className="flex-1 flex flex-col gap-6 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-green-400 to-yellow-400 to-red-400 opacity-80" />
            
            <div className="flex flex-col gap-2">
              <label htmlFor="input" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs">1</span>
                Draf Kasar
              </label>
              <textarea
                id="input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Ketik atau paste pesan kasarmu di sini...&#10;(contoh: Saya nggak mau ngerjain ini karena bukan tugas saya!)"
                className="w-full min-h-[250px] md:min-h-[300px] p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none shadow-inner overflow-y-auto"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs">2</span>
                Pilih Vibe
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {VIBES.map((v) => {
                  const Icon = v.icon;
                  const isSelected = vibe === v.id;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setVibe(v.id)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all duration-200 ease-out ${
                        isSelected 
                          ? `${v.border} bg-white shadow-md ring-2 ring-opacity-50 ring-offset-1 ${v.id === 'Profesional & Tegas' ? 'ring-blue-400' : v.id === 'Ramah & Kooperatif' ? 'ring-green-400' : v.id === 'Menolak Halus' ? 'ring-red-400' : 'ring-yellow-400'}` 
                          : 'border-slate-100 bg-slate-50 hover:bg-slate-100 hover:border-slate-200 text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      <div className={`p-2 rounded-xl ${isSelected ? `${v.color} text-white shadow-sm` : 'bg-slate-200/50'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`text-xs font-semibold ${isSelected ? v.text : ''}`}>
                        {v.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {(() => {
              const isDisabled = !isMounted || isLoading || text.trim().length === 0;
              return (
                <button
                  onClick={handleSubmit}
                  disabled={isDisabled}
                  className={`mt-auto w-full py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl ${
                    isDisabled
                      ? 'bg-slate-300 cursor-not-allowed shadow-none'
                      : `${selectedVibeData.color} hover:brightness-110 active:scale-[0.98]`
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Memproses...
                    </>
                  ) : (
                    <>
                      Shift Vibe!
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              );
            })()}
            
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                {error}
              </motion.div>
            )}
          </div>

          {/* Output Section */}
          <div className="flex-1 flex flex-col min-h-[350px] md:min-h-0 bg-slate-900 rounded-3xl shadow-xl overflow-hidden relative border border-slate-800">
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50 backdrop-blur-sm z-10">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-slate-400 text-sm font-mono ml-2">Output</span>
              </div>
              
              <button
                onClick={copyToClipboard}
                disabled={!result}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  result 
                    ? copied 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                    : 'opacity-0 cursor-default'
                }`}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>

            <div className="p-6 md:p-8 flex-1 relative flex flex-col">
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div 
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center flex-col gap-4 text-slate-500"
                  >
                    <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                    <span className="text-sm font-medium animate-pulse">Merangkai kata-kata ajaib...</span>
                  </motion.div>
                ) : result ? (
                  <motion.div 
                    key="result"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="h-full"
                  >
                    <textarea
                      readOnly
                      value={result}
                      className="w-full h-full bg-transparent text-slate-100 text-base font-normal leading-relaxed resize-none focus:outline-none custom-scrollbar overflow-y-auto"
                    />
                  </motion.div>
                ) : (
                  <motion.div 
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center text-slate-600 text-center p-8"
                  >
                    <div>
                      <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-20" />
                      <p className="font-medium text-slate-400 text-lg">Hasil terjemahan akan muncul di sini</p>
                      <p className="text-sm mt-2 opacity-50">Ketik pesan kasarmu, pilih vibe, dan saksikan perubahannya.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
