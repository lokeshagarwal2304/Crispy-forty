"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, ArrowRight, Clock, Play } from "lucide-react"
import { useGameState } from "@/lib/game-state"
import { levels } from "@/lib/levels"
import LevelSuccess from "@/components/level-success"
import NumberPatternLevel from "@/components/levels/number-pattern-level"
import WordScrambleLevel from "@/components/levels/word-scramble-level"
import SpotDifferenceLevel from "@/components/levels/spot-difference-level"
import RiddleLevel from "@/components/levels/riddle-level"
import MazeLevel from "@/components/levels/maze-level"

export default function LevelScreen() {
  const {
    currentLevel,
    completeLevel,
    showSuccess,
    resetSuccess,
    remainingTime,
    startTimer,
    stopTimer,
    useHint,
    hintsUsed,
    hintsAvailable,
    isPaused,
    togglePause,
  } = useGameState()

  const [answer, setAnswer] = useState("")
  const [showHint, setShowHint] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [hintRequested, setHintRequested] = useState(false)

  const levelData = levels[currentLevel - 1]

  useEffect(() => {
    setAnswer("")
    setShowHint(false)
    setIsCorrect(null)
    setHintRequested(false)

    if (levelData.timed) {
      startTimer(levelData.timeLimit || 60)
    }

    return () => {
      if (levelData.timed) {
        stopTimer()
      }
    }
  }, [currentLevel, levelData, startTimer, stopTimer])

  useEffect(() => {
    if (hintRequested) {
      useHint()
      setShowHint(true)
    }
  }, [hintRequested, useHint])

  const handleSubmit = () => {
    if (isPaused) return

    if (levelData.checkAnswer(answer.trim().toLowerCase())) {
      setIsCorrect(true)
      completeLevel()
    } else {
      setIsCorrect(false)
      setTimeout(() => setIsCorrect(null), 1500)
    }
  }

  const handleHint = useCallback(() => {
    if (isPaused) return
    setHintRequested(true)
  }, [isPaused])

  const renderLevelContent = () => {
    switch (levelData.type) {
      case "numberPattern":
        return <NumberPatternLevel data={levelData} />
      case "wordScramble":
        return <WordScrambleLevel data={levelData} isPaused={isPaused} />
      case "spotDifference":
        return <SpotDifferenceLevel data={levelData} onSolve={completeLevel} isPaused={isPaused} />
      case "riddle":
        return <RiddleLevel data={levelData} />
      case "maze":
        return <MazeLevel data={levelData} onSolve={completeLevel} isPaused={isPaused} />
      default:
        return (
          <div className="text-center py-8">
            <p>{levelData.instructions}</p>
          </div>
        )
    }
  }

  if (showSuccess) {
    return <LevelSuccess onContinue={resetSuccess} level={currentLevel} />
  }

  if (isPaused) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col items-center justify-center py-12 text-center"
      >
        <h2 className="text-3xl font-bold mb-6">Game Paused</h2>
        <p className="text-muted-foreground mb-8">Take a break and resume when you're ready!</p>
        <Button
          size="lg"
          onClick={togglePause}
          className="px-6 py-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg"
        >
          <Play className="mr-2 h-5 w-5" />
          Resume Game
        </Button>
      </motion.div>
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentLevel}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <Badge variant="outline" className="text-sm font-medium">
              Level {currentLevel}
            </Badge>
            {levelData.timed && (
              <Badge variant={remainingTime < 10 ? "destructive" : "secondary"} className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{remainingTime}s</span>
              </Badge>
            )}
          </div>

          <h2 className="text-2xl font-bold mb-4 text-center">{levelData.title}</h2>

          <div className="mb-6">{renderLevelContent()}</div>

          {!["spotDifference", "maze"].includes(levelData.type) && (
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter your answer..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className={`flex-1 ${
                    isCorrect === true ? "border-green-500" : isCorrect === false ? "border-red-500" : ""
                  }`}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  disabled={isPaused}
                />
                <Button onClick={handleSubmit} disabled={isPaused}>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleHint}
                  disabled={hintsUsed >= hintsAvailable || showHint || isPaused}
                  className="text-xs"
                >
                  <Lightbulb className="h-3 w-3 mr-1" />
                  Hint ({hintsAvailable - hintsUsed} left)
                </Button>

                {isCorrect === false && <p className="text-sm text-red-500">Try again!</p>}
              </div>

              {showHint && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-muted p-3 rounded-md text-sm mt-2"
                >
                  <p>{levelData.hint}</p>
                </motion.div>
              )}
            </div>
          )}
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}
