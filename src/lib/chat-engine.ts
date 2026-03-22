import { locationProfiles, supportedLocationNames, topic } from "@/lib/knowledge"

type HistoryMessage = {
  role: "assistant" | "user"
  content: string
}

type TripPreferences = {
  days?: number
  budget?: number
  interests: string[]
}

const outOfScope = [
  "stock",
  "crypto",
  "politics",
  "medical",
  "legal",
  "coding",
  "javascript",
  "python",
  "ai model",
  "violence",
  "weapon"
]

const tokenize = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)

const intentGroups = {
  itinerary: ["itinerary", "plan", "one day", "day trip", "schedule"],
  stay: ["stay", "hotel", "area", "neighborhood", "where should i stay"],
  food: ["food", "eat", "dish", "restaurant", "cuisine"],
  transport: ["transport", "train", "bus", "metro", "subway", "move around"],
  etiquette: ["etiquette", "rules", "custom", "culture", "respect"],
  budget: ["budget", "cheap", "cost", "save money", "price"],
  season: ["best time", "season", "weather", "when to visit"]
} as const

const detectIntent = (question: string) => {
  const normalized = question.toLowerCase()
  for (const [intent, keywords] of Object.entries(intentGroups)) {
    if (keywords.some((keyword) => normalized.includes(keyword))) {
      return intent as keyof typeof intentGroups
    }
  }
  return "general" as const
}

const detectLocation = (question: string) => {
  const normalized = question.toLowerCase()
  return locationProfiles.find((location) =>
    location.aliases.some((alias) => normalized.includes(alias.toLowerCase()))
  )
}

