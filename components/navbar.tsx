"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ModeToggle } from "./mode-toggle";
import ClientWalletMultiButton from "./wallet-button";

export default function NavBar() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const toggleSideMenu = () => setIsSideMenuOpen(!isSideMenuOpen);

  return (
    <nav className="flex justify-between px-4 sm:px-8 h-16 items-center border-b">
      <section className="flex items-center gap-4">
        <div onClick={toggleSideMenu} className="lg:hidden cursor-pointer">
          <Menu className="h-6 w-6" />
        </div>
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 540 532"
              className="max-w-full h-auto rounded-md dark:bg-white"
              aria-label="Decorative graphic"
              role="img"
            >
              <path fill="#8151FD" d="M0 0h540v532H0z" />
              <path fill="#FFFFFF" d="M346 140h40v252h-40z" />
              <path fill="#FFFFFF" d="M154 140h40v252h-40z" />
              <path fill="#FFFFFF" d="M250 272h38v120h-58v-80h20z" />
              <path fill="#FFFFFF" d="M308 392h38v40h-38z" />
              <path fill="#FFFFFF" d="M194 392h38v40h-38z" />
            </svg>
          </div>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            gibwork
          </h2>
        </Link>
      </section>

      {isSideMenuOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden">
          <section className="flex-col absolute left-0 top-0 h-full w-64 p-8 gap-8 z-50 flex bg-background text-foreground">
            <div
              onClick={toggleSideMenu}
              className="self-end cursor-pointer hover:opacity-75 transition-opacity"
            >
              <X className="h-6 w-6" />
            </div>
            <Link
              href="/"
              className="text-lg font-semibold hover:opacity-75 transition-opacity"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-lg font-semibold hover:opacity-75 transition-opacity"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-lg font-semibold hover:opacity-75 transition-opacity"
            >
              Contact
            </Link>
            <ClientWalletMultiButton />
          </section>
        </div>
      )}

      <section className="hidden lg:flex items-center gap-6">
        <Link
          href="/"
          className="text-lg font-semibold hover:text-primary transition-colors"
        >
          Home
        </Link>
        <Link
          href="/about"
          className="text-lg font-semibold hover:text-primary transition-colors"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="text-lg font-semibold hover:text-primary transition-colors"
        >
          Contact
        </Link>
      </section>

      <section className="flex items-center gap-3">
        <ModeToggle />
        <ClientWalletMultiButton/>
      </section>
    </nav>
  );
}