import React, { useState } from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

interface ExperienceItem {
  company: string;
  role: string;
  dates: string;
  logo: string;
  tech: string[];
  details: string[];
  websiteUrl?: string;
}

const experiences: ExperienceItem[] = [
  {
    company: 'Florida Blue, A GuideWell Company',
    role: 'Cloud Engineer Intern',
    dates: 'Aug 2025 - Present',
    logo: '/experience/florida-blue.png',
    tech: ['AWS', 'Azure', 'Python', 'Terraform'],
    websiteUrl: 'https://floridablue.com',
    details: [
      'Built and integrated custom AVM modules for Splunk and Wiz, extending centralized logging/security into lab and production Azure environments, improving monitoring coverage by 35%.',
      'Enhanced AWS Resource Explorer by implementing a delegated multi-account aggregation model, providing unified visibility across 30+ AWS accounts and reducing resource discovery time by 40%.',
      'Developed a Python automation script to extract Azure managed identities and map them to associated role assignments and policies by parsing Terraform state files and performing Azure API queries, exporting assignment IDs, application IDs, names, and locations into a unified CSV catalog for governance teams.',
    ],
  },
  {
    company: 'Florida Blue, A GuideWell Company',
    role: 'Software Engineer Intern',
    dates: 'May 2025 - Aug 2025',
    logo: '/experience/florida-blue.png',
    tech: ['React', 'Spring Boot', 'Java'],
    websiteUrl: 'https://floridablue.com',
    details: [
      'Executed user stories in Agile sprints, collaborating with engineers to build and test production-ready features impacting 9,000+ employees and millions of customers.',
      'Resolved a backend timeout issue in the Enterprise Workcenter tool by optimizing both the Spring Boot API layer and its React frontend interaction patterns, reducing repeated API calls by 75% and preventing duplicate task assignments across the organization.',
      'Upgraded the Elasticsearch, Logstash, and Kibana (ELK) consumer from Java 17 to Java 21, and implemented RACF-based validation logic to eliminate employee status conflicts when identical names existed within the same group.',
    ],
  },
  {
    company: 'UF Society of Asian Scientists and Engineers',
    role: 'Lead Front-End Developer',
    dates: 'Feb 2024 - May 2025',
    logo: '/experience/uf-sase.png',
    tech: ['TypeScript', 'React', 'Tailwind CSS', 'Figma', 'Vercel'],
    websiteUrl: 'https://ufsase.com',
    details: [
      'Partnered with a web development team to design and develop the UI for a new website serving 1,000+ members, resulting in a 73% increase in user engagement compared to the previous version.',
      'Implemented 6+ key pages, including the navigation bar, about, board, and programs pages, leveraging Figma, TypeScript, React, and Tailwind CSS.',
      'Led team meetings and coordinated development tasks in weekly standups, leveraging Agile and CI/CD workflows with Vercel testing. Reviewed and merged front-end pull requests while contributing 6,000+ lines of code.',
    ],
  },
  {
    company: 'CourseLynx',
    role: 'Software Engineer Intern',
    dates: 'May 2024 - Aug 2024',
    logo: '/experience/courselynx.png',
    tech: ['Flutter', 'Dart', 'Hive'],
    websiteUrl: 'https://courselynx.com',
    details: [
      'Resolved a critical bug in the Flutter application using Dart, reducing chat load times by 90% for newly added courses, impacting thousands of users and eliminating the need for app restarts.',
      'Engineered a chat message caching system using a Hive database, optimizing the loading time for over 10,000 messages, and improving performance by 80%.',
      'Developed and implemented a real-time user tagging feature in chat rooms, designing a dynamic UI for user tag lists that enhanced search efficiency, leading to a 27% increase in user growth.',
    ],
  },
];

