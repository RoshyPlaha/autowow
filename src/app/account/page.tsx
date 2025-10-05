"use client";

import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { DashboardView } from "@/components/dashboard/dashboard-view";
import LoginForm from "@/components/auth/login-form";
import { emitAuthStatusChange } from "@/lib/auth-events";
import { RainbowButton } from "@/components/ui/rainbow-button";
import RecordUser from "@/components/record/record-user";
import { Footer } from "@/components/layout/footer";
import { BorderCard } from "@/components/ui/border-card";
import { NeonGlow } from "@/components/ui/neon-glow";

export default function Account() {
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRecorder, setShowRecorder] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const tokenExpiry = localStorage.getItem("tokenExpiry");

    if (token && tokenExpiry && Date.now() < parseInt(tokenExpiry)) {
      setIsLoggedIn(true);
      setEmail(localStorage.getItem("userEmail") || "");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    emitAuthStatusChange(false);
  };

  if (isLoggedIn) {
    return (
      <>
        {showRecorder ? (
          <div className="flex items-center justify-center min-h-screen">
            <BorderCard className="w-full h-[calc(100vh-90px)] mx-auto flex items-center justify-center rounded-2xl">
              <div className="w-full h-full flex items-center justify-center">
                {showRecorder ? (
                  <RecordUser
                    onClose={() => setShowRecorder(false)}
                    setSubmitted={setSubmitted}
                    isNewUser={false}
                  />
                ) : (
                  <div className="text-center text-black">
                    {submitted
                      ? "Your capsule is nearly saved. Verify your email to lock-it away. If you dont verify in 7 days, we'll delete your video"
                      : "Click 'Record now' to save a capsule 🚀"}
                  </div>
                )}
              </div>
            </BorderCard>
          </div>
        ) : (
          <div className="relative min-h-screen w-full bg-white overflow-hidden bg-[#e9e1e5] ">
            <Header />

            <div className="flex justify-end mt-4 pr-4 pt-4">
              <Button onClick={handleLogout}>Logout</Button>
            </div>
            <div className="flex justify-center mb-4 pr-4 pt-4">
              <RainbowButton onClick={() => setShowRecorder(true)}>
                Create New Capsule
              </RainbowButton>
            </div>
            <DashboardView email={email} />
          </div>
        )}
      </>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <Header />
      <NeonGlow 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"
                  size={300}
                  color="#b366ff"
                  blur={80}
                />
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <LoginForm setIsLoggedIn={setIsLoggedIn} setEmail={setEmail} />
      </div>
      <Footer />
    </div>
  );
}
