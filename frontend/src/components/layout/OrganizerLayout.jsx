import { Outlet, Link, useLocation } from "react-router-dom"
import { 
  BarChart3, Calendar, CreditCard, LayoutDashboard, Settings, 
  Users, PlusCircle, CalendarDays, Ticket, LogOut
} from "lucide-react"
import { Button } from "../ui/Button"
import { useAuth } from "../../lib/auth"

export function OrganizerLayout() {
  const location = useLocation()
  const { user, logout } = useAuth()
  
  const isActive = (path) => location.pathname === path

  const navItems = [
    { name: "Overview", path: "/organizer/dashboard", icon: LayoutDashboard },
    { name: "My Events", path: "/organizer/events", icon: Calendar },
    { name: "Create Event", path: "/organizer/create-event", icon: PlusCircle },
    { name: "Attendees", path: "/organizer/attendees", icon: Users },
  ]

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-border bg-card hidden md:flex flex-col h-full shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-brand">
              <CalendarDays className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-gradient">
              eventix Admin
            </span>
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-2">
          <div className="px-3 mb-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Dashboard</p>
          </div>
          
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link 
                  key={item.path}
                  to={item.path} 
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 font-medium transition-colors ${
                    isActive(item.path) 
                      ? 'bg-brand-500/10 text-brand-500' 
                      : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </div>

          {/* <div className="px-3 mt-8 mb-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Account</p>
          </div>
          <div className="space-y-1">
            <Link to="#" className="flex items-center gap-3 rounded-lg px-3 py-2.5 font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors">
              <CreditCard className="h-4 w-4" />
              Payouts
            </Link>
            <Link to="#" className="flex items-center gap-3 rounded-lg px-3 py-2.5 font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors">
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </div> */}
        </div>
        
        <div className="p-4 border-t border-border mt-auto">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-brand-500/20 text-brand-500 flex items-center justify-center font-bold text-xs shrink-0">
              {user?.name?.charAt(0) || "O"}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-foreground truncate">{user?.name || "Organizer"}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email || "admin@eventix.com"}</p>
            </div>
          </div>
          <Button variant="outline" className="w-full border-red-500/30 text-red-500 hover:bg-red-500/10 justify-start" onClick={() => logout()}>
            <LogOut className="mr-2 h-4 w-4" /> Log Out
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top Navbar Header (Mobile + Quick actions) */}
        <header className="h-16 flex items-center justify-between md:justify-end px-4 sm:px-6 lg:px-8 border-b border-border bg-background shrink-0">
          <div className="flex items-center md:hidden">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-brand">
                <CalendarDays className="h-5 w-5 text-white" />
              </div>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild className="hidden sm:inline-flex">
              <Link to="/">View Live Site</Link>
            </Button>
            <Button variant="gradient" size="sm" className="gap-2" asChild>
              <Link to="/organizer/create-event">
                <PlusCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Create Event</span>
              </Link>
            </Button>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto bg-muted/30 p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
