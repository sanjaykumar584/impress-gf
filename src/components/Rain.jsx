import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Rain = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const drops = [];
        const numDrops = 50;

        for (let i = 0; i < numDrops; i++) {
            const drop = document.createElement('div');
            drop.classList.add('raindrop');
            drop.style.left = `${Math.random() * 100}%`;
            drop.style.animationDuration = `${Math.random() * 0.5 + 0.5}s`;
            drop.style.animationDelay = `${Math.random() * 2}s`;
            container.appendChild(drop);
            drops.push(drop);
        }

        return () => {
            drops.forEach((drop) => drop.remove());
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 50,
                overflow: 'hidden',
            }}
        >
            <style>{`
        .raindrop {
          position: absolute;
          top: -20px;
          width: 2px;
          height: 15px;
          background: rgba(162, 210, 255, 0.7);
          animation: fall linear infinite;
        }
        @keyframes fall {
          to {
            transform: translateY(100vh);
          }
        }
      `}</style>
        </div>
    );
};

export default Rain;
