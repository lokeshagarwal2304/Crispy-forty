"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Shuffle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WordScrambleLevelProps {
  data: any
  isPaused?: boolean
}

export default function WordScrambleLevel({ data, isPaused = false }: WordScrambleLevelProps) {
  const [scrambledLetters, setScrambledLetters] = useState<string[]>([])

  useEffect(() => {
    setScrambledLetters(data.scrambledWord.split(""))
  }, [data.scrambledWord])

  const reshuffleWord = () => {
    if (isPaused) return

    const shuffled = [...scrambledLetters]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    setScrambledLetters(shuffled)
  }

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <p className="text-lg mb-6">{data.instructions}</p>

      <div className="flex items-center justify-center gap-2 mb-6">
        {scrambledLetters.map((letter, index) => (
          <motion.div
            key={index}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-lg font-bold text-xl uppercase"
          >
            {letter}
          </motion.div>
        ))}
      </div>

      <Button variant="outline" size="sm" onClick={reshuffleWord} className="mb-4" disabled={isPaused}>
        <Shuffle className="h-4 w-4 mr-2" />
        Reshuffle
      </Button>

      <p className="text-sm text-muted-foreground">Unscramble the letters to form a valid 5-letter word.</p>
    </div>
  )
}
