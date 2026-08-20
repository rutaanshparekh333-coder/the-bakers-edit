export default function Home() {
  return (
    <main className="min-h-screen bg-[#faf7f2] text-[#2b2118]">
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold tracking-tight">
          The Baker&apos;s Edit
        </h1>

        <div className="hidden md:flex gap-8 text-sm">
          <a href="#" className="hover:opacity-60">Discover</a>
          <a href="#" className="hover:opacity-60">For Bakers</a>
          <a href="#" className="hover:opacity-60">About</a>
        </div>

        <button className="border border-[#2b2118] rounded-full px-5 py-2 text-sm">
          Join as a Baker
        </button>
      </nav>

      <section className="max-w-7xl mx-auto px-8 pt-20 pb-24 text-center">
        <p className="uppercase tracking-[0.3em] text-xs mb-6 opacity-60">
          Mumbai&apos;s curated home bakers
        </p>

        <h2 className="text-5xl md:text-7xl font-serif leading-tight max-w-4xl mx-auto">
          Discover something
          <br />
          <span className="italic">worth craving.</span>
        </h2>

        <p className="max-w-xl mx-auto mt-8 text-lg opacity-70">
          Discover premium home bakers, handcrafted cakes and unforgettable
          desserts — all in one place.
        </p>

        <div className="max-w-2xl mx-auto mt-10 bg-white rounded-full p-2 shadow-lg flex items-center">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="flex-1 px-6 py-4 outline-none bg-transparent"
          />

          <button className="bg-[#2b2118] text-white rounded-full px-7 py-4">
            Explore
          </button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8 pb-24">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-sm uppercase tracking-widest opacity-50">
              Explore
            </p>
            <h3 className="text-3xl font-serif mt-2">
              Find your next favourite
            </h3>
          </div>

          <a href="#" className="text-sm underline">
            View all
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "Celebration Cakes",
            "Custom Cakes",
            "Brownies",
            "Cookies",
          ].map((category) => (
            <div
              key={category}
              className="bg-white rounded-2xl p-8 min-h-40 flex items-end shadow-sm hover:shadow-md transition"
            >
              <h4 className="font-medium">{category}</h4>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#2b2118] text-white">
        <div className="max-w-7xl mx-auto px-8 py-20 text-center">
          <p className="uppercase tracking-[0.3em] text-xs opacity-60">
            For home bakers
          </p>

          <h3 className="text-4xl md:text-5xl font-serif mt-5">
            Your craft deserves
            <br />
            to be discovered.
          </h3>

          <p className="max-w-lg mx-auto mt-6 opacity-70">
            Join a curated community of Mumbai&apos;s independent home bakers
            and let new customers discover your work.
          </p>

          <button className="mt-8 bg-white text-[#2b2118] rounded-full px-7 py-3">
            Become a Baker
          </button>
        </div>
      </section>

      <footer className="max-w-7xl mx-auto px-8 py-8 text-sm opacity-50 flex justify-between">
        <span>© 2026 The Baker&apos;s Edit</span>
        <span>Mumbai, India</span>
      </footer>
    </main>
  );
}
