import { AlertTriangle, Bot, Circle, UserRound } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChatMessage, useChatStore } from "@/store/chat-store"

type ChatMessageProps = {
  message: ChatMessage
  index: number
}

export function ChatMessageRow({ message, index }: ChatMessageProps) {
  const retryLast = useChatStore((state) => state.retryLast)
  const isUser = message.role === "user"
  const riseClass = ["", "[animation-delay:60ms]", "[animation-delay:120ms]", "[animation-delay:180ms]"]
  const delay = riseClass[index % riseClass.length]

  return (
    <div
      className={cn("flex w-full animate-rise gap-3", delay, isUser ? "justify-end" : "justify-start")}
    >
      {!isUser ? (
        <Avatar className="interactive-chip mt-0.5 h-9 w-9 border border-primary/30 bg-primary/10">
          <AvatarFallback>
            <Bot className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      ) : null}

      <div
        className={cn(
          "max-w-[85%] space-y-1 rounded-2xl border px-4 py-3 text-sm leading-relaxed shadow-sm sm:max-w-[78%]",
          isUser
            ? "border-primary/35 bg-gradient-to-br from-primary to-sky-500 text-primary-foreground transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            : "assistant-bubble border-border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
        )}
      >
        <p className="whitespace-pre-wrap">
          {message.state === "loading" ? (
            <span className="inline-flex items-center gap-1.5">
              <Circle className="h-2.5 w-2.5 animate-pulseDot fill-current" />
              <Circle className="h-2.5 w-2.5 animate-pulseDot fill-current [animation-delay:160ms]" />
              <Circle className="h-2.5 w-2.5 animate-pulseDot fill-current [animation-delay:320ms]" />
            </span>
          ) : (
            message.content
          )}
        </p>

        <div className="flex items-center justify-between gap-3 pt-1">
          <Badge
            variant="outline"
            className={cn(
              "rounded-full px-2 py-0 text-[11px]",
              isUser ? "border-white/45 text-white" : "border-border text-muted-foreground"
            )}
          >
            {isUser ? <UserRound className="mr-1 h-3 w-3" /> : <Bot className="mr-1 h-3 w-3" />}
            {isUser ? "You" : "Route Atlas"}
          </Badge>

          {message.state === "error" ? (
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="h-7 rounded-md border-red-400/45 px-2 text-red-500"
              onClick={retryLast}
            >
              <AlertTriangle className="mr-1 h-3.5 w-3.5" />
              Retry
            </Button>
          ) : null}
        </div>
      </div>

      {isUser ? (
        <Avatar className="interactive-chip mt-0.5 h-9 w-9 border border-sky-300/45 bg-sky-100 dark:bg-sky-950/60">
          <AvatarFallback>
            <UserRound className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      ) : null}
    </div>
  )
}
