// This file simulates an ML-trained chatbot for the Crispy-Forty game

// Training data structure
interface TrainingExample {
  input: string
  output: string
  category: string
}

// Simulated training data (in a real ML system, this would be much larger)
const trainingData: TrainingExample[] = [
  // General game questions
  {
    input: "What is Crispy-Forty?",
    output:
      "Crispy-Forty is a 40-level puzzle game that challenges your logical thinking, pattern recognition, and problem-solving skills.",
    category: "general",
  },
  {
    input: "How do I play?",
    output:
      "Each level presents a unique puzzle. Read the instructions, solve the puzzle, and submit your answer to advance to the next level.",
    category: "general",
  },
  {
    input: "How many levels are there?",
    output: "There are 40 unique levels in Crispy-Forty, each with a different type of puzzle or challenge.",
    category: "general",
  },

  // Level-specific help
  {
    input: "I'm stuck on level 1",
    output:
      "Level 1 is a number pattern puzzle. Look for how each number relates to the previous one. What operation gives you the next number?",
    category: "level_help",
  },
  {
    input: "How do I solve the word scramble?",
    output:
      "For word scrambles, try rearranging the letters to form a valid word. You can use the reshuffle button to see different arrangements.",
    category: "level_help",
  },
  {
    input: "How do I find differences in level 3?",
    output:
      "Look carefully at both images and click on the spots where you notice differences. Pay attention to colors, shapes, and small details.",
    category: "level_help",
  },
  {
    input: "Help with the maze level",
    output:
      "Use the arrow keys or the on-screen buttons to navigate through the maze. Avoid walls and find the path to the green goal.",
    category: "level_help",
  },

  // Game mechanics
  {
    input: "How do hints work?",
    output:
      "You have a limited number of hints available. Click the hint button when you're stuck, but use them wisely as they're limited!",
    category: "mechanics",
  },
  {
    input: "What happens when I complete a level?",
    output:
      "When you complete a level, you'll see a success animation and can proceed to the next level. Your progress is saved automatically.",
    category: "mechanics",
  },
  {
    input: "How do I pause the game?",
    output:
      "You can pause the game by clicking the pause button in the top right corner of the screen. Click play to resume.",
    category: "mechanics",
  },

  // Technical issues
  {
    input: "The game is not saving my progress",
    output:
      "Your progress should save automatically. Make sure you're not in incognito mode and that your browser allows local storage.",
    category: "technical",
  },
  {
    input: "How do I reset my progress?",
    output:
      "You can reset your progress by clicking the home button and starting a new game. Be careful, as this will erase your current progress!",
    category: "technical",
  },
  {
    input: "The timer isn't working",
    output:
      "If the timer isn't working correctly, try refreshing the page. If the issue persists, you can reset the level.",
    category: "technical",
  },
]

// Simulated ML model
class SimplifiedMLModel {
  private trainingData: TrainingExample[]

  constructor(trainingData: TrainingExample[]) {
    this.trainingData = trainingData
  }

  // Simplified text similarity using word overlap
  private calculateSimilarity(input1: string, input2: string): number {
    const words1 = input1.toLowerCase().split(/\s+/)
    const words2 = input2.toLowerCase().split(/\s+/)

    let matchCount = 0
    for (const word of words1) {
      if (words2.includes(word) && word.length > 2) {
        matchCount++
      }
    }

    // Calculate similarity score
    return matchCount / Math.max(words1.length, words2.length)
  }

  // Generate a response based on the input
  generateResponse(userInput: string): string {
    // Find the most similar training example
    let bestMatch: TrainingExample | null = null
    let highestSimilarity = 0

    for (const example of this.trainingData) {
      const similarity = this.calculateSimilarity(userInput, example.input)
      if (similarity > highestSimilarity && similarity > 0.2) {
        // Threshold to avoid poor matches
        highestSimilarity = similarity
        bestMatch = example
      }
    }

    // Return the response or a fallback
    if (bestMatch) {
      return bestMatch.output
    } else {
      return "I'm not sure I understand. Could you rephrase your question about Crispy-Forty?"
    }
  }

  // Add a new training example (simulating learning)
  learn(input: string, output: string, category: string): void {
    this.trainingData.push({ input, output, category })
    console.log("Model learned a new response pattern")
  }
}

// Export the model instance
export const chatbotModel = new SimplifiedMLModel(trainingData)
