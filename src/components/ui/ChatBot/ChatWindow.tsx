import React, { useState, useRef, useEffect } from 'react';
import { X, Send, User, Bot } from 'lucide-react';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

interface ChatWindowProps {
    onClose: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ onClose }) => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hello! It's great to connect with you.\n\nI can share details about my **Tech Talk** at Postgres Days 2025, my **Key Projects** like the Scoring Engine, or my **Experience** building scalable backends.\n\nCurious about my **Research Papers**, **Education**, **Skills**, or **Certifications** (Node.js & AWS)? Just ask!\n\nWhat interests you the most?",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [loadingStatus, setLoadingStatus] = useState<string>('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userMessageText = inputValue;
        const newMessage: Message = {
            id: Date.now().toString(),
            text: userMessageText,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newMessage]);
        setInputValue('');
        setIsLoading(true);
        setLoadingStatus('Rephrasing your question for better context...');

        try {
            // 1. Rephrase user question for better context
            // Format history for the API: [[role, content], [role, content]]
            const history = messages.map(msg => [
                msg.sender === 'user' ? 'user' : 'assistant',
                msg.text
            ]);

            const rephraseResponse = await fetch('https://portfolio-rag-chatbot-mzyf.onrender.com/rephrase', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMessageText,
                    history: history
                }),
            });

            if (!rephraseResponse.ok) {
                console.warn('Rephrase failed, falling back to original message');
            }

            let messageToSend = userMessageText;
            try {
                const rephraseData = await rephraseResponse.json();
                if (rephraseData.rephrased_question) {
                    messageToSend = rephraseData.rephrased_question;
                }
            } catch (e) {
                console.error('Error parsing rephrase response:', e);
            }

            // 2. Send (potentially rephrased) question to RAG
            setLoadingStatus('Retrieving relevant info...');

            const response = await fetch('https://portfolio-rag-chatbot-mzyf.onrender.com/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: messageToSend }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            const botText = data.response || data.answer || data.message || JSON.stringify(data);

            const botResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: botText,
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botResponse]);
        } catch (error) {
            console.error('Error sending message:', error);
            const errorResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: "Sorry, I'm having trouble connecting to the server right now. Please try again later.",
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorResponse]);
        } finally {
            setIsLoading(false);
            setLoadingStatus('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    const formatMessage = (text: string) => {
        // Split by double asterisks for bold text
        const parts = text.split(/(\*\*.*?\*\*)/g);

        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={index}>{part.slice(2, -2)}</strong>;
            }
            return <span key={index}>{part}</span>;
        });
    };

    return (
        <div className="flex flex-col h-[450px] w-[350px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden font-sans">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-violet-600 p-4 flex justify-between items-center text-white">
                <div className="flex items-center gap-2">
                    <div className="bg-white/20 p-1.5 rounded-full">
                        <Bot size={20} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-sm">Nikhil's Assistant</h3>
                        <span className="text-xs text-blue-100 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                            Online
                        </span>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="p-1 hover:bg-white/20 rounded-full transition-colors"
                    aria-label="Close chat"
                >
                    <X size={18} />
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex items-start gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 overflow-hidden border ${msg.sender === 'user' ? 'bg-blue-100 text-blue-600 border-blue-200' : 'bg-slate-900 border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                            }`}>
                            {msg.sender === 'user' ? (
                                <User size={14} />
                            ) : (
                                <div className="relative w-full h-full">
                                    <img
                                        src="images/profile.webp"
                                        alt="Bot"
                                        className="w-full h-full object-cover opacity-80 mix-blend-luminosity"
                                    />
                                    <div className="absolute inset-0 bg-emerald-500/20 mix-blend-overlay"></div>
                                </div>
                            )}
                        </div>

                        <div className={`max-w-[80%] p-3 rounded-2xl text-sm whitespace-pre-wrap ${msg.sender === 'user'
                            ? 'bg-blue-600 text-white rounded-tr-none'
                            : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-none'
                            }`}>
                            {formatMessage(msg.text)}
                            <div className={`text-[10px] mt-1 ${msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400'
                                }`}>
                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Typing Indicator */}
                {/* Typing Indicator */}
                {isLoading && (
                    <div className="flex items-start gap-2 flex-row">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-green-100 text-green-600">
                            <Bot size={14} />
                        </div>
                        <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100">
                            <div className="flex flex-col gap-2">
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                                </div>
                                {loadingStatus && (
                                    <span className="text-xs text-slate-400 animate-pulse">{loadingStatus}</span>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-white border-t border-slate-100">
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400 transition-all">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type a message..."
                        disabled={isLoading}
                        className="flex-1 bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400 disabled:opacity-50"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!inputValue.trim() || isLoading}
                        className="p-1.5 bg-blue-600 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                        aria-label="Send message"
                    >
                        <Send size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
};
