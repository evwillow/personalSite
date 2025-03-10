"use client";
import React from "react";
import Link from "next/link";
import siteMetadata from "@/src/utils/siteMetaData";

const Footer = () => {
  return (
    <footer className="mt-14 rounded-2xl bg-dark dark:border-4 dark:border-accentDark/90 m-5 mb-10 p-5 flex flex-col items-center text-light" role="contentinfo">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center">
          <p className="my-2 text-center font-light dark:font-medium text-base">
            Blog by {siteMetadata.author}
          </p>
          <p className="text-sm text-center mt-2">
            &copy; {new Date().getFullYear()} {siteMetadata.author}. All rights reserved.
          </p>
          <nav className="mt-4" aria-label="Footer navigation">
            <ul className="flex flex-wrap justify-center gap-4">
              <li>
                <Link href="/" className="hover:underline focus:underline">
                  Home
                </Link>
              </li>
              <li>
                <a 
                  href={siteMetadata.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:underline focus:underline"
                  aria-label="Instagram profile"
                >
                  Instagram
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
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
