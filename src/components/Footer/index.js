"use client";
import React from "react";
import { useForm } from "react-hook-form";

const Footer = () => {

  return (
    <footer className="rounded-2xl bg-dark dark:border-4 dark:border-accentDark/90 sm:m-10 sm:mb-20 flex flex-col items-center text-light">
      <p className="mx-5 mt-10 mb-4 text-center w-full sm:w-3/5 font-light dark:font-medium text-sm sm:text-base">
        "God's in His heaven, all's right with the world."
      </p>
      <p className="mx-5 mb-10 text-center w-full sm:w-3/5 font-light dark:font-medium text-sm sm:text-base">
        Blog by Evan Moss
      </p>
    </footer>
  );
};

export default Footer;
