import React, { useState } from 'react';
import { Play, Loader2 } from 'lucide-react';

interface YouTubeEmbedProps {
    videoId: string;
    title: string;
}

export const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ videoId, title }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isIframeLoading, setIsIframeLoading] = useState(false);

    const handleLoad = () => {
        setIsLoaded(true);
        setIsIframeLoading(true);
    };

    if (isLoaded) {
        return (
            <div className="absolute inset-0 w-full h-full bg-slate-900">
                {isIframeLoading && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
                    </div>
                )}
                <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                    title={title}
                    className="absolute inset-0 w-full h-full rounded-xl"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    onLoad={() => setIsIframeLoading(false)}
                />
            </div>
        );
    }

    return (
        <button
            onClick={handleLoad}
            className="absolute inset-0 w-full h-full group bg-slate-100"
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
