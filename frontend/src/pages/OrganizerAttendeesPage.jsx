import { useState } from "react"
import { Search, Filter, Download, Mail, MoreHorizontal, UserCheck, ShieldOff } from "lucide-react"
import { Button } from "../components/ui/Button"
import { Card, CardContent } from "../components/ui/Card"
import { Input } from "../components/ui/Input"
import { Badge } from "../components/ui/Badge"
import { Select } from "../components/ui/Select"

const ATTENDEES = [
  { id: "USR-001", name: "Alex Johnson", email: "alex.j@example.com", event: "Neon Nights Music Festival", date: "Aug 01, 2026", status: "Confirmed" },
  { id: "USR-002", name: "Maria Garcia", email: "m.garcia99@example.com", event: "Neon Nights Music Festival", date: "Aug 02, 2026", status: "Confirmed" },
  { id: "USR-003", name: "James Wilson", email: "jwilson.tech@example.com", event: "Tech Startup Pitch Night",date: "Aug 15, 2026", status: "Confirmed" },
  { id: "USR-004", name: "Sophie Chen", email: "sophie.c@example.com", event: "Web3 Developer Summit", date: "Jul 20, 2026", status: "Cancelled" },
  { id: "USR-005", name: "David Miller", email: "dmiller84@example.com", event: "Yoga & Mindfulness Retreat",date: "Sep 05, 2026", status: "Pending" },
  { id: "USR-006", name: "Emma Thompson", email: "emma.t.design@example.com", event: "Neon Nights Music Festival",date: "Aug 10, 2026", status: "Confirmed" },
  { id: "USR-007", name: "Robert Taylor", email: "rtaylor.music@example.com", event: "Tech Startup Pitch Night", date: "Aug 18, 2026", status: "Confirmed" },
]

export function OrganizerAttendeesPage() {
  const [search, setSearch] = useState("")
  const [attendees, setAttendees] = useState(ATTENDEES)

  // ✅ NEW FILTER STATES (ONLY ADDITION)
  const [selectedEvent, setSelectedEvent] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")

  const handleEmail = (email, name) => {
    const subject = encodeURIComponent("Regarding your event registration")
    const body = encodeURIComponent(
      `Hi ${name},\n\nThis is regarding your event registration.\n\nBest regards,\nEvent Organizer`
    )

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
  }

  const handleApprove = (id) => {
    const updated = attendees.map(a =>
      a.id === id ? { ...a, status: "Confirmed" } : a
    )
    setAttendees(updated)
  }

  const handleCancel = (id) => {
    const confirmAction = window.confirm("Are you sure you want to cancel this attendee?")
    if (!confirmAction) return

    const updated = attendees.map(a =>
      a.id === id ? { ...a, status: "Cancelled" } : a
    )
    setAttendees(updated)
  }

  // ✅ UPDATED FILTER LOGIC (ONLY CHANGE)
  const filteredAttendees = attendees.filter(a => {
    const matchesSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase()) ||
      a.event.toLowerCase().includes(search.toLowerCase())

    const matchesEvent = selectedEvent ? a.event === selectedEvent : true
    const matchesStatus = selectedStatus ? a.status === selectedStatus : true

    return matchesSearch && matchesEvent && matchesStatus
  })

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Attendees</h1>
          <p className="text-muted-foreground mt-1">Manage registrations across all your events.</p>
        </div>
      </div>

      <Card className="bg-card mb-8 border-border">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by name, email, or event..." 
                className="pl-9 bg-muted/50 border-border/50"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <div className="flex gap-3 w-full md:w-auto">

              {/* ✅ CONNECTED EVENT FILTER */}
              <Select
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
                className="bg-muted/50 border-border/50 min-w-[160px]"
              >
                <option value="">All Events</option>
                <option value="Neon Nights Music Festival">Neon Nights Music Festival</option>
                <option value="Tech Startup Pitch Night">Tech Startup Pitch Night</option>
                <option value="Web3 Developer Summit">Web3 Developer Summit</option>
                <option value="Yoga & Mindfulness Retreat">Yoga & Mindfulness Retreat</option>
              </Select>

              {/* ✅ CONNECTED STATUS FILTER */}
              <Select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-muted/50 border-border/50 min-w-[140px]"
              >
                <option value="">Status: All</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Pending">Pending</option>
                <option value="Cancelled">Cancelled</option>
              </Select>

            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
              <tr>
                <th className="px-6 py-4 font-medium">Attendee</th>
                <th className="px-6 py-4 font-medium">Event & Ticket</th>
                <th className="px-6 py-4 font-medium">Registration Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredAttendees.map((attendee) => (
                <tr key={attendee.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-500/20 text-brand-500 flex items-center justify-center font-bold text-xs shrink-0">
                        {attendee.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{attendee.name}</div>
                        <div className="text-xs text-muted-foreground">{attendee.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-foreground">{attendee.event}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-500"></div>
                      {attendee.ticket}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {attendee.date}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className={`
                      ${attendee.status === 'Confirmed' ? 'border-emerald-500/30 text-emerald-500 bg-emerald-500/10' : ''}
                      ${attendee.status === 'Pending' ? 'border-amber-500/30 text-amber-500 bg-amber-500/10' : ''}
                      ${attendee.status === 'Cancelled' ? 'border-red-500/30 text-red-500 bg-red-500/10' : ''}
                    `}>
                      {attendee.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">

                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        onClick={() => handleEmail(attendee.email, attendee.name)}
                      >
                        <Mail className="h-4 w-4" />
                      </Button>

                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-emerald-500"
                        onClick={() => handleApprove(attendee.id)}
                      >
                        <UserCheck className="h-4 w-4" />
                      </Button>

                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-red-500"
                        onClick={() => handleCancel(attendee.id)}
                      >
                        <ShieldOff className="h-4 w-4" />
                      </Button>

                    </div>
                  </td>
                </tr>
              ))}
              {filteredAttendees.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                    No attendees found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground bg-muted/10">
          <div>Showing 1 to {filteredAttendees.length} of {attendees.length} entries</div>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
        </div>
      </div>
    </div>
  )
}