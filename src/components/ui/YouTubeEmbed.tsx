import React, { useState } from 'react';
import { Play } from 'lucide-react';

interface YouTubeEmbedProps {
    videoId: string;
    title: string;
}

export const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ videoId, title }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    if (isLoaded) {
        return (
            <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                title={title}
                className="absolute inset-0 w-full h-full rounded-xl"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
        );
    }

    return (
        <button
            onClick={() => setIsLoaded(true)}
            className="absolute inset-0 w-full h-full group"
            aria-label={`Play ${title}`}
        >
            <img
                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                alt={title}
                loading="lazy"
                className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center pl-1 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Play fill="white" className="text-white w-8 h-8" />
                </div>
            </div>
        </button>
    );
};
