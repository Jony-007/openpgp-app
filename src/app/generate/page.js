"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import * as openpgp from "openpgp";

export default function GeneratePage() {
  const [keys, setKeys] = useState({ publicKey: "", privateKey: "" });

  const generateKeys = async () => {
    const { privateKey, publicKey } = await openpgp.generateKey({
      type: "rsa",
      rsaBits: 2048,
      userIDs: [{ name: "User", email: "user@example.com" }],
    });
    setKeys({ publicKey, privateKey });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex items-center justify-center min-h-[90vh]">
        <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6">Generate Keys</h1>
          <button
            onClick={generateKeys}
            className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            Generate Keys
          </button>
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Public Key:</h3>
            <textarea
              readOnly
              rows={5}
              value={keys.publicKey || ""}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <h3 className="text-lg font-semibold mt-4 mb-2">Private Key:</h3>
            <textarea
              readOnly
              rows={5}
              value={keys.privateKey || ""}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
