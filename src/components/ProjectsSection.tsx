import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

interface Project {
  name: string;
  description: string;
  imageUrl: string;
  githubUrl: string;
  tech: string[];
}

const projects: Project[] = [
  {
    name: 'Developer Portfolio',
    description: 'An interactive personal portfolio with custom motion, timeline storytelling, and polished UI details.',
    imageUrl: 'https://picsum.photos/seed/portfolio/1200/700',
    githubUrl: 'https://github.com/T-Joseph-Kim/developer-portfolio',
    tech: ['React', 'TypeScript', 'Tailwind', 'Framer Motion'],
  },
  {
    name: 'Cloud Automation Toolkit',
    description: 'Automation workflows for cloud identity visibility, governance exports, and multi-account inventory operations.',
    imageUrl: 'https://picsum.photos/seed/cloud-automation/1200/700',
    githubUrl: 'https://github.com/T-Joseph-Kim',
    tech: ['Python', 'Azure', 'AWS', 'Terraform'],
  },
  {
    name: 'Realtime Collaboration App',
    description: 'A production-style collaboration platform focused on low-latency updates and scalable backend patterns.',
    imageUrl: 'https://picsum.photos/seed/realtime-app/1200/700',
    githubUrl: 'https://github.com/T-Joseph-Kim',
    tech: ['React', 'Node.js', 'WebSocket', 'PostgreSQL'],
  },
];

function ProjectsSection(): React.JSX.Element {
  const { isDarkMode } = useTheme();

  return (
    <div
      className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-24"
      style={{
        fontFamily:
          '"Red Hat Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      <div className="mb-12 text-center md:text-left">
        <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Projects
        </h2>
        <p className={`mt-3 text-base sm:text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Built projects I enjoy using and improving.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.a
            key={project.name}
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: index * 0.08, ease: 'easeOut' }}
            className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 ${
              isDarkMode
                ? 'bg-white/[0.04] border-white/10 hover:border-white/25'
                : 'bg-black/[0.03] border-black/10 hover:border-black/20'
            } hover:-translate-y-1`}
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={project.imageUrl}
                alt={`${project.name} preview`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
              <div
                className={`absolute inset-0 ${
                  isDarkMode
                    ? 'bg-gradient-to-t from-black/70 via-black/20 to-transparent'
                    : 'bg-gradient-to-t from-white/70 via-white/20 to-transparent'
                }`}
              />
            </div>

            <div className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{project.name}</h3>
                <div className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <Github className="h-4 w-4" />
                  <ExternalLink className="h-4 w-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                </div>
              </div>

              <p className={`mt-3 text-sm sm:text-base leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {project.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((item) => (
                  <span
                    key={`${project.name}-${item}`}
                    className={`rounded-full px-3 py-1 text-xs sm:text-sm ${
                      isDarkMode ? 'bg-white/10 text-gray-200' : 'bg-black/10 text-gray-700'
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}

export default ProjectsSection;
