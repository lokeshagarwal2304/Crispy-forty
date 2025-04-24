"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import { levels } from "./levels"

interface GameStateContextType {
  gameStarted: boolean
  currentLevel: number
  totalLevels: number
  levelProgress: number[]
  showSuccess: boolean
  remainingTime: number
  hintsUsed: number
  hintsAvailable: number
  isPaused: boolean
  leaderboard: { name: string; level: number; time: number }[]
  startGame: () => void
  resetGame: () => void
  completeLevel: () => void
  resetSuccess: () => void
  startTimer: (seconds: number) => void
  stopTimer: () => void
  useHint: () => void
  togglePause: () => void
}

const GameStateContext = createContext<GameStateContextType>({
  gameStarted: false,
  currentLevel: 1,
  totalLevels: levels.length,
  levelProgress: [],
  showSuccess: false,
  remainingTime: 0,
  hintsUsed: 0,
  hintsAvailable: 3,
  isPaused: false,
  leaderboard: [],
  startGame: () => {},
  resetGame: () => {},
  completeLevel: () => {},
  resetSuccess: () => {},
  startTimer: () => {},
  stopTimer: () => {},
  useHint: () => {},
  togglePause: () => {},
})

export function GameStateProvider({ children }: { children: ReactNode }) {
  const [gameStarted, setGameStarted] = useState(false)
  const [currentLevel, setCurrentLevel] = useState(1)
  const [levelProgress, setLevelProgress] = useState<number[]>([])
  const [showSuccess, setShowSuccess] = useState(false)
  const [remainingTime, setRemainingTime] = useState(0)
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null)
  const [hintsUsed, setHintsUsed] = useState(0)
  const [hintsAvailable] = useState(3)
  const [isPaused, setIsPaused] = useState(false)
  const [leaderboard, setLeaderboard] = useState<{ name: string; level: number; time: number }[]>([])

  const totalLevels = levels.length

  // Load game state from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("crispyFortyGameState")
      if (savedState) {
        try {
          const { currentLevel, levelProgress, hintsUsed, gameStarted: savedGameStarted } = JSON.parse(savedState)
          setCurrentLevel(currentLevel)
          setLevelProgress(levelProgress)
          setHintsUsed(hintsUsed)
          setGameStarted(savedGameStarted || false)
          console.log("Loaded game state:", { currentLevel, levelProgress, hintsUsed, gameStarted: savedGameStarted })
        } catch (error) {
          console.error("Error parsing saved game state:", error)
        }
      }

      const savedLeaderboard = localStorage.getItem("crispyFortyLeaderboard")
      if (savedLeaderboard) {
        try {
          setLeaderboard(JSON.parse(savedLeaderboard))
        } catch (error) {
          console.error("Error parsing leaderboard:", error)
        }
      }
    }
  }, [])

  // Save game state to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "crispyFortyGameState",
        JSON.stringify({
          currentLevel,
          levelProgress,
          hintsUsed,
          gameStarted,
        }),
      )
    }
  }, [currentLevel, levelProgress, hintsUsed, gameStarted])

  const startGame = useCallback(() => {
    console.log("Starting game...")
    setGameStarted(true)
    // Add player to leaderboard if not already present
    const playerName = localStorage.getItem("playerName") || "Player"

    setLeaderboard((prev) => {
      const playerExists = prev.some((entry) => entry.name === playerName)
      if (!playerExists) {
        const newLeaderboard = [...prev, { name: playerName, level: 1, time: 0 }]
        localStorage.setItem("crispyFortyLeaderboard", JSON.stringify(newLeaderboard))
        return newLeaderboard
      }
      return prev
    })
  }, [])

  const resetGame = useCallback(() => {
    setGameStarted(false)
    setCurrentLevel(1)
    setLevelProgress([])
    setShowSuccess(false)
    setHintsUsed(0)
    setIsPaused(false)
    stopTimer()

    if (typeof window !== "undefined") {
      localStorage.removeItem("crispyFortyGameState")
    }
  }, [])

  const completeLevel = useCallback(() => {
    if (!levelProgress.includes(currentLevel)) {
      setLevelProgress((prev) => [...prev, currentLevel])

      // Update leaderboard
      const playerName = localStorage.getItem("playerName") || "Player"
      setLeaderboard((prev) => {
        const updatedLeaderboard = prev.map((entry) => {
          if (entry.name === playerName && entry.level < currentLevel + 1) {
            return { ...entry, level: currentLevel + 1, time: Date.now() }
          }
          return entry
        })
        localStorage.setItem("crispyFortyLeaderboard", JSON.stringify(updatedLeaderboard))
        return updatedLeaderboard
      })
    }
    setShowSuccess(true)
    stopTimer()
  }, [currentLevel, levelProgress])

  const resetSuccess = useCallback(() => {
    setShowSuccess(false)
    setCurrentLevel((prev) => Math.min(prev + 1, totalLevels))
  }, [totalLevels])

  const startTimer = useCallback(
    (seconds: number) => {
      if (timerInterval) {
        clearInterval(timerInterval)
      }

      setRemainingTime(seconds)

      const interval = setInterval(() => {
        if (!isPaused) {
          setRemainingTime((prev) => {
            if (prev <= 1) {
              clearInterval(interval)
              return 0
            }
            return prev - 1
          })
        }
      }, 1000)

      setTimerInterval(interval)

      return () => {
        clearInterval(interval)
      }
    },
    [isPaused, timerInterval],
  )

  const stopTimer = useCallback(() => {
    if (timerInterval) {
      clearInterval(timerInterval)
      setTimerInterval(null)
    }
  }, [timerInterval])

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev)
  }, [])

  const useHint = useCallback(() => {
    if (hintsUsed < hintsAvailable) {
      setHintsUsed((prev) => prev + 1)
    }
  }, [hintsUsed, hintsAvailable])

  return (
    <GameStateContext.Provider
      value={{
        gameStarted,
        currentLevel,
        totalLevels,
        levelProgress,
        showSuccess,
        remainingTime,
        hintsUsed,
        hintsAvailable,
        isPaused,
        leaderboard,
        startGame,
        resetGame,
        completeLevel,
        resetSuccess,
        startTimer,
        stopTimer,
        useHint,
        togglePause,
      }}
    >
      {children}
    </GameStateContext.Provider>
  )
}

export const useGameState = () => useContext(GameStateContext)
