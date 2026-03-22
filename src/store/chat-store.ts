import { create } from "zustand"
import { persist } from "zustand/middleware"
import { buildAnswer } from "@/lib/chat-engine"

export type ChatRole = "assistant" | "user"

export type ChatMessage = {
  id: string
  role: ChatRole
  content: string
  createdAt: number
  state?: "loading" | "error"
}

type ChatState = {
  messages: ChatMessage[]
  draft: string
  isThinking: boolean
  send: (question?: string) => Promise<void>
  setDraft: (value: string) => void
  retryLast: () => Promise<void>
  clearChat: () => void
}

type ThemeMode = "day" | "night"

type ThemeState = {
  mode: ThemeMode
  toggleMode: () => void
}

const initialAssistantMessage: ChatMessage = {
  id: crypto.randomUUID(),
  role: "assistant",
  content:
    "Welcome to Route Atlas. Ask me about any destination city and I will help with itinerary, stay areas, food, transit, etiquette, season, and budget strategy.",
  createdAt: Date.now()
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      messages: [initialAssistantMessage],
      draft: "",
      isThinking: false,
      setDraft: (value) => set({ draft: value }),
      clearChat: () =>
        set({
          messages: [
            {
              ...initialAssistantMessage,
              id: crypto.randomUUID(),
              createdAt: Date.now()
            }
          ],
          draft: "",
          isThinking: false
        }),
      send: async (question) => {
        const text = (question ?? get().draft).trim()
        if (!text || get().isThinking) {
          return
        }

        const userMessage: ChatMessage = {
          id: crypto.randomUUID(),
          role: "user",
          content: text,
          createdAt: Date.now()
        }

        const loadingMessageId = crypto.randomUUID()

        set((state) => ({
          draft: "",
          isThinking: true,
          messages: [
            ...state.messages,
            userMessage,
            {
              id: loadingMessageId,
              role: "assistant",
              content: "Thinking",
              createdAt: Date.now(),
              state: "loading"
            }
          ]
        }))

        try {
          await new Promise((resolve) => setTimeout(resolve, 900 + Math.random() * 700))

          if (Math.random() < 0.04) {
            throw new Error("Temporary response failure")
          }

          const answer = await buildAnswer(
            text,
            get().messages
              .filter((message) => !message.state)
              .map((message) => ({ role: message.role, content: message.content }))
          )

          set((state) => ({
            isThinking: false,
            messages: state.messages.map((message) =>
              message.id === loadingMessageId
                ? {
                    ...message,
                    content: answer,
                    state: undefined
                  }
                : message
            )
          }))
        } catch {
          set((state) => ({
            isThinking: false,
            messages: state.messages.map((message) =>
              message.id === loadingMessageId
                ? {
                    ...message,
                    content: "I could not answer due to a temporary issue. Tap retry to regenerate.",
                    state: "error"
                  }
                : message
            )
          }))
        }
      },
      retryLast: async () => {
        const messages = get().messages
        const lastUser = [...messages].reverse().find((msg) => msg.role === "user")
        if (!lastUser || get().isThinking) {
          return
        }

        set((state) => ({
          messages: state.messages.filter((msg) => msg.state !== "error")
        }))

        await get().send(lastUser.content)
      }
    }),
    {
      name: "route-atlas-chat-store",
      partialize: (state) => ({
        messages: state.messages.filter((message) => message.state !== "loading")
      })
    }
  )
)

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: "day",
      toggleMode: () => set({ mode: get().mode === "day" ? "night" : "day" })
    }),
    {
      name: "route-atlas-theme"
    }
  )
)