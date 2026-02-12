import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IconType } from 'react-icons';
import {
  SiAmazon,
  SiDocker,
  SiFigma,
  SiFlutter,
  SiGit,
  SiGithub,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTerraform,
  SiTypescript,
} from 'react-icons/si';
import { useTheme } from '../contexts/ThemeContext';

interface Skill {
  name: string;
  description: string;
  icon: IconType;
}

const skills: Skill[] = [
  { name: 'TypeScript', description: 'Strongly typed frontend and backend development for safer scaling.', icon: SiTypescript },
  { name: 'React', description: 'Component-driven interfaces with performant client-side interactions.', icon: SiReact },
  { name: 'Next.js', description: 'Hybrid rendering and production-ready app architecture.', icon: SiNextdotjs },
  { name: 'Node.js', description: 'Reliable backend services and API orchestration.', icon: SiNodedotjs },
  { name: 'Python', description: 'Automation, scripting, and data-heavy backend workflows.', icon: SiPython },
  { name: 'PostgreSQL', description: 'Relational data modeling, indexing, and robust querying.', icon: SiPostgresql },
  { name: 'MongoDB', description: 'Flexible document-based storage for iterative product work.', icon: SiMongodb },
  { name: 'AWS', description: 'Cloud deployment, account architecture, and infrastructure operations.', icon: SiAmazon },
  { name: 'Terraform', description: 'Infrastructure as code for repeatable cloud provisioning.', icon: SiTerraform },
  { name: 'Docker', description: 'Containerized development and reproducible environments.', icon: SiDocker },
  { name: 'Tailwind CSS', description: 'Rapid, consistent UI styling with utility-first patterns.', icon: SiTailwindcss },
  { name: 'JavaScript', description: 'Core web language across modern frontend and backend stacks.', icon: SiJavascript },
  { name: 'Git', description: 'Version control, collaborative branching, and history management.', icon: SiGit },
  { name: 'GitHub', description: 'Repository collaboration, reviews, and CI-driven workflows.', icon: SiGithub },
  { name: 'Figma', description: 'Design collaboration, wireframing, and component system planning.', icon: SiFigma },
  { name: 'Flutter', description: 'Cross-platform mobile app development with expressive UI.', icon: SiFlutter },
];

function SkillsSection(): React.JSX.Element {
  const { isDarkMode } = useTheme();
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);

  const repeatedSkills = useMemo(() => [...skills, ...skills], []);
  const isPaused = activeSkill !== null;

  return (
    <section
      className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-24"
      style={{
        fontFamily:
          '"Red Hat Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      <div className="mb-10 text-center md:text-left">
        <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Skills
        </h2>
        <p className={`mt-3 text-base sm:text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Focus on a logo to pause the stream and inspect the tech.
        </p>
      </div>

      <div
        className={`relative overflow-hidden rounded-3xl border px-0 py-8 ${
          isDarkMode ? 'border-white/10 bg-white/[0.03]' : 'border-black/10 bg-black/[0.02]'
        }`}
        onMouseLeave={() => setActiveSkill(null)}
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
              setActiveSkill(null);
            }
          }}
        >
          {repeatedSkills.map((skill, index) => {
            const Icon = skill.icon;
            const isActive = activeSkill?.name === skill.name;

            return (
              <button
                key={`${skill.name}-${index}`}
                type="button"
                onMouseEnter={() => setActiveSkill(skill)}
                onFocus={() => setActiveSkill(skill)}
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
      </div>

      <AnimatePresence mode="wait">
        {activeSkill && (
          <motion.div
            key={activeSkill.name}
            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`mt-6 rounded-2xl border p-5 sm:p-6 ${
              isDarkMode ? 'border-white/10 bg-white/[0.04]' : 'border-black/10 bg-black/[0.03]'
            }`}
          >
            <h3 className={`text-xl sm:text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {activeSkill.name}
            </h3>
            <p className={`mt-2 text-sm sm:text-base leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {activeSkill.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default SkillsSection;
