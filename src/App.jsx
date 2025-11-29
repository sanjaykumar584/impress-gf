import React, { useState, useEffect, useRef } from 'react';
import Bear from './components/Bear';
import SpeechBubble from './components/SpeechBubble';
import Confetti from './components/Confetti';
import Rain from './components/Rain';
import { Heart, Volume2, VolumeX } from 'lucide-react';
import gsap from 'gsap';

import { playSound as playSoundEffect } from './utils/sound';

function App() {
    const [stage, setStage] = useState('intro'); // intro, walking, message, decision, success, sad
    const [bearState, setBearState] = useState('idle');
    const [bubbleText, setBubbleText] = useState('');
    const [isMuted, setIsMuted] = useState(false);
    const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
    const noBtnRef = useRef(null);

    // Sound effects (placeholders - in a real app, use actual audio files)
    const playSound = (type) => {
        if (isMuted) return;
        playSoundEffect(type);
    };

    const handleStart = () => {
        playSound('click');
        setStage('walking');
        setBearState('walking');

        // Simulate walking to position
        setTimeout(() => {
            setStage('message');
            setBearState('idle');
            startMessageSequence();
        }, 2000);
    };

    const startMessageSequence = () => {
        setBubbleText('I am on a very important mission...');
        playSound('pop');
        setTimeout(() => {
            setBubbleText('To find a girlfriend for my human.');
            playSound('pop');
            setTimeout(() => {
                setBubbleText('I think... it should be you 😳💗');
                playSound('pop');
                setStage('decision');
                setBearState('holdingHeart');
            }, 3000);
        }, 3000);
    };

    const handleYes = () => {
        playSound('yay');
        setStage('success');
        setBearState('happy');
        setBubbleText('YAYYY POOKIE ACCEPTED 💗😤✨');
    };

    const handleNo = () => {
        playSound('sad');
        setStage('sad');
        setBearState('crying');
        setBubbleText('pookie is hurting 😭');
    };

    const moveNoButton = () => {
        // Run away in both decision and sad states
        if (stage !== 'decision' && stage !== 'sad') return;

        // Calculate random position within viewport
        // Subtract button dimensions (approx 100x50) to keep it on screen
        const x = Math.random() * (window.innerWidth - 150);
        const y = Math.random() * (window.innerHeight - 60);

        setNoBtnPosition({ x, y, position: 'fixed' });

        // Optional: Play a sound when it runs away
        if (stage === 'decision') playSound('click');
    };

    return (
        <div className="app-container">
            {/* Sound Toggle */}
            <button
                onClick={() => setIsMuted(!isMuted)}
                style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', fontSize: '1.5rem', opacity: 0.7 }}
            >
                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>

            {/* Background Elements */}
            <div className="bg-sparkles" />

            {/* Main Content */}
            <div className="content-wrapper" style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                {/* Speech Bubble */}
                {(stage === 'message' || stage === 'decision' || stage === 'success' || stage === 'sad') && (
                    <SpeechBubble text={bubbleText} isVisible={true} />
                )}

                {/* Bear */}
                <Bear state={bearState} />

                {/* Intro Text */}
                {stage === 'intro' && (
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <h1 style={{ fontSize: '2rem', marginBottom: '10px', color: '#5d4037' }}>Hello. I am pookie bear.</h1>
                        <p style={{ fontSize: '1.2rem', marginBottom: '30px', color: '#8d6e63' }}>I only have one mission.</p>
                        <button
                            onClick={handleStart}
                            className="cta-button"
                            style={{
                                padding: '15px 30px',
                                fontSize: '1.2rem',
                                borderRadius: '50px',
                                backgroundColor: '#ff8fa3',
                                color: 'white',
                                boxShadow: '0 5px 15px rgba(255, 143, 163, 0.4)',
                                transition: 'transform 0.2s',
                            }}
                            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                        >
                            Click me, hooman 🧸
                        </button>
                    </div>
                )}

                {/* Decision Buttons */}
                {(stage === 'decision' || stage === 'sad') && (
                    <div className="buttons-container" style={{ marginTop: '30px', display: 'flex', gap: '20px' }}>
                        <button
                            onClick={handleYes}
                            style={{
                                padding: '15px 30px',
                                fontSize: '1.1rem',
                                borderRadius: '50px',
                                backgroundColor: '#ff8fa3',
                                color: 'white',
                                boxShadow: '0 5px 15px rgba(255, 143, 163, 0.4)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                zIndex: 60
                            }}
                        >
                            Aww ok fine <Heart size={20} fill="white" />
                        </button>

                        <button
                            ref={noBtnRef}
                            onClick={handleNo}
                            onMouseEnter={moveNoButton}
                            style={{
                                padding: '15px 30px',
                                fontSize: '1.1rem',
                                borderRadius: '50px',
                                backgroundColor: '#e0e0e0',
                                color: '#757575',
                                position: noBtnPosition.position || 'static',
                                left: noBtnPosition.position === 'fixed' ? noBtnPosition.x : 'auto',
                                top: noBtnPosition.position === 'fixed' ? noBtnPosition.y : 'auto',
                                transform: noBtnPosition.position === 'fixed' ? 'none' : `translate(${noBtnPosition.x}px, ${noBtnPosition.y}px)`,
                                transition: 'all 0.3s ease-out',
                                zIndex: 60
                            }}
                        >
                            No 😐
                        </button>
                    </div>
                )}

                {/* Success Message */}
                {stage === 'success' && (
                    <div style={{ textAlign: 'center', marginTop: '30px', zIndex: 60 }}>
                        <h2 style={{ fontSize: '2rem', color: '#ff8fa3', marginBottom: '10px' }}>New Relationship Unlocked 💕</h2>
                        <p style={{ fontSize: '1.5rem', color: '#5d4037' }}>Welcome to the Pookie Club!</p>
                    </div>
                )}
            </div>

            {/* Effects */}
            {stage === 'success' && <Confetti />}
            {stage === 'sad' && <Rain />}
        </div>
    );
}

export default App;
