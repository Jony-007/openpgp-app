"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import * as openpgp from "openpgp";

export default function EncryptPage() {
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [message, setMessage] = useState("");
  const [encryptedMessage, setEncryptedMessage] = useState("");

  const signAndEncrypt = async () => {
    const privKey = await openpgp.readPrivateKey({ armoredKey: privateKey });
    const pubKey = await openpgp.readKey({ armoredKey: publicKey });
    const messageToEncrypt = await openpgp.createMessage({ text: message });

    const encrypted = await openpgp.encrypt({
      message: messageToEncrypt,
      encryptionKeys: pubKey,
      signingKeys: privKey,
    });

    setEncryptedMessage(encrypted);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex items-center justify-center min-h-[90vh]">
        <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6">
            Encrypt Message
          </h1>
          <textarea
            placeholder="Your Private Key"
            rows={5}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            onChange={(e) => setPrivateKey(e.target.value)}
          />
          <textarea
            placeholder="Recipient's Public Key"
            rows={5}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            onChange={(e) => setPublicKey(e.target.value)}
          />
          <textarea
            placeholder="Message to Encrypt"
            rows={3}
            className="w-full p-3 mb-6 border border-gray-300 rounded-lg"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={signAndEncrypt}
            className="w-full px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300"
          >
            Sign & Encrypt
          </button>
          <h3 className="text-lg font-semibold mt-4 mb-2">
            Encrypted Message:
          </h3>
          <textarea
            readOnly
            rows={10}
            value={encryptedMessage || ""}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
