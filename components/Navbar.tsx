"use client";

import { useState } from "react";

const links = [
  { label: "Discover", href: "#discover" },
  { label: "Bakers", href: "#bakers" },
  { label: "Categories", href: "#categories" },
  { label: "Occasions", href: "#occasions" },
  { label: "About", href: "#about" },
];

type NavbarProps = {
  onOpenJoinModal?: () => void;
};

export function Navbar({ onOpenJoinModal }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[#2b2118]/8 bg-[#faf7f2]/90 backdrop-blur-md transition-all">
      <nav
        className="flex items-center justify-between gap-4 px-5 sm:px-8 py-3.5 max-w-7xl mx-auto"
        aria-label="Main"
      >
        <a
          href="#top"
          className="group flex flex-col focus-visible:outline-none"
        >
          <span className="font-serif text-xl sm:text-2xl tracking-tight text-[#2b2118] transition-colors group-hover:text-[#6b4a32]">
            The Baker&apos;s Edit
          </span>
          <span className="text-[9px] uppercase tracking-[0.25em] text-[#2b2118]/40 font-medium -mt-0.5">
            Mumbai • Curated Home Bakes
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-7 lg:gap-8 text-xs tracking-[0.14em] uppercase font-medium text-[#2b2118]/75">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="transition-colors duration-200 hover:text-[#6b4a32] relative py-1 focus-visible:outline-none"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenJoinModal}
            className="hidden sm:inline-flex items-center justify-center rounded-full border border-[#2b2118] bg-transparent px-5 py-2 text-xs uppercase tracking-wider font-medium text-[#2b2118] transition-all duration-300 hover:bg-[#2b2118] hover:text-[#faf7f2] hover:scale-[1.02] shadow-sm cursor-pointer"
          >
            Join as a Baker
          </button>

          <button
            type="button"
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#2b2118]/15 text-[#2b2118] hover:bg-[#2b2118]/5 transition-colors cursor-pointer"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen((open) => !open)}
          >
            <span className="sr-only">Menu</span>
            <span aria-hidden className="flex flex-col gap-1.5">
              <span
                className={`block h-0.5 w-4.5 bg-[#2b2118] transition-transform duration-300 ${
                  isOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-4.5 bg-[#2b2118] transition-opacity duration-300 ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`block h-0.5 w-4.5 bg-[#2b2118] transition-transform duration-300 ${
                  isOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {isOpen ? (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-[#2b2118]/8 bg-[#faf7f2] px-6 py-5 shadow-lg animate-fade-in"
        >
          <ul className="flex flex-col gap-3 text-sm font-medium tracking-wide">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block py-2 text-[#2b2118] hover:text-[#6b4a32] border-b border-[#2b2118]/5 transition-colors"
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <button
                type="button"
                className="w-full inline-flex items-center justify-center rounded-full bg-[#2b2118] text-[#faf7f2] px-5 py-3 text-xs uppercase tracking-wider font-medium transition-all hover:bg-[#3a2c22] cursor-pointer"
                onClick={() => {
                  closeMenu();
                  onOpenJoinModal?.();
                }}
              >
                Join as a Baker
              </button>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
