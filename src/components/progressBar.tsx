"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { useState } from "react";

export default function ProgressBar({ className }: { className: string }) {
  const { scrollYProgress, scrollY, scrollXProgress, scrollX } = useScroll();

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [xProgress, setXProgress] = useState(0);
  const [yProgress, setYProgress] = useState(0);
  const scaleX = useSpring(scrollYProgress);

  useMotionValueEvent(scrollX, "change", (x) => setX(x));
  useMotionValueEvent(scrollY, "change", (y) => setY(y));
  useMotionValueEvent(scrollXProgress, "change", (xp) => setXProgress(xp));
  useMotionValueEvent(scrollYProgress, "change", (yp) => setYProgress(yp));
  return (
    <div>
      <div className="fixed w-full left-0 z-50 top-0 p-2">
        <motion.div
          style={{ scaleX }}
          className={`h-3 w-full  origin-left ${className}`}
        />
      </div>
      <div className="fixed top-10 right-10 ">
        x: {x} <br />
        y: {y} <br />
        xProgress: {xProgress} <br />
        yProgress: {yProgress} <br />
      </div>
    </div>
  );
}
