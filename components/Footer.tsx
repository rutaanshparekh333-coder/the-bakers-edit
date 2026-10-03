const footerLinks = [
  { label: "Discover", href: "#discover" },
  { label: "For Bakers", href: "#for-bakers" },
  { label: "About", href: "#about" },
  { label: "Instagram", href: "#" },
  { label: "Contact", href: "#" },
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-[#f4eee3] border-t border-[#2b2118]/8 text-[#2b2118]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14">
          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <a href="#top" className="font-serif text-2xl sm:text-3xl text-[#2b2118] tracking-tight">
                The Baker&apos;s Edit
              </a>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#8d7045] font-semibold mt-1">
                Mumbai • Independent Ateliers
              </p>
              <p className="mt-4 text-xs sm:text-sm text-[#2b2118]/70 max-w-sm leading-relaxed">
                A considered discovery platform celebrating Mumbai&apos;s most skilled
                home bakers, bespoke celebration cake artists, and independent dessert kitchens.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-[#2b2118]/8 flex items-center gap-2 text-xs text-[#2b2118]/60">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>Curation Active • 2026 Mumbai Edition</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3">
            <p className="text-[10px] uppercase tracking-[0.22em] font-semibold text-[#2b2118]/45 mb-4">
              Explore The Edit
            </p>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#discover" className="text-[#2b2118]/75 hover:text-[#6b4a32] transition-colors">
                  Discover Bakers
                </a>
              </li>
              <li>
                <a href="#categories" className="text-[#2b2118]/75 hover:text-[#6b4a32] transition-colors">
                  Dessert Categories
                </a>
              </li>
              <li>
                <a href="#occasions" className="text-[#2b2118]/75 hover:text-[#6b4a32] transition-colors">
                  Browse by Occasion
                </a>
              </li>
              <li>
                <a href="#for-bakers" className="text-[#2b2118]/75 hover:text-[#6b4a32] transition-colors">
                  For Independent Bakers
                </a>
              </li>
              <li>
                <a href="#about" className="text-[#2b2118]/75 hover:text-[#6b4a32] transition-colors">
                  Our Editorial Story
                </a>
              </li>
              <li>
                <a href="/admin" className="text-[#2b2118]/50 hover:text-[#6b4a32] transition-colors">
                  Curator Admin Portal
                </a>
              </li>
            </ul>
          </div>

          {/* Mumbai Localities */}
          <div className="md:col-span-4">
            <p className="text-[10px] uppercase tracking-[0.22em] font-semibold text-[#2b2118]/45 mb-4">
              Neighbourhood Hubs
            </p>
            <p className="text-xs text-[#2b2118]/65 leading-relaxed mb-3">
              Independent kitchens by appointment across Mumbai:
            </p>
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              {["Bandra West", "Juhu", "Khar", "Powai", "Andheri West", "Colaba", "Lower Parel", "Santacruz", "Ghatkopar", "Mulund"].map((loc) => (
                <span
                  key={loc}
                  className="rounded-full bg-white/70 px-2.5 py-1 text-[#2b2118]/70 ring-1 ring-[#2b2118]/6"
                >
                  📍 {loc}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-[#2b2118]/8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#2b2118]/45">
          <p>© 2026 The Baker&apos;s Edit. Crafted with care for Mumbai home kitchens.</p>
          <div className="flex items-center gap-6">
            <a href="#top" className="hover:text-[#6b4a32] transition-colors">
              Back to Top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
