"use client";

import { motion, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function StickyButton({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollWhenDivEntered, setScrollWhenDivEntered] = useState<
    number | null
  >(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const isInViewport = rect.top <= window.innerHeight && rect.bottom >= 0;
        const currentScroll = scrollY.get();
        const isScrollingDown = currentScroll > lastScrollY;

        // When div first enters viewport, record the scroll position
        if (isInViewport && scrollWhenDivEntered === null) {
          setScrollWhenDivEntered(currentScroll);
        }

        // Reset when div leaves viewport
        if (!isInViewport) {
          setScrollWhenDivEntered(null);
          setIsVisible(false);
          setLastScrollY(currentScroll);
          return;
        }

        // Show/hide button based on div position
        if (isInViewport) {
          const topAtMiddle = rect.top <= window.innerHeight / 2;
          const bottomAtMiddle = rect.bottom <= window.innerHeight / 2;

          // Button is visible when div is in the middle area of screen
          setIsVisible(topAtMiddle && !bottomAtMiddle);
        } else {
          setIsVisible(false);
        }

        setLastScrollY(currentScroll);
      }
    };

    // Initial check
    handleScroll();

    // Listen to scroll updates
    const unsubscribe = scrollY.on("change", handleScroll);

    return () => {
      unsubscribe();
    };
  }, [scrollY, scrollWhenDivEntered, lastScrollY]);

  return (
    <div
      ref={containerRef}
      className="w-full flex items-end justify-center h-full m-0 pointer-events-none absolute top-0 left-0 z-50"
    >
      <div className="w-full sticky bottom-8 mt-8 mb-24 flex items-center justify-center">
        <motion.div
          initial={{
            opacity: 0,
            transform: "matrix(0.3, 0.5, -0.5, 0.3, 0, 0)",
          }}
          animate={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible
              ? "matrix(1, 0, 0, 1, 0, 0)"
              : "matrix(0.3, 0.5, -0.5, 0.3, 0, 0)",
          }}
          transition={{
            duration: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
