import React, { useState } from 'react';
import { Bot } from 'lucide-react';
import { ChatWindow } from './ChatWindow';

export const ChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [shouldBounce, setShouldBounce] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    // Trigger bounce and tooltip animations periodically to catch attention
    React.useEffect(() => {
        // Initial delay
        const initialTimer = setTimeout(() => {
            setShouldBounce(true);
            setShowTooltip(true);
            // Stop bouncing after 2 seconds
            setTimeout(() => setShouldBounce(false), 2000);
            // Hide tooltip after 6 seconds
            setTimeout(() => setShowTooltip(false), 6000);
        }, 3000);

        // Periodic reminder every 30 seconds
        const interval = setInterval(() => {
            setShouldBounce(true);
            setTimeout(() => setShouldBounce(false), 2000);
        }, 30000);

        return () => {
            clearTimeout(initialTimer);
            clearInterval(interval);
        };
    }, []);

    const handleToggle = () => {
        const newState = !isOpen;
        setIsOpen(newState);
        if (!isOpen) setShowTooltip(false); // Hide tooltip when opened

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
            {/* Tooltip */}
            <div
                className={`transition-all duration-500 transform ${showTooltip && !isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
                    }`}
            >
                <div className="bg-white text-slate-800 px-4 py-2 rounded-xl shadow-lg border border-slate-100 text-sm font-medium relative mr-2">
                    Chat with my AI Assistant!
                    <div className="absolute top-1/2 -right-1 w-2 h-2 bg-white rotate-45 transform -translate-y-1/2 border-t border-r border-slate-100"></div>
                </div>
            </div>

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
                    } ${shouldBounce ? 'animate-bounce' : ''}`}
                aria-label="Open chat"
            >
                <Bot className="text-white relative z-10" size={28} strokeWidth={1.5} />

                {/* Pulse Effect */}
                <span className={`absolute inset-0 rounded-full bg-white opacity-20 ${!isOpen ? 'animate-ping' : ''}`}></span>

                {/* Notification Dot */}
                <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-green-400 border-2 border-blue-600 rounded-full z-20"></span>
            </button>
        </div>
    );
};
