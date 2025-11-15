"use client";

import { useEffect, useMemo, useState } from "react";

const examplePrompts = [
  "show me all petrol manual cars from before 2017 and less than 20,000 miles",
  "I need a budget car between £5000-£10000 thats newer than 2019",
  "all electric cars newer than 2018 and under £30000",
];

export const DisplayExamplePrompt = () => {
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [displayedPrompt, setDisplayedPrompt] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const typingDelay = useMemo(() => (isDeleting ? 35 : 80), [isDeleting]);
  const pauseBeforeDelete = 1800;
  const pauseBeforeNext = 600;

  useEffect(() => {
    const fullPrompt = examplePrompts[currentPromptIndex];

    if (!isDeleting && displayedPrompt === fullPrompt) {
      const pause = setTimeout(() => setIsDeleting(true), pauseBeforeDelete);
      return () => clearTimeout(pause);
    }

    if (isDeleting && displayedPrompt.length === 0) {
      const pause = setTimeout(() => {
        setIsDeleting(false);
        setCurrentPromptIndex((prev) => (prev + 1) % examplePrompts.length);
      }, pauseBeforeNext);
      return () => clearTimeout(pause);
    }

    const timeout = setTimeout(() => {
      const nextText = isDeleting
        ? fullPrompt.slice(0, displayedPrompt.length - 1)
        : fullPrompt.slice(0, displayedPrompt.length + 1);

      setDisplayedPrompt(nextText);
    }, typingDelay);

    return () => clearTimeout(timeout);
  }, [
    currentPromptIndex,
    displayedPrompt,
    isDeleting,
    pauseBeforeDelete,
    pauseBeforeNext,
    typingDelay,
  ]);

  return (
    <div className="flex flex-col items-center justify-center text-center font-merriweather py-12">
      <div className="mt-4 inline-flex max-w-xl items-center gap-2 px-4 py-2 text-sm">
        <span className="font-mono text-green-700 bg-green-50 px-2 py-1 rounded-md shadow-sm">
          {displayedPrompt}
          <span className="typing-cursor ml-1 inline-block w-1 bg-blue-900" />
        </span>
      </div>
    </div>
  );
};
