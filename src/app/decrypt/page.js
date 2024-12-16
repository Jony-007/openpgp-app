"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import * as openpgp from "openpgp";

export default function DecryptPage() {
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [encryptedMessage, setEncryptedMessage] = useState("");
  const [decryptedMessage, setDecryptedMessage] = useState("");
  const [signatureVerified, setSignatureVerified] = useState(null);

  const decryptAndVerify = async () => {
    try {
      setSignatureVerified(null); // Reset state before new verification

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

      setDecryptedMessage(decrypted);
      const verified = await signatures[0]?.verified;
      setSignatureVerified(
        verified ? "Signature VERIFIED ✅" : "Signature verification FAILED ❌"
      );
    } catch (error) {
      setDecryptedMessage("Error decrypting message.");
      setSignatureVerified(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex items-center justify-center min-h-[90vh]">
        <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6">
            Decrypt & Verify Message
          </h1>
          <textarea
            placeholder="Your Private Key"
            rows={5}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            onChange={(e) => setPrivateKey(e.target.value)}
          />
          <textarea
            placeholder="Sender's Public Key"
            rows={5}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            onChange={(e) => setPublicKey(e.target.value)}
          />
          <textarea
            placeholder="Encrypted Message"
            rows={10}
            className="w-full p-3 mb-6 border border-gray-300 rounded-lg"
            onChange={(e) => setEncryptedMessage(e.target.value)}
          />
          <button
            onClick={decryptAndVerify}
            className="w-full px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition duration-300"
          >
            Decrypt & Verify
          </button>
          {signatureVerified && (
            <p
              className={`mt-4 text-lg font-semibold ${
                signatureVerified.includes("FAILED")
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {signatureVerified}
            </p>
          )}
          <h3 className="text-lg font-semibold mt-4 mb-2">
            Decrypted Message:
          </h3>
          <textarea
            readOnly
            rows={5}
            value={decryptedMessage || ""}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
