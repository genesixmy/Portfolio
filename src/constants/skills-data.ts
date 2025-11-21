/**
 * Skills section constants (no JSX)
 */

import type { Skill } from "@/types";

export interface SkillCategoryData {
  title: string;
  skills: Skill[];
}

export const skillCategoriesData: SkillCategoryData[] = [
  {
    title: "Frontend Development",
    skills: [
      { name: "React / Next.js", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Framer Motion", level: 80 },
    ],
  },
  {
    title: "Backend & Database",
    skills: [
      { name: "Node.js", level: 80 },
      { name: "PostgreSQL", level: 75 },
      { name: "Prisma ORM", level: 85 },
      { name: "REST APIs", level: 80 },
    ],
  },
  {
    title: "Tools & Design",
    skills: [
      { name: "Figma", level: 85 },
      { name: "Git / GitHub", level: 90 },
      { name: "Vercel", level: 90 },
      { name: "UI/UX Design", level: 80 },
    ],
  },
];

export const technologies = [
  "React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js",
  "PostgreSQL", "Prisma", "Vercel", "Figma", "Git",
];
