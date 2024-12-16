"use client";

import React from "react";
import Navbar from "./components/Navbar";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex items-center justify-center h-[90vh]">
        <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-md text-center">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Welcome to OpenPGP RSA Encryption & Decryption
          </h1>
          <p className="text-lg mb-8 text-gray-600">
            Use this application to generate keys, encrypt messages, and decrypt
            messages securely.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/generate")}
              className="w-full sm:w-1/3 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
            >
              Generate Keys
            </button>
            <button
              onClick={() => router.push("/encrypt")}
              className="w-full sm:w-1/3 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300"
            >
              Encrypt Message
            </button>
            <button
              onClick={() => router.push("/decrypt")}
              className="w-full sm:w-1/3 px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition duration-300"
            >
              Decrypt Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
