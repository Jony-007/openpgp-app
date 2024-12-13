"use client";

import React, { useState } from "react";
import * as openpgp from "openpgp";

export default function DecryptPage() {
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [encryptedMessage, setEncryptedMessage] = useState("");
  const [decryptedMessage, setDecryptedMessage] = useState("");

  const decryptAndVerify = async () => {
    try {
      const privKey = await openpgp.readPrivateKey({ armoredKey: privateKey });
      const pubKey = await openpgp.readKey({ armoredKey: publicKey });
      const message = await openpgp.readMessage({
        armoredMessage: encryptedMessage,
      });

      const { data: decrypted, signatures } = await openpgp.decrypt({
        message,
        decryptionKeys: privKey,
        verificationKeys: pubKey,
      });

      const valid = await signatures[0].verified;
      setDecryptedMessage(valid ? decrypted : "Signature verification failed.");
    } catch (error) {
      console.error("Error decrypting message:", error);
      setDecryptedMessage("An error occurred during decryption.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Decrypt Message</h1>
        <div className="flex flex-col items-center">
          <textarea
            placeholder="Your Private Key"
            rows={5}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPrivateKey(e.target.value)}
          />
          <textarea
            placeholder="Sender's Public Key"
            rows={5}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPublicKey(e.target.value)}
          />
          <textarea
            placeholder="Encrypted Message"
            rows={10}
            className="w-full p-3 mb-6 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setEncryptedMessage(e.target.value)}
          />
          <button
            onClick={decryptAndVerify}
            className="mb-6 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300"
          >
            Decrypt & Verify
          </button>
          <h3 className="text-lg font-semibold mb-2">Decrypted Message:</h3>
          <textarea
            readOnly
            rows={5}
            value={decryptedMessage || ""}
            placeholder="Decrypted message will appear here."
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
