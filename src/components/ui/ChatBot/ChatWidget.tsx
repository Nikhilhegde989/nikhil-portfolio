import React, { useState } from 'react';
import { Bot } from 'lucide-react';
import { ChatWindow } from './ChatWindow';

export const ChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        const newState = !isOpen;
        setIsOpen(newState);

        if (newState) {
            // Fire-and-forget warm-up request to wake up the Render instance
            fetch('https://portfolio-rag-chatbot-mzyf.onrender.com/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: "Hey" }),
            }).catch(err => console.error("Warm-up failed silently:", err));
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
            {/* Search/Chat Window */}
            <div
                className={`transition-all duration-300 origin-bottom-right transform ${isOpen
                    ? 'scale-100 opacity-100 translate-y-0'
                    : 'scale-90 opacity-0 translate-y-8 pointer-events-none'
                    }`}
            >
                <ChatWindow onClose={() => setIsOpen(false)} />
            </div>

            {/* Toggle Button */}
            <button
                onClick={handleToggle}
                className={`group relative p-4 rounded-full shadow-xl shadow-blue-500/30 transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95 ${isOpen
                    ? 'bg-slate-800 rotate-90 opacity-0 pointer-events-none absolute'
                    : 'bg-gradient-to-r from-blue-600 to-violet-600'
                    }`}
                aria-label="Open chat"
            >
                <Bot className="text-white relative z-10" size={28} strokeWidth={1.5} />

                {/* Pulse Effect */}
                <span className="absolute inset-0 rounded-full bg-white opacity-20 group-hover:animate-ping"></span>

                {/* Notification Dot */}
                <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-green-400 border-2 border-blue-600 rounded-full z-20"></span>
            </button>
        </div>
    );
};
