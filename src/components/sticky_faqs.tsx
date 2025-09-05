"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const faqs = [
  {
    id: 1,
    question: "What is the best way to learn React?",
    answer:
      "The best way to learn React is to start with the basics and work your way up. ",
  },
  {
    id: 2,
    question: "What is the best way to learn React?",
    answer:
      "The best way to learn React is to start with the basics and work your way up.",
  },
  {
    id: 3,
    question: "What is the best way to learn React?",
    answer:
      "The best way to learn React is to start with the basics and work your way up.",
  },
  {
    id: 4,
    question: "What is the best way to learn React?",
    answer:
      "The best way to learn React is to start with the basics and work your way up.",
  },
  {
    id: 5,
    question: "What is the best way to learn React?",
    answer:
      "The best way to learn React is to start with the basics and work your way up.",
  },
];

interface AnimatedNumberProps {
  value: number;
  className?: string;
  maxValue?: number;
}

function AnimatedNumber({
  value,
  className = "",
  maxValue = 5,
}: AnimatedNumberProps) {
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  });

  // Calculate the translateY based on the current value
  // Each number takes 120px height, so we translate by -(value-1) * 120px
  const translateY = useTransform(springValue, (current) => {
    return `${-(current - 1) * 120}px`; // -120px for each step down
  });

  useEffect(() => {
    // Add a small delay before changing the number
    const timeoutId = setTimeout(() => {
      motionValue.set(value);
    }, 50); // 150ms delay

    return () => clearTimeout(timeoutId);
  }, [value, motionValue]);

  // Generate all numbers from 1 to maxValue
  const allNumbers = Array.from({ length: maxValue }, (_, i) => i + 1);

  return (
    <div
      className="relative overflow-hidden inline-block"
      style={{ height: "120px" }}
    >
      <motion.div
        style={{
          translateY: translateY,
        }}
        className="flex flex-col"
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {allNumbers.map((number) => (
          <span
            key={number}
            className={`${className} flex items-center`}
            style={{ height: "120px" }}
          >
            {number}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function ProgressBar({ isActive }: { isActive: boolean }) {
  return (
    <div className="w-full h-px bg-gray-700 bg-opacity-30 mb-4  md:mb-8">
      <motion.div
        className="h-full bg-gray-200"
        initial={{ width: "0%" }}
        animate={{ width: isActive ? "100%" : "0%" }}
        transition={{
          duration: 0.9,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

function FaqItem({
  faq,
  index,
  faqRefs,
  isActive,
}: {
  faq: any;
  index: number;
  faqRefs: any;
  isActive: boolean;
}) {
  return (
    <div
      className="w-full"
      ref={(el) => {
        faqRefs.current[index] = el;
      }}
    >
      <ProgressBar isActive={isActive} />
      <div className="items-center justify-start gap-0 flex md:hidden text-4xl sm:text-5xl leading-[120px] font-bold">
        <span>{(index + 1).toString().padStart(2, "0")}</span>
      </div>
      <h3 className="lg:text-6xl text-4xl font-bold mb-10">{faq.question}</h3>
      <p className="lg:text-5xl text-3xl">{faq.answer}</p>
    </div>
  );
}

export default function StickyFAQs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const faqRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      // Find which FAQ is currently at the top of the viewport
      let currentIndex = 0;

      faqRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();

          // Check if this FAQ is at or near the top of the viewport
          // We want to detect when the FAQ reaches the top of the sticky container area
          if (rect.top <= 400) {
            // 200px from top (where sticky container is positioned)
            currentIndex = index;
          }
        }
      });

      console.log("Active FAQ index:", currentIndex + 1); // Debug log
      setActiveIndex(currentIndex);
    };

    // Initial check
    handleScroll();

    // Add scroll listener with throttling for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, []);
  return (
    <section className="w-full py-16 lg:py-24">
      <div className="w-full container max-w-[1568px] mx-auto px-4">
        <h2 className=" text-left after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1/2 after:h-[1px] after:bg-gray-200 text-5xl font-bold mb-16 lg:mb-40 md:mb-28">
          Sticky FAQs
        </h2>
        <div className="w-full relative grid gap-x-20 gap-y-16 md:auto-cols-[1fr] md:grid-cols-[max-content_1fr] items-start">
          <div className="sticky top-[20%] overflow-hidden  h-[120px] hidden md:flex">
            {faqs.length < 10 && (
              <span className=" text-7xl lg:text-9xl leading-[120px] font-bold">
                0
              </span>
            )}
            <div className="animate_number">
              <AnimatedNumber
                value={activeIndex + 1}
                className=" text-7xl lg:text-9xl leading-[120px] font-bold"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-16 md:gap-y-28 lg:gap-y-40">
            {faqs.map((faq, index) => (
              <FaqItem
                key={faq.id}
                faq={faq}
                index={index}
                faqRefs={faqRefs}
                isActive={index === activeIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
