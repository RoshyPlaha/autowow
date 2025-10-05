"use client";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { LandingPage } from "@/components/layout/landing-page";

const hobby = () => {
  return (
    <div className="relative min-h-screen w-full bg-white overflow-hidden bg-[#e9e1e5]">
      <Header />

      <LandingPage
        heroTextProps={{
          normalText: "Share your journey",
          standoutText: "Seal Your Story",
          tagline:
            "Capture moments of joy now and share them with your future self and your closest friends and family.",
        }}
        displayImageProps={{
          relativeUrl: "/assets/landing-pages/sharing-feature.png",
        }}
        secondaryHeroTextProps={{
          normalText: "A Video Diary to",
          standoutText: "Express Yourself",
        }}
        descriptionPropOne={{
          title: "Share your future story",
          description:
            "Capsules.today reimagines journaling for the video age. It’s not about likes or comments—it’s about you. Record honest moments, raw reflections, and future hopes by simply speaking to the camera. Whether you're celebrating, grieving, lost, or at peace, your thoughts deserve to be remembered—and shared with intent. Start capsuling videos in a time capsule, and let your future self—or your family and friends—revisit your journey, exactly as it was. Speak your goals out loud. Capture your growth. Smile at your own shy glint in the lens. Capsules.today is your private space to reflect, then choose: keep it personal, or share your videos with family and friends when the time is right. Because the wrinkles of joy, the tears, and the laughter deserve more than words on a page. They deserve to be seen again—capsuled in time.",
        }}
        descriptionPropTwo={{
          title: "Encrypted. Secure. Intimate.",
          description:
          "📹 Capsule your story 🎁 Share videos with family and friends ⏳ Receive them in the future, just when they matter most."
        }}
        clickToAction={{
          href: "/",
          buttonText: "Share Now",
        }}
      />
      <Footer />
    </div>
  );
};

export default hobby;
