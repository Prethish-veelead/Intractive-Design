"use client";

// One place to register GSAP plugins and keep the motion vocabulary consistent
// (rules/design-and-motion.md). Import gsap from here, not from "gsap" directly.
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

gsap.registerPlugin(useGSAP, ScrollTrigger, Draggable, InertiaPlugin);

export const ease = {
  silk: "power3.out",
  soft: "power2.out",
  inOut: "power2.inOut",
} as const;

export const duration = {
  micro: 0.3,
  reveal: 0.6,
  intro: 0.9,
} as const;

export const motionOk = "(prefers-reduced-motion: no-preference)";

export { gsap, useGSAP, ScrollTrigger, Draggable };
