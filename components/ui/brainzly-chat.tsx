"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { sendMessage, Message, getKnowledgeBaseResponse } from "@/lib/ai-service";
import { cn } from "@/lib/utils";

import { SplineScene } from "@/components/ui/splite";

const SUGGESTIONS = [
  "Admissions",
  "Academics",
  "School Facilities",
  "Campus Tour",
  "Fee Structure",
  "Transport",
  "Contact Us"
];

export function BrainzlyChat() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [inputVal, setInputVal] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const splineRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  React.useEffect(() => {
    if (!isOpen) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!splineRef.current) return;
      const viewer = splineRef.current.querySelector('spline-viewer');
      if (viewer && viewer.shadowRoot) {
        const canvas = viewer.shadowRoot.querySelector('canvas');
        if (canvas) {
          const mouseEvent = new MouseEvent('mousemove', {
            bubbles: true,
            cancelable: true,
            view: window,
            clientX: e.clientX,
            clientY: e.clientY
          });
          canvas.dispatchEvent(mouseEvent);

          const pointerEvent = new PointerEvent('pointermove', {
            bubbles: true,
            cancelable: true,
            view: window,
            clientX: e.clientX,
            clientY: e.clientY,
            pointerType: 'mouse'
          });
          canvas.dispatchEvent(pointerEvent);
        }
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0 && splineRef.current) {
        const touch = e.touches[0];
        const viewer = splineRef.current.querySelector('spline-viewer');
        if (viewer && viewer.shadowRoot) {
          const canvas = viewer.shadowRoot.querySelector('canvas');
          if (canvas) {
            const pointerEvent = new PointerEvent('pointermove', {
              bubbles: true,
              cancelable: true,
              view: window,
              clientX: touch.clientX,
              clientY: touch.clientY,
              pointerType: 'touch'
            });
            canvas.dispatchEvent(pointerEvent);
          }
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    // Periodically search and hide the Spline branding logo in shadow DOM
    const hideSplineLogo = () => {
      if (!splineRef.current) return false;
      const viewer = splineRef.current.querySelector('spline-viewer');
      if (viewer && viewer.shadowRoot) {
        const logo = viewer.shadowRoot.querySelector('#logo');
        if (logo) {
          (logo as HTMLElement).style.display = 'none';
          return true;
        }
      }
      return false;
    };

    const interval = setInterval(() => {
      if (hideSplineLogo()) {
        clearInterval(interval);
      }
    }, 100);

    const timeout = setTimeout(() => clearInterval(interval), 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isOpen]);

  const [fileAttachment, setFileAttachment] = React.useState<{ name: string; content: string; type: string } | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      setFileAttachment({
        name: file.name,
        type: file.type,
        content: evt.target?.result as string || ""
      });
    };

    if (file.type.startsWith("image/")) {
      reader.readAsDataURL(file);
    } else {
      reader.readAsText(file);
    }
  };

  const handleSend = async (text: string) => {
    if (!text.trim() && !fileAttachment) return;

    const userMsgContent = fileAttachment 
      ? `📎 Attached File: ${fileAttachment.name}\n${text}`
      : text;

    const userMsg: Message = { role: "user", content: userMsgContent };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputVal("");
    const currentAttachment = fileAttachment;
    setFileAttachment(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setIsTyping(true);

    const assistantMsg: Message = { role: "assistant", content: "" };
    setMessages((prev) => [...prev, assistantMsg]);

    try {
      let accumulatedContent = "";
      await sendMessage(updatedMessages, (chunk) => {
        accumulatedContent += chunk;
        setMessages((prev) => {
          const next = [...prev];
          if (next.length > 0) {
            next[next.length - 1] = {
              role: "assistant",
              content: accumulatedContent
            };
          }
          return next;
        });
      }, currentAttachment);
    } catch (error: any) {
      setMessages((prev) => {
        const next = [...prev];
        if (next.length > 0) {
          next[next.length - 1] = {
            role: "assistant",
            content: `⚠️ Groq AI Connection Error: ${error?.message || "Invalid API key or network issue."}\n\nPlease set your valid Groq API Key in localStorage ('brainzly_groq_api_key') or contact support.`
          };
        }
        return next;
      });
    } finally {
      setIsTyping(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const startSpeechRecognition = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const speechToText = event.results[0][0].transcript;
      setInputVal(speechToText);
    };

    recognition.start();
  };

  return (
    <>
      {/* Floating circular AI button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "group relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg transition-transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2",
            "after:absolute after:inset-0 after:-z-10 after:rounded-full after:bg-blue-500/20 after:animate-ping"
          )}
          title="Ask Brainzly"
        >
          <svg className="h-8 w-8 text-white group-hover:rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          
          {/* Tooltip */}
          <span className="absolute right-20 scale-0 group-hover:scale-100 transition-all duration-200 bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap">
            Ask Brainzly
          </span>
        </button>
      </div>

      {/* Premium Glassmorphism Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-50 flex h-[520px] max-h-[calc(100vh-130px)] w-[420px] flex-col rounded-3xl border border-white/20 bg-white/70 shadow-2xl overflow-hidden md:bottom-24 md:right-6 max-sm:bottom-0 max-sm:right-0 max-sm:w-full max-sm:h-[85vh] max-sm:rounded-t-3xl max-sm:rounded-b-none"
          >
            {/* Header with animated Spline robot background */}
            <div className="relative h-[160px] w-full bg-gradient-to-b from-blue-950 to-slate-900 p-5 flex flex-col justify-end overflow-hidden border-b border-white/10 rounded-t-3xl">
              {/* Soft blue hologram glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(59,130,246,0.45)_0%,transparent_65%)] z-[1] pointer-events-none animate-pulse" />
              
              <div ref={splineRef} className="absolute inset-0 z-[2] opacity-90 pointer-events-auto transition-transform duration-100 ease-out origin-center">
                <SplineScene
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="absolute inset-0 w-full h-full"
                />
              </div>

              {/* Glassmorphism overlay */}
              <div className="absolute inset-0 bg-slate-950/35 z-[3] pointer-events-none" />

              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full bg-white/10 p-1.5 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="relative z-[4] text-white">
                <div className="inline-flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-xl mb-2 border border-white/5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10B981]" />
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-white/95">Online</span>
                </div>
                <h2 className="text-2xl font-bold tracking-wide drop-shadow-md">Brainzly</h2>
                <p className="text-sm font-semibold text-blue-300 drop-shadow-md">Your AI School Guide</p>
                <p className="text-xs text-white/60 drop-shadow-md">Always here to help</p>
              </div>
            </div>

            {/* Conversation Feed */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-5 space-y-4 scroll-smooth"
            >
              {messages.length === 0 ? (
                <div className="space-y-4">
                  {/* Welcome Message */}
                  <div className="rounded-2xl bg-blue-50/80 p-4 border border-blue-100/50">
                    <p className="font-semibold text-slate-800 text-sm mb-1">Hello 👋</p>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      I'm <strong>Brainzly</strong>, the official AI assistant of Brainz Edu World.
                      I can answer questions about admissions, academics, facilities, transport, school timings and much more.
                    </p>
                  </div>

                  {/* Suggestion Chips */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {SUGGESTIONS.map((chip) => (
                      <button
                        key={chip}
                        onClick={() => handleSend(chip)}
                        className="rounded-full border border-blue-200 bg-white/80 px-3 py-1.5 text-xs text-blue-700 font-medium hover:bg-blue-50 hover:border-blue-300 transition-colors shadow-sm"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex flex-col max-w-[80%] rounded-2xl p-3.5 text-xs shadow-sm border",
                      msg.role === "user"
                        ? "self-end bg-blue-600 text-white border-blue-500 rounded-tr-none ml-auto"
                        : "self-start bg-white/95 text-slate-800 border-slate-100 rounded-tl-none mr-auto"
                    )}
                  >
                    <div className="whitespace-pre-wrap leading-relaxed">{msg.content || "..."}</div>
                    
                    {msg.role === "assistant" && msg.content && (
                      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100 justify-end">
                        <button
                          onClick={() => copyToClipboard(msg.content)}
                          className="text-slate-400 hover:text-blue-600 transition-colors"
                          title="Copy text"
                        >
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                        </button>
                        <button
                          onClick={() => {
                            window.speechSynthesis.cancel();
                            const utterance = new SpeechSynthesisUtterance(msg.content);
                            window.speechSynthesis.speak(utterance);
                          }}
                          className="text-slate-400 hover:text-blue-600 transition-colors"
                          title="Speak answer"
                        >
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}

              {isTyping && (
                <div className="self-start bg-white/90 border border-slate-100 text-slate-800 rounded-2xl rounded-tl-none p-3.5 text-xs mr-auto flex items-center gap-1">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]"></span>
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]"></span>
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400"></span>
                </div>
              )}
            </div>

            {fileAttachment && (
              <div className="px-4 py-1.5 bg-blue-50/80 border-t border-blue-100 flex items-center justify-between text-xs font-medium text-blue-700">
                <span className="truncate flex items-center gap-1.5 max-w-[85%]">
                  <svg className="h-3.5 w-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                  {fileAttachment.name}
                </span>
                <button
                  type="button"
                  onClick={() => setFileAttachment(null)}
                  className="text-red-500 hover:text-red-700 text-sm font-bold px-1"
                >
                  &times;
                </button>
              </div>
            )}

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".txt,.pdf,.doc,.docx,.csv,.md,.json,.html,image/*"
            />

            {/* Message Input Box */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputVal);
              }}
              className="p-4 border-t border-white/20 bg-white/50 flex gap-2 items-center"
            >
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask Brainzly anything..."
                className="flex-1 text-xs rounded-full border border-slate-200 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white/90 shadow-inner"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-slate-400 hover:text-blue-600 p-1.5 rounded-full hover:bg-slate-100/50 transition-colors"
                title="Attach file/document"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </button>

              <button
                type="button"
                onClick={startSpeechRecognition}
                className="text-slate-400 hover:text-blue-600 p-1.5 rounded-full hover:bg-slate-100/50 transition-colors"
                title="Voice Input"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </button>

              <button
                type="submit"
                disabled={!inputVal.trim() && !fileAttachment}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2.5 disabled:opacity-40 disabled:hover:bg-blue-600 transition-colors shadow-md"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
