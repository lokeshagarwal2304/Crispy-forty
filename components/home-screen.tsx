"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Puzzle, Brain, Zap } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface HomeScreenProps {
  onStartGame: () => void
}

export default function HomeScreen({ onStartGame }: HomeScreenProps) {
  const [playerName, setPlayerName] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("playerName") || ""
    }
    return ""
  })

  const handleStartGame = () => {
    // Save player name to localStorage
    if (playerName.trim()) {
      localStorage.setItem("playerName", playerName.trim())
    } else {
      localStorage.setItem("playerName", "Player")
    }
    onStartGame()
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex justify-center mb-4">
          <div className="relative">
            <Brain className="h-24 w-24 text-primary" />
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.05, 0.95, 1],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Zap className="h-10 w-10 text-yellow-400" />
            </motion.div>
          </div>
        </div>
        <h1 className="text-5xl font-extrabold mb-2 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Crispy-Forty
        </h1>
        <p className="text-xl mb-6 text-muted-foreground">The 40-Level Mind-Bending Puzzle Game</p>
        <p className="max-w-md mx-auto text-muted-foreground mb-8">
          Challenge your brain with 40 unique puzzles, riddles, and mind-bending challenges. Can you solve them all?
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="w-full max-w-xs mb-8"
      >
        <div className="mb-4">
          <Label htmlFor="playerName">Your Name</Label>
          <Input
            id="playerName"
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="mt-1"
          />
        </div>

        <Button
          size="lg"
          onClick={handleStartGame}
          className="w-full text-lg px-8 py-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Puzzle className="mr-2 h-5 w-5" />
          Start Game
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl"
      >
        {[
          {
            icon: <Brain className="h-8 w-8 mb-2 text-purple-500" />,
            title: "Mind-Bending",
            description: "40 unique puzzles to challenge your thinking",
          },
          {
            icon: <Zap className="h-8 w-8 mb-2 text-yellow-500" />,
            title: "Progressive",
            description: "Increasing difficulty as you advance",
          },
          {
            icon: <Puzzle className="h-8 w-8 mb-2 text-pink-500" />,
            title: "Diverse",
            description: "From riddles to mazes to visual challenges",
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
            className="bg-card p-6 rounded-xl shadow-md"
          >
            <div className="flex flex-col items-center">
              {feature.icon}
              <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
              <p className="text-sm text-muted-foreground text-center">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
