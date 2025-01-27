"use client"

import { Menu, WalletMinimal, X } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"
import { useState } from "react"

export default function NavBar() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)

  const toggleSideMenu = () => setIsSideMenuOpen(!isSideMenuOpen)

  return (
    <nav className="flex justify-between px-4 sm:px-8 h-16 items-center border-b">
      <section className="flex items-center gap-4">
        <div onClick={toggleSideMenu} className="lg:hidden cursor-pointer">
          <Menu className="h-6 w-6" />
        </div>
        <Link href="/">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold tracking-tight">gibwork</h2>
        </Link>
      </section>

      {isSideMenuOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden">
          <section className="flex-col absolute left-0 top-0 h-full w-64 p-8 gap-8 z-50 flex bg-background text-foreground">
            <div onClick={toggleSideMenu} className="self-end cursor-pointer hover:opacity-75 transition-opacity">
              <X className="h-6 w-6" />
            </div>
            <Link href="/" className="text-lg font-semibold hover:opacity-75 transition-opacity">
              Home
            </Link>
            <Link href="/about" className="text-lg font-semibold hover:opacity-75 transition-opacity">
              About
            </Link>
            <Link href="/contact" className="text-lg font-semibold hover:opacity-75 transition-opacity">
              Contact
            </Link>
            <Button className="mt-auto w-full">
              <WalletMinimal className="h-5 w-5 mr-2" />
              Select Wallet
            </Button>
          </section>
        </div>
      )}

      <section className="hidden lg:flex items-center gap-6">
        <Link href="/" className="text-lg font-semibold hover:text-primary transition-colors">
          Home
        </Link>
        <Link href="/about" className="text-lg font-semibold hover:text-primary transition-colors">
          About
        </Link>
        <Link href="/contact" className="text-lg font-semibold hover:text-primary transition-colors">
          Contact
        </Link>
      </section>

      <section className="flex items-center">
        <Button className="p-2 sm:px-4 sm:py-2 text-xs sm:text-sm">
          <WalletMinimal className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
          Select Wallet
        </Button>
      </section>
    </nav>
  )
}

