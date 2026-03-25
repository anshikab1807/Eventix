import { useState } from "react"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { Ticket, Mail, Lock, User, ArrowRight, Briefcase } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../lib/auth"

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [role, setRole] = useState("participant") // "participant" or "organizer"
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const name = formData.get("name") || "Demo User";
    const email = formData.get("email");
    
    // Simulate authentication
    const userData = {
      id: Math.random().toString(36).substring(7),
      name,
      email,
      role
    };
    
    login(userData);
    
    // Redirect based on role
    if (role === "organizer") {
      navigate('/organizer/dashboard');
    } else {
      navigate('/');
    }
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Left Side - Image/Branding */}
      <div className="hidden w-1/2 flex-col justify-between bg-muted p-12 lg:flex relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-linear-to-br from-brand-900/40 to-background/90" />
        <div 
          className="absolute inset-0 z-0 opacity-30" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')", 
            backgroundSize: "cover", 
            backgroundPosition: "center" 
          }} 
        />
        
        <div className="relative z-10 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary">
            <Ticket className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white font-heading">eventix</span>
        </div>

        <div className="relative z-10 mb-20 text-white">
          <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl lg:text-5xl text-white font-heading">
            Discover moments that <br />
            <span className="text-brand-300">matter.</span>
          </h1>
          <p className="text-lg text-white/80 max-w-md">
            Join thousands of users finding and hosting incredible events, workshops, and experiences worldwide.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="text-center lg:text-left mb-8">
            <h1 className="text-3xl font-bold tracking-tight font-heading">{isLogin ? "Welcome back" : "Create an account"}</h1>
            <p className="mt-2 text-muted-foreground">
              {isLogin ? "Enter your details to access your account" : "Join eventix to discover and host events"}
            </p>
          </div>

          <div className="space-y-4">

            {/* Role Selection */}
            <div className="flex rounded-lg border border-border bg-card p-1 mt-4">
              <button
                type="button"
                className={`flex-1 flex items-center justify-center rounded-md py-2 text-sm font-medium transition-all ${
                  role === "participant" 
                    ? "bg-brand-500 text-white shadow" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setRole("participant")}
              >
                <User className="mr-2 h-4 w-4" />
                Participant
              </button>
              <button
                type="button"
                className={`flex-1 flex items-center justify-center rounded-md py-2 text-sm font-medium transition-all ${
                  role === "organizer" 
                    ? "bg-brand-500 text-white shadow" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setRole("organizer")}
              >
                <Briefcase className="mr-2 h-4 w-4" />
                Organizer
              </button>
            </div>

            <form className="space-y-4 pt-2" onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="space-y-2">
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="name" name="name" placeholder={role=== "organizer" ? "Organisation Name": "Full Name"} type="text" className="pl-10 bg-card border-border" required={!isLogin} />
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="email" name="email" placeholder={role === "organizer" ? "organisation@example.com" : "name@example.com"} type="email" className="pl-10 bg-card border-border" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="password" name="password" placeholder="Password" type="password" className="pl-10 bg-card border-border" required />
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="confirm-password" placeholder="Confirm Password" type="password" className="pl-10 bg-card border-border" required={!isLogin} />
                  </div>
                </div>
              )}

              {isLogin && (
                <div className="flex justify-end">
                  <a href="#" className="text-sm font-medium text-brand-500 hover:text-brand-400">
                    Forgot password?
                  </a>
                </div>
              )}

              <Button type="submit" variant="primary" className="w-full group bg-brand-600 hover:bg-brand-700">
                {isLogin ? "Sign In" : "Create Account"}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>

            <div className="mt-4 text-center text-sm">
              <span className="text-muted-foreground">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
              </span>
              <button 
                type="button" 
                onClick={() => setIsLogin(!isLogin)}
                className="font-medium text-brand-500 hover:text-brand-400"
              >
                {isLogin ? "Sign up" : "Log in"}
              </button>
            </div>
          </div>
          
          <div className="mt-8 text-center text-xs text-muted-foreground lg:text-left">
            By clicking continue, you agree to our{" "}
            <Link to="/terms" className="underline underline-offset-4 hover:text-white">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="underline underline-offset-4 hover:text-white">
              Privacy Policy
            </Link>
            .
          </div>
        </div>
      </div>
    </div>
  )
}
