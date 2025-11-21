/**
 * Social Media and Navigation Links
 */

import { GitHubIcon, LinkedInIcon, TwitterIcon } from "@/components/icons/SocialIcons";

export interface SocialLink {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    href: "https://github.com/genesixmy",
    icon: GitHubIcon,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: LinkedInIcon,
  },
  {
    name: "Twitter",
    href: "https://twitter.com",
    icon: TwitterIcon,
  },
];

export const navigationLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export const roles = [
  "Web Developer",
  "UI/UX Enthusiast",
  "Problem Solver",
  "Creative Coder",
];
