import { ThemeProvider } from "@/components/theme-provider"
import GameContainer from "@/components/game-container"
import { GameStateProvider } from "@/lib/game-state"

export default function Home() {
  return (
    <GameStateProvider>
      <ThemeProvider defaultTheme="dark" storageKey="crispy-forty-theme">
        <main className="min-h-screen bg-background">
          <GameContainer />
        </main>
      </ThemeProvider>
    </GameStateProvider>
  )
}
