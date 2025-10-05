"use client";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import Meteors from "@/components/ui/meteors";
import { RainbowText } from "@/components/ui/rainbow-text";

export default function Page() {
  return (
    <div
      id="top"
      className="relative min-h-screen w-full bg-[#fafafa] overflow-hidden"
    >
      <Header />
      <Meteors number={20} />
      <div className="flex flex-col md:flex-row min-h-screen pt-20 md:pt-0 px-4 space-y-4 md:space-y-0 md:space-x-4">
        <div className="max-w-1xl mx-auto text-center px-8 py-6 leading-relaxed">
          <div className="flex flex-col p-6 mx-auto w-full max-w-[700px] self-start">
            <RainbowText normalText="About " standoutText="capsules.today" />
          </div>{" "}
          <p className="text-lg">
            Our vision statement. Crafted in early Spring 2025.
          </p>
          <p className="text-xs md:text-sm pt-4 text-left text-gray-600">
            Capsules was created to modernise journaling and create memories for
            you to share with loved ones. Not now - but in the future. There is
            immense power in reflecting and writing down your own thoughts, no
            matter if you are in a state of celebration, sadness, lostness or
            calmness.
            <br />
            <br />
            In a social media world with people posting content in search of
            affirmations - we need to leverage technology to allow people to
            journal in a new form. Ever wanted to leave a message for a loved
            one? Ever looked or rehearsed in a mirror before a presentation? It
            feels awkward doesn&apos;t it? Are you comfortable with who you are?
            Now look again in the mirror and see that glint in your eye. Maybe
            it presents itself as a shy smile. We all have it. Capsules.today is
            a video journaling tool that allows you to record videos with intent
            - it&apos;s just you talking to the camera. We exist to help you
            have share memories with yourself and loved ones.
            <br />
            <br />
            After an elapsed period of time, we&apos;ll send your recording.
            Your encrypted video will never be shared with anyone else, so feel
            empowered to record your feelings & goals with intent. Or hold
            yourself accountable to set goals and see your progress. A
            traditional diary does not allow you to see the wrinkles of joy on
            your face when you note down that new job offer or you&apos;ve just
            become a parent. Capsules.today takes you back to that moment. Time
            moves fast - where will you be in a year&apos;s time?
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
