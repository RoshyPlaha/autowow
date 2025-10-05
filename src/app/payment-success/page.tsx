"use client";
import { useEffect, useState, useRef } from "react";

import type { ConfettiRef } from "@/components/ui/confetti";
import { Confetti } from "@/components/ui/confetti";

import { Header } from "@/components/layout/header";
import sendConfirmationCustomerEmail from "@/lib/customer-email";

export default function Page({}) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const confettiRef = useRef<ConfettiRef>(null);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      setFileName(urlParams.get("fileName"));
      setEmail(urlParams.get("email"));
    }
  }, []);

  useEffect(() => {
    const confirmCapsule = async () => {
      if (!fileName || !email) return;

      try {
        const response = await fetch(`/api/confirm-capsule`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ fileName, email }),
        });

        const data = await response.json();
        if (response.status === 200) {
          setSuccessMessage(data.message);
          await sendConfirmationCustomerEmail(email, fileName);
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        console.error("Error confirming capsule:", error);
        setErrorMessage(
          "Payment is confirmed but your capsule is not. DW we're looking into it"
        );
      }
    };

    confirmCapsule();
  }, [fileName, email]);

  return (
    <div className="relative min-h-screen w-full bg-[#fafafa] overflow-hidden">
      <Header />
      <div>
        {errorMessage && <div>{errorMessage}</div>}
        {successMessage && (
          <>
            <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg pt-16 mb-16">
              <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
                {successMessage}
              </span>
              <Confetti
                ref={confettiRef}
                className="absolute left-0 top-0 z-0 size-full"
                onMouseEnter={() => {
                  confettiRef.current?.fire({});
                }}
              />
              <h5 className="flex-col items-center justify-center pt-16 pb-16">
                We&apos;ll email you when your capsule is ready to view ⏳
              </h5>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
