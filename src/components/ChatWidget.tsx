
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ sender: "user" | "support", text: string, time: string }[]>([
    {
      sender: "support",
      text: "Bonjour ! 👋 Comment puis-je vous aider aujourd'hui ?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    const userMessage = {
      sender: "user" as const,
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, userMessage]);
    setMessage("");
    
    // Simulate response after 1 second
    setTimeout(() => {
      const autoResponse = {
        sender: "support" as const,
        text: "Merci pour votre message ! Un conseiller va vous répondre dans quelques instants. En attendant, n'hésitez pas à consulter nos services sur le site.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, autoResponse]);
    }, 1000);
  };

  useEffect(() => {
    // Auto-open the chat after 30 seconds
    const timer = setTimeout(() => {
      if (!isOpen) {
        setIsOpen(true);
      }
    }, 30000);
    
    return () => clearTimeout(timer);
  }, [isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden mb-4 w-80 md:w-96"
          >
            <div className="bg-primary p-4 text-white flex justify-between items-center">
              <div className="flex items-center">
                <Avatar className="mr-3 h-8 w-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>CS</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">Service Client</h3>
                  <p className="text-xs opacity-80">En ligne</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleChat}
                className="h-8 w-8 text-white hover:bg-primary/80"
              >
                <X size={18} />
              </Button>
            </div>
            
            <div className="h-80 overflow-y-auto p-4 bg-slate-50">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-4 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "support" && (
                    <Avatar className="mr-2 h-8 w-8 flex-shrink-0">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>CS</AvatarFallback>
                    </Avatar>
                  )}
                  <div>
                    <div 
                      className={`rounded-lg p-3 ${
                        msg.sender === "user" 
                          ? "bg-primary text-white" 
                          : "bg-white border border-border"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <form onSubmit={sendMessage} className="p-4 border-t flex">
              <Input
                type="text"
                placeholder="Écrivez votre message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 mr-2"
              />
              <Button type="submit" size="icon">
                <Send size={18} />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
        className="bg-primary text-white h-14 w-14 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <MessageCircle size={24} />
        )}
      </motion.div>
    </div>
  );
};

export default ChatWidget;
