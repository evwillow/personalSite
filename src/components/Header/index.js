"use client"

import Image from "next/image"
import Logo from "./Logo"
import LinkedInIcon from "./LinkedInIcon"
import X from "./x.png"
import { useState } from "react"
import Link from "next/link"

const Header = () => {
  const [click, setClick] = useState(false)

  const toggle = () => {
    setClick(!click)
  }

  return (
    <header className="relative w-full bg-white dark:bg-dark shadow-xl" role="banner">
      <div className="absolute inset-0 -z-10">
        <svg
          viewBox="0 0 1440 400"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#4a90e2" />
              <stop offset="50%" stopColor="#50e3c2" />
              <stop offset="100%" stopColor="#4a90e2" />
            </linearGradient>
          </defs>
          <rect width="1440" height="400" fill="url(#gradient)" />
          <path
            fill="url(#gradient)"
            d="M0,100 C480,300 960,0 1440,100 L1440,400 L0,400 Z"
            className="opacity-80"
          />
        </svg>
      </div>

      <div className="container mx-auto px-8 sm:px-12 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-12">
          <Logo />
          <nav aria-label="Main navigation">
            <Link
              href="/resume"
              className="text-dark dark:text-light hover:text-primary dark:hover:text-primary transition-colors duration-200 font-medium"
            >
              Resume
            </Link>
          </nav>
        </div>
        <nav aria-label="Social media links">
          <ul className="flex items-center space-x-3 justify-start">
            <li>
              <a
                href="//x.com/evanwillowmoss"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow me on X"
                className="transition-transform hover:scale-110 focus:scale-110"
              >
                <Image src={X} alt="X Logo" className="w-8 h-8 sm:w-12 sm:h-12" />
              </a>
            </li>
            <li>
              <a
                href="//linkedin.com/in/evwillow"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect with me on LinkedIn"
                className="transition-transform hover:scale-110 focus:scale-110"
              >
                <LinkedInIcon className="w-8 h-8 sm:w-12 sm:h-12" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
