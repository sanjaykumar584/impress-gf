import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const SpeechBubble = ({ text, isVisible = true, onComplete }) => {
    const bubbleRef = useRef(null);

    useEffect(() => {
        if (isVisible && text) {
            gsap.fromTo(
                bubbleRef.current,
                { opacity: 0, scale: 0.8, y: 20 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.5,
                    ease: 'back.out(1.7)',
                    onComplete: onComplete,
                }
            );
        } else {
            gsap.to(bubbleRef.current, {
                opacity: 0,
                scale: 0.8,
                duration: 0.3
            })
        }
    }, [text, isVisible, onComplete]);

    if (!text) return null;

    return (
        <div
            ref={bubbleRef}
            style={{
                position: 'absolute',
                top: '-120px', // Position above the bear
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'white',
                padding: '15px 25px',
                borderRadius: '20px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                maxWidth: '280px',
                textAlign: 'center',
                zIndex: 20,
                pointerEvents: 'none', // Let clicks pass through if needed
            }}
        >
            <p
                style={{
                    fontSize: '1.1rem',
                    color: '#5d4037',
                    fontWeight: '600',
                    lineHeight: '1.4',
                }}
            >
                {text}
            </p>
            {/* Triangle pointer */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '-10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '0',
                    height: '0',
                    borderLeft: '10px solid transparent',
                    borderRight: '10px solid transparent',
                    borderTop: '10px solid white',
                }}
            />
        </div>
    );
};

export default SpeechBubble;
