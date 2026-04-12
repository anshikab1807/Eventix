import { useState, useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { motion } from "framer-motion"
import { Calendar, Filter, MapPin, Search, Tag, Users, X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { Select } from "../components/ui/Select"
import { Card, CardContent } from "../components/ui/Card"
import { Badge } from "../components/ui/Badge"

// Generate more dummy events for browsing
const ALL_EVENTS = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  title: [
    "Neon Nights Music Festival", "Future of AI Conference", "Culinary Masterclass", 
    "Indie Game Developers", "Yoga & Mindfulness Retreat", "Startup Pitch Night",
    "Jazz in the Park", "Web3 Summit 2026", "Street Food Festival",
    "Digital Art Exhibition", "Marathon Prep Workshop", "Comedy Club Special"
  ][i],
  date: new Date(2026, 7 + (i % 3), 15 + i).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  rawDate: new Date(2026, 7 + (i % 3), 15 + i), // keep raw date for filtering
  location: ["Los Angeles", "San Francisco", "New York", "Seattle", "Austin", "Chicago"][i % 6] + ", USA",
  price: i % 4 === 0 ? "Free" : `$${(i * 15 + 45)}`,
  ticketsRemaining: Math.floor(Math.random() * 200) + 10,
  organizer: ["LiveNation", "TechWeb", "Chef Kenji", "IGDA", "Wellness Co", "Capital Ventures"][i % 6],
  image: [
    "https://images.unsplash.com/photo-1533174000220-db92842c161a",
    "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa",
    "https://images.unsplash.com/photo-1553621042-f6e147245754",
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
    "https://images.unsplash.com/photo-1559136555-9303baea8ebd"
  ][i % 6] + "?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  category: ["Concert", "Conference", "Workshop", "Meetup", "Health", "Business"][i % 6]
}))

