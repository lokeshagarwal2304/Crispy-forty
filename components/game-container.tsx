"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { Sun, Moon, HelpCircle, Trophy, Home, Pause, Play, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import HomeScreen from "@/components/home-screen"
import LevelScreen from "@/components/level-screen"
import HowToPlayModal from "@/components/how-to-play-modal"
import LeaderboardModal from "@/components/leaderboard-modal"
import SupportChatbot from "@/components/support-chatbot"
import { useGameState } from "@/lib/game-state"

export default function GameContainer() {
  const { theme, setTheme } = useTheme()
  const [showHowToPlay, setShowHowToPlay] = useState(false)
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [showChatbot, setShowChatbot] = useState(false)
  const { gameStarted, currentLevel, startGame, resetGame, levelProgress, totalLevels, isPaused, togglePause } =
    useGameState()

  // Ensure the game state is loaded from localStorage on component mount
  useEffect(() => {
    // This effect ensures the UI reflects the loaded state
    console.log("Game container mounted, game started:", gameStarted)
  }, [gameStarted])

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          {gameStarted && (
            <Button variant="ghost" size="icon" onClick={resetGame} className="rounded-full">
              <Home className="h-5 w-5" />
            </Button>
          )}
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Crispy-Forty
          </h1>
        </div>
        <div className="flex gap-2">
          {gameStarted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePause}
              className="rounded-full"
              aria-label={isPaused ? "Resume game" : "Pause game"}
            >
              {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={() => setShowHowToPlay(true)} className="rounded-full">
            <HelpCircle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setShowLeaderboard(true)} className="rounded-full">
            <Trophy className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setShowChatbot(true)} className="rounded-full">
            <MessageCircle className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      {gameStarted && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">
              Level {currentLevel}/{totalLevels}
            </span>
            <span className="text-sm font-medium">{Math.round((currentLevel / totalLevels) * 100)}%</span>
          </div>
          <Progress value={(currentLevel / totalLevels) * 100} className="h-2" />
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={gameStarted ? "game" : "home"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          {!gameStarted ? <HomeScreen onStartGame={startGame} /> : <LevelScreen />}
        </motion.div>
      </AnimatePresence>

      <HowToPlayModal open={showHowToPlay} onClose={() => setShowHowToPlay(false)} />
      <LeaderboardModal open={showLeaderboard} onClose={() => setShowLeaderboard(false)} />
      <SupportChatbot open={showChatbot} onClose={() => setShowChatbot(false)} />
    </div>
  )
}
