"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import useInterval from "react-useinterval";
import { ChevronLeft, ChevronRight } from "./icons";
const quotes = [
  {
    image: "https://i.pravatar.cc/80?img=1",
    text: `"Saying 'just center it horizontally' is the fastest way to make a frontend developer cry."`,
    name: "Chris Borders",
    roleCompany: "UI/UX Designer at NetscapeGoat",
  },
  {
    image: "https://i.pravatar.cc/80?img=2",
    text: `"JavaScript is like a toddler. Sometimes brilliant, sometimes throwing errors for no reason."`,
    name: "Elon Musketeer",
    roleCompany: "Chief Meme Officer at SpaceFlexbox",
  },
  {
    image: "https://i.pravatar.cc/80?img=4",
    text: `"I told my browser to embrace its errors. Now it's a motivational speaker."`,
    name: "Krisina Boxmodel",
    roleCompany: "Lead spacing engineer at Margin Collapse Inc.",
  },
  {
    image: "https://i.pravatar.cc/80?img=5",
    text: `"Why did the CSS go to therapy? Because it couldn't deal with its parent issues!"`,
    name: "Sarah Overflow",
    roleCompany: "Senior Flexbox Therapist at CSS Grid Clinic",
  },
];
export default function SimpleSlider() {
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);
  const lastQuoteIndex = quotes.length - 1;
  const [isPaused, setIsPaused] = useState(false);
  const [speed] = useState(4000);

  const next = () => {
    setActiveQuoteIndex((currentQuote) =>
      currentQuote >= lastQuoteIndex ? 0 : currentQuote + 1
    );
  };

  const previous = () => {
    setActiveQuoteIndex((currentQuote) =>
      currentQuote === 0 ? lastQuoteIndex : currentQuote - 1
    );
  };

  useInterval(
    () => {
      // See note in the lesson on why we use requestAnimationFrame here.
      window.requestAnimationFrame(next);
    },
    isPaused ? null : speed
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pb-4">
      <motion.div
        onPointerEnter={() => setIsPaused(true)}
        onPointerLeave={() => setIsPaused(false)}
        className="bg-white text-black relative rounded-2xl py-5 px-12 w-[400px] max-w-full"
      >
        <div className="flex justify-center">
          {quotes.map((quote, index) => (
            <motion.img
              key={index}
              variants={{
                active: {
                  scale: 1.2,
                  zIndex: 10,
                },
                hidden: {
                  scale: 1,
                  zIndex: 0,
                },
                paused: {
                  scale: 0.9,
                  filter: "grayscale(1)",
                },
                playing: {
                  filter: "grayscale(0)",
                },
              }}
              animate={[
                activeQuoteIndex === index ? "active" : "hidden",
                isPaused ? "paused" : "playing",
              ]}
              className="rounded-full -mx-2 relative border border-black w-12 h-12"
              src={quote.image}
            />
          ))}
        </div>
        <div className="grid mt-3 text-center">
          {quotes.map((quote, index) => (
            <motion.blockquote
              variants={{
                active: {
                  y: 0,
                  opacity: 1,
                },
                hidden: {
                  y: 20,
                  opacity: 0,
                },
              }}
              key={index}
              initial="hidden"
              animate={activeQuoteIndex === index ? "active" : "hidden"}
              className="[grid-area:1/1] relative text-black"
            >
              <p className="text-foreground">{quote.text}</p>
              <p className="font-bold mt-3 text-sm text-black">
                {quote.name} - {quote.roleCompany}
              </p>
            </motion.blockquote>
          ))}
        </div>
        <motion.button
          onClick={previous}
          variants={{
            paused: {
              x: 0,
              opacity: 1,
            },
            playing: {
              x: -20,
              opacity: 0,
            },
          }}
          animate={isPaused ? "paused" : "playing"}
          className="absolute top-1/2 left-0 block px-3"
        >
          <ChevronLeft /> <span className="sr-only">Previous</span>
        </motion.button>
        <motion.button
          onClick={next}
          variants={{
            paused: {
              x: 0,
              opacity: 1,
            },
            playing: {
              x: 20,
              opacity: 0,
            },
          }}
          animate={isPaused ? "paused" : "playing"}
          className="absolute top-1/2 right-0 block px-3"
        >
          <ChevronRight /> <span className="sr-only">Next</span>
        </motion.button>
      </motion.div>
    </div>
  );
}