// Mini calendar component
function MiniCalendar({ selectedDate, onDateSelect }) {
  const [viewDate, setViewDate] = useState(selectedDate || new Date())

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()

  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"]
  const dayNames = ["Su","Mo","Tu","We","Th","Fr","Sa"]

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1))
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1))

  const isSelected = (day) => {
    if (!selectedDate) return false
    return (
      selectedDate.getFullYear() === year &&
      selectedDate.getMonth() === month &&
      selectedDate.getDate() === day
    )
  }

  const isToday = (day) => {
    const today = new Date()
    return today.getFullYear() === year && today.getMonth() === month && today.getDate() === day
  }

  const handleDayClick = (day) => {
    const clicked = new Date(year, month, day)
    if (selectedDate && isSelected(day)) {
      onDateSelect(null) // deselect if same date clicked
    } else {
      onDateSelect(clicked)
    }
  }

  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  return (
    <div className="rounded-xl border border-border/40 bg-card/60 p-3 text-sm select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={prevMonth}
          className="p-1 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="font-semibold text-foreground">
          {monthNames[month]} {year}
        </span>
        <button
          onClick={nextMonth}
          className="p-1 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 mb-1">
        {dayNames.map(d => (
          <div key={d} className="text-center text-xs text-muted-foreground py-1 font-medium">{d}</div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((day, idx) =>
          day === null ? (
            <div key={`empty-${idx}`} />
          ) : (
            <button
              key={day}
              onClick={() => handleDayClick(day)}
              className={`
                mx-auto flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium transition-all
                ${isSelected(day)
                  ? "bg-brand-500 text-white shadow-md shadow-brand-500/30"
                  : isToday(day)
                  ? "border border-brand-500/50 text-brand-400 hover:bg-brand-500/20"
                  : "text-muted-foreground hover:bg-white/10 hover:text-foreground"
                }
              `}
            >
              {day}
            </button>
          )
        )}
      </div>

      {/* Clear selection */}
      {selectedDate && (
        <button
          onClick={() => onDateSelect(null)}
          className="mt-3 w-full text-xs text-muted-foreground hover:text-foreground text-center py-1 rounded-lg hover:bg-white/5 transition-colors"
        >
          Clear date
        </button>
      )}
    </div>
  )
}

export function EventsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialCategory = searchParams.get("category")
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState("newest")
  const [categories, setCategories] = useState(initialCategory ? [initialCategory] : [])
  const [selectedDate, setSelectedDate] = useState(null) // now a Date object or null
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [price, setPrice] = useState("any")

  const updateURL = (newState) => {
    const params = new URLSearchParams()
    if (newState.categories.length > 0) params.set("category", newState.categories.join(","))
    if (newState.selectedDate) params.set("date", newState.selectedDate.toISOString().split("T")[0])
    if (newState.price !== "any") params.set("price", newState.price)
    if (searchQuery) params.set("search", searchQuery)
    if (sortOrder !== "newest") params.set("sort", sortOrder)
    setSearchParams(params)
  }

  useEffect(() => {
    if (initialCategory) {
      setCategories(prev => prev.includes(initialCategory) ? prev : [...prev, initialCategory])
    }
  }, [initialCategory])

  const filteredEvents = ALL_EVENTS.filter((event) => {
    if (searchQuery && !event.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    if (categories.length > 0 && !categories.includes(event.category)) return false
    if (price === "free" && event.price !== "Free") return false
    if (price === "paid" && event.price === "Free") return false
    if (selectedDate) {
      // Filter: show only events whose rawDate matches the selected calendar date
      const ed = event.rawDate
      if (
        ed.getFullYear() !== selectedDate.getFullYear() ||
        ed.getMonth() !== selectedDate.getMonth() ||
        ed.getDate() !== selectedDate.getDate()
      ) return false
    }
    return true
  }).sort((a, b) => {
    if (sortOrder === "price_low") {
      const priceA = a.price === "Free" ? 0 : parseInt(a.price.replace('$', ''))
      const priceB = b.price === "Free" ? 0 : parseInt(b.price.replace('$', ''))
      return priceA - priceB
    }
    if (sortOrder === "price_high") {
      const priceA = a.price === "Free" ? 0 : parseInt(a.price.replace('$', ''))
      const priceB = b.price === "Free" ? 0 : parseInt(b.price.replace('$', ''))
      return priceB - priceA
    }
    if (sortOrder === "popular") return a.ticketsRemaining - b.ticketsRemaining
    // Default: sort by date ascending when a date is selected, else newest by id
    if (selectedDate) return a.rawDate - b.rawDate
    return b.id - a.id
  })

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Browse Events</h1>
          <p className="text-muted-foreground mt-1">Discover {filteredEvents.length} events matching your interests</p>
        </div>
        
        <div className="flex w-full md:w-auto gap-3">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search events..." 
              className="pl-9 h-10 bg-card border-border/50" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            className="md:hidden shrink-0"
            onClick={() => setIsMobileFiltersOpen(true)}
          >
            <Filter className="h-4 w-4" />
          </Button>
          <div className="hidden md:block w-40">
            <Select 
              className="h-10 bg-card border-border/50"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="popular">Most Popular</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Sidebar Filters */}
        <aside className={`
          ${isMobileFiltersOpen ? 'fixed inset-0 z-50 bg-background/95 backdrop-blur-sm p-4 overflow-y-auto' : 'hidden'} 
          md:block w-full md:w-64 shrink-0 space-y-6
        `}>
          <div className="flex justify-between items-center md:hidden mb-6">
            <h2 className="text-xl font-bold">Filters</h2>
            <Button variant="ghost" size="icon" onClick={() => setIsMobileFiltersOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-6">
            {/* ── Category ── */}
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Tag className="h-4 w-4" /> Category
              </h3>
              <div className="space-y-2">
                {["Concert", "Conference", "Workshop", "Meetup", "Health", "Business"].map(cat => (
                  <label key={cat} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="rounded border-border text-brand-500 bg-card/50" 
                      checked={categories.includes(cat)}
                      onChange={(e) => {
                        const updated = e.target.checked
                          ? [...categories, cat]
                          : categories.filter(c => c !== cat)
                        setCategories(updated)
                        updateURL({ categories: updated, selectedDate, price })
                      }}
                    />
                    <span className="text-muted-foreground hover:text-foreground">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* ── Date — Calendar picker ── */}
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Calendar className="h-4 w-4" /> Date
              </h3>
              {/* Toggle button */}
              <button
                onClick={() => setIsCalendarOpen(prev => !prev)}
                className={`
                  w-full flex items-center justify-between px-3 py-2 rounded-lg border text-sm transition-all
                  ${selectedDate
                    ? "border-brand-500/60 bg-brand-500/10 text-brand-400"
                    : "border-border/40 bg-card/60 text-muted-foreground hover:text-foreground hover:border-border"
                  }
                `}
              >
                <span>
                  {selectedDate
                    ? selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                    : "Pick a date…"}
                </span>
                <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${isCalendarOpen ? "rotate-90" : ""}`} />
              </button>

              {/* Collapsible calendar */}
              {isCalendarOpen && (
                <MiniCalendar
                  selectedDate={selectedDate}
                  onDateSelect={(date) => {
                    setSelectedDate(date)
                    updateURL({ categories, selectedDate: date, price })
                    if (date) setIsCalendarOpen(false) // auto-close on selection
                  }}
                />
              )}
            </div>

            {/* ── Price ── */}
            <div className="space-y-3">
              <h3 className="font-semibold">Price</h3>
              <div className="space-y-2">
                {[
                  { value: "any", label: "Any Price" },
                  { value: "free", label: "Free" },
                  { value: "paid", label: "Paid" },
                ].map(({ value, label }) => (
                  <label key={value} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input 
                      type="radio" 
                      name="price" 
                      value={value}
                      checked={price === value}
                      onChange={(e) => {
                        setPrice(e.target.value)
                        updateURL({ categories, selectedDate, price: e.target.value })
                      }}
                      className="border-border text-brand-500 bg-card/50 focus:ring-brand-500" 
                    />
                    <span className="text-muted-foreground">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full text-muted-foreground"
              onClick={() => {
                setSearchQuery("")
                setSortOrder("newest")
                setCategories([])
                setSelectedDate(null)
                setIsCalendarOpen(false)
                setPrice("any")
                setSearchParams({})
              }}
            >
              Clear All Filters
            </Button>
            
            {/* Mobile apply button */}
            <Button 
              className="w-full md:hidden mt-4" 
              variant="gradient"
              onClick={() => setIsMobileFiltersOpen(false)}
            >
              Apply Filters
            </Button>
          </div>
        </aside>

        {/* Main Event Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredEvents.length === 0 ? (
              <div className="col-span-full text-center py-12 text-muted-foreground text-lg">
                No events found matching your filters.
              </div>
            ) : filteredEvents.map((event, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                key={event.id}
              >
                <Card className="glass-card overflow-hidden h-full flex flex-col border-white/5 bg-card/60 group">
                  <div className="relative h-48 overflow-hidden bg-muted">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-md px-3 py-1.5 rounded-full text-sm font-semibold shadow-sm">
                      {event.price}
                    </div>
                    <Badge className="absolute top-3 left-3 bg-brand-500/90 hover:bg-brand-600 border-0 shadow-md backdrop-blur-sm">
                      {event.category}
                    </Badge>
                  </div>
                  <CardContent className="p-5 flex-1 flex flex-col relative">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center text-brand-500 text-sm font-medium">
                        <Calendar className="h-4 w-4 mr-1.5" />
                        {event.date}
                      </div>
                      <div className="text-xs font-medium text-orange-400 bg-orange-400/10 px-2 py-1 rounded-md">
                        {event.ticketsRemaining} left
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-xl mb-3 line-clamp-2 leading-tight group-hover:text-brand-400 transition-colors">
                      {event.title}
                    </h3>
                    
                    <div className="flex flex-col gap-2.5 mt-auto text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 shrink-0 text-muted-foreground/70" />
                        <span className="truncate">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 shrink-0 text-muted-foreground/70" />
                        <span className="truncate">By <span className="text-foreground/80 font-medium">{event.organizer}</span></span>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full mt-5 hover:bg-brand-500 hover:text-white hover:border-brand-500 transition-colors" asChild>
                      <Link to={`/events/${event.id}`}>View Details</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex items-center justify-center gap-2">
            <Button variant="outline" size="icon" disabled className="w-10 h-10 rounded-xl bg-card">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="gradient" className="w-10 h-10 rounded-xl p-0">1</Button>
            <Button variant="outline" className="w-10 h-10 rounded-xl bg-card">2</Button>
            <Button variant="outline" className="w-10 h-10 rounded-xl bg-card">3</Button>
            <span className="px-2 text-muted-foreground">...</span>
            <Button variant="outline" className="w-10 h-10 rounded-xl bg-card">12</Button>
            <Button variant="outline" size="icon" className="w-10 h-10 rounded-xl bg-card">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}