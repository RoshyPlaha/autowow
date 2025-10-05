"use client";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { LandingPage } from "@/components/layout/landing-page";

const LifeStory = () => {
  return (
    <div className="relative min-h-screen w-full bg-white overflow-hidden bg-[#e9e1e5]">
      <Header />

      <LandingPage
        heroTextProps={{
          normalText: "Share Your",
          standoutText: "Life Story",
          tagline:
            "Your story deserves to be heard. Record and share your life story with your family today.",
        }}
        displayImageProps={{
          relativeUrl: "/assets/landing-pages/selfie-grandpa.png",
        }}
        secondaryHeroTextProps={{
          normalText: "Your life story preserved ",
          standoutText: "for generations",
        }}
        descriptionPropOne={{
          title: "No need for editing, just your raw story",
          description:
            "Your life story was born out of a desire to keep these family memories alive. As age creeps up and illnesses such as Alzheimer's and Dementia take hold, create small recordings of your life story and share then with family and friends for a pre-selected time in the future. At Capsules.today, we believe your life story is a gift — one that your loved ones will treasure forever. With our encrypted video-diary capsules, you can record and preserve your thoughts, memories, and emotions, just as they are today. When your capsule unlocks, your recordings will be delivered to your family, bringing your voice, your face, and your spirit back to them.",
        }}
        descriptionPropTwo={{
          title: "Everyone has a story that matters. Yours is no exception.",
          description:
            "Unlike a traditional diary, a video-diary captures more than words. It preserves the sparkle in your eyes when you talk about meeting your partner, the emotion in your voice when recalling the birth of your child, or the wisdom in your tone as you reflect on life’s journey. It’s not just storytelling — it’s you, alive in the moment. Time moves fast. What will you want your family to hear, see, and remember a year from now? Start sharing your life story today — for them, for you, and for the future.",
        }}
        clickToAction={{
          href: "/",
          buttonText: "Preserve Now",
        }}
      />
      <Footer />
    </div>
  );
};

export default LifeStory;
