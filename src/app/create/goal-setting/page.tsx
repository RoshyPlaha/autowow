"use client";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { LandingPage } from "@/components/layout/landing-page";

const GoalSetting = () => {
  return (
    <div className="relative min-h-screen w-full bg-white overflow-hidden bg-[#e9e1e5]">
      <Header />

      <LandingPage
        heroTextProps={{
          normalText: "Goal Setting with",
          standoutText: "Accountability.",
          tagline:
            "One year from now, I’ll be watching my capsule and I will make myself proud.",
        }}
        displayImageProps={{
          relativeUrl: "/assets/landing-pages/hobby-skater.png",
        }}
        secondaryHeroTextProps={{
          normalText: "A Video Diary to",
          standoutText: "set your goals",
        }}
        descriptionPropOne={{
          title: "Record, Roll & Reflect",
          description:
            "There’s something powerful about recording a new hobby or recording a new skill — not just the act of doing it, but the process of watching yourself grow. Whether you’re learning the guitar, trying your hand at baking, or speaking a new language for the first time, Capsules lets you capture the unpolished beginnings and the proud breakthroughs in your own words and expressions. In a world obsessed with polished performances, recording a new skill or recording a new hobby in a private, intentional video-diary helps shift the focus back to what really matters: your personal progress.",
        }}
        descriptionPropTwo={{
          title: "Securely capsuled until its unlocked",
          description:
            "Capsules.today is a tool for self-reflection and momentum. When you start recording a new hobby, you’re not just logging your actions — you're making a promise to keep going. When you're recording a new skill, you're creating a visual record of effort, learning, and change. These videos become honest check-ins, not performances. They capture the hesitation before the first try, the laughter at small mistakes, and the moment you finally get it right. A notebook can’t show you that spark in your eye — but a video-diary can. Start recording a new hobby, start recording a new skill — and let your future self witness how far you've come.",
        }}
        clickToAction={{
          href: "/",
          buttonText: "Progress Now",
        }}
      />
      <Footer />
    </div>
  );
};

export default GoalSetting;
