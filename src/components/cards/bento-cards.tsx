"use client";

import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/ui/animated-list";
import Link from "next/link";

interface Item {
  name: string;
  description: string;
  link: string;
}

const notifications = [
  {
    name: "New Years Resolutions",
    description: "I want to achieve these 2025 goals",
    link: "/create/life-story"
  },
  {
    name: "Modernised Journalling ",
    description: "How are you feeling, really?",
    link: "/create/hobby"
  },
  {
    name: "Goal Setting with Accountability",
    description: "One year from now, I'll be proud",
    link: "/create/goal-setting"
  },
  {
    name: "Share your Journey",
    description: "Seal your story, share it later",
    link: "/create/sharing"
  },
  {
    name: "Create your Modern Diary",
    description: "Pause, Capture & Reflect",
    link: "/create/video-diary"
  }
];

const Notification = ({ name, description, link }: Item) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[500px] cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
      )}
    >
      <Link href={link} className="hover:opacity-50">
        <div className="flex flex-row items-center gap-3">
          <div className="flex flex-col overflow-hidden flex-grow">
            <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white">
              <span className="text-sm sm:text-lg">{name}</span>
            </figcaption>
            <p className="text-sm font-normal dark:text-white/60">
              {description}
            </p>
          </div>

          <div
            className="flex size-10 items-center justify-center rounded-2xl ml-auto"
            style={{
              border: `1px solid rgb(255, 255, 255)`,
              backgroundColor: "#42a4c9",
            }}
          >
            <span className="text-lg text-white">→</span>
          </div>
        </div>
      </Link>
    </figure>
  );
};

export function AnimatedListView({
  className,
  title,
}: {
  className?: string;
  title?: string;
}) {
  return (
    <div
      className={cn(
        "w-full relative flex w-full flex-col p-6 overflow-hidden",
        className
      )}
    >
      <div className="flex justify-center w-full mb-4">
        <h2 className="text-3xl font-bold">{title}</h2>
      </div>
      <AnimatedList>
        {notifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>
    </div>
  );
}
