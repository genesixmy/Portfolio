"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GameObject {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  type: "asteroid" | "star";
  rotation: number;
}

export default function AsteroidGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [shipX, setShipX] = useState(50);
  const [objects, setObjects] = useState<GameObject[]>([]);
  const gameRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>();
  const lastSpawnRef = useRef(0);

  const SHIP_SIZE = 32;
  const GAME_HEIGHT = 400;

  useEffect(() => {
    const saved = localStorage.getItem("asteroidHighScore");
    if (saved) setHighScore(parseInt(saved));
  }, []);

  const handleMove = useCallback((clientX: number) => {
    if (!gameRef.current || !isPlaying) return;
    const rect = gameRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setShipX(Math.max(5, Math.min(95, x)));
  }, [isPlaying]);

  const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  const handleTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const gameLoop = (timestamp: number) => {
      if (timestamp - lastSpawnRef.current > 700) {
        lastSpawnRef.current = timestamp;
        const isAsteroid = Math.random() > 0.25;
        setObjects(prev => [...prev, {
          id: Date.now(),
          x: Math.random() * 85 + 7.5,
          y: -10,
          size: isAsteroid ? 24 + Math.random() * 16 : 16,
          speed: 2.5 + Math.random() * 2 + score / 60,
          type: isAsteroid ? "asteroid" : "star",
          rotation: Math.random() * 360
        }]);
      }

      setObjects(prev => {
        const updated: GameObject[] = [];

        prev.forEach(obj => {
          const newY = obj.y + obj.speed;
          if (newY > 110) return;

          const shipY = 88;
          const dx = Math.abs(obj.x - shipX);
          const dy = Math.abs(newY - shipY);
          const collisionDist = (obj.size / 2 + SHIP_SIZE / 2) / 4;

          if (dx < collisionDist * 1.8 && dy < collisionDist * 1.5) {
            if (obj.type === "asteroid") {
              setGameOver(true);
              setIsPlaying(false);
              if (score > highScore) {
                setHighScore(score);
                localStorage.setItem("asteroidHighScore", score.toString());
              }
              return;
            } else {
              setScore(s => s + 10);
              return;
            }
          }

          updated.push({ ...obj, y: newY, rotation: obj.rotation + obj.speed * 2 });
        });

        return updated;
      });

      setScore(s => s + 1);
      frameRef.current = requestAnimationFrame(gameLoop);
    };

    frameRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [isPlaying, gameOver, shipX, score, highScore]);

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setObjects([]);
    setShipX(50);
    lastSpawnRef.current = 0;
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
          <svg className="w-5 h-5 text-primary-400" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L8 10H2L7 14L5 22L12 17L19 22L17 14L22 10H16L12 2Z" fill="currentColor"/>
          </svg>
          Asteroid Dodge
        </h3>
        <div className="flex gap-4 text-sm">
          <span className="text-dark-400">
            Score: <span className="text-primary-400 font-mono">{score}</span>
          </span>
          <span className="text-dark-400">
            Best: <span className="text-accent-400 font-mono">{highScore}</span>
          </span>
        </div>
      </div>

      <div
        ref={gameRef}
        className="relative w-full rounded-xl overflow-hidden cursor-none select-none"
        style={{
          height: GAME_HEIGHT,
          background: "linear-gradient(180deg, #050510 0%, #0a0a18 50%, #12121f 100%)",
        }}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* Nebula background effect */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: "radial-gradient(ellipse at 30% 20%, rgba(168, 85, 247, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)"
          }}
        />

        {/* Stars background */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              background: "white",
              opacity: Math.random() * 0.5 + 0.2,
            }}
          />
        ))}

        {/* Game objects */}
        <AnimatePresence>
          {objects.map(obj => (
            <motion.div
              key={obj.id}
              className="absolute"
              style={{
                left: `${obj.x}%`,
                top: `${obj.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.5 }}
            >
              {obj.type === "asteroid" ? (
                // Detailed Asteroid
                <div
                  style={{
                    width: obj.size,
                    height: obj.size,
                    transform: `rotate(${obj.rotation}deg)`,
                  }}
                >
                  <svg viewBox="0 0 40 40" width={obj.size} height={obj.size}>
                    <defs>
                      <radialGradient id={`asteroidGrad-${obj.id}`} cx="30%" cy="30%">
                        <stop offset="0%" stopColor="#9ca3af" />
                        <stop offset="50%" stopColor="#4b5563" />
                        <stop offset="100%" stopColor="#1f2937" />
                      </radialGradient>
                      <filter id={`asteroidShadow-${obj.id}`}>
                        <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#ef4444" floodOpacity="0.3"/>
                      </filter>
                    </defs>
                    {/* Asteroid shape - irregular polygon */}
                    <path
                      d="M20 2 L28 8 L35 15 L38 25 L32 35 L22 38 L12 35 L5 28 L3 18 L8 10 L15 5 Z"
                      fill={`url(#asteroidGrad-${obj.id})`}
                      filter={`url(#asteroidShadow-${obj.id})`}
                    />
                    {/* Crater details */}
                    <circle cx="15" cy="15" r="4" fill="#374151" opacity="0.6"/>
                    <circle cx="25" cy="22" r="3" fill="#374151" opacity="0.5"/>
                    <circle cx="18" cy="28" r="2" fill="#374151" opacity="0.4"/>
                    {/* Highlight */}
                    <ellipse cx="12" cy="12" rx="3" ry="2" fill="white" opacity="0.2"/>
                  </svg>
                </div>
              ) : (
                // Glowing Star collectible
                <motion.div
                  animate={{
                    rotate: 360,
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                    scale: { duration: 0.8, repeat: Infinity }
                  }}
                >
                  <svg width={obj.size} height={obj.size} viewBox="0 0 24 24">
                    <defs>
                      <radialGradient id={`starGlow-${obj.id}`} cx="50%" cy="50%">
                        <stop offset="0%" stopColor="#fef3c7" />
                        <stop offset="50%" stopColor="#fbbf24" />
                        <stop offset="100%" stopColor="#f59e0b" />
                      </radialGradient>
                      <filter id={`starBlur-${obj.id}`}>
                        <feGaussianBlur stdDeviation="1" result="blur"/>
                        <feMerge>
                          <feMergeNode in="blur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    <path
                      d="M12 2L14.5 9H22L16 13.5L18 21L12 17L6 21L8 13.5L2 9H9.5L12 2Z"
                      fill={`url(#starGlow-${obj.id})`}
                      filter={`url(#starBlur-${obj.id})`}
                    />
                  </svg>
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Advanced Spaceship */}
        {isPlaying && (
          <motion.div
            className="absolute"
            style={{
              left: `${shipX}%`,
              bottom: "12%",
              transform: "translateX(-50%)",
            }}
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Ship glow effect */}
            <div
              className="absolute -inset-4 rounded-full blur-xl opacity-60"
              style={{
                background: "radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(6, 182, 212, 0.2) 50%, transparent 70%)",
              }}
            />

            {/* Spaceship SVG */}
            <svg width={SHIP_SIZE} height={SHIP_SIZE * 1.2} viewBox="0 0 40 48" fill="none">
              <defs>
                <linearGradient id="shipBody" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c084fc" />
                  <stop offset="50%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
                <linearGradient id="shipAccent" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
                <linearGradient id="cockpit" x1="50%" y1="0%" x2="50%" y2="100%">
                  <stop offset="0%" stopColor="#67e8f9" />
                  <stop offset="100%" stopColor="#0891b2" />
                </linearGradient>
                <filter id="shipGlow">
                  <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#a855f7" floodOpacity="0.5"/>
                </filter>
              </defs>

              {/* Main body */}
              <path
                d="M20 4 L28 20 L32 35 L28 40 L20 42 L12 40 L8 35 L12 20 Z"
                fill="url(#shipBody)"
                filter="url(#shipGlow)"
              />

              {/* Wings */}
              <path d="M12 25 L4 38 L8 35 L12 30 Z" fill="url(#shipAccent)" />
              <path d="M28 25 L36 38 L32 35 L28 30 Z" fill="url(#shipAccent)" />

              {/* Cockpit */}
              <ellipse cx="20" cy="16" rx="5" ry="7" fill="url(#cockpit)" opacity="0.9" />
              <ellipse cx="20" cy="14" rx="2" ry="3" fill="white" opacity="0.4" />

              {/* Details */}
              <rect x="18" y="26" width="4" height="8" rx="1" fill="url(#shipAccent)" opacity="0.8" />
              <circle cx="14" cy="28" r="2" fill="#22d3ee" opacity="0.6" />
              <circle cx="26" cy="28" r="2" fill="#22d3ee" opacity="0.6" />
            </svg>

            {/* Engine flames */}
            <motion.div
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-1"
              animate={{ scaleY: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 0.15, repeat: Infinity }}
            >
              <div className="w-2 h-4 rounded-full" style={{ background: "linear-gradient(180deg, #22d3ee 0%, #a855f7 40%, #f59e0b 70%, transparent 100%)" }} />
              <div className="w-3 h-5 rounded-full" style={{ background: "linear-gradient(180deg, #67e8f9 0%, #06b6d4 30%, #f59e0b 60%, #ef4444 80%, transparent 100%)" }} />
              <div className="w-2 h-4 rounded-full" style={{ background: "linear-gradient(180deg, #22d3ee 0%, #a855f7 40%, #f59e0b 70%, transparent 100%)" }} />
            </motion.div>
          </motion.div>
        )}

        {/* Start/Game Over overlay */}
        <AnimatePresence>
          {!isPlaying && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {gameOver ? (
                <>
                  <motion.h4
                    className="text-3xl font-display font-bold text-white mb-2"
                    initial={{ y: -20, scale: 0.8 }}
                    animate={{ y: 0, scale: 1 }}
                  >
                    Game Over!
                  </motion.h4>
                  <p className="text-dark-300 mb-1">
                    Score: <span className="text-primary-400 font-mono text-xl">{score}</span>
                  </p>
                  {score >= highScore && score > 0 && (
                    <motion.p
                      className="text-accent-400 text-sm mb-4 flex items-center gap-1"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L14.5 9H22L16 13.5L18 21L12 17L6 21L8 13.5L2 9H9.5L12 2Z"/>
                      </svg>
                      New High Score!
                    </motion.p>
                  )}
                </>
              ) : (
                <>
                  <motion.div
                    className="mb-6"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <svg width="64" height="76" viewBox="0 0 40 48" fill="none">
                      <defs>
                        <linearGradient id="shipBodyPreview" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#c084fc" />
                          <stop offset="100%" stopColor="#7c3aed" />
                        </linearGradient>
                        <linearGradient id="shipAccentPreview" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#06b6d4" />
                          <stop offset="100%" stopColor="#22d3ee" />
                        </linearGradient>
                      </defs>
                      <path d="M20 4 L28 20 L32 35 L28 40 L20 42 L12 40 L8 35 L12 20 Z" fill="url(#shipBodyPreview)" />
                      <path d="M12 25 L4 38 L8 35 L12 30 Z" fill="url(#shipAccentPreview)" />
                      <path d="M28 25 L36 38 L32 35 L28 30 Z" fill="url(#shipAccentPreview)" />
                      <ellipse cx="20" cy="16" rx="5" ry="7" fill="#67e8f9" opacity="0.9" />
                    </svg>
                  </motion.div>
                  <p className="text-dark-300 text-sm mb-6 text-center px-4">
                    Gerak mouse/jari untuk elak asteroid
                    <br />
                    <span className="text-amber-400">Kumpul bintang untuk bonus!</span>
                  </p>
                </>
              )}
              <motion.button
                onClick={startGame}
                className="px-8 py-3 rounded-full text-sm font-semibold text-white relative overflow-hidden group"
                style={{
                  background: "linear-gradient(135deg, #a855f7 0%, #06b6d4 100%)",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">{gameOver ? "Main Lagi" : "Mula"}</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="text-dark-500 text-xs mt-3 text-center">
        Elak asteroid, kumpul bintang!
      </p>
    </div>
  );
}
