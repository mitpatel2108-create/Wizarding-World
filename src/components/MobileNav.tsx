// src/components/MobileNav.tsx
// Replace or wrap your existing <nav> with this on mobile.
// It hides at md+ breakpoints and shows a hamburger on smaller screens.

import { useState, useEffect } from "react";
import { Link, useLocation } from "@tanstack/react-router"; // adjust to your router
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/hogwarts", label: "Hogwarts" },
  { href: "/houses", label: "Houses" },
  { href: "/spells", label: "Spells" },
  { href: "/potions", label: "Potions" },
  { href: "/characters", label: "Characters" },
  { href: "/wands", label: "Wands" },
  { href: "/map", label: "Map" },
  { href: "/dark-arts", label: "Dark Arts" },
  { href: "/profile", label: "Profile" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Hamburger button — only visible on mobile */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close menu" : "Open menu"}
        className="md:hidden fixed top-4 right-4 z-50 w-10 h-10 flex flex-col justify-center items-center gap-1.5 p-2"
      >
        <motion.span
          animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
          className="block w-6 h-px bg-[#9b8760] origin-center transition-colors"
        />
        <motion.span
          animate={open ? { opacity: 0 } : { opacity: 1 }}
          className="block w-6 h-px bg-[#9b8760]"
        />
        <motion.span
          animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
          className="block w-6 h-px bg-[#9b8760] origin-center"
        />
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {open && (
          <motion.nav
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: "easeInOut" }}
            className="md:hidden fixed top-0 right-0 bottom-0 z-50 w-72 bg-[#080b16] border-l border-[#1a1a2e] flex flex-col pt-20 pb-10 px-8"
          >
            {/* Decorative runes at top */}
            <p className="text-[#2a2a40] text-lg tracking-[0.5em] mb-8 select-none">
              ✦ · ✦ · ✦
            </p>

            <ul className="flex flex-col gap-1 flex-1">
              {NAV_LINKS.map(({ href, label }) => {
                const active = location.pathname === href;
                return (
                  <li key={href}>
                    <Link
                      to={href}
                      className={`block py-3 text-sm tracking-[0.2em] uppercase transition-colors duration-200 border-b border-transparent ${
                        active
                          ? "text-[#9b8760] border-[#9b8760]/30"
                          : "text-[#6b6050] hover:text-[#c8bea0]"
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <p className="text-xs text-[#2a2a3a] tracking-widest mt-6">
              Lumos · Nox · Alohomora
            </p>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