const detectLooseLocationMention = (question: string) => {
  const normalized = question
    .toLowerCase()
    .replace(/[^a-z\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()

  const explicitPatterns = [
    /(?:in|to|for|around|visit|travel to|trip to|plan for|plan to)\s+([a-z][a-z\s-]{2,30})/,
    /city of\s+([a-z][a-z\s-]{2,30})/,
    /([a-z][a-z\s-]{2,30})\s+bihar/,
    /([a-z][a-z\s-]{2,30})\s+india/
  ]

  for (const pattern of explicitPatterns) {
    const matched = normalized.match(pattern)
    if (!matched) {
      continue
    }

    const candidate = matched[1]
      .split(" ")
      .slice(0, 3)
      .join(" ")
      .trim()

    if (candidate && !supportedLocationNames.some((name) => candidate.includes(name.toLowerCase()))) {
      return candidate
    }
  }

  const commonTravelWords = new Set([
    "plan",
    "itinerary",
    "trip",
    "travel",
    "visit",
    "city",
    "town",
    "place",
    "best",
    "good",
    "days",
    "day",
    "with",
    "for",
    "in",
    "to",
    "from",
    "and",
    "near",
    "around",
    "stay",
    "food",
    "budget",
    "transport"
  ])

  const tokens = normalized.split(" ").filter(Boolean)
  const candidates = tokens.filter(
    (token) => token.length > 2 && !commonTravelWords.has(token) && !supportedLocationNames.some((name) => token === name.toLowerCase())
  )

  if (candidates.length > 0 && normalized.includes("bihar")) {
    return `${candidates[0]} bihar`
  }

  if (candidates.length > 0 && /(plan|itinerary|visit|travel|trip|stay|food|transport|budget)/.test(normalized)) {
    return candidates[0]
  }

  return null
}

const parseTripPreferences = (question: string): TripPreferences => {
  const normalized = question.toLowerCase()
  const daysMatch = normalized.match(/(\d{1,2})\s*(?:day|days|d)/)
  const budgetMatch = normalized.match(/(?:budget|under|around|rs|inr|₹)\s*[:is-]*\s*(\d{3,7})/)
  const interestsMatch = normalized.match(/(?:interest|interests|like|likes)\s*(?:is|are|:)?\s*([a-z\s,/-]{3,80})/)

  const interests = interestsMatch
    ? interestsMatch[1]
        .split(/,|and|\//)
        .map((item) => item.trim())
        .filter((item) => item.length > 2)
        .slice(0, 4)
    : []

  return {
    days: daysMatch ? Number(daysMatch[1]) : undefined,
    budget: budgetMatch ? Number(budgetMatch[1]) : undefined,
    interests
  }
}

const hasTripDetails = (question: string) => {
  const normalized = question.toLowerCase()
  return /(day|days|budget|interest|interests|like|likes|rs|inr|₹)/.test(normalized)
}

const detectLocationFromText = (text: string) => detectLocation(text) ?? detectLooseLocationMention(text)

const detectLocationFromHistory = (history: HistoryMessage[]) => {
  for (let index = history.length - 1; index >= 0; index -= 1) {
    const message = history[index]
    if (message.role !== "user") {
      continue
    }
    const locationOrHint = detectLocationFromText(message.content)
    if (!locationOrHint) {
      continue
    }

    if (typeof locationOrHint === "string") {
      return { type: "loose" as const, value: locationOrHint }
    }

    return { type: "profile" as const, value: locationOrHint.id }
  }
  return null
}

const renderLocationAnswer = (locationId: string, intent: ReturnType<typeof detectIntent>) => {
  const profile = locationProfiles.find((location) => location.id === locationId)
  if (!profile) {
    return "I can help with worldwide travel planning. Share your city and I will create a practical plan."
  }

  if (intent === "itinerary") {
    return `${profile.name} one-day plan: ${profile.oneDayPlan}`
  }
  if (intent === "stay") {
    return `Best areas to stay in ${profile.name}: ${profile.neighborhoods.join(", ")}. Pick central if it is your first trip and nightlife zones if evening plans matter most.`
  }
  if (intent === "food") {
    return `Top local food ideas for ${profile.name}: ${profile.foods.join(", ")}. Mix one classic dish, one market-style meal, and one neighborhood specialty.`
  }
  if (intent === "transport") {
    return `Getting around ${profile.name}: ${profile.transport.join(", ")}. Build your day by geographic clusters to reduce commute time.`
  }
  if (intent === "etiquette") {
    return `Local etiquette in ${profile.name}: ${profile.etiquette.join(", ")}. These habits improve both comfort and cultural respect.`
  }
  if (intent === "budget") {
    return `Budget strategy for ${profile.name}: ${profile.budgetTip}`
  }
  if (intent === "season") {
    return `Best period for ${profile.name}: ${profile.bestMonths}. This usually balances weather, crowds, and event density.`
  }

  return [
    `${profile.name}, ${profile.country} quick planner:`,
    `Best season: ${profile.bestMonths}`,
    `Stay areas: ${profile.neighborhoods.join(", ")}`,
    `Food: ${profile.foods.join(", ")}`,
    `Transport: ${profile.transport.join(", ")}`,
    `Starter plan: ${profile.oneDayPlan}`
  ].join("\n")
}

const renderGenericAnyLocationAnswer = (locationHint: string, intent: ReturnType<typeof detectIntent>) => {
  if (intent === "itinerary") {
    return `For ${locationHint}, use a 3-block day: morning landmark cluster, midday local-food district, evening scenic walk or culture stop. Share your travel style and I can customize pace and priorities.`
  }
  if (intent === "stay") {
    return `For ${locationHint}, choose stay zones by your priority: central transport hub, food-centric district, or quieter residential area. Send your budget range and I can narrow options.`
  }
  if (intent === "transport") {
    return `For ${locationHint}, compare metro coverage, airport transfer options, and day-pass economics. Group stops by area to cut transit overhead.`
  }
  if (intent === "food") {
    return `For ${locationHint}, combine one iconic dish, one market or street-food stop, and one neighborhood restaurant known by locals.`
  }
  if (intent === "season") {
    return `For ${locationHint}, check shoulder seasons first. They often give better prices and shorter queues while keeping good weather.`
  }
  return `I can plan ${locationHint} too. Share trip length, budget, and interests, and I will return a practical itinerary, stay area suggestions, food picks, and transport strategy.`
}

const renderPersonalizedPlan = (locationHint: string, preferences: TripPreferences) => {
  const days = preferences.days ?? 3
  const dailyBudget = preferences.budget ? Math.max(Math.round(preferences.budget / days), 1) : null
  const interestsText = preferences.interests.length > 0 ? preferences.interests.join(", ") : "scenic and local highlights"

  const budgetLine = dailyBudget
    ? `Budget split: around ${dailyBudget} per day for stay, food, local transport, and entry tickets.`
    : "Budget split: share your total budget for a sharper day-wise allocation."

  return [
    `Great, here is a ${days}-day plan for ${locationHint} focused on ${interestsText}.`,
    `Day 1: Central landmarks and orientation walk, then local market food trail in the evening.`,
    `Day 2: Nature-forward route with hill, waterfall, or viewpoint options plus a slower cultural stop.`,
    `Day 3: Flexible local experiences, shopping or neighborhood exploration, then return logistics.`,
    budgetLine,
    `Stay strategy: choose a central transport-connected area to minimize commute and keep costs predictable.`,
    `Transport strategy: cluster nearby spots in one block and reserve longer hops for early morning or late evening.`
  ].join("\n")
}

export const buildAnswer = async (question: string, history: HistoryMessage[] = []) => {
  const normalized = question.toLowerCase()

  if (outOfScope.some((word) => normalized.includes(word))) {
    return `I am focused on ${topic.name}. I can help with travel planning, location decisions, itineraries, food, transit, etiquette, and budget guidance.`
  }

  const location = detectLocation(question)
  const looseLocation = detectLooseLocationMention(question)
  const intent = detectIntent(question)
  const preferences = parseTripPreferences(question)
  const hasDetails = hasTripDetails(question)

  if (location) {
    if (hasDetails && intent === "general") {
      return renderPersonalizedPlan(location.name, preferences)
    }
    return renderLocationAnswer(location.id, intent)
  }

  if (looseLocation) {
    if (hasDetails && intent === "general") {
      return renderPersonalizedPlan(looseLocation, preferences)
    }
    return renderGenericAnyLocationAnswer(looseLocation, intent)
  }

  if (hasDetails) {
    const locationFromHistory = detectLocationFromHistory(history)
    if (locationFromHistory?.type === "profile") {
      const profile = locationProfiles.find((item) => item.id === locationFromHistory.value)
      if (profile) {
        return renderPersonalizedPlan(profile.name, preferences)
      }
    }
    if (locationFromHistory?.type === "loose") {
      return renderPersonalizedPlan(locationFromHistory.value, preferences)
    }
  }

  return `Share a destination city and I will build a targeted plan. I currently provide curated instant guidance for ${supportedLocationNames.join(", ")}, and I can still generate practical planning frameworks for other locations.`
}
