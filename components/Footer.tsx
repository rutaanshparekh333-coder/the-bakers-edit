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
    <footer className="bg-[#f6f1e8] border-t border-[#2b2118]/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 flex flex-col md:flex-row md:items-start justify-between gap-8">
        <div>
          <p className="font-serif text-2xl text-[#2b2118]">The Baker&apos;s Edit</p>
          <p className="mt-2 text-sm text-[#2b2118]/55">Mumbai, India</p>
        </div>

        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-10 gap-y-3 text-sm">
          {footerLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="transition-colors duration-300 hover:text-[#6b4a32]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <p className="max-w-7xl mx-auto px-5 sm:px-8 pb-8 text-xs text-[#2b2118]/40">
        © 2026 The Baker&apos;s Edit. Baker profiles on this page are sample
        placeholders, not verified businesses.
      </p>
    </footer>
  );
}
