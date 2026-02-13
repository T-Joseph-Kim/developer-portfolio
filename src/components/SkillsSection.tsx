import React, { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IconType } from 'react-icons';
import {
  SiAmazonwebservices,
  SiCplusplus,
  SiDart,
  SiElectron,
  SiFlutter,
  SiGit,
  SiHtml5,
  SiHcl,
  SiJavascript,
  SiMui,
  SiNodedotjs,
  SiPython,
  SiR,
  SiReact,
  SiTailwindcss,
  SiTerraform,
  SiTypescript,
  SiVite,
} from 'react-icons/si';
import { FaDatabase, FaJava, FaMicrosoft } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

interface Skill {
  name: string;
  description: string;
  icon: IconType;
}

interface ActiveSkillPopup {
  skill: Skill;
  top: number;
  left: number;
  align: 'left' | 'right';
}

const skills: Skill[] = [
  { name: 'Python', description: 'Automation, scripting, and backend development workflows.', icon: SiPython },
  { name: 'C/C#/C++', description: 'Systems-level and object-oriented programming across compiled languages.', icon: SiCplusplus },
  { name: 'Java', description: 'Enterprise-grade development and strongly typed application architecture.', icon: FaJava },
  { name: 'JavaScript', description: 'Core language for modern web application development.', icon: SiJavascript },
  { name: 'TypeScript', description: 'Typed JavaScript for scalable and maintainable codebases.', icon: SiTypescript },
  { name: 'SQL', description: 'Relational querying, schema design, and data access patterns.', icon: FaDatabase },
  { name: 'Dart', description: 'Language support for Flutter-based cross-platform applications.', icon: SiDart },
  { name: 'R', description: 'Statistical computing and data analysis workflows.', icon: SiR },
  { name: 'HTML/CSS', description: 'Semantic markup and responsive styling for web interfaces.', icon: SiHtml5 },
  { name: 'HCL', description: 'HashiCorp configuration language for infrastructure definitions.', icon: SiHcl },
  { name: 'React', description: 'Component-driven interfaces with fast, interactive UX patterns.', icon: SiReact },
  { name: 'Vite', description: 'Fast bundling and local development for modern frontend projects.', icon: SiVite },
  { name: 'Node.js', description: 'Backend services and API orchestration in JavaScript runtime.', icon: SiNodedotjs },
  { name: 'Tailwind CSS', description: 'Utility-first styling for rapid, consistent design systems.', icon: SiTailwindcss },
  { name: 'Material-UI', description: 'Component library integration for accessible UI development.', icon: SiMui },
  { name: 'Electron', description: 'Desktop app development using web technologies.', icon: SiElectron },
  { name: 'Flutter', description: 'Cross-platform app development with expressive UI components.', icon: SiFlutter },
  { name: 'Terraform', description: 'Infrastructure as code for repeatable cloud provisioning.', icon: SiTerraform },
  { name: 'AWS Services', description: 'Cloud infrastructure, security, and platform operations on AWS.', icon: SiAmazonwebservices },
  { name: 'Azure', description: 'Cloud services, identity, and deployment workflows in Azure.', icon: FaMicrosoft },
  { name: 'Git', description: 'Version control and collaborative branching workflows.', icon: SiGit },
];

