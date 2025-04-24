"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MazeLevelProps {
  data: any
  onSolve: () => void
  isPaused?: boolean
}

export default function MazeLevel({ data, onSolve, isPaused = false }: MazeLevelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [playerPos, setPlayerPos] = useState({ x: data.startPos.x, y: data.startPos.y })

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPaused) return

      e.preventDefault()

      let newX = playerPos.x
      let newY = playerPos.y

      switch (e.key) {
        case "ArrowUp":
          newY -= 1
          break
        case "ArrowDown":
          newY += 1
          break
        case "ArrowLeft":
          newX -= 1
          break
        case "ArrowRight":
          newX += 1
          break
      }

      // Check if new position is valid (not a wall)
      if (
        newX >= 0 &&
        newX < data.maze[0].length &&
        newY >= 0 &&
        newY < data.maze.length &&
        data.maze[newY][newX] !== 1
      ) {
        setPlayerPos({ x: newX, y: newY })

        // Check if player reached the end
        if (newX === data.endPos.x && newY === data.endPos.y) {
          onSolve()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [playerPos, data, onSolve, isPaused])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const cellSize = 30
    canvas.width = data.maze[0].length * cellSize
    canvas.height = data.maze.length * cellSize

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw maze
    for (let y = 0; y < data.maze.length; y++) {
      for (let x = 0; x < data.maze[y].length; x++) {
        if (data.maze[y][x] === 1) {
          // Wall
          ctx.fillStyle = "#6b7280"
          ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
        } else {
          // Path
          ctx.fillStyle = "#f3f4f6"
          ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
          ctx.strokeStyle = "#e5e7eb"
          ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize)
        }

        // Draw end point
        if (x === data.endPos.x && y === data.endPos.y) {
          ctx.fillStyle = "#10b981"
          ctx.beginPath()
          ctx.arc(x * cellSize + cellSize / 2, y * cellSize + cellSize / 2, cellSize / 3, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    // Apply pause overlay if game is paused
    if (isPaused) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.3)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 16px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText("PAUSED", canvas.width / 2, canvas.height / 2)
    }

    // Draw player
    ctx.fillStyle = "#8b5cf6"
    ctx.beginPath()
    ctx.arc(playerPos.x * cellSize + cellSize / 2, playerPos.y * cellSize + cellSize / 2, cellSize / 3, 0, Math.PI * 2)
    ctx.fill()
  }, [data, playerPos, isPaused])

  const movePlayer = (dx: number, dy: number) => {
    if (isPaused) return

    const newX = playerPos.x + dx
    const newY = playerPos.y + dy

    if (
      newX >= 0 &&
      newX < data.maze[0].length &&
      newY >= 0 &&
      newY < data.maze.length &&
      data.maze[newY][newX] !== 1
    ) {
      setPlayerPos({ x: newX, y: newY })

      if (newX === data.endPos.x && newY === data.endPos.y) {
        onSolve()
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <p className="text-lg mb-6">{data.instructions}</p>

      <div className="mb-6 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md">
        <canvas ref={canvasRef} className="border border-gray-200 dark:border-gray-700 rounded" />
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <div></div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => movePlayer(0, -1)}
          className="aspect-square"
          disabled={isPaused}
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
        <div></div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => movePlayer(-1, 0)}
          className="aspect-square"
          disabled={isPaused}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div></div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => movePlayer(1, 0)}
          className="aspect-square"
          disabled={isPaused}
        >
          <ArrowRight className="h-4 w-4" />
        </Button>

        <div></div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => movePlayer(0, 1)}
          className="aspect-square"
          disabled={isPaused}
        >
          <ArrowDown className="h-4 w-4" />
        </Button>
        <div></div>
      </div>

      <p className="text-sm text-muted-foreground">Use arrow keys or buttons to navigate the maze to the green goal.</p>
    </div>
  )
}
