"use client";

import React, { useState } from "react";
import * as openpgp from "openpgp";

export default function GeneratePage() {
  const [keys, setKeys] = useState({ publicKey: "", privateKey: "" });

  const generateKeys = async () => {
    try {
      const { privateKey, publicKey } = await openpgp.generateKey({
        type: "rsa",
        rsaBits: 2048,
        userIDs: [{ name: "User", email: "user@example.com" }],
      });
      setKeys({ publicKey, privateKey });
    } catch (error) {
      console.error("Error generating keys:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Key Generation</h1>
        <div className="flex flex-col items-center">
          <button
            onClick={generateKeys}
            className="mb-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            Generate Keys
          </button>
          <div className="w-full">
            <h3 className="text-lg font-semibold mb-2">Public Key:</h3>
            <textarea
              readOnly
              rows={10}
              value={keys.publicKey || ""}
              placeholder="Public key will appear here after generation."
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="w-full mt-6">
            <h3 className="text-lg font-semibold mb-2">Private Key:</h3>
            <textarea
              readOnly
              rows={10}
              value={keys.privateKey || ""}
              placeholder="Private key will appear here after generation."
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
