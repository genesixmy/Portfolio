/**
 * Skills configuration combining data and icons
 */

import type { SkillCategory } from '@/types';
import { skillCategoriesData } from '@/constants/skills-data';
import { FrontendIcon, BackendIcon, ToolsIcon } from '@/components/icons/SkillsIcons';

const icons = [
  <FrontendIcon key="frontend" />,
  <BackendIcon key="backend" />,
  <ToolsIcon key="tools" />,
];

export function getSkillCategories(): SkillCategory[] {
  return skillCategoriesData.map((category, index) => ({
    title: category.title,
    icon: icons[index],
    skills: category.skills,
  }));
}
