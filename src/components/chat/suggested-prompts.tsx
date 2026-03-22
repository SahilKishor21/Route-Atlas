import { starterPrompts } from "@/lib/knowledge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useChatStore } from "@/store/chat-store"

type SuggestedPromptsProps = {
  compact: boolean
}

export function SuggestedPrompts({ compact }: SuggestedPromptsProps) {
  const send = useChatStore((state) => state.send)

  return (
    <div className="space-y-2">
      <p className="section-label text-xs font-medium uppercase text-muted-foreground">Try these prompts</p>
      <div className={cn("grid gap-2", compact ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1") }>
        {starterPrompts.map((prompt) => (
          <Button
            key={prompt}
            type="button"
            variant="outline"
            onClick={() => void send(prompt)}
            className="prompt-chip h-auto justify-start whitespace-normal rounded-xl border-border/80 px-3 py-2 text-left text-xs text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-sm"
          >
            {prompt}
          </Button>
        ))}
      </div>
    </div>
  )
}
