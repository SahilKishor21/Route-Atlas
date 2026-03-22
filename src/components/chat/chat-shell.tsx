import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ChatHeader } from "@/components/chat/chat-header"
import { ChatMessageRow } from "@/components/chat/chat-message"
import { ChatComposer } from "@/components/chat/chat-composer"
import { SuggestedPrompts } from "@/components/chat/suggested-prompts"
import { useChatStore } from "@/store/chat-store"

export function ChatShell() {
  const messages = useChatStore((state) => state.messages)

  return (
    <div className="chat-surface flex h-full min-h-[72dvh] flex-col overflow-hidden rounded-2xl border border-border/75 shadow-glass backdrop-blur-md">
      <ChatHeader />
      <Separator />
      <ScrollArea className="flex-1">
        <div className="space-y-3 p-4 sm:p-5">
          {messages.map((message, index) => (
            <ChatMessageRow key={message.id} message={message} index={index} />
          ))}
          {messages.length <= 1 ? <SuggestedPrompts compact={false} /> : null}
        </div>
      </ScrollArea>
      <Separator />
      <div className="composer-surface space-y-3 p-4 sm:p-5">
        {messages.length > 1 ? <SuggestedPrompts compact /> : null}
        <ChatComposer />
      </div>
    </div>
  )
}
