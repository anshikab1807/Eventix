import { useState } from "react"
import { Check, ChevronRight, MapPin, Tag, Calendar, Image as ImageIcon, Ticket, Settings, ArrowRight, ArrowLeft} from "lucide-react"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { Select } from "../components/ui/Select"
import { Card, CardContent } from "../components/ui/Card"

const STEPS = [
  { id: 1, title: "Basic Info", icon: <Tag className="w-5 h-5" /> },
  { id: 2, title: "Description", icon: <ImageIcon className="w-5 h-5" /> },
  { id: 3, title: "Agenda", icon: <Calendar className="w-5 h-5" /> },
  { id: 4, title: "Settings", icon: <Settings className="w-5 h-5" /> },
]

export function CreateEventPage() {
  const [currentStep, setCurrentStep] = useState(1)

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1)
  }

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  return (
    <div className="min-h-screen bg-muted/30 pb-20">
      {/* Header */}
      <div className="bg-card border-b border-border py-8">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gradient mb-2">Create New Event</h1>
          <p className="text-muted-foreground">Fill in the details below to publish your event</p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl mt-8">
        {/* Progress Indicator */}
        <div className="mb-10">
          <div className="flex justify-between items-center relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-border -z-10 rounded-full"></div>
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-brand-500 -z-10 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
            ></div>
            
            {STEPS.map((step) => (
              <div key={step.id} className="flex flex-col items-center gap-2">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300
                    ${currentStep > step.id ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30' : 
                      currentStep === step.id ? 'bg-card border-2 border-brand-500 text-brand-500' : 
                      'bg-card border border-border text-muted-foreground'}`
                  }
                >
                  {currentStep > step.id ? <Check className="w-5 h-5" /> : step.icon}
                </div>
                <span className={`text-xs font-semibold hidden md:block ${currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Content Area */}
        <Card className="glass-card bg-card/80 border-white/5 py-4">
          <CardContent className="p-6 md:p-10">
            
            {/* STEP 1: Basic Info */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold">Basic Information</h2>
                  <p className="text-muted-foreground">Name your event and tell attendees why they should come.</p>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Event Title <span className="text-red-500">*</span></label>
                    <Input placeholder="Be clear and descriptive" className="h-12 text-lg bg-background" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Category</label>
                      <Select className="h-12 bg-background">
                        <option value="">Select category</option>
                        <option value="music">Music & Concerts</option>
                        <option value="tech">Tech & Innovation</option>
                        <option value="business">Business & Professional</option>
                        <option value="food">Food & Drink</option>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Event Format</label>
                      <Select className="h-12 bg-background">
                        <option value="in_person">In Person</option>
                        <option value="online">Online / Virtual</option>
                        <option value="hybrid">Hybrid</option>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Start Date & Time</label>
                      <Input type="datetime-local" className="h-12 bg-background" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">End Date & Time</label>
                      <Input type="datetime-local" className="h-12 bg-background" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Venue Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                      <Input placeholder="Search for a venue or address" className="pl-10 h-12 bg-background" />
                    </div>
                  </div>
                </div>
              </div>
            )}
{/* STEP 2: Description & Image */}
{currentStep === 2 && (
  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
    <div className="mb-8">
      <h2 className="text-2xl font-bold">Description & Media</h2>
      <p className="text-muted-foreground">
        Add details and images to make your event stand out.
      </p>
    </div>

    <div className="space-y-6">
      {/* Event Image */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Event Image / Banner</label>
        <div className="border-2 border-dashed border-border rounded-xl p-12 text-center bg-background/50 hover:bg-muted/50 transition-colors cursor-pointer group">
          <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <ImageIcon className="h-8 w-8 text-muted-foreground group-hover:text-brand-500 transition-colors" />
          </div>
          <p className="font-semibold text-foreground mb-1">
            Click to upload or drag and drop
          </p>
          <p className="text-sm text-muted-foreground">
            SVG, PNG, JPG or GIF (max. 800x400px)
          </p>
        </div>
      </div>

      {/* Event Description */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Event Description</label>
        <div className="border border-input rounded-md overflow-hidden bg-background">
          <div className="bg-muted border-b border-input p-2 flex gap-2">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 font-bold">B</Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 italic">I</Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 underline">U</Button>
            <div className="w-px h-6 bg-border mx-1 self-center" />
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 px-2">H1</Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 px-2">H2</Button>
          </div>
          <textarea
            className="w-full h-48 p-4 bg-transparent outline-none resize-y placeholder:text-muted-foreground/50"
            placeholder="Describe your event..."
          ></textarea>
        </div>
      </div>

      {/* Ticket Price */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Ticket Price (₹)</label>
        <Input
          type="number"
          placeholder="Enter price (e.g. 500)"
          className="bg-card border-border"
        />
      </div>
    </div>
  </div>
)}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-10 pt-6 border-t border-border">
              <Button 
                variant="outline" 
                size="lg" 
                onClick={handlePrev}
                disabled={currentStep === 1}
                className="w-32"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              
              {currentStep < STEPS.length ? (
                <Button variant="gradient" size="lg" onClick={handleNext} className="w-32">
                  Next Step <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button variant="gradient" size="lg" className="w-40 bg-emerald-500 hover:bg-emerald-600 border-0 text-white">
                  Publish Event
                </Button>
              )}
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  )
}
