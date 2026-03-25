import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./lib/auth"
import { ProtectedRoute } from "./components/ProtectedRoute"

// Layouts
import { Layout } from "./components/layout/Layout"
import { OrganizerLayout } from "./components/layout/OrganizerLayout"

// Auth
import { AuthPage } from "./pages/AuthPage"

// Participant Pages
import { HomePage } from "./pages/HomePage"
import { EventsPage } from "./pages/EventsPage"
import { EventDetailsPage } from "./pages/EventDetailsPage"
import { MyTicketsPage } from "./pages/MyTicketsPage"
import { ProfilePage } from "./pages/ProfilePage"
// import { FavoritesPage } from "./pages/FavoritesPage"

// Organizer Pages
import { OrganizerDashboard } from "./pages/OrganizerDashboard"
import { OrganizerEventsPage } from "./pages/OrganizerEventsPage"
import { OrganizerAttendeesPage } from "./pages/OrganizerAttendeesPage"
import { CreateEventPage } from "./pages/CreateEventPage"


// ✅ Added Footer Pages
import About from "./pages/About"
import Contact from "./pages/Contact"
import Careers from "./pages/Careers"
import Blog from "./pages/Blog"
import Terms from "./pages/Terms"
import Privacy from "./pages/Privacy"
import Cookies from "./pages/Cookies"
import ScrollToTop from "./utills/ScrollToTop"


function App() {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <AuthProvider>
        <Routes>
          {/* Public Authentication Route */}
          <Route path="/auth" element={<AuthPage />} />
          
          {/* Participant Routes (Public & Protected mixing) */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="events/:id" element={<EventDetailsPage />} />
            

            {/* ✅ Added Footer Routes */}
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="careers" element={<Careers />} />
            <Route path="blog" element={<Blog />} />
            <Route path="terms" element={<Terms />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="cookies" element={<Cookies />} />
            
            
            {/* Protected Participant Routes */}
            <Route element={<ProtectedRoute allowedRoles={["participant"]} />}>
              <Route path="my-tickets" element={<MyTicketsPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
          </Route>

          {/* Organizer Routes (Protected) */}
          <Route path="/organizer" element={
            <ProtectedRoute allowedRoles={["organizer"]} />
          }>
            <Route element={<OrganizerLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<OrganizerDashboard />} />
              <Route path="events" element={<OrganizerEventsPage />} />
              <Route path="create-event" element={<CreateEventPage />} />
              <Route path="attendees" element={<OrganizerAttendeesPage />} />
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<div className="p-20 text-center"><h2 className="text-2xl font-bold">404 - Not Found</h2></div>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App