// This file contains the data for all 40 levels of the game

export const levels = [
  // Level 1: Number Pattern
  {
    id: 1,
    title: "Number Pattern",
    type: "numberPattern",
    instructions: "What comes next in this sequence?",
    sequence: [2, 4, 8, 16, 32],
    answer: "64",
    hint: "Each number is multiplied by 2 to get the next number.",
    checkAnswer: (answer: string) => answer === "64",
    timed: false,
  },

  // Level 2: Word Scramble
  {
    id: 2,
    title: "Word Scramble",
    type: "wordScramble",
    instructions: "Unscramble the letters to form a valid 5-letter word.",
    scrambledWord: "UZZLEP",
    answer: "PUZZLE",
    hint: "It's something you're solving right now.",
    checkAnswer: (answer: string) => answer.toLowerCase() === "puzzle",
    timed: false,
  },

  // Level 3: Spot the Difference
  {
    id: 3,
    title: "Spot the Difference",
    type: "spotDifference",
    instructions: "Find 3 differences between these two images.",
    images: ["/placeholder.svg?height=300&width=300", "/placeholder.svg?height=300&width=300"],
    differences: [
      { x: [50, 50], y: [50, 50] },
      { x: [150, 150], y: [150, 150] },
      { x: [250, 250], y: [250, 250] },
    ],
    hint: "Look carefully at the corners and center of the images.",
    timed: false,
  },

  // Level 4: Riddle
  {
    id: 4,
    title: "Classic Riddle",
    type: "riddle",
    instructions: "Solve this classic riddle.",
    riddle: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
    answer: "echo",
    hint: "Think about sounds that come back to you.",
    checkAnswer: (answer: string) => answer.toLowerCase() === "echo",
    timed: false,
  },

  // Level 5: Maze
  {
    id: 5,
    title: "Keyboard Maze",
    type: "maze",
    instructions: "Navigate through the maze to reach the green goal.",
    maze: [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1, 0, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 1],
      [1, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
    ],
    startPos: { x: 1, y: 1 },
    endPos: { x: 6, y: 5 },
    hint: "Use arrow keys or the on-screen buttons to navigate.",
    timed: true,
    timeLimit: 30,
  },

  // Additional levels would be defined here
  // For now, I'll add placeholders for the remaining levels
  ...Array.from({ length: 35 }, (_, i) => ({
    id: i + 6,
    title: `Level ${i + 6}`,
    type: "riddle",
    instructions: "This level is coming soon!",
    riddle: "This level is under construction. Type 'next' to proceed.",
    answer: "next",
    hint: "Just type 'next' to continue.",
    checkAnswer: (answer: string) => answer.toLowerCase() === "next",
    timed: false,
  })),
]
