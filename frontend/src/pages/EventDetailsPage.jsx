import { useParams, Link } from "react-router-dom"
import { Calendar, Clock, MapPin, Share2, Users, CheckCircle, Ticket, Heart, Twitter, Facebook } from "lucide-react"
import { Button } from "../components/ui/Button"
import { Card, CardContent } from "../components/ui/Card"
import { Badge } from "../components/ui/Badge"

export function EventDetailsPage() {
  const { id } = useParams()
  
  // Dummy event data based on ID
  const event = {
    id: id || "1",
    title: "Neon Nights Music Festival",
    date: "Aug 15, 2026",
    time: "4:00 PM - 11:30 PM PDT",
    location: "Downtown Arena, Los Angeles, CA",
    price: "$85.00",
    organizer: "LiveNation Events",
    image: "https://images.unsplash.com/photo-1533174000220-db92842c161a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    category: "Music & Concerts",
    description: "Experience the ultimate electronic dance music festival. Neon Nights brings together the world's top DJs for an unforgettable night of music, art, and community. Featuring multiple stages, immersive light shows, and interactive art installations.\n\nJoin 10,000+ attendees for the biggest summer party in Los Angeles. Food trucks, VIP lounges, and exclusive merchandise stands will be available throughout the venue.",
    speakers: [
      { name: "DJ Neon", role: "Headliner", image: "https://images.unsplash.com/photo-1516280440502-61db1d752dd7?ixlib=rb-4.0.3&w=200&h=200&fit=crop&q=80" },
      { name: "Sarah Beat", role: "Supporting Act", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&w=200&h=200&fit=crop&q=80" },
      { name: "The Pulse", role: "Special Guest", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&w=200&h=200&fit=crop&q=80" }
    ],
    agenda: [
      { time: "4:00 PM", title: "Gates Open & Warm up DJ", desc: "Arrive early to grab the best spots." },
      { time: "6:00 PM", title: "The Pulse Set", desc: "Special guest performance on the main stage." },
      { time: "8:00 PM", title: "Sarah Beat Live", desc: "Sunset performance featuring new tracks." },
      { time: "10:00 PM", title: "DJ Neon Headlining Act", desc: "The ultimate light and sound experience." }
    ],
    tickets: [
      { type: "General Admission", price: "$85.00", info: "Access to all public areas and general standing room.", remaining: 245 },
      { type: "VIP Access", price: "$199.00", info: "Fast-track entry, access to VIP lounge, private bar and restrooms.", remaining: 32 },
      { type: "Backstage Pass", price: "$499.00", info: "All VIP perks plus exclusive backstage access and meet & greet.", remaining: 5 }
    ]
  }

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Hero Banner */}
      <div className="relative h-[40vh] md:h-[60vh] w-full bg-muted">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />
        
        <div className="absolute bottom-0 w-full">
          <div className="container mx-auto px-4 max-w-5xl pb-10">
            <Badge className="mb-4 bg-brand-500/20 text-brand-400 hover:bg-brand-500/30 border-0 backdrop-blur-md px-3 py-1">
              {event.category}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-white">
              {event.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-brand-400" />
                <span className="font-medium">{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-brand-400" />
                <span className="font-medium">{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-brand-400" />
                <span className="font-medium">{event.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content (Left, 2 columns) */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Description */}
            <section>
              <h2 className="text-2xl font-bold mb-4">About this Event</h2>
              <div className="prose prose-invert max-w-none text-muted-foreground whitespace-pre-wrap leading-relaxed">
                {event.description}
              </div>
            </section>

            {/* Agenda/Schedule */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Schedule</h2>
              <div className="space-y-6">
                {event.agenda.map((item, idx) => (
                  <div key={idx} className="flex gap-6 relative">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center font-bold text-sm z-10">
                        {idx + 1}
                      </div>
                      {idx !== event.agenda.length - 1 && (
                        <div className="absolute top-12 bottom-0 left-6 w-px bg-border -ml-px h-full" />
                      )}
                    </div>
                    <div className="bg-card border border-white/5 rounded-2xl p-5 flex-1 shadow-sm">
                      <div className="text-brand-500 font-medium mb-1">{item.time}</div>
                      <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Speakers / Performers */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Lineup & Speakers</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {event.speakers.map((speaker, idx) => (
                  <Card key={idx} className="bg-card/50 text-center border-white/5">
                    <CardContent className="pt-6">
                      <img 
                        src={speaker.image} 
                        alt={speaker.name}
                        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-background"
                      />
                      <h3 className="font-bold text-lg">{speaker.name}</h3>
                      <p className="text-brand-400 text-sm">{speaker.role}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Location */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Venue Location</h2>
              <div className="bg-card rounded-2xl border border-white/5 overflow-hidden">
                <div className="h-64 bg-muted w-full relative flex items-center justify-center">
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('https://maps.googleapis.com/maps/api/staticmap?center=Los+Angeles&zoom=13&size=800x400&maptype=roadmap')" }}></div>
                  <div className="bg-background/80 backdrop-blur-sm p-4 rounded-xl flex items-center gap-3 z-10 border border-border">
                    <MapPin className="text-brand-500 h-6 w-6" />
                    <div>
                      <div className="font-bold">{event.location.split(',')[0]}</div>
                      <div className="text-sm text-muted-foreground">{event.location}</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sticky Sidebar (Right, 1 column) */}
          <div className="lg:col-span-1 relative">
            <div className="sticky top-24 space-y-6">
              
              {/* Ticketing Card */}
              <Card className="glass-card border-brand-500/30 shadow-[0_8px_30px_rgb(139,92,246,0.1)]">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-gradient">{event.price}</div>
                  </div>
                  
                  <div className="space-y-4 mb-6 text-sm">
                    <div className="flex justify-between border-b border-border pb-3">
                      <span className="text-muted-foreground flex items-center gap-2"><Calendar className="h-4 w-4"/> Date</span>
                      <span className="font-medium text-right">{event.date}</span>
                    </div>
                    <div className="flex justify-between border-b border-border pb-3">
                      <span className="text-muted-foreground flex items-center gap-2"><Clock className="h-4 w-4"/> Time</span>
                      <span className="font-medium text-right">{event.time}</span>
                    </div>
                    <div className="flex justify-between border-b border-border pb-3">
                      <span className="text-muted-foreground flex items-center gap-2"><Users className="h-4 w-4"/> Organizer</span>
                      <span className="font-medium text-right">{event.organizer}</span>
                    </div>
                  </div>

                  <Button variant="gradient" size="lg" className="w-full text-lg h-14 rounded-xl shadow-lg shadow-brand-500/25">
                    <Ticket className="mr-2 h-5 w-5" />
                    Register Now
                  </Button>
                </CardContent>
              </Card>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
