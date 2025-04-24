"use client"

import { motion } from "framer-motion"

interface NumberPatternLevelProps {
  data: any
}

export default function NumberPatternLevel({ data }: NumberPatternLevelProps) {
  return (
    <div className="flex flex-col items-center justify-center py-4">
      <p className="text-lg mb-6">{data.instructions}</p>

      <div className="flex items-center justify-center gap-4 mb-6">
        {data.sequence.map((number: number, index: number) => (
          <motion.div
            key={index}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.2, duration: 0.3 }}
            className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-lg font-bold text-xl"
          >
            {number}
          </motion.div>
        ))}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: data.sequence.length * 0.2, duration: 0.3 }}
          className="w-12 h-12 flex items-center justify-center bg-primary/5 border-2 border-dashed border-primary/30 rounded-lg font-bold text-xl"
        >
          ?
        </motion.div>
      </div>

      <p className="text-sm text-muted-foreground">Find the pattern and determine what number comes next.</p>
    </div>
  )
}
