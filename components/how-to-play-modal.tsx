"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Brain, Puzzle, Lightbulb, Clock, Trophy } from "lucide-react"

interface HowToPlayModalProps {
  open: boolean
  onClose: () => void
}

export default function HowToPlayModal({ open, onClose }: HowToPlayModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            How to Play Crispy-Forty
          </DialogTitle>
          <DialogDescription>A guide to conquering all 40 mind-bending levels</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0 mt-1">
              <Puzzle className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Diverse Puzzles</h3>
              <p className="text-sm text-muted-foreground">
                Each level presents a unique challenge: riddles, patterns, visual puzzles, word games, and more.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-shrink-0 mt-1">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Hints</h3>
              <p className="text-sm text-muted-foreground">
                You have limited hints available. Use them wisely when you're stuck!
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-shrink-0 mt-1">
              <Clock className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Timed Challenges</h3>
              <p className="text-sm text-muted-foreground">
                Some levels have time limits. Think fast and solve before time runs out!
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-shrink-0 mt-1">
              <Trophy className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Progress Tracking</h3>
              <p className="text-sm text-muted-foreground">
                Your progress is saved automatically. Compete for the fastest completion time!
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onClose}>Got it</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
