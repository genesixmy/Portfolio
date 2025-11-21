/**
 * Centralized TypeScript types and interfaces
 */

/**
 * Contact form state
 */
export interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Form submission status
 */
export type SubmitStatus = "idle" | "success" | "error";

/**
 * Skill with proficiency level
 */
export interface Skill {
  name: string;
  level: number; // 0-100
}

/**
 * Skill category with multiple skills
 */
export interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
}

/**
 * Contact information item
 */
export interface ContactInfo {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}

/**
 * Motion animation variant
 */
export interface AnimationVariant {
  initial: Record<string, any>;
  animate: Record<string, any>;
  exit?: Record<string, any>;
  transition?: Record<string, any>;
}
