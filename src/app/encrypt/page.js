"use client";

import React, { useState } from "react";
import * as openpgp from "openpgp";

export default function EncryptPage() {
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [message, setMessage] = useState("");
  const [encryptedMessage, setEncryptedMessage] = useState("");

  const signAndEncrypt = async () => {
    try {
      const privKey = await openpgp.readPrivateKey({ armoredKey: privateKey });
      const pubKey = await openpgp.readKey({ armoredKey: publicKey });
      const messageToEncrypt = await openpgp.createMessage({ text: message });

      const encrypted = await openpgp.encrypt({
        message: messageToEncrypt,
        encryptionKeys: pubKey,
        signingKeys: privKey,
      });

      setEncryptedMessage(encrypted);
    } catch (error) {
      console.error("Error encrypting message:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Encrypt Message</h1>
        <div className="flex flex-col items-center">
          <textarea
            placeholder="Your Private Key"
            rows={5}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPrivateKey(e.target.value)}
          />
          <textarea
            placeholder="Recipient's Public Key"
            rows={5}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPublicKey(e.target.value)}
          />
          <textarea
            placeholder="Message to Encrypt"
            rows={3}
            className="w-full p-3 mb-6 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={signAndEncrypt}
            className="mb-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            Sign & Encrypt
          </button>
          <h3 className="text-lg font-semibold mb-2">Encrypted Message:</h3>
          <textarea
            readOnly
            rows={10}
            value={encryptedMessage || ""}
            placeholder="Encrypted message will appear here."
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
