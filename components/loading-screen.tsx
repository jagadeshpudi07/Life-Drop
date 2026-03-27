'use client'

import { useEffect, useState } from 'react'

// Generate drops deterministically to avoid React Hydration mismatch
const SMALL_DROPS = Array.from({ length: 25 }).map((_, i) => ({
  left: `${((i * 17) % 90) + 5}%`,           // Pseudo-random spread 5% to 95%
  size: ((i * 3) % 8) + 6,                   // Pseudo-random size 6px to 14px
  delay: ((i * 7) % 20) / 10,                // Pseudo-random delay 0s to 2s
  duration: ((i * 5) % 5) / 10 + 0.7         // Pseudo-random duration 0.7s to 1.1s
}))

export default function LoadingScreen() {
  const [phase, setPhase] = useState<'drops' | 'bigdrop' | 'text' | 'tagline' | 'fadeout' | 'done'>('drops')

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('lifedrop_has_loaded')
    if (hasLoaded) {
      setPhase('done')
      return
    }
    sessionStorage.setItem('lifedrop_has_loaded', 'true')
    document.cookie = "lifedrop_has_loaded=true; path=/; max-age=86400"

    // 1. Small drops fall for 1.5 seconds
    const t1 = setTimeout(() => setPhase('bigdrop'),  1500)
    
    // 2. Big drop appears and falls for 1.5 seconds (1.5s + 1.5s = 3.0s)
    const t2 = setTimeout(() => setPhase('text'),     3000)
    
    // 3. Name appears, then tagline appears shortly after
    const t3 = setTimeout(() => setPhase('tagline'),  3800)
    
    // 4. Fade out everything
    const t4 = setTimeout(() => setPhase('fadeout'),  5500)
    
    // 5. Remove from DOM
    const t5 = setTimeout(() => setPhase('done'),     6700)
    
    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout)
  }, [])

  if (phase === 'done') return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        opacity: phase === 'fadeout' ? 0 : 1,
        transition: phase === 'fadeout' ? 'opacity 1.2s ease' : 'none',
      }}
    >
      <style>{`
        @keyframes dropFall {
          0%   { transform: translateY(-10vh) scaleY(1.3); opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { transform: translateY(110vh) scaleY(1); opacity: 0; }
        }
        @keyframes bigDropFall {
          0%   { transform: translateY(-50vh) scale(0.6); opacity: 0; }
          20%  { opacity: 1; }
          70%  { transform: translateY(0px) scale(1.1); opacity: 1; }
          85%  { transform: translateY(0px) scale(0.95); opacity: 1; }
          100% { transform: translateY(0px) scale(1); opacity: 1; }
        }
        @keyframes bigDropExit {
          0%   { transform: scale(1); opacity: 1; filter: blur(0px); }
          50%  { transform: scale(3.5); opacity: 0.5; filter: blur(8px); }
          100% { transform: scale(6); opacity: 0; filter: blur(16px); }
        }
        @keyframes titleReveal {
          0%   { opacity: 0; letter-spacing: 0.8em; filter: blur(8px); }
          100% { opacity: 1; letter-spacing: 0.13em; filter: blur(0px); }
        }
        @keyframes taglineFade {
          0%   { opacity: 0; transform: translateY(15px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Small falling drops — Loop infinitely during the drops phase */}
      {phase === 'drops' && SMALL_DROPS.map((d, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: 0,
            left: d.left,
            opacity: 0,
            animation: `dropFall ${d.duration}s linear ${d.delay}s infinite`,
            pointerEvents: 'none',
          }}
        >
          <svg width={d.size} height={d.size * 1.4} viewBox="0 0 30 46" fill="none">
            <path
              d="M15 0 C15 0 0 18 0 28 A15 15 0 0 0 30 28 C30 18 15 0 15 0Z"
              fill="#E11D48"
              opacity="0.85"
            />
          </svg>
        </div>
      ))}

      {/* Big center drop */}
      {(phase === 'bigdrop' || phase === 'text') && (
        <div
          key="bigdrop"
          style={{
            opacity: 0,
            animation: phase === 'text'
              ? 'bigDropExit 0.6s ease-in forwards'
              : 'bigDropFall 1.5s cubic-bezier(0.25, 1, 0.5, 1) forwards',
          }}
        >
          <svg width={100} height={140} viewBox="0 0 30 46" fill="none">
            <path
              d="M15 0 C15 0 0 18 0 28 A15 15 0 0 0 30 28 C30 18 15 0 15 0Z"
              fill="#E11D48"
            />
          </svg>
        </div>
      )}

      {/* Site name + tagline */}
      {(phase === 'text' || phase === 'tagline' || phase === 'fadeout') && (
        <div style={{ textAlign: 'center', userSelect: 'none', zIndex: 10 }}>
          <h1
            style={{
              fontSize: 'clamp(3rem, 10vw, 6rem)',
              fontWeight: 900,
              color: '#111827',
              animation: 'titleReveal 0.8s cubic-bezier(0.22,1,0.36,1) forwards',
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            LIFE<span style={{ color: '#E11D48' }}>DROP</span>
          </h1>

          <p
            style={{
              marginTop: '1rem',
              fontSize: 'clamp(1rem, 3vw, 1.3rem)',
              color: '#9CA3AF',
              letterSpacing: '0.25em',
              fontWeight: 400,
              animation: phase === 'tagline' || phase === 'fadeout'
                ? 'taglineFade 0.8s ease forwards'
                : 'none',
              opacity: phase === 'text' ? 0 : 1,
            }}
          >
            Give Blood. Save Lives.
          </p>
        </div>
      )}
    </div>
  )
}
