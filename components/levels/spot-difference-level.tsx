"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

interface SpotDifferenceLevelProps {
  data: any
  onSolve: () => void
  isPaused?: boolean
}

export default function SpotDifferenceLevel({ data, onSolve, isPaused = false }: SpotDifferenceLevelProps) {
  const [foundDifferences, setFoundDifferences] = useState<number[]>([])

  useEffect(() => {
    if (foundDifferences.length === data.differences.length) {
      setTimeout(() => {
        onSolve()
      }, 1000)
    }
  }, [foundDifferences, data.differences.length, onSolve])

  const handleClick = (x: number, y: number, imageIndex: number) => {
    if (isPaused) return

    // Check if click is near any difference point
    data.differences.forEach((diff: any, index: number) => {
      if (
        !foundDifferences.includes(index) &&
        Math.abs(x - diff.x[imageIndex]) < 20 &&
        Math.abs(y - diff.y[imageIndex]) < 20
      ) {
        setFoundDifferences((prev) => [...prev, index])
      }
    })
  }

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <p className="text-lg mb-6">{data.instructions}</p>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {[0, 1].map((imageIndex) => (
          <div key={imageIndex} className="relative">
            <img
              src={data.images[imageIndex] || "/placeholder.svg?height=300&width=300"}
              alt={`Spot the difference image ${imageIndex + 1}`}
              className={`w-full max-w-[300px] h-auto border-2 border-primary/20 rounded-lg ${isPaused ? "opacity-50" : ""}`}
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                const x = e.clientX - rect.left
                const y = e.clientY - rect.top
                handleClick(x, y, imageIndex)
              }}
              style={{ cursor: isPaused ? "not-allowed" : "pointer" }}
            />

            {foundDifferences.map((diffIndex) => (
              <motion.div
                key={diffIndex}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute w-8 h-8 rounded-full bg-green-500/50 flex items-center justify-center"
                style={{
                  left: data.differences[diffIndex].x[imageIndex] - 16,
                  top: data.differences[diffIndex].y[imageIndex] - 16,
                }}
              >
                <Check className="h-4 w-4 text-white" />
              </motion.div>
            ))}
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-4">
        {Array.from({ length: data.differences.length }).map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              foundDifferences.includes(index) ? "bg-green-500" : "bg-gray-300 dark:bg-gray-700"
            }`}
          />
        ))}
      </div>

      <p className="text-sm text-muted-foreground">
        Find {data.differences.length} differences between these two images.
      </p>
    </div>
  )
}
