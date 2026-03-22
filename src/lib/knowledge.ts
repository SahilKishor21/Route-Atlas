export type LocationProfile = {
  id: string
  name: string
  country: string
  aliases: string[]
  bestMonths: string
  neighborhoods: string[]
  foods: string[]
  transport: string[]
  etiquette: string[]
  budgetTip: string
  oneDayPlan: string
}

export const topic = {
  name: "Global City Travel Planning",
  scope:
    "Worldwide city trip planning with location-aware itineraries, neighborhoods, transport advice, food ideas, etiquette, budget strategy, and season guidance."
}

export const starterPrompts = [
  "Plan a one-day itinerary in Paris for first-time visitors",
  "Where should I stay in Tokyo for nightlife and food?",
  "How should I move around Singapore for a 3-day trip?",
  "Best local foods to try in Bangkok",
  "What is the best time to visit Cape Town?"
]

export const locationProfiles: LocationProfile[] = [
  {
    id: "kyoto",
    name: "Kyoto",
    country: "Japan",
    aliases: ["kyoto", "japan kyoto"],
    bestMonths: "March-April and October-November",
    neighborhoods: ["Gion", "Higashiyama", "Kawaramachi", "Arashiyama"],
    foods: ["Kaiseki", "Yudofu", "Matcha desserts", "Tofu specialties"],
    transport: ["Subway + buses", "IC cards", "Taxi for temple-to-temple hops"],
    etiquette: ["Quiet temple behavior", "Respect no-photo areas", "Do not block narrow lanes"],
    budgetTip: "Use set lunch menus and cluster nearby temples on foot to cut transport costs.",
    oneDayPlan:
      "Start at Fushimi Inari at sunrise, continue to Kiyomizu-dera and Higashiyama lanes, then evening in Gion and Pontocho."
  },
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    aliases: ["tokyo", "tokio"],
    bestMonths: "March-May and October-November",
    neighborhoods: ["Shinjuku", "Shibuya", "Asakusa", "Ginza"],
    foods: ["Sushi", "Ramen", "Yakitori", "Monjayaki"],
    transport: ["Metro + JR lines", "Suica/Pasmo cards", "Avoid rush-hour transfers"],
    etiquette: ["Keep voice low on trains", "Queue discipline", "No walking while eating in crowded streets"],
    budgetTip: "Use convenience store breakfasts and neighborhood izakaya lunches for strong value.",
    oneDayPlan:
      "Morning in Asakusa, midday at Ueno or Akihabara, sunset in Shibuya, and dinner in Shinjuku Omoide Yokocho."
  },
  {
    id: "paris",
    name: "Paris",
    country: "France",
    aliases: ["paris"],
    bestMonths: "April-June and September-October",
    neighborhoods: ["Le Marais", "Saint-Germain", "Montmartre", "Latin Quarter"],
    foods: ["Croissant", "Steak frites", "Onion soup", "Macarons"],
    transport: ["Metro", "RER for airport/transfers", "Walk central arrondissements"],
    etiquette: ["Greet with Bonjour", "Keep voice moderate", "Reserve popular restaurants early"],
    budgetTip: "Use museum passes and set-menu lunches near major sights.",
    oneDayPlan:
      "Morning Louvre area walk, afternoon Seine and Notre-Dame quarter, sunset at Trocadero, dinner in Le Marais."
  },
  {
    id: "rome",
    name: "Rome",
    country: "Italy",
    aliases: ["rome", "roma"],
    bestMonths: "April-June and late September-October",
    neighborhoods: ["Trastevere", "Centro Storico", "Monti", "Prati"],
    foods: ["Cacio e pepe", "Carbonara", "Suppli", "Gelato"],
    transport: ["Metro + buses", "Walk historic center", "Pre-book major attractions"],
    etiquette: ["Cover shoulders in churches", "Avoid fountains and restricted zones", "Book timed entries"],
    budgetTip: "Prioritize one paid landmark per day and spend the rest on walkable piazzas.",
    oneDayPlan:
      "Early Colosseum and Roman Forum, afternoon Pantheon and Trevi, sunset from Pincian Hill, dinner in Trastevere."
  },
  {
    id: "barcelona",
    name: "Barcelona",
    country: "Spain",
    aliases: ["barcelona"],
    bestMonths: "May-June and September",
    neighborhoods: ["Eixample", "El Born", "Gracia", "Barceloneta"],
    foods: ["Paella", "Bombas", "Pan con tomate", "Seafood tapas"],
    transport: ["Metro", "T-Usual transit cards", "Walk Gothic and Born lanes"],
    etiquette: ["Protect personal belongings", "Dinner runs late", "Respect quiet residential lanes"],
    budgetTip: "Tapas hopping is often cheaper than single large sit-down dinners.",
    oneDayPlan:
      "Morning Sagrada Familia, midday Eixample and Casa Batllo, sunset bunkers viewpoint, tapas dinner in El Born."
  },
  {
    id: "new-york",
    name: "New York",
    country: "United States",
    aliases: ["new york", "nyc", "manhattan"],
    bestMonths: "April-June and September-November",
    neighborhoods: ["Midtown", "SoHo", "Williamsburg", "Upper West Side"],
    foods: ["Bagels", "Pizza slices", "Pastrami", "Cheesecake"],
    transport: ["Subway", "OMNY contactless", "Walk + subway combo"],
    etiquette: ["Keep right on escalators", "Fast-moving lines", "Tip in sit-down restaurants"],
    budgetTip: "Use subway day routing and reserve one skyline deck instead of multiple paid viewpoints.",
    oneDayPlan:
      "Morning Central Park and museums, afternoon SoHo walk, sunset Brooklyn Bridge, dinner in Lower Manhattan or Brooklyn."
  },
  {
    id: "singapore",
    name: "Singapore",
    country: "Singapore",
    aliases: ["singapore", "sg"],
    bestMonths: "February-April",
    neighborhoods: ["Marina Bay", "Chinatown", "Kampong Glam", "Tiong Bahru"],
    foods: ["Hainanese chicken rice", "Laksa", "Satay", "Chili crab"],
    transport: ["MRT", "Buses", "EZ-Link or contactless card"],
    etiquette: ["No littering", "Respect food court tray return", "Observe queue culture"],
    budgetTip: "Hawker centers provide excellent meals at lower cost than mall dining.",
    oneDayPlan:
      "Morning Gardens by the Bay, midday Chinatown and hawker lunch, evening Marina Bay skyline and light show."
  },
  {
    id: "istanbul",
    name: "Istanbul",
    country: "Turkey",
    aliases: ["istanbul"],
    bestMonths: "April-May and September-October",
    neighborhoods: ["Sultanahmet", "Karakoy", "Kadikoy", "Beyoglu"],
    foods: ["Kebab", "Meze", "Baklava", "Turkish breakfast"],
    transport: ["Tram + metro", "Istanbulkart", "Ferries between continents"],
    etiquette: ["Dress modestly at mosques", "Remove shoes where required", "Respect prayer times"],
    budgetTip: "Use ferries for scenic transit and lower-cost cross-city movement.",
    oneDayPlan:
      "Morning Hagia Sophia and Blue Mosque area, afternoon Grand Bazaar, evening Bosphorus ferry and Karakoy dinner."
  },
  {
    id: "bangkok",
    name: "Bangkok",
    country: "Thailand",
    aliases: ["bangkok"],
    bestMonths: "November-February",
    neighborhoods: ["Sukhumvit", "Old Town", "Silom", "Ari"],
    foods: ["Pad thai", "Boat noodles", "Mango sticky rice", "Som tam"],
    transport: ["BTS + MRT", "River boats", "Use Grab at off-peak times"],
    etiquette: ["Temple dress code", "Remove shoes indoors where requested", "Respect royal sites"],
    budgetTip: "Street food and food courts can dramatically lower daily food cost.",
    oneDayPlan:
      "Morning Grand Palace and Wat Pho, afternoon canals or museum stop, evening street food crawl around Sukhumvit or Yaowarat."
  },
  {
    id: "cape-town",
    name: "Cape Town",
    country: "South Africa",
    aliases: ["cape town", "capetown"],
    bestMonths: "October-April",
    neighborhoods: ["City Bowl", "Sea Point", "Woodstock", "Camps Bay"],
    foods: ["Braai", "Bobotie", "Cape Malay curry", "Fresh seafood"],
    transport: ["Ride-hailing", "MyCiTi buses", "Car hire for peninsula routes"],
    etiquette: ["Check route safety timing", "Avoid isolated areas at night", "Respect ocean warning flags"],
    budgetTip: "Mix city stays with day tours instead of changing hotels often.",
    oneDayPlan:
      "Morning Table Mountain weather permitting, afternoon V&A Waterfront, sunset at Camps Bay with seafood dinner."
  }
]

export const supportedLocationNames = locationProfiles.map((location) => location.name)
