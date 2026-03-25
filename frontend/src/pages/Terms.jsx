export default function Terms() {
  const terms = [
    {
      title: "Acceptance of Terms",
      desc: "By accessing or using eventix, you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform.",
    },
    {
      title: "Use of Services",
      desc: "You agree to use our services only for lawful purposes. Any misuse or attempt to disrupt the platform is strictly prohibited.",
    },
    {
      title: "User Accounts",
      desc: "You are responsible for maintaining the confidentiality of your account and all activities under it.",
    },
    {
      title: "Event Bookings",
      desc: "All bookings and registrations are subject to availability. We may modify or cancel events when necessary.",
    },
    {
      title: "Limitation of Liability",
      desc: "eventix is not liable for any indirect or consequential damages arising from the use of our platform.",
    },
    {
      title: "Changes to Terms",
      desc: "We may update these terms periodically. Continued use of the platform implies acceptance of the updated terms.",
    },
  ];

  return (
    <div className="px-6 md:px-16 py-16 space-y-20">

      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Terms of <span className="text-gradient">Service</span>
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Please read these terms carefully before using eventix. These guidelines ensure a safe and smooth experience for everyone.
        </p>
      </section>

      {/* Highlight Card */}
      <section className="bg-muted rounded-2xl p-8 text-center hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
        <p className="text-lg font-medium">
          “Using eventix means you agree to follow our platform rules and respect our community.”
        </p>
      </section>

      {/* Terms Grid */}
      <section>
        <h2 className="text-2xl font-semibold text-center mb-12">
          Our Terms
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {terms.map((item, index) => (
            <div
              key={index}
              className="group p-6 border rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-primary"
            >
              <h3 className="font-semibold mb-3 group-hover:text-primary transition">
                {index + 1}. {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Note */}
      <section className="text-center">
        <p className="text-sm text-muted-foreground">
          Last updated: March 2026
        </p>
      </section>

    </div>
  );
}