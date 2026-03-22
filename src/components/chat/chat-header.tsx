import { RotateCcw, ScanSearch } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useChatStore } from "@/store/chat-store"

export function ChatHeader() {
  const clearChat = useChatStore((state) => state.clearChat)

  return (
    <div className="p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="section-label text-[10px] font-semibold uppercase text-muted-foreground">Conversation Space</p>
          <h2 className="heading-sky font-display text-lg font-semibold">Chat Experience</h2>
          <p className="theme-description text-sm">Purpose-built for global travel planning decisions</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="interactive-chip rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-300">
            <ScanSearch className="mr-1 h-3.5 w-3.5" />
            Topic Trained
          </Badge>
          <Button type="button" variant="outline" size="sm" className="interactive-chip rounded-lg" onClick={clearChat}>
            <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
}
