import { useEffect, useRef, useState } from 'react';

interface Props {
  src: string;
}

export function LoopingVideo({ src }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [flashing, setFlashing] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !started) return;

    function handleEnded() {
      setFlashing(true);
      setTimeout(() => {
        video!.play().catch(() => {});
        setFlashing(false);
      }, 180);
    }

    video.addEventListener('ended', handleEnded);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => {
      video.removeEventListener('ended', handleEnded);
      observer.disconnect();
    };
  }, [started]);

  function handleClick() {
    const video = videoRef.current;
    if (!video) return;
    setStarted(true);
    video.play().catch(() => {});
  }

  return (
    <div
      style={{ position: 'relative', width: '100%', borderRadius: '8px', margin: '1rem 0', overflow: 'hidden', cursor: started ? 'default' : 'pointer' }}
      onClick={!started ? handleClick : undefined}
    >
      <video
        ref={videoRef}
        muted
        playsInline
        controls={started}
        style={{ width: '100%', display: 'block', borderRadius: '8px' }}
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* play overlay */}
      {!started && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(0,0,0,0.35)',
        }}>
          <div style={{
            width: '56px', height: '56px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#111">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </div>
        </div>
      )}

      {/* loop flash */}
      {flashing && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'white',
          opacity: 0.55,
          pointerEvents: 'none',
          borderRadius: '8px',
          animation: 'loopFlash 180ms ease-out forwards',
        }} />
      )}

      <style>{`
        @keyframes loopFlash {
          0%   { opacity: 0.55; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
