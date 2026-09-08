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
    <header className="sticky top-0 z-30 border-b border-[#2b2118]/10 bg-[#f6f1e8]/90 backdrop-blur-md">
      <nav
        className="flex items-center justify-between gap-4 px-5 sm:px-8 py-4 max-w-7xl mx-auto"
        aria-label="Main"
      >
        <a href="#top" className="font-serif text-xl sm:text-2xl tracking-tight text-[#2b2118]">
          The Baker&apos;s Edit
        </a>

        <ul className="hidden md:flex items-center gap-8 text-[13px] tracking-[0.08em] uppercase text-[#2b2118]/80">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="transition-colors duration-300 hover:text-[#6b4a32]"
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
            className="hidden sm:inline-flex border border-[#2b2118] rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-[#2b2118] hover:text-[#f6f1e8]"
          >
            Join as a Baker
          </button>

          <button
            type="button"
            className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#2b2118]/20 text-[#2b2118]"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen((open) => !open)}
          >
            <span className="sr-only">Menu</span>
            <span aria-hidden className="flex flex-col gap-1.5">
              <span
                className={`block h-0.5 w-5 bg-[#2b2118] transition-transform duration-300 ${
                  isOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-[#2b2118] transition-opacity duration-300 ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-[#2b2118] transition-transform duration-300 ${
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
          className="md:hidden border-t border-[#2b2118]/10 bg-[#f6f1e8] px-5 py-4"
        >
          <ul className="flex flex-col gap-3 text-base">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block py-2 text-[#2b2118] hover:text-[#6b4a32]"
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <button
                type="button"
                className="mt-2 inline-flex border border-[#2b2118] rounded-full px-5 py-2 text-sm transition-all duration-300 hover:bg-[#2b2118] hover:text-[#f6f1e8]"
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
