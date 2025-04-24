"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trophy, Brain } from "lucide-react"
import { useGameState } from "@/lib/game-state"

interface LeaderboardModalProps {
  open: boolean
  onClose: () => void
}

export default function LeaderboardModal({ open, onClose }: LeaderboardModalProps) {
  const { leaderboard } = useGameState()

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-500" />
            Leaderboard
          </DialogTitle>
          <DialogDescription>Top puzzle solvers and their achievements</DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          {leaderboard.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Rank</TableHead>
                  <TableHead>Player</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead className="text-right">Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboard.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">#{index + 1}</TableCell>
                    <TableCell>{entry.name}</TableCell>
                    <TableCell>{entry.level}</TableCell>
                    <TableCell className="text-right">{entry.time}s</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8">
              <Brain className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
              <p className="text-muted-foreground">No records yet. Be the first to solve puzzles!</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
