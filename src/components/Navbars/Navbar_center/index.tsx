"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, List, X } from "phosphor-react";
import { getIconByName } from "@utils/getIconFromName";
import navbarConfig from "@config/navbar/navbar.json";

const NavbarCenter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { brand, logo, links, cta, mobileMenu } = navbarConfig;
  const IconOrPath = getIconByName(logo);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleMobileLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      }
    } else {
      setIsOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
      <nav className="border rounded-xl backdrop-blur-md bg-opacity-80 mt-4 py-4 px-6 md:px-12 shadow-md max-w-4xl w-full flex items-center justify-between ring-4 ring-gray-300">
        {/* Brand and Logo */}
        <div className="flex items-center gap-2 md:absolute md:inset-x-0 md:justify-center pointer-events-auto z-10">
          <motion.div
            className="text-navbar-icon-color"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {typeof IconOrPath === "string" ? (
              <img src={IconOrPath} alt={brand} className="h-8" />
            ) : (
              <IconOrPath size={30} weight="fill" />
            )}
          </motion.div>
          <span className="font-bold text-lg ">{brand}</span>
        </div>

        {/* Hamburger Menu */}
        <button
          onClick={toggleMenu}
          className="block md:hidden p-2 rounded-md focus:outline-none focus:ring-2"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <List size={24} />}
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 text-sm font-medium z-20">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="hover:text-navbar-hover-link-color transition"
            >
              {link.text}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block z-20">
          {cta && (
            <button
              className="bg-nav-cta-btn-bg font-brico text-foreground-opposite px-4 py-3 rounded-lg cursor-pointer flex flex-row items-center gap-1 transition delay-75 group"
              onClick={() => window.open(cta.href, "_blank")}
            >
              {cta.text}
              <ArrowRight className="transform transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            className="fixed bg-navbar-bg top-24 left-0 w-full z-40 flex flex-col items-center justify-center p-5 gap-4 rounded-b-xl shadow-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {mobileMenu.map((item, index) => (
              <motion.a
                key={item.text}
                href={item.href}
                onClick={(e) => handleMobileLinkClick(e, item.href)}
                className="block font-brico font-medium items-center text-center w-full py-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {item.text}
              </motion.a>
            ))}

            {cta && (
              <motion.a
                href={cta.href}
                className="bg-nav-cta-btn-bg font-brico text-foreground-opposite px-4 py-2 rounded-lg flex flex-row items-center gap-1 group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {cta.text}
                <ArrowRight className="transform transition-transform duration-300 group-hover:translate-x-1" />
              </motion.a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavbarCenter;
