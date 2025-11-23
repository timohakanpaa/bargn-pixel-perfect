import { useState } from "react";
import { MessageCircle, Sparkles, X, Send } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";

const ChatWidget = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'ai'; text: string }>>([
    { role: 'ai', text: t("chatWidget") === "Ask Bargn AI" 
      ? "Hi! I'm Bargn AI. Ask me anything about deals, savings, or how Bargn works!" 
      : "Hei! Olen Bargn AI. Kysy minulta mitä tahansa diilejä, säästöjä tai Bargnin toiminnasta!" 
    }
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', text: inputValue }]);
    setInputValue("");
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: t("chatWidget") === "Ask Bargn AI"
          ? "Thanks for your message! This is a demo interface. Real AI integration coming soon!"
          : "Kiitos viestistäsi! Tämä on demokäyttöliittymä. Todellinen AI-integraatio tulossa pian!"
      }]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] z-50 animate-slide-up">
          <div className="h-full bg-glass backdrop-blur-xl border border-glass rounded-2xl shadow-glow-purple flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-glass">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-purple-yellow flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-foreground" />
                </div>
                <span className="font-semibold text-foreground">Bargn AI</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="hover:bg-muted"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      msg.role === 'user'
                        ? 'bg-gradient-purple-yellow text-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-glass">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={t("chatWidget") === "Ask Bargn AI" ? "Type your message..." : "Kirjoita viestisi..."}
                  className="bg-muted border-glass"
                />
                <Button
                  onClick={handleSend}
                  size="icon"
                  className="bg-gradient-purple-yellow hover:opacity-90"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-purple-yellow shadow-glow-purple hover:shadow-glow-pink transition-all duration-300 hover:scale-110 z-50 flex items-center justify-center"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <MessageCircle className="w-6 h-6 text-foreground" />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent side="left" className="bg-popover border-glass">
            <p>{t("chatWidget")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default ChatWidget;
