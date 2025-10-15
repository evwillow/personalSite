"use client"

import Logo from "./Logo"
import LinkedInIcon from "./LinkedInIcon"
import XIcon from "./XIcon"
import GitHubIcon from "./GitHubIcon"
import { useState } from "react"
import Link from "next/link"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <header className={`relative z-30 w-full bg-white dark:bg-dark shadow-xl ${isOpen ? 'sticky top-0 z-50 md:relative' : ''}`} role="banner">

        <div className="container mx-auto px-4 sm:px-8 md:px-12 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4 sm:space-x-8 md:space-x-12">
            <Logo />
            {/* Desktop navigation */}
            <nav aria-label="Main navigation" className="hidden md:block">
              <ul className="flex items-center space-x-8">
                <li>
                  <Link
                    href="/about"
                    className="text-dark dark:text-light hover:text-accent dark:hover:text-accent transition-colors duration-200 font-medium"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/projects"
                    className="text-dark dark:text-light hover:text-accent dark:hover:text-accent transition-colors duration-200 font-medium"
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="/experience"
                    className="text-dark dark:text-light hover:text-accent dark:hover:text-accent transition-colors duration-200 font-medium"
                  >
                    Experience
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-dark dark:text-light hover:text-accent dark:hover:text-accent transition-colors duration-200 font-medium"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-dark dark:text-light hover:text-accent dark:hover:text-accent transition-colors duration-200 font-medium flex items-center gap-1"
                  >
                    Resume
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Social media icons - always visible */}
            <nav aria-label="Social media links" className="relative z-50">
              <ul className="flex items-center space-x-2 sm:space-x-3 justify-start">
                <li>
                  <a
                    href="//github.com/evwillow"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View my GitHub profile"
                    className="transition-transform hover:scale-110 focus:scale-110 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12"
                  >
                    <GitHubIcon className="w-full h-full" />
                  </a>
                </li>
                <li>
                  <a
                    href="//x.com/evwillow1"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow me on X"
                    className="transition-transform hover:scale-110 focus:scale-110 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12"
                  >
                    <XIcon className="w-full h-full" />
                  </a>
                </li>
                <li>
                  <a
                    href="//linkedin.com/in/evwillow"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Connect with me on LinkedIn"
                    className="transition-transform hover:scale-110 focus:scale-110 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12"
                  >
                    <LinkedInIcon className="w-full h-full" />
                  </a>
                </li>
              </ul>
            </nav>

            {/* Hamburger menu button - only visible on mobile */}
            <button
              onClick={toggle}
              className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center space-y-1.5 focus:outline-none focus:ring-2 focus:ring-dark rounded"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <span
                className={`block w-6 h-0.5 transition-all duration-300 ease-in-out ${
                  isOpen ? 'bg-dark rotate-45 translate-y-2' : 'bg-dark dark:bg-light'
                }`}
              />
              <span
                className={`block w-6 h-0.5 transition-all duration-300 ease-in-out ${
                  isOpen ? 'bg-dark opacity-0' : 'bg-dark dark:bg-light'
                }`}
              />
              <span
                className={`block w-6 h-0.5 transition-all duration-300 ease-in-out ${
                  isOpen ? 'bg-dark -rotate-45 -translate-y-2' : 'bg-dark dark:bg-light'
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="fixed top-0 right-0 bottom-0 left-0 z-40 md:hidden">
          {/* Backdrop blur */}
          <div
            className="absolute inset-0 backdrop-blur-sm bg-black/40"
            onClick={toggle}
            style={{ pointerEvents: 'auto' }}
          />
          
          {/* Menu content */}
          <div className="absolute top-0 right-0 h-full w-64 bg-black/90 backdrop-blur-md shadow-2xl" style={{ pointerEvents: 'auto' }}>
            {/* Navigation links */}
            <nav className="flex flex-col items-start px-8 pt-24 space-y-6" aria-label="Mobile navigation">
              <Link
                href="/"
                onClick={toggle}
                className="text-white text-xl font-medium hover:text-accent transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                href="/about"
                onClick={toggle}
                className="text-white text-xl font-medium hover:text-accent transition-colors duration-200"
              >
                About
              </Link>
              <Link
                href="/projects"
                onClick={toggle}
                className="text-white text-xl font-medium hover:text-accent transition-colors duration-200"
              >
                Projects
              </Link>
              <Link
                href="/experience"
                onClick={toggle}
                className="text-white text-xl font-medium hover:text-accent transition-colors duration-200"
              >
                Experience
              </Link>
              <Link
                href="/contact"
                onClick={toggle}
                className="text-white text-xl font-medium hover:text-accent transition-colors duration-200"
              >
                Contact
              </Link>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={toggle}
                className="text-white text-xl font-medium hover:text-accent transition-colors duration-200 flex items-center gap-2"
              >
                Resume
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}

export default Header
