import { MoonStar, SunMedium } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useThemeStore } from "@/store/chat-store"

export function ThemeToggle() {
  const mode = useThemeStore((state) => state.mode)
  const toggleMode = useThemeStore((state) => state.toggleMode)

  return (
    <Button
      type="button"
      variant="outline"
      onClick={toggleMode}
      className="interactive-chip h-10 gap-2 rounded-xl border-primary/25 bg-card/70 px-4 hover:border-primary/40"
    >
      {mode === "day" ? <MoonStar className="h-4 w-4" /> : <SunMedium className="h-4 w-4" />}
      {mode === "day" ? "Night" : "Day"}
    </Button>
  )
}
