import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, AlertTriangle, Phone, Loader2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// Crisis keywords that trigger the safety redirect
const CRISIS_KEYWORDS = [
  "suicide", "kill myself", "end my life", "want to die", "self harm",
  "hurt myself", "cutting", "overdose", "no reason to live"
];

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/wellness-chat`;

const CrisisAlert = () => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-coral-light border border-coral/30 rounded-xl p-4 mb-4"
  >
    <div className="flex items-start gap-3">
      <AlertTriangle className="w-5 h-5 text-coral mt-0.5 flex-shrink-0" />
      <div>
        <p className="font-semibold text-foreground mb-2">
          It sounds like you might be going through a really difficult time.
        </p>
        <p className="text-sm text-muted-foreground mb-3">
          Please know that you're not alone, and professional support is available 24/7.
        </p>
        <div className="space-y-2">
          <a
            href="tel:9152987821"
            className="flex items-center gap-2 text-sm font-medium text-coral hover:underline"
          >
            <Phone className="w-4 h-4" />
            iCall: 9152987821
          </a>
          <a
            href="tel:08046110007"
            className="flex items-center gap-2 text-sm font-medium text-coral hover:underline"
          >
            <Phone className="w-4 h-4" />
            NIMHANS: 080-46110007
          </a>
          <a
            href="tel:18005990019"
            className="flex items-center gap-2 text-sm font-medium text-coral hover:underline"
          >
            <Phone className="w-4 h-4" />
            Vandrevala Foundation: 1800-599-0019
          </a>
        </div>
      </div>
    </div>
  </motion.div>
);

const WellnessChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCrisisAlert, setShowCrisisAlert] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const checkForCrisisKeywords = (text: string): boolean => {
    const lowerText = text.toLowerCase();
    return CRISIS_KEYWORDS.some(keyword => lowerText.includes(keyword));
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");

    // Check for crisis keywords
    if (checkForCrisisKeywords(userMessage)) {
      setShowCrisisAlert(true);
    }

    const userMsg: Message = { role: "user", content: userMessage };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    let assistantContent = "";

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      if (resp.status === 429) {
        toast.error("Rate limit exceeded. Please wait a moment and try again.");
        setIsLoading(false);
        return;
      }

      if (resp.status === 402) {
        toast.error("Service temporarily unavailable. Please try again later.");
        setIsLoading(false);
        return;
      }

      if (!resp.ok || !resp.body) {
        throw new Error("Failed to get response");
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant") {
                  return prev.map((m, i) =>
                    i === prev.length - 1 ? { ...m, content: assistantContent } : m
                  );
                }
                return [...prev, { role: "assistant", content: assistantContent }];
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      toast.error("Something went wrong. Please try again.");
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: "I'm having trouble connecting right now. Please try again in a moment. Remember, if you need immediate support, crisis helplines are available 24/7.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Layout hideFooter>
      <div className="h-[calc(100vh-4rem)] lg:h-[calc(100vh-5rem)] flex flex-col bg-gradient-to-b from-sage-light/30 to-background">
        {/* Header */}
        <div className="border-b border-border bg-background/80 backdrop-blur-sm p-4">
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display font-semibold">Calmyra AI</h1>
                <p className="text-xs text-muted-foreground">
                  Your wellness companion
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="container mx-auto max-w-3xl space-y-4">
            {/* Disclaimer */}
            <div className="bg-lavender-light/50 rounded-xl p-4 text-center text-sm text-muted-foreground mb-6">
              <p>
                This AI provides general wellness support and is{" "}
                <strong className="text-foreground">not a substitute for professional therapy</strong>.
                For medical concerns or mental health crises, please seek professional help.
              </p>
            </div>

            {showCrisisAlert && <CrisisAlert />}

            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 rounded-2xl bg-sage-light mx-auto mb-4 flex items-center justify-center">
                  <Bot className="w-8 h-8 text-sage-dark" />
                </div>
                <h2 className="font-display text-xl font-semibold mb-2">
                  Hi, I'm here to listen
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Share what's on your mind. I'm here to offer support, help you reflect, and share coping strategies.
                </p>
              </motion.div>
            )}

            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 rounded-lg bg-sage-light flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-sage-dark" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-card border border-border rounded-bl-md"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">
                      {message.content}
                    </p>
                  </div>
                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-lg bg-lavender-light flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-lavender-dark" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-sage-light flex items-center justify-center">
                  <Bot className="w-4 h-4 text-sage-dark" />
                </div>
                <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3">
                  <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-border bg-background/80 backdrop-blur-sm p-4">
          <div className="container mx-auto max-w-3xl">
            <div className="flex gap-3">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Share what's on your mind..."
                className="min-h-[52px] max-h-[150px] resize-none rounded-xl"
                rows={1}
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                variant="hero"
                size="icon"
                className="h-[52px] w-[52px] rounded-xl"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WellnessChat;