function ExperienceSection(): React.JSX.Element {
  const { isDarkMode } = useTheme();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOpen = (index: number): void => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const cardClasses = `rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:scale-[1.01] ${
    isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/[0.07]' : 'bg-black/[0.03] border-black/10 hover:bg-black/[0.05]'
  }`;

  return (
    <div
      className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-14"
      style={{
        fontFamily:
          '"Red Hat Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      <div className="mb-10 text-center md:text-left">
        <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Experience
        </h2>
      </div>

      <div className="relative">
        <div
          aria-hidden
          className={`absolute left-5 top-2 bottom-2 w-px md:hidden ${isDarkMode ? 'bg-white/35' : 'bg-black/25'}`}
        />
        <div
          aria-hidden
          className={`hidden md:block absolute left-1/2 -translate-x-1/2 top-2 bottom-2 w-px ${
            isDarkMode ? 'bg-white/35' : 'bg-black/25'
          }`}
        />

        <div className="space-y-3 md:space-y-6">
          {experiences.map((experience, index) => {
            const isOpen = openIndex === index;
            const isLeft = index % 2 === 0;

            const card = (
              <div className={`${cardClasses} w-full max-w-[680px]`}>
                <div className="p-4 sm:p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-14 h-14 sm:w-20 sm:h-20 shrink-0 rounded-xl overflow-hidden border ${
                          isDarkMode ? 'border-white/10 bg-white/10' : 'border-black/10 bg-white'
                        }`}
                      >
                        <img
                          src={experience.logo}
                          alt={`${experience.company} logo`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>

                      <div className="min-w-0">
                        {experience.websiteUrl ? (
                          <a
                            href={experience.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-1 text-sm sm:text-base font-medium underline underline-offset-4 ${
                              isDarkMode ? 'text-sky-300 hover:text-sky-200' : 'text-blue-700 hover:text-blue-800'
                            }`}
                          >
                            <span>{experience.company}</span>
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        ) : (
                          <p className={`text-sm sm:text-base font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {experience.company}
                          </p>
                        )}
                        <h3 className={`mt-0.5 text-left font-semibold text-lg sm:text-xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {experience.role}
                        </h3>
                      </div>
                    </div>

                    <div className={`text-sm sm:text-base whitespace-nowrap ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {experience.dates}
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {experience.tech.map((item) => (
                      <span
                        key={`${experience.role}-${item}`}
                        className={`rounded-full px-3 py-1 text-xs sm:text-sm ${
                          isDarkMode ? 'bg-white/10 text-gray-200' : 'bg-black/10 text-gray-700'
                        }`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => toggleOpen(index)}
                    className={`mt-3 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors ${
                      isDarkMode
                        ? 'border-white/20 text-gray-200 hover:bg-white/10'
                        : 'border-black/20 text-gray-800 hover:bg-black/5'
                    }`}
                  >
                    <span>{isOpen ? 'Hide details' : 'View details'}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.ul
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className={`overflow-hidden ml-2 sm:ml-4 list-disc pl-5 space-y-2 ${
                          isDarkMode ? 'text-gray-200' : 'text-gray-700'
                        }`}
                      >
                        {experience.details.map((detail) => (
                          <li key={detail}>{detail}</li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );

            return (
              <motion.article
                key={`${experience.company}-${experience.role}-${index}`}
                className="relative group"
                initial={{ opacity: 0, x: isLeft ? -80 : 80, y: 24 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.65, delay: index * 0.08, ease: 'easeOut' }}
              >
                <div className="md:hidden relative pl-14">
                  <div
                    aria-hidden
                    className={`absolute left-[13px] top-5 h-4 w-4 rounded-full border ${
                      isDarkMode ? 'bg-black border-white/35' : 'bg-white border-black/35'
                    }`}
                  />
                  {card}
                </div>

                <div className="hidden md:grid md:grid-cols-[minmax(0,1.15fr)_56px_minmax(0,1.15fr)] md:items-start">
                  <div className={isLeft ? 'md:pr-10 flex justify-end' : ''}>{isLeft ? card : null}</div>

                  <div className="relative flex justify-center pt-5">
                    <div
                      aria-hidden
                      className={`h-4 w-4 rounded-full border ${
                        isDarkMode ? 'bg-black border-white/35' : 'bg-white border-black/35'
                      }`}
                    />
                  </div>

                  <div className={!isLeft ? 'md:pl-10 flex justify-start' : ''}>{!isLeft ? card : null}</div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ExperienceSection;
