export default function Contact() {
  return (
    <div className="px-6 md:px-16 py-16 space-y-16">

      {/* Header */}
      <section className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-muted-foreground">
          Have questions, feedback, or facing an issue? We're here to help.
        </p>
      </section>

      {/* Contact + Form */}
      <section className="grid md:grid-cols-2 gap-12">

        {/* Contact Info */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Get in Touch</h2>

          <div className="space-y-4 text-muted-foreground">
            <p>📧 Email: team@eventix.com</p>
            <p>📞 Phone: +1 9876543210</p>
            <p>📍 Location: glauniversity</p>
          </div>

          <div className="bg-muted p-6 rounded-2xl hover:shadow-lg transition">
            <h3 className="font-semibold mb-2">Support Hours</h3>
            <p className="text-sm text-muted-foreground">
              Monday - Friday: 9AM - 6PM <br />
              Weekend: 10AM - 4PM
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <form className="space-y-6 border p-6 rounded-2xl hover:shadow-xl transition">

          <h2 className="text-xl font-semibold">Send a Message</h2>

          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
          />

          <textarea
            rows="4"
            placeholder="Your Message"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
          ></textarea>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-primary text-white transition-all hover:scale-[1.02] hover:shadow-lg"
          >
            Send Message
          </button>
        </form>

      </section>

      {/* Report Issue Section */}
      <section className="bg-muted rounded-2xl p-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-2xl font-semibold">Report an Issue</h2>
          <p className="text-muted-foreground">
            Found a bug or something not working right? Let us know and we’ll fix it quickly.
          </p>

          <form className="space-y-4 mt-6">

            <input
              type="text"
              placeholder="Issue Title"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
            />

            <textarea
              rows="4"
              placeholder="Describe the issue..."
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
            ></textarea>

            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-red-500 text-white transition-all hover:scale-105 hover:shadow-lg"
            >
              Report Issue
            </button>

          </form>
        </div>
      </section>

    </div>
  );
}