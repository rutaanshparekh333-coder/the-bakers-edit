import Image from "next/image";

const categories = [
  {
    name: "Celebration Cakes",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Custom Cakes",
    image:
      "https://images.unsplash.com/photo-1621303837174-89787a7d2398?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Brownies",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Cookies",
    image:
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=900&q=80",
  },
];

const bakers = [
  {
    name: "Aanya Kapoor",
    area: "Bandra West",
    specialty: "Celebration cakes",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Rohan Mehta",
    area: "Andheri West",
    specialty: "Brownies & blondies",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Meher D'Souza",
    area: "Juhu",
    specialty: "Custom wedding cakes",
    rating: "5.0",
    image:
      "https://images.unsplash.com/photo-1464349095431-e9fe36c20b16?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Priya Nair",
    area: "Powai",
    specialty: "Cookies & tarts",
    rating: "4.7",
    image:
      "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=800&q=80",
  },
];

const desserts = [
  {
    name: "Pistachio Rose Cake",
    baker: "Aanya Kapoor",
    price: "₹2,400",
    image:
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Dark Chocolate Brownie Box",
    baker: "Rohan Mehta",
    price: "₹850",
    image:
      "https://images.unsplash.com/photo-1611625877932-231e429824e1?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Salted Caramel Cookies",
    baker: "Priya Nair",
    price: "₹620",
    image:
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Mango Cheesecake",
    baker: "Meher D'Souza",
    price: "₹1,650",
    image:
      "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=80",
  },
];

function StarRating({ value }: { value: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-sm tracking-wide">
      <span aria-hidden className="text-[#c4a574]">
        ★
      </span>
      <span className="font-medium">{value}</span>
    </span>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f1e8] text-[#2b2118]">
      <nav className="flex items-center justify-between gap-4 px-5 sm:px-8 py-5 sm:py-6 max-w-7xl mx-auto">
        <h1 className="font-serif text-xl sm:text-2xl tracking-tight">
          The Baker&apos;s Edit
        </h1>

        <div className="hidden md:flex gap-8 text-sm tracking-wide">
          <a href="#discover" className="hover:opacity-60 transition-opacity duration-300">
            Discover
          </a>
          <a href="#bakers" className="hover:opacity-60 transition-opacity duration-300">
            Bakers
          </a>
          <a href="#for-bakers" className="hover:opacity-60 transition-opacity duration-300">
            For Bakers
          </a>
        </div>

        <a
          href="#for-bakers"
          className="border border-[#2b2118] rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm whitespace-nowrap transition-all duration-300 hover:bg-[#2b2118] hover:text-[#f7f1e8]"
        >
          Join as a Baker
        </a>
      </nav>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-10 sm:pt-16 pb-16 sm:pb-24">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <p className="uppercase tracking-[0.28em] text-[11px] sm:text-xs mb-6 text-[#2b2118]/55">
              Mumbai&apos;s curated home bakers
            </p>

            <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl leading-[1.08] tracking-tight">
              Discover something
              <br />
              <span className="italic text-[#6b4a32]">worth craving.</span>
            </h2>

            <p className="max-w-xl mx-auto lg:mx-0 mt-6 sm:mt-8 text-base sm:text-lg leading-relaxed text-[#2b2118]/70">
              Discover premium home bakers, handcrafted cakes and unforgettable
              desserts — all in one place.
            </p>

            <div className="relative max-w-2xl mx-auto lg:mx-0 mt-8 sm:mt-10 bg-white rounded-full p-1.5 sm:p-2 shadow-[0_18px_50px_rgba(43,33,24,0.12)] ring-1 ring-[#2b2118]/8 flex items-center">
              <input
                type="search"
                name="q"
                placeholder="Search cakes, cookies, brownies or a baker…"
                className="flex-1 min-w-0 px-4 sm:px-6 py-3.5 sm:py-5 outline-none bg-transparent text-sm sm:text-base placeholder:text-[#2b2118]/40"
                aria-label="Search desserts and bakers"
              />
              <button
                type="button"
                className="shrink-0 bg-[#2b2118] text-[#f7f1e8] rounded-full px-5 sm:px-8 py-3 sm:py-4 text-sm sm:text-base transition-transform duration-300 hover:scale-[1.03] hover:bg-[#3a2c22]"
              >
                Explore
              </button>
            </div>

            <div className="mt-5 flex flex-wrap justify-center lg:justify-start gap-2 text-xs text-[#2b2118]/55">
              {["Birthday cake", "Brownies", "Bandra", "Custom cake"].map(
                (chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-[#2b2118]/15 px-3 py-1.5 bg-white/50"
                  >
                    {chip}
                  </span>
                ),
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-lg mx-auto lg:max-w-none">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] shadow-md">
              <Image
                src="https://images.unsplash.com/photo-1464349095431-e9fe36c20b16?auto=format&fit=crop&w=900&q=80"
                alt="Layered celebration cake with fresh berries"
                fill
                sizes="(max-width: 1024px) 45vw, 28vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] shadow-md mt-8 sm:mt-12">
              <Image
                src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=80"
                alt="Golden croissants on a bakery counter"
                fill
                sizes="(max-width: 1024px) 45vw, 28vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="discover" className="max-w-7xl mx-auto px-5 sm:px-8 pb-16 sm:pb-24">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#2b2118]/45">
              Explore
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl mt-2">
              Find your next favourite
            </h3>
          </div>

          <a
            href="#desserts"
            className="text-sm underline underline-offset-4 decoration-[#2b2118]/30 hover:decoration-[#2b2118] transition-colors duration-300"
          >
            View all
          </a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {categories.map((category) => (
            <article
              key={category.name}
              className="group relative overflow-hidden rounded-2xl min-h-40 sm:min-h-56 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2b2118]/80 via-[#2b2118]/10 to-transparent" />
              <h4 className="absolute bottom-4 left-4 right-4 text-white font-medium text-sm sm:text-base">
                {category.name}
              </h4>
            </article>
          ))}
        </div>
      </section>

      <section id="bakers" className="max-w-7xl mx-auto px-5 sm:px-8 pb-16 sm:pb-24">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#2b2118]/45">
              Featured bakers
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl mt-2">
              The makers behind the magic
            </h3>
          </div>
          <a
            href="#"
            className="hidden sm:inline text-sm underline underline-offset-4 decoration-[#2b2118]/30 hover:decoration-[#2b2118] transition-colors duration-300"
          >
            Meet all bakers
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {bakers.map((baker) => (
            <article
              key={baker.name}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={baker.image}
                  alt={`${baker.name}, home baker in ${baker.area}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <h4 className="font-serif text-xl leading-tight">{baker.name}</h4>
                  <StarRating value={baker.rating} />
                </div>
                <p className="mt-2 text-sm text-[#2b2118]/55">{baker.area}</p>
                <p className="mt-3 text-sm">{baker.specialty}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="desserts" className="max-w-7xl mx-auto px-5 sm:px-8 pb-16 sm:pb-24">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#2b2118]/45">
              Popular desserts
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl mt-2">
              What Mumbai is ordering
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {desserts.map((dessert) => (
            <article
              key={dessert.name}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[5/4] overflow-hidden">
                <Image
                  src={dessert.image}
                  alt={dessert.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h4 className="font-medium leading-snug">{dessert.name}</h4>
                <p className="mt-2 text-sm text-[#2b2118]/55">by {dessert.baker}</p>
                <p className="mt-4 text-sm tracking-wide">{dessert.price}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="for-bakers" className="bg-[#2b2118] text-[#f7f1e8]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24 grid lg:grid-cols-2 gap-10 items-center">
          <div className="relative hidden sm:block min-h-72 rounded-[2rem] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=1200&q=80"
              alt="Home baker decorating a cake"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="text-center lg:text-left">
            <p className="uppercase tracking-[0.3em] text-xs text-[#f7f1e8]/55">
              For home bakers
            </p>

            <h3 className="font-serif text-4xl md:text-5xl mt-5 leading-tight">
              Your craft deserves
              <br />
              to be discovered.
            </h3>

            <p className="max-w-lg mx-auto lg:mx-0 mt-6 text-[#f7f1e8]/70 leading-relaxed">
              Join a curated community of Mumbai&apos;s independent home bakers
              and let new customers discover your work.
            </p>

            <button
              type="button"
              className="mt-8 bg-[#f7f1e8] text-[#2b2118] rounded-full px-7 py-3 transition-transform duration-300 hover:scale-[1.03]"
            >
              Become a Baker
            </button>
          </div>
        </div>
      </section>

      <footer className="max-w-7xl mx-auto px-5 sm:px-8 py-8 text-sm text-[#2b2118]/50 flex flex-col sm:flex-row gap-2 justify-between">
        <span>© 2026 The Baker&apos;s Edit</span>
        <span>Mumbai, India</span>
      </footer>
    </main>
  );
}
