"use client"

import { motion } from "framer-motion"
import { HelpCircle } from "lucide-react"

interface RiddleLevelProps {
  data: any
}

export default function RiddleLevel({ data }: RiddleLevelProps) {
  return (
    <div className="flex flex-col items-center justify-center py-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <HelpCircle className="h-12 w-12 mx-auto mb-4 text-primary/60" />
      </motion.div>

      <div className="bg-primary/5 p-6 rounded-lg mb-6 max-w-md text-center">
        <p className="text-lg italic">{data.riddle}</p>
      </div>

      <p className="text-sm text-muted-foreground">Think carefully and type your answer below.</p>
    </div>
  )
}
