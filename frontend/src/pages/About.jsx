export default function About() {
  return (
    <div className="px-6 md:px-16 py-16 space-y-20">

      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          About <span className="text-gradient">eventix</span>
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          eventix is your all-in-one platform to discover, create, and manage unforgettable events — from local meetups to global experiences.
        </p>
      </section>

      {/* Mission Section */}
      <section className="grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            We aim to bring people together through meaningful experiences.
            Our platform empowers organizers with powerful tools and helps attendees discover events they truly love.
          </p>
        </div>

        <div className="bg-muted rounded-2xl p-8 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-default">
          <p className="text-lg font-medium">
            “We believe great events create lasting memories and stronger communities.”
          </p>
        </div>
      </section>

      {/* Features */}
      <section>
        <h2 className="text-2xl font-semibold text-center mb-12">
          What We Offer
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          
          <div className="group p-6 border rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-primary">
            <h3 className="font-semibold mb-3 group-hover:text-primary transition">
              Easy Event Creation
            </h3>
            <p className="text-sm text-muted-foreground">
              Create and manage events effortlessly with our intuitive tools.
            </p>
          </div>

          <div className="group p-6 border rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-primary">
            <h3 className="font-semibold mb-3 group-hover:text-primary transition">
              Smart Discovery
            </h3>
            <p className="text-sm text-muted-foreground">
              Find events tailored to your interests and location.
            </p>
          </div>

          <div className="group p-6 border rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-primary">
            <h3 className="font-semibold mb-3 group-hover:text-primary transition">
              Secure Ticketing
            </h3>
            <p className="text-sm text-muted-foreground">
              Safe and seamless booking experience for attendees.
            </p>
          </div>

        </div>
      </section>

      {/* Stats */}
      <section className="bg-muted rounded-2xl p-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          
          <div className="hover:scale-105 transition">
            <h3 className="text-3xl font-bold">10K+</h3>
            <p className="text-sm text-muted-foreground">Events Hosted</p>
          </div>

          <div className="hover:scale-105 transition">
            <h3 className="text-3xl font-bold">50K+</h3>
            <p className="text-sm text-muted-foreground">Users</p>
          </div>

          <div className="hover:scale-105 transition">
            <h3 className="text-3xl font-bold">100+</h3>
            <p className="text-sm text-muted-foreground">Cities</p>
          </div>

          <div className="hover:scale-105 transition">
            <h3 className="text-3xl font-bold">4.8★</h3>
            <p className="text-sm text-muted-foreground">User Rating</p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Join eventix Today
        </h2>
        <p className="text-muted-foreground mb-6">
          Start exploring events or host your own in just a few clicks.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <a
            href="/events"
            className="px-6 py-3 rounded-lg bg-primary text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Browse Events
          </a>

          <a
            href="/create-event"
            className="px-6 py-3 rounded-lg border transition-all duration-300 hover:bg-muted hover:scale-105 hover:shadow-md"
          >
            Host Event
          </a>
        </div>
      </section>

    </div>
  );
}