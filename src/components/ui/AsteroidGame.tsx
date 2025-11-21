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

  const SHIP_SIZE = 24;
  const GAME_HEIGHT = 400;

  // Load high score
  useEffect(() => {
    const saved = localStorage.getItem("asteroidHighScore");
    if (saved) setHighScore(parseInt(saved));
  }, []);

  // Handle mouse/touch movement
  const handleMove = useCallback((clientX: number) => {
    if (!gameRef.current || !isPlaying) return;
    const rect = gameRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setShipX(Math.max(5, Math.min(95, x)));
  }, [isPlaying]);

  const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  const handleTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);

  // Game loop
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const gameLoop = (timestamp: number) => {
      // Spawn objects
      if (timestamp - lastSpawnRef.current > 800) {
        lastSpawnRef.current = timestamp;
        const isAsteroid = Math.random() > 0.3;
        setObjects(prev => [...prev, {
          id: Date.now(),
          x: Math.random() * 90 + 5,
          y: -10,
          size: isAsteroid ? 20 + Math.random() * 15 : 12,
          speed: 2 + Math.random() * 2 + score / 50,
          type: isAsteroid ? "asteroid" : "star"
        }]);
      }

      // Update positions and check collisions
      setObjects(prev => {
        const updated: GameObject[] = [];

        prev.forEach(obj => {
          const newY = obj.y + obj.speed;

          // Remove if off screen
          if (newY > 110) return;

          // Check collision with ship (ship is at bottom)
          const shipY = 90;
          const dx = Math.abs(obj.x - shipX);
          const dy = Math.abs(newY - shipY);
          const collisionDist = (obj.size / 2 + SHIP_SIZE / 2) / 3;

          if (dx < collisionDist * 1.5 && dy < collisionDist) {
            if (obj.type === "asteroid") {
              setGameOver(true);
              setIsPlaying(false);
              // Save high score
              if (score > highScore) {
                setHighScore(score);
                localStorage.setItem("asteroidHighScore", score.toString());
              }
              return;
            } else {
              // Collected star
              setScore(s => s + 10);
              return;
            }
          }

          updated.push({ ...obj, y: newY });
        });

        return updated;
      });

      // Increment score over time
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
        <h3 className="text-lg font-display font-bold text-white">
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
          background: "linear-gradient(180deg, #0a0a12 0%, #12121f 100%)",
        }}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* Stars background */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
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
              exit={{ opacity: 0, scale: 0 }}
            >
              {obj.type === "asteroid" ? (
                // Asteroid
                <div
                  className="rounded-full"
                  style={{
                    width: obj.size,
                    height: obj.size,
                    background: "radial-gradient(circle at 30% 30%, #6b7280 0%, #374151 50%, #1f2937 100%)",
                    boxShadow: "inset -2px -2px 4px rgba(0,0,0,0.5), 0 0 10px rgba(107, 114, 128, 0.3)",
                  }}
                />
              ) : (
                // Star collectible
                <motion.div
                  animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <svg width={obj.size} height={obj.size} viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2L14.5 9H22L16 13.5L18 21L12 17L6 21L8 13.5L2 9H9.5L12 2Z"
                      fill="url(#starGrad)"
                    />
                    <defs>
                      <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fbbf24" />
                        <stop offset="100%" stopColor="#f59e0b" />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Spaceship */}
        {isPlaying && (
          <motion.div
            className="absolute"
            style={{
              left: `${shipX}%`,
              bottom: "10%",
              transform: "translateX(-50%)",
            }}
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            {/* Ship glow */}
            <div
              className="absolute -inset-2 rounded-full opacity-50 blur-md"
              style={{
                background: "radial-gradient(circle, #a855f7 0%, transparent 70%)",
              }}
            />
            {/* Ship body */}
            <svg width={SHIP_SIZE} height={SHIP_SIZE} viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L4 20L12 16L20 20L12 2Z"
                fill="url(#shipGrad)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="0.5"
              />
              <defs>
                <linearGradient id="shipGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
            {/* Engine flame */}
            <motion.div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-3 rounded-full"
              style={{
                background: "linear-gradient(180deg, #f59e0b 0%, #ef4444 50%, transparent 100%)",
              }}
              animate={{ scaleY: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 0.2, repeat: Infinity }}
            />
          </motion.div>
        )}

        {/* Start/Game Over overlay */}
        <AnimatePresence>
          {!isPlaying && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {gameOver ? (
                <>
                  <motion.h4
                    className="text-2xl font-display font-bold text-white mb-2"
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                  >
                    Game Over!
                  </motion.h4>
                  <p className="text-dark-400 mb-1">
                    Score: <span className="text-primary-400 font-mono">{score}</span>
                  </p>
                  {score >= highScore && score > 0 && (
                    <motion.p
                      className="text-accent-400 text-sm mb-4"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      New High Score!
                    </motion.p>
                  )}
                </>
              ) : (
                <>
                  <motion.div
                    className="mb-4"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 2L4 20L12 16L20 20L12 2Z"
                        fill="url(#shipGrad2)"
                      />
                      <defs>
                        <linearGradient id="shipGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#a855f7" />
                          <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </motion.div>
                  <p className="text-dark-400 text-sm mb-4 text-center px-4">
                    Move mouse/finger to dodge asteroids
                    <br />
                    Collect stars for bonus points!
                  </p>
                </>
              )}
              <motion.button
                onClick={startGame}
                className="px-6 py-2 rounded-full text-sm font-medium text-white"
                style={{
                  background: "linear-gradient(135deg, #a855f7 0%, #06b6d4 100%)",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {gameOver ? "Play Again" : "Start Game"}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="text-dark-500 text-xs mt-3 text-center">
        Avoid asteroids, collect stars!
      </p>
    </div>
  );
}
