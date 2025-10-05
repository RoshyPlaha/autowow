"use client";

import { useState, useEffect } from "react";
import { countdownToExpirationInDays } from "@/lib/date-parser";
import { BorderBeam } from "@/components/ui/border-beam";
import { CapsuleDetails } from "../../../shared_objects/capsule-details";

interface DashboardViewProps {
  email: string;
}

export const DashboardView = ({ email }: DashboardViewProps) => {
  const [capsules, setCapsules] = useState<CapsuleDetails[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchCapsules = async () => {
      try {
        const response = await fetch(`/api/capsules?email=${email}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await response.json();
        setCapsules(data.capsules);

        if (!response.ok) {
          setErrorMessage(data.message || "Error fetching capsules");
        } else {
          setCapsules(data.capsules);
        }
      } catch (error) {
        console.error(error);
        setErrorMessage("An error occurred during login");
      }
    };
    fetchCapsules();
  }, [email]);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="max-w-4xl w-full p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Welcome</h1>
        <h4 className="text-red-500">{errorMessage}</h4>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Your Capsules</h2>
          {capsules.map((capsule) => (
            <div
              key={capsule.expirationDate}
              className="relative flex h-[200px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl"
            >
              <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-2xl font-semibold leading-none ">
                <p>
                  {capsule.prettyFileName
                    ? capsule.prettyFileName
                    : capsule.fileName}{" "}
                  capsule unlocks in{" "}
                  {countdownToExpirationInDays(capsule.expirationDate)} days
                </p>
              </span>
              <BorderBeam size={250} duration={12} delay={9} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
