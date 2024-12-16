"use client";

import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-gray-800 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-center gap-6">
        <Link href="/">
          <span className="hover:text-blue-400 cursor-pointer">Home</span>
        </Link>
        <Link href="/generate">
          <span className="hover:text-blue-400 cursor-pointer">
            Generate Keys
          </span>
        </Link>
        <Link href="/encrypt">
          <span className="hover:text-blue-400 cursor-pointer">
            Encrypt Message
          </span>
        </Link>
        <Link href="/decrypt">
          <span className="hover:text-blue-400 cursor-pointer">
            Decrypt Message
          </span>
        </Link>
      </div>
    </nav>
  );
}
