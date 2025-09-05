"use client";

import { useEffect, useState } from "react";

interface Logo {
  id: number;
  name: string;
  url: string;
  width: number;
  height: number;
}

// Sample logo data - you can replace these with actual logo URLs
const sampleLogos: Logo[] = [
  { id: 1, name: "Logo 1", url: "/next.svg", width: 120, height: 60 },
  { id: 2, name: "Logo 2", url: "/vercel.svg", width: 100, height: 50 },
  { id: 3, name: "Logo 3", url: "/file.svg", width: 80, height: 80 },
  { id: 4, name: "Logo 4", url: "/globe.svg", width: 90, height: 90 },
  { id: 5, name: "Logo 5", url: "/window.svg", width: 110, height: 70 },
  { id: 6, name: "Logo 6", url: "/next.svg", width: 95, height: 45 },
  { id: 7, name: "Logo 7", url: "/vercel.svg", width: 85, height: 55 },
  { id: 8, name: "Logo 8", url: "/file.svg", width: 75, height: 75 },
  { id: 9, name: "Logo 9", url: "/globe.svg", width: 105, height: 65 },
  { id: 10, name: "Logo 10", url: "/window.svg", width: 88, height: 88 },
  { id: 11, name: "Logo 11", url: "/next.svg", width: 115, height: 58 },
  { id: 12, name: "Logo 12", url: "/vercel.svg", width: 92, height: 48 },
  { id: 13, name: "Logo 13", url: "/file.svg", width: 78, height: 78 },
  { id: 14, name: "Logo 14", url: "/globe.svg", width: 98, height: 68 },
  { id: 15, name: "Logo 15", url: "/window.svg", width: 82, height: 82 },
];

interface LogoPosition {
  x: number;
  y: number;
  rotation: number;
  scale: number;
  width: number;
  height: number;
}

export default function LogosGallery() {
  const [logoPositions, setLogoPositions] = useState<LogoPosition[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [containerSize, setContainerSize] = useState({
    width: 800,
    height: 600,
  });

  // Check if two rectangles overlap
  const checkOverlap = (rect1: LogoPosition, rect2: LogoPosition) => {
    const margin = 30; // Margin between logos
    return !(
      rect1.x + rect1.width + margin < rect2.x ||
      rect2.x + rect2.width + margin < rect1.x ||
      rect1.y + rect1.height + margin < rect2.y ||
      rect2.y + rect2.height + margin < rect1.y
    );
  };

  // Generate random positions for logos without overlap
  const generateRandomPositions = () => {
    const positions: LogoPosition[] = [];
    const maxAttempts = 1000; // Prevent infinite loops
    const margin = 40; // Margin from container edges
    const containerWidth = containerSize.width - margin * 2; // Account for margins
    const containerHeight = containerSize.height - margin * 2; // Account for margins

    sampleLogos.forEach((logo, index) => {
      let attempts = 0;
      let position: LogoPosition = {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        width: 100,
        height: 100,
      };
      let hasOverlap = true;

      while (hasOverlap && attempts < maxAttempts) {
        const scale = 1; // All logos same size
        const scaledWidth = logo.width * scale + 32; // Add padding
        const scaledHeight = logo.height * scale + 32; // Add padding

        position = {
          x: margin + Math.random() * (containerWidth - scaledWidth),
          y: margin + Math.random() * (containerHeight - scaledHeight),
          rotation: 0, // No rotation
          scale,
          width: scaledWidth,
          height: scaledHeight,
        };

        // Check for overlap with existing positions
        hasOverlap = positions.some((existingPos) =>
          checkOverlap(position, existingPos)
        );

        attempts++;
      }

      // If we couldn't find a non-overlapping position, place it anyway
      if (attempts >= maxAttempts) {
        position = {
          x: margin + Math.random() * (containerWidth - 150),
          y: margin + Math.random() * (containerHeight - 150),
          rotation: 0, // No rotation
          scale: 1, // All logos same size
          width: 150,
          height: 150,
        };
      }

      positions.push(position);
    });

    setLogoPositions(positions);
  };

  // Update container size and mobile state on resize
  useEffect(() => {
    const updateContainerSize = () => {
      const container = document.querySelector(".logos-container");
      if (container) {
        const rect = container.getBoundingClientRect();
        setContainerSize({ width: rect.width, height: rect.height });
      }
      // Check if we're on mobile (below 768px)
      setIsMobile(window.innerWidth < 768);
    };

    updateContainerSize();
    window.addEventListener("resize", updateContainerSize);
    return () => window.removeEventListener("resize", updateContainerSize);
  }, []);

  // Scroll detection for position switching
  useEffect(() => {
    const handleScroll = () => {
      const container = document.querySelector(".logos-container");
      if (container) {
        const rect = container.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const isInMiddle =
          rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2;

        // Only trigger once per scroll session
        if (isInMiddle && !isScrolled && !hasTriggered) {
          setIsScrolled(true);
          setHasTriggered(true);
          handleScrollAnimation();
        } else if (!isInMiddle && isScrolled) {
          setIsScrolled(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled, hasTriggered]);

  useEffect(() => {
    if (containerSize.width > 0 && containerSize.height > 0) {
      generateRandomPositions();
      setIsLoaded(true);
    }
  }, [containerSize]);

  const handleScrollAnimation = () => {
    setIsAnimating(true);
    // Keep the animation state true so logos stay scaled
  };

  return (
    <div className="w-full py-16">
      <div className="container max-w-7xl mx-auto px-7">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Logo Gallery</h2>
          <p className="text-gray-600 mb-8">
            A randomly arranged collection of logos with organic positioning
          </p>
        </div>

        <div
          className={`relative min-h-[600px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 overflow-hidden logos-container transition-all duration-500`}
        >
          {/* Logos */}
          <div className="relative z-10">
            {isMobile ? (
              // Mobile grid layout (2 columns) - no absolute positioning
              <div className="grid grid-cols-2 gap-6">
                {sampleLogos.map((logo, index) => {
                  const isEven = index % 2 === 0;
                  const offset = isEven ? "mt-4" : "-mt-4"; // Alternate up/down offset

                  return (
                    <div
                      key={logo.id}
                      className={`${offset} ${
                        isLoaded ? "opacity-100" : "opacity-0"
                      }`}
                      style={{
                        transform: isAnimating ? "scale(1.15)" : "scale(1)",
                        transformOrigin: "center",
                        transition: "all 2s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    >
                      <div className="group cursor-pointer">
                        <div className="bg-white rounded-lg shadow-lg p-3 hover:shadow-xl transition-shadow duration-300 border border-gray-200 hover:border-gray-300">
                          <img
                            src={logo.url}
                            alt={logo.name}
                            className="w-full h-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                            style={{
                              width: `${logo.width}px`,
                              height: `${logo.height}px`,
                            }}
                          />
                        </div>
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                            {logo.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              // Desktop absolute positioning
              sampleLogos.map((logo, index) => {
                const position = logoPositions[index];
                if (!position) return null;

                return (
                  <div
                    key={logo.id}
                    className={`absolute ${
                      isLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      left: `${position.x}px`,
                      top: `${position.y}px`,
                      transform: isAnimating ? "scale(1.15)" : "scale(1)",
                      transformOrigin: "center",
                      transition: "all 2s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    <div className="group cursor-pointer">
                      <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300 border border-gray-200 hover:border-gray-300">
                        <img
                          src={logo.url}
                          alt={logo.name}
                          className="w-full h-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                          style={{
                            width: `${logo.width * position.scale}px`,
                            height: `${logo.height * position.scale}px`,
                          }}
                        />
                      </div>
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                          {logo.name}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
