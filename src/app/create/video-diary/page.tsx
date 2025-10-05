"use client";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { LandingPage } from "@/components/layout/landing-page";

const videoDiary = () => {
  return (
    <div className="relative min-h-screen w-full bg-white overflow-hidden bg-[#e9e1e5]">
      <Header />

      <LandingPage
        heroTextProps={{
          normalText: "Your Modern Day",
          standoutText: "Video Journal.",
          tagline:
            "See those smile wrinkles. Create your own personal video diary for your eyes only.",
        }}
        displayImageProps={{
          relativeUrl: "/assets/landing-pages/video-diary.png",
        }}
        secondaryHeroTextProps={{
          normalText: "A Video Diary to",
          standoutText: "visualise your progress",
        }}
        descriptionPropOne={{
          title: "Pause, Capture & Reflect",
          description:
            "Capsules was created to modernise journaling. There is immense power in reflecting and writing down your own thoughts, no matter if you are in a state of celebration, sadness, lostness or calmness. In a social media world with people posting content in search of affirmations, we need to leverage technology to allow people to journal in a new form — through a video-diary. Ever looked or rehearsed in a mirror before a presentation? It feels awkward, doesn't it? Are you comfortable with who you are? Now look again in the mirror and see that glint in your eye. Maybe it presents itself as a shy smile. We all have it. Capsules.today is a video-diary and journaling tool that allows you to record videos with intent — it's just you talking to the camera, creating a personal time capsule. We exist to help you have a conversation with yourself, build your own video-diary, and become comfortable with who you are.",
        }}
        descriptionPropTwo={{
          title: "Securely capsuled until its unlocked",
          description:
            "When you capsule unlocks, we'll send your recording back to you. Your encrypted video-diary entry will never be shared with anyone else, so feel empowered to record your feelings, your thoughts, and your goals with intent. Or use your video-diary to hold yourself accountable, set milestones, and see your progress in ways a written journal never could. A traditional diary does not allow you to see the wrinkles of joy on your face when you note down that new job offer. A video-diary brings that emotion back to life. Capsules.today takes you back to that very moment, capturing more than just words — capturing you. Time moves fast — where will your video-diary say you are in a year's time?",
        }}
        clickToAction={{
          href: "/",
          buttonText: "Diary Now",
        }}
      />
      <Footer />
    </div>
  );
};

export default videoDiary;
