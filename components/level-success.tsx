"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight } from "lucide-react"

interface LevelSuccessProps {
  onContinue: () => void
  level: number
}

export default function LevelSuccess({ onContinue, level }: LevelSuccessProps) {
  useEffect(() => {
    // Launch confetti
    const duration = 2000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#9c5fff", "#ff49db", "#0af2f2"],
      })

      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#9c5fff", "#ff49db", "#0af2f2"],
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }

    frame()
  }, [])

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex flex-col items-center justify-center py-12 text-center"
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{ duration: 0.6 }}
        className="mb-6 text-green-500"
      >
        <CheckCircle className="h-24 w-24" />
      </motion.div>

      <h2 className="text-3xl font-bold mb-2">Level {level} Complete!</h2>
      <p className="text-muted-foreground mb-8">Great job! Your mind is getting sharper.</p>

      <Button
        size="lg"
        onClick={onContinue}
        className="px-6 py-5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg"
      >
        Continue to Level {level + 1}
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </motion.div>
  )
}
