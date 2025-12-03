import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Bear = ({ state = 'idle' }) => {
  const bearRef = useRef(null);

  // Map states to image sources
  const images = {
    idle: `${import.meta.env.BASE_URL}bear_idle_1764444049947_nobg.png`,
    walking: `${import.meta.env.BASE_URL}bear_idle_1764444049947_nobg.png`,
    happy: `${import.meta.env.BASE_URL}bear_happy_1764444072743_nobg.png`,
    sad: `${import.meta.env.BASE_URL}bear_sad_1764444095714_nobg.png`,
    crying: `${import.meta.env.BASE_URL}bear_sad_1764444095714_nobg.png`,
    holdingHeart: `${import.meta.env.BASE_URL}bear_holding_heart_1764444112445_nobg.png`,
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Clear previous animations
      gsap.killTweensOf(bearRef.current);

      if (state === 'idle') {
        gsap.to(bearRef.current, {
          y: -10,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      } else if (state === 'walking') {
        gsap.to(bearRef.current, {
          rotation: 5,
          duration: 0.2,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        });
        gsap.to(bearRef.current, {
          y: -5,
          duration: 0.2,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut"
        })
      } else if (state === 'happy') {
        gsap.to(bearRef.current, {
          y: -30,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'power2.out',
        });
      } else if (state === 'sad' || state === 'crying') {
        gsap.to(bearRef.current, {
          scale: 0.95,
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        })
      }
    }, bearRef);

    return () => ctx.revert();
  }, [state]);

  return (
    <div className="bear-container" style={{ position: 'relative', zIndex: 10 }}>
      <img
        ref={bearRef}
        src={images[state] || images.idle}
        alt={`Bear ${state}`}
        style={{
          width: '350px',
          height: 'auto',
          display: 'block',
          filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))',
        }}
      />
    </div>
  );
};

export default Bear;