function SkillsSection(): React.JSX.Element {
  const { isDarkMode } = useTheme();
  const [activeSkillPopup, setActiveSkillPopup] = useState<ActiveSkillPopup | null>(null);
  const [viewMode, setViewMode] = useState<'stream' | 'list'>('stream');
  const containerRef = useRef<HTMLDivElement | null>(null);

  const topRowSkills = useMemo(() => {
    const top = skills.filter((_, index) => index % 2 === 0);
    return [...top, ...top];
  }, []);
  const bottomRowSkills = useMemo(() => {
    const bottom = skills.filter((_, index) => index % 2 !== 0);
    return [...bottom, ...bottom];
  }, []);
  const isPaused = activeSkillPopup !== null;

  const setActiveSkillFromTarget = (skill: Skill, target: HTMLElement): void => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const popupWidth = 280;
    const popupGap = 14;
    const spaceOnRight = containerRect.right - targetRect.right;
    const align: 'left' | 'right' = spaceOnRight >= popupWidth + popupGap ? 'right' : 'left';

    setActiveSkillPopup({
      skill,
      top: targetRect.top - containerRect.top + targetRect.height / 2,
      left:
        align === 'right'
          ? targetRect.right - containerRect.left + popupGap
          : targetRect.left - containerRect.left - popupGap,
      align,
    });
  };

  return (
    <section
      className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-14"
      style={{
        fontFamily:
          '"Red Hat Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      <div className="mb-10 text-center md:text-left">
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className={`text-3xl sm:text-4xl md:text-5xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
        >
          Skills
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.45, delay: 0.05, ease: 'easeOut' }}
          className={`mt-4 inline-flex rounded-full border p-1 ${
            isDarkMode ? 'border-white/15 bg-white/[0.03]' : 'border-black/15 bg-black/[0.03]'
          }`}
        >
          <button
            type="button"
            onClick={() => {
              setViewMode('stream');
              setActiveSkillPopup(null);
            }}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              viewMode === 'stream'
                ? isDarkMode
                  ? 'bg-white text-black'
                  : 'bg-black text-white'
                : isDarkMode
                  ? 'text-gray-300 hover:bg-white/10'
                  : 'text-gray-700 hover:bg-black/5'
            }`}
          >
            Stream
          </button>
          <button
            type="button"
            onClick={() => {
              setViewMode('list');
              setActiveSkillPopup(null);
            }}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              viewMode === 'list'
                ? isDarkMode
                  ? 'bg-white text-black'
                  : 'bg-black text-white'
                : isDarkMode
                  ? 'text-gray-300 hover:bg-white/10'
                  : 'text-gray-700 hover:bg-black/5'
            }`}
          >
            List
          </button>
        </motion.div>
      </div>

      {viewMode === 'stream' ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          ref={containerRef}
          className={`relative overflow-hidden rounded-3xl border px-0 py-8 ${
            isDarkMode ? 'border-white/10 bg-white/[0.03]' : 'border-black/10 bg-black/[0.02]'
          }`}
          onMouseLeave={() => setActiveSkillPopup(null)}
        >
          <div
            className={`pointer-events-none absolute inset-y-0 left-0 w-24 z-10 ${
              isDarkMode ? 'bg-gradient-to-r from-black to-transparent' : 'bg-gradient-to-r from-white to-transparent'
            }`}
          />
          <div
            className={`pointer-events-none absolute inset-y-0 right-0 w-24 z-10 ${
              isDarkMode ? 'bg-gradient-to-l from-black to-transparent' : 'bg-gradient-to-l from-white to-transparent'
            }`}
          />

          <div
            className="flex w-max gap-4 px-4"
            style={{
              animation: 'skills-marquee 34s linear infinite',
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
            onBlur={(e) => {
              const nextTarget = e.relatedTarget as HTMLElement | null;
              if (!nextTarget || !e.currentTarget.contains(nextTarget)) {
                setActiveSkillPopup(null);
              }
            }}
          >
            {topRowSkills.map((skill, index) => {
              const Icon = skill.icon;
              const isActive = activeSkillPopup?.skill.name === skill.name;

              return (
                <button
                  key={`top-${skill.name}-${index}`}
                  type="button"
                  onMouseEnter={(e) => setActiveSkillFromTarget(skill, e.currentTarget)}
                  onFocus={(e) => setActiveSkillFromTarget(skill, e.currentTarget)}
                  onClick={(e) => setActiveSkillFromTarget(skill, e.currentTarget)}
                  className={`group shrink-0 rounded-2xl border px-4 py-3 transition-all duration-200 focus:outline-none ${
                    isDarkMode
                      ? 'border-white/10 bg-white/[0.05] text-white hover:bg-white/[0.12] focus:bg-white/[0.12]'
                      : 'border-black/10 bg-black/[0.04] text-gray-900 hover:bg-black/[0.10] focus:bg-black/[0.10]'
                  } ${isActive ? 'scale-105' : ''}`}
                  aria-label={`${skill.name} skill`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
                    <span className="text-sm sm:text-base font-semibold whitespace-nowrap">{skill.name}</span>
                  </div>
                </button>
              );
            })}
          </div>
          <div
            className="mt-4 flex w-max gap-4 px-4"
            style={{
              animation: 'skills-marquee 30s linear infinite',
              animationDirection: 'reverse',
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
            onBlur={(e) => {
              const nextTarget = e.relatedTarget as HTMLElement | null;
              if (!nextTarget || !e.currentTarget.contains(nextTarget)) {
                setActiveSkillPopup(null);
              }
            }}
          >
            {bottomRowSkills.map((skill, index) => {
              const Icon = skill.icon;
              const isActive = activeSkillPopup?.skill.name === skill.name;

              return (
                <button
                  key={`bottom-${skill.name}-${index}`}
                  type="button"
                  onMouseEnter={(e) => setActiveSkillFromTarget(skill, e.currentTarget)}
                  onFocus={(e) => setActiveSkillFromTarget(skill, e.currentTarget)}
                  onClick={(e) => setActiveSkillFromTarget(skill, e.currentTarget)}
                  className={`group shrink-0 rounded-2xl border px-4 py-3 transition-all duration-200 focus:outline-none ${
                    isDarkMode
                      ? 'border-white/10 bg-white/[0.05] text-white hover:bg-white/[0.12] focus:bg-white/[0.12]'
                      : 'border-black/10 bg-black/[0.04] text-gray-900 hover:bg-black/[0.10] focus:bg-black/[0.10]'
                  } ${isActive ? 'scale-105' : ''}`}
                  aria-label={`${skill.name} skill`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
                    <span className="text-sm sm:text-base font-semibold whitespace-nowrap">{skill.name}</span>
                  </div>
                </button>
              );
            })}
          </div>
          <AnimatePresence>
            {activeSkillPopup && (
              <motion.div
                key={activeSkillPopup.skill.name}
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                style={{ top: activeSkillPopup.top, left: activeSkillPopup.left }}
                className={`pointer-events-none absolute z-20 w-[280px] max-w-[calc(100vw-3rem)] -translate-y-1/2 rounded-2xl border p-4 shadow-xl backdrop-blur-md ${
                  activeSkillPopup.align === 'left' ? '-translate-x-full' : ''
                } ${isDarkMode ? 'border-white/15 bg-black/85 text-white' : 'border-black/15 bg-white/95 text-gray-900'}`}
              >
                <h3 className="text-lg font-semibold">{activeSkillPopup.skill.name}</h3>
                <p className={`mt-1.5 text-sm leading-relaxed ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  {activeSkillPopup.skill.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`rounded-3xl border p-4 sm:p-6 ${
            isDarkMode ? 'border-white/10 bg-white/[0.03]' : 'border-black/10 bg-black/[0.02]'
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {skills.map((skill) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={`list-${skill.name}`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className={`rounded-2xl border px-4 py-3 ${
                    isDarkMode ? 'border-white/10 bg-white/[0.04] text-white' : 'border-black/10 bg-black/[0.03] text-gray-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-6 w-6" />
                    <span className="text-sm sm:text-base font-semibold">{skill.name}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
    </section>
  );
}

export default SkillsSection;
