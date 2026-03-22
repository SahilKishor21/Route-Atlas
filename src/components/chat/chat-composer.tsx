import { FormEvent, useEffect, useRef } from "react"
import { Loader2, SendHorizonal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useChatStore } from "@/store/chat-store"

export function ChatComposer() {
  const draft = useChatStore((state) => state.draft)
  const setDraft = useChatStore((state) => state.setDraft)
  const send = useChatStore((state) => state.send)
  const isThinking = useChatStore((state) => state.isThinking)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const resizeTextarea = () => {
    const element = textareaRef.current
    if (!element) {
      return
    }
    element.style.height = "0px"
    element.style.height = `${Math.min(element.scrollHeight, 220)}px`
  }

  useEffect(() => {
    resizeTextarea()
  }, [draft])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await send()
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <div className="flex-1">
        <Textarea
          ref={textareaRef}
          rows={1}
          value={draft}
          onChange={(event) => {
            setDraft(event.target.value)
            resizeTextarea()
          }}
          placeholder="Ask about any city plan, neighborhoods, transit, culture, food, or budget..."
          className="max-h-[220px] min-h-11 resize-none overflow-y-auto rounded-xl border-border bg-background/80 text-sm"
        />
      </div>
      <Button
        type="submit"
        disabled={!draft.trim() || isThinking}
        className="h-11 rounded-xl bg-gradient-to-r from-primary to-cyan-500 px-5 text-primary-foreground sm:mb-0"
      >
        {isThinking ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <SendHorizonal className="mr-2 h-4 w-4" />}
        Send
      </Button>
    </form>
  )
}
