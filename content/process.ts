import type { Step } from "./types";

// /process page aur homepage ka timeline isi se banta hai.
// TODO: revisions aur support ki policy apne hisaab se confirm karo.

export const steps: Step[] = [
  {
    title: "Discovery & consultation",
    text: "A 30-minute call or meeting to understand your business, customers and goals. We tell you honestly what will help and what won’t.",
    duration: "Day 1",
  },
  {
    title: "Requirement analysis",
    text: "You get a fixed price, scope and timeline in writing, plus a first-look demo of your homepage or main screen.",
    duration: "Within 48 hours",
  },
  {
    title: "UI/UX design",
    text: "Once you approve and pay 50%, we collect your content and logo and design the main screens around your customers.",
    duration: "Starts within 1 day",
  },
  {
    title: "Development",
    text: "We build in small steps and share a private preview link. You see progress every week, not just at the end.",
    duration: "1–6 weeks",
  },
  {
    title: "Testing & quality assurance",
    text: "We test on real devices, then you check everything on your own phone and computer. Two rounds of changes per stage are included.",
    duration: "3–5 days",
  },
  {
    title: "Deployment & launch",
    text: "After your approval and the final 50% payment, we connect your domain, run final checks and go live.",
    duration: "1–2 days",
  },
  {
    title: "Maintenance & support",
    text: "Free bug fixes for 30 days after launch, then an optional care plan for updates, backups and help.",
    duration: "Ongoing",
  },
];

export const clientProvides = [
  { title: "Logo and brand colours", text: "If you don’t have a logo yet, we can suggest a simple one or work with your designer." },
  { title: "Your content", text: "Services, prices, timings and photos. Rough notes, voice notes and old brochures are fine; we will shape them." },
  { title: "Access details", text: "Domain registrar login or the person who manages it, and any existing hosting or social accounts." },
  { title: "One decision-maker", text: "One person who can review and approve, so feedback is clear and the project stays on time." },
  { title: "Timely feedback", text: "Replies within 2–3 working days at each review stage keep the timeline on track." },
];

export const workingPrinciples = [
  {
    icon: "chat" as const,
    title: "Communication",
    text: "One WhatsApp group for quick questions and a short weekly update with what’s done and what’s next. Calls whenever a decision needs talking through.",
  },
  {
    icon: "refresh" as const,
    title: "Revisions",
    text: "Two rounds of changes are included at each review stage. Anything outside the agreed scope is quoted separately before we do it, never added to the bill later.",
  },
  {
    icon: "file" as const,
    title: "Delivery",
    text: "You get the live site or app, admin logins, a short how-to video and full ownership of the domain, code and accounts.",
  },
  {
    icon: "shield" as const,
    title: "Support",
    text: "30 days of free bug fixes after launch. After that, the optional care plan covers updates, backups, security and priority help.",
  },
];

// Homepage ke "guarantees"
export const guarantees = [
  {
    icon: "eye" as const,
    title: "Free demo first",
    text: "See a first look of your homepage within 48 hours, before you commit to anything.",
  },
  {
    icon: "wallet" as const,
    title: "50% only after approval",
    text: "Pay half to start. Pay the rest only when you have reviewed and approved the finished work.",
  },
  {
    icon: "file" as const,
    title: "Fixed quote in writing",
    text: "Scope, timeline and price agreed in writing upfront. No surprise bills at the end.",
  },
];

// "Why Tarkeon" comparison. Dusron ke baare mein sirf aam, saaf baatein.
export const comparison = {
  columns: ["Tarkeon", "Typical freelancer", "Large agency"],
  rows: [
    { label: "Fixed quote in writing before work starts", values: ["yes", "varies", "yes"] },
    { label: "Free homepage demo before you commit", values: ["yes", "rarely", "rarely"] },
    { label: "Second 50% paid only after you approve", values: ["yes", "varies", "varies"] },
    { label: "Websites, web apps, AI and automation in one place", values: ["yes", "rarely", "yes"] },
    { label: "You talk directly to the person building it", values: ["yes", "yes", "rarely"] },
    { label: "Weekly progress updates", values: ["yes", "varies", "yes"] },
    { label: "Support plan after launch", values: ["yes", "varies", "yes"] },
    { label: "Starting prices published on the website", values: ["yes", "varies", "rarely"] },
    { label: "You own the domain, code and accounts", values: ["yes", "varies", "varies"] },
  ] as { label: string; values: ("yes" | "no" | "varies" | "rarely")[] }[],
};
