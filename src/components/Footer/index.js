"use client";
import React, { useState } from "react";
import Link from "next/link";
import siteMetadata from "@/src/utils/siteMetaData";

const Footer = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(siteMetadata.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="mt-14 rounded-2xl bg-dark dark:border-4 dark:border-accentDark/90 m-5 mb-10 p-5 flex flex-col items-center text-light" role="contentinfo">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center">
          <p className="my-2 text-center font-light dark:font-medium text-base">
            Blog by {siteMetadata.author}
          </p>
          <p className="text-xs text-center mt-2 opacity-60">
            &copy; {new Date().getFullYear()} {siteMetadata.author}
          </p>
          <nav className="mt-4" aria-label="Footer navigation">
            <div className="space-y-4">
              {/* Page Links */}
              <ul className="flex flex-wrap justify-center gap-4">
                <li>
                  <Link href="/" className="hover:underline focus:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:underline focus:underline">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="hover:underline focus:underline">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/experience" className="hover:underline focus:underline">
                    Experience
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:underline focus:underline">
                    Contact
                  </Link>
                </li>
                <li>
                  <a 
                    href="/Evan_Maus_Resume.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent/80 hover:underline focus:underline inline-flex items-center gap-1 font-semibold"
                    aria-label="View Resume PDF"
                  >
                    Resume
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </li>
              </ul>
              
              {/* Social Links */}
              <ul className="flex flex-wrap justify-center gap-4">
                <li>
                  <a 
                    href={siteMetadata.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent/80 hover:underline focus:underline font-semibold"
                    aria-label="GitHub profile"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a 
                    href={siteMetadata.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent/80 hover:underline focus:underline font-semibold"
                    aria-label="LinkedIn profile"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a 
                    href={siteMetadata.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:underline focus:underline"
                    aria-label="X profile"
                  >
                    X
                  </a>
                </li>
                <li>
                  <button
                    onClick={copyEmail}
                    className="text-accent hover:text-accent/80 hover:underline focus:underline inline-flex items-center gap-1 cursor-pointer font-semibold"
                    aria-label="Copy email to clipboard"
                    title="Click to copy email"
                  >
                    Email
                    {copied ? (
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
