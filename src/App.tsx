import { useEffect } from "react"
import { MessageSquareHeart, Rocket, ShieldCheck, Sparkles } from "lucide-react"
import { ChatShell } from "@/components/chat/chat-shell"
import { ThemeToggle } from "@/components/theme-toggle"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useThemeStore } from "@/store/chat-store"

function App() {
  const mode = useThemeStore((state) => state.mode)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "night")
  }, [mode])

  return (
    <div className="app-atmosphere relative isolate overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-6rem] top-[-8rem] h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl dark:bg-cyan-500/15" />
        <div className="absolute bottom-[-12rem] right-[-7rem] h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl dark:bg-emerald-500/15" />
        <div className="grain absolute inset-0 opacity-15" />
      </div>

      <div className="mx-auto flex min-h-dvh w-full max-w-7xl flex-col px-4 pb-8 pt-6 sm:px-6 lg:px-8">
        <header className="panel-glass mb-6 rounded-3xl border border-border/70 px-5 py-5 shadow-glass backdrop-blur-md sm:px-6 sm:py-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-3">
              <div>
                <h1 className="heading-gradient font-display text-2xl font-bold leading-tight sm:text-3xl">Route Atlas</h1>
                <p className="theme-description mt-1 max-w-2xl text-sm sm:text-base">
                  A focused global travel planner for itinerary, stay, food, transit, and budget decisions.
                </p>
              </div>
            </div>
            <div className="pt-1">
              <ThemeToggle />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
            <div className="stat-chip interactive-chip">
              <p className="chip-label">Coverage</p>
              <p className="chip-value">Global Cities + Smart Fallback</p>
            </div>
            <div className="stat-chip interactive-chip">
              <p className="chip-label">Experience</p>
              <p className="chip-value">Adaptive Replies + Prompt Chips</p>
            </div>
            <div className="stat-chip interactive-chip">
              <p className="chip-label">State Handling</p>
              <p className="chip-value">Empty, Loading, Error, Retry</p>
            </div>
          </div>
        </header>

        <main className="grid flex-1 grid-cols-1 items-start gap-5 lg:grid-cols-12">
          <section className="grid content-start grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1 lg:self-start">
            <Card className="info-card border-cyan-400/30 hover-card">
              <CardHeader>
                <CardTitle className="heading-cyan flex items-center gap-2 text-base">
                  <span className="icon-chip interactive-chip bg-cyan-500/15">
                    <Sparkles className="h-4 w-4 text-cyan-500" />
                  </span>
                  First Impression
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Prompt chips and location-aware guidance help users start quickly without ambiguous setup.
              </CardContent>
            </Card>

            <Card className="info-card border-emerald-400/30 hover-card">
              <CardHeader>
                <CardTitle className="heading-emerald flex items-center gap-2 text-base">
                  <span className="icon-chip interactive-chip bg-emerald-500/15">
                    <MessageSquareHeart className="h-4 w-4 text-emerald-500" />
                  </span>
                  Conversation Quality
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Empty, loading, and error states are integrated for smooth chat continuity and user trust.
              </CardContent>
            </Card>

            <Card className="info-card border-sky-400/30 hover-card">
              <CardHeader>
                <CardTitle className="heading-sky flex items-center gap-2 text-base">
                  <span className="icon-chip interactive-chip bg-sky-500/15">
                    <ShieldCheck className="h-4 w-4 text-sky-500" />
                  </span>
                  Reliable Scope
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                The assistant stays within travel planning and gracefully handles both known and unknown locations.
              </CardContent>
            </Card>

            <Card className="info-card border-primary/30 hover-card">
              <CardHeader>
                <CardTitle className="heading-indigo flex items-center gap-2 text-base">
                  <span className="icon-chip interactive-chip bg-primary/15">
                    <Rocket className="h-4 w-4 text-primary" />
                  </span>
                  Delivery Ready
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Built with Vite, Tailwind, shadcn-style components, and Zustand for a clean deploy-ready stack.
              </CardContent>
            </Card>
          </section>

          <section className="lg:col-span-8">
            <ChatShell />
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
