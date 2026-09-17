import { useState, useEffect, useRef, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Bot, X, Send, Sparkles } from "lucide-react";
import { getChatbotResponse } from "@/constants/chatbotResponses";

export function Chatbot() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: "Hello! 👋 I'm Froillan's Chatbot! Ask me about skills, projects, experience, or anything about the portfolio!", isUser: false }
  ]);
  const [chatInput, setChatInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChatSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    // Add user message
    const userMessage = chatInput.trim();
    setChatMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setChatInput("");

    // Get bot response after a short delay
    setTimeout(() => {
      const botResponse = getChatbotResponse(userMessage);
      setChatMessages(prev => [...prev, { text: botResponse, isUser: false }]);
    }, 500);
  };

  useEffect(() => {
    if (isChatbotOpen && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    // Focus input when chatbot opens
    if (isChatbotOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [chatMessages, isChatbotOpen]);

  return (
    <>
      {/* Chatbot - Full screen on mobile, windowed on desktop */}
      {isChatbotOpen && (
        <div className="fixed inset-0 md:inset-auto md:bottom-24 md:right-6 md:w-96 md:h-[600px] bg-card border border-border md:rounded-lg shadow-2xl z-50 flex flex-col animate-slide-in-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-4 md:rounded-t-lg flex items-center justify-between shadow-md">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Bot className="w-6 h-6 md:w-5 md:h-5 animate-pulse" />
                <Sparkles className="w-3 h-3 absolute -top-1 -right-1 text-yellow-300 animate-spin" style={{ animationDuration: '3s' }} />
              </div>
              <div>
                <span className="font-bold text-lg md:text-base">Froillan's Chatbot</span>
                <p className="text-xs opacity-90 hidden md:block">Always here to help!</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsChatbotOpen(false)}
              className="h-9 w-9 md:h-8 md:w-8 text-primary-foreground hover:bg-primary-foreground/20 transition-all"
            >
              <X className="w-5 h-5 md:w-4 md:h-4" />
            </Button>
          </div>
          
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-4 space-y-4 bg-gradient-to-b from-background to-muted/20">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.isUser ? "justify-end" : "justify-start"} animate-fade-in`}
              >
                <div
                  className={`max-w-[85%] md:max-w-[80%] rounded-2xl p-4 shadow-sm transition-all hover:shadow-md ${
                    msg.isUser
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-muted text-foreground rounded-bl-sm border border-border/50"
                  }`}
                >
                  <p className="text-sm md:text-sm leading-relaxed whitespace-pre-wrap break-words">{msg.text}</p>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          
          {/* Input Area */}
          <form onSubmit={handleChatSubmit} className="border-t border-border bg-background md:rounded-b-lg p-3 md:p-4 shadow-lg">
            <div className="flex items-end space-x-2 md:space-x-3">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type your message here..."
                  className="w-full px-4 py-3 md:py-2.5 pr-12 border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-background text-foreground placeholder:text-muted-foreground text-base md:text-sm shadow-inner"
                  autoComplete="off"
                />
                {chatInput.trim() && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setChatInput("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <Button 
                type="submit" 
                size="icon" 
                disabled={!chatInput.trim()}
                className="bg-primary hover:bg-primary/90 h-12 w-12 md:h-10 md:w-10 rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              >
                <Send className="w-5 h-5 md:w-4 md:h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 px-1 text-center">
              💡 Try asking about: skills, projects, FaceofMind, or contact info
            </p>
          </form>
        </div>
      )}

      {/* Chatbot Toggle Button */}
      <Button
        onClick={() => setIsChatbotOpen(!isChatbotOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-2xl z-40 transition-all hover:scale-110 active:scale-95"
        size="icon"
      >
        {isChatbotOpen ? (
          <X className="w-7 h-7 md:w-6 md:h-6" />
        ) : (
          <div className="relative">
            <Bot className="w-7 h-7 md:w-6 md:h-6 animate-bounce" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-background animate-pulse"></div>
          </div>
        )}
      </Button>
    </>
  );
}

