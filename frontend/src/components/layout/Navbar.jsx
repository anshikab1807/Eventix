import { Link, useNavigate } from "react-router-dom"
import { CalendarDays, Menu, X, Ticket, LogOut, User } from "lucide-react"
import { useState } from "react"
import { Button } from "../ui/Button"
import { useAuth } from "../../lib/auth"

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const navLinks = [
  { name: "Home", path: "/" },
  { name: "Events", path: "/events" },
  { name: "Explore", path: "/events" },
  { name: "My Tickets", path: "/my-tickets" },
  //{ name: "Favorites", path: "/favorites" },
]
  
  if (user?.role === "organizer") {
    navLinks.splice(2, 0, { name: "Dashboard", path: "/organizer/dashboard" })
  }

  const handleLogout = () => {
    logout()
    setIsMobileMenuOpen(false)
    navigate('/')
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-brand">
                <CalendarDays className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-gradient">
                eventix
              </span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <div className="w-8 h-8 rounded-full bg-brand-500/20 text-brand-500 flex items-center justify-center font-bold text-xs border border-brand-500/30">
                    {user.name?.charAt(0) || <User className="w-4 h-4" />}
                  </div>
                </Link>
                
                {user.role === 'organizer' && (
                  <Button variant="gradient" className="gap-2 shrink-0" asChild>
                    <Link to="/organizer/create-event">
                      <Ticket className="h-4 w-4" />
                      Host Event
                    </Link>
                  </Button>
                )}
              </div>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/auth">Log In</Link>
                </Button>
                <Button variant="gradient" className="gap-2 shrink-0" asChild>
                  <Link to="/auth">
                    <Ticket className="h-4 w-4" />
                    Host Event
                  </Link>
                </Button>
              </>
            )}
          </div>

          <div className="flex md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-border/40 bg-background/95 backdrop-blur">
          <div className="space-y-1 px-4 pb-3 pt-2 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-2 px-3 border-t border-border/50 pt-4">
              {user ? (
                <>
                  <Link 
                    to="/profile"
                    className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-muted"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="w-8 h-8 rounded-full bg-brand-500/20 text-brand-500 flex items-center justify-center font-bold text-xs shrink-0">
                      {user.name?.charAt(0) || "U"}
                    </div>
                    {user.name}
                  </Link>
                  <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-500/10 border-red-500/20" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" className="w-full justify-center" asChild onClick={() => setIsMobileMenuOpen(false)}>
                    <Link to="/auth">Log In</Link>
                  </Button>
                  <Button variant="gradient" className="w-full justify-center gap-2" asChild onClick={() => setIsMobileMenuOpen(false)}>
                    <Link to="/auth">
                      <Ticket className="h-4 w-4" />
                      Host Event
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

