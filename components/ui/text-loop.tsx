"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TextLoopProps {
  staticText?: string;
  rotatingTexts?: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDelay?: number;
  staticTextClassName?: string;
  rotatingTextClassName?: string;
  backgroundClassName?: string;
  cursorClassName?: string;
}

export default function TextLoop({
  staticText = "Every day is an opportunity for",
  rotatingTexts = ["Learning.", "Growing.", "Competing.", "Belonging.", "Thriving.", "Innovating."],
  className,
  typingSpeed = 100,
  deletingSpeed = 60,
  pauseDelay = 2200,
  staticTextClassName,
  rotatingTextClassName,
  backgroundClassName,
  cursorClassName,
}: TextLoopProps) {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = rotatingTexts[wordIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      // Typing phase
      if (charIndex < currentWord.length) {
        timer = setTimeout(() => {
          setDisplayText(currentWord.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, typingSpeed);
      } else {
        // Pause at full word before backspacing
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDelay);
      }
    } else {
      // Deleting phase
      if (charIndex > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentWord.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, deletingSpeed);
      } else {
        // Finished deleting, transition to next word
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % rotatingTexts.length);
      }
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, wordIndex, rotatingTexts, typingSpeed, deletingSpeed, pauseDelay]);

  return (
    <div
      className={cn(
        "flex flex-row items-center justify-start w-fit text-4xl md:text-7xl font-medium tracking-tight",
        className
      )}
    >
      <span className={cn("mr-3 whitespace-nowrap", staticTextClassName)}>
        {staticText}
      </span>
      <div className="relative flex items-center">
        <div className="relative overflow-hidden whitespace-nowrap">
          <div
            className={cn(
              "absolute inset-0",
              "bg-gradient-to-r from-transparent via-purple-200/30 to-purple-200",
              "dark:from-transparent dark:via-violet-950/30 dark:to-violet-950/60",
              backgroundClassName
            )}
          />

          <span
            className={cn(
              "relative bg-clip-text text-transparent",
              "bg-gradient-to-r from-amber-400 to-yellow-600 pr-1",
              rotatingTextClassName
            )}
          >
            {displayText}
          </span>
        </div>

        {/* Cursor Line */}
        <div
          className={cn(
            "w-[3px] md:w-[4px] bg-amber-400 h-[1.10em] sm:h-[1em] ml-1 animate-pulse",
            cursorClassName
          )}
        />
      </div>
    </div>
  );
}
