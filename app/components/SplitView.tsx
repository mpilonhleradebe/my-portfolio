import React, {useState, useRef, useEffect} from 'react'
import { motion } from 'framer-motion';
import SplitProjectView from './SplitProjectView'

interface Project {
  id: string;
  title: string;
  year: string;
  gif: string;
  challenge: string;
  approach: string;
  role: string[];
  images: string[];
}

interface ClickedState {
  clicked: boolean;
  setClicked: (id: boolean) => void;
}

interface SplitViewProps extends ClickedState {
  activeItem: string | null;
}

function SplitView({ clicked, setClicked, activeItem }: SplitViewProps) {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Define all projects here in SplitView
  const projects: Project[] = [
      {
      id: 'alertnet',
      title: 'Alertnet',
      year: '2025',
      gif: '/gifs/alertnet/alertnet.gif',
      challenge: "The increasing crime rate and prevalent student anxiety around the University of Johannesburg campuses. Existing safety measures were often reactive, unintegrated, or lacked speed and community support, leaving students feeling vulnerable and unable to secure immediate, reliable help when traveling alone or facing an emergency.",
      approach: "AlertNet delivers a comprehensive, integrated, and rapid cross-platform safety solution. Built using React Native, Node.js, and Firebase, the app combines proactive (real-time tracking, High-Crime Zone Alerts) and reactive (SOS emergency button) features. The core innovation is the Walk Partner System, which uses proximity algorithms to foster community safety by pairing verified students for shared, tracked journeys, thus promoting accountability and peace of mind.",
      role: ['Product Design', 'UI/UX', 'Prototyping', 'User Research', 'Lead Frontend and Backend Developer', 'Stakeholder and Investor lead presentor'],
      images: [
        '/images/alertnet/1.png',
        '/images/alertnet/2.png',
        '/images/alertnet/3.png',
        '/images/alertnet/4.png',
        '/images/alertnet/5.png',
        '/images/alertnet/6.png',
      ],
    },
    {
      id: 'drafted',
      title: 'drafted',
      year: '2024',
      gif: '/gifs/drafted/drafted01.gif',
      challenge: "Unreleased music lives everywhere but nowhere. DAWs. Cloud drives. Forgotten hard disks. There's no single place where artists can see their work, feel its potential, and decide what comes next. Drafted began with a simple question: What if unfinished music had a home?",
      approach: "Drafted is a platform for artists to store, share, and discover unfinished music. It's a place to see what's possible, and to find collaborators who can help make it real. I designed the experience to be simple, intuitive, and inspiring.",
      role: ['Product Design', 'UI/UX', 'Frontend', 'Creative Direction', 'Branding'],
      images: [
        '/images/drafted/1.png',
        '/images/drafted/2.png',
        '/images/drafted/3.png',
        '/images/drafted/4.png',
        '/images/drafted/5.png',
        '/images/drafted/6.png',
      ],
    },
    // {
    //   id: 'artflow',
    //   title: 'artflow',
    //   year: '2023',
    //   gif: '/gifs/artflow/artflow01.gif',
    //   challenge: "Digital artists struggle to organize their creative process. Sketches, references, and final pieces are scattered across devices and apps, making it hard to track creative evolution and maintain inspiration.",
    //   approach: "Artflow provides a unified workspace where artists can collect references, sketch ideas, and develop final pieces in one seamless environment. The platform emphasizes visual organization and creative flow.",
    //   role: ['Product Design', 'UI/UX', 'Brand Identity', 'Visual Design'],
    //   images: [
    //     '/images/artflow/1.png',
    //     '/images/artflow/2.png',
    //     '/images/artflow/3.png',
    //     '/images/artflow/4.png',
    //     '/images/artflow/5.png',
    //   ],
    // },
  ];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const windowHeight = window.innerHeight;
      const newIndex = Math.round(scrollTop / windowHeight);
      setCurrentProjectIndex(Math.min(newIndex, projects.length - 1));
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [projects.length]);

  return (
    <div className="w-screen h-screen relative">
      {/* Top breadcrumb navigation */}
      {clicked && (
        <motion.div
          className="fixed top-5 left-10 z-50 flex flex-row items-center gap-2"
          style={{ pointerEvents: 'none' }}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <h1 className="uppercase text-black text-xs">{activeItem} / </h1>
          <h1 className="uppercase text-gray-300 text-xs">
            {projects[currentProjectIndex].title}
          </h1>
        </motion.div>
      )}

      {/* Scrollable container for all projects */}
      <div
        ref={scrollContainerRef}
        className="w-screen h-screen overflow-y-scroll snap-y snap-mandatory"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <style>
          {`
            div::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>
        {/* Map through projects and pass each to SplitProjectView */}
        {projects.map((project) => (
          <div key={project.id} className="snap-start">
            <SplitProjectView
              clicked={clicked}
              setClicked={setClicked}
              activeItem={activeItem}
              project={project}
            />
          </div>
        ))}
      </div>

      {/* Project navigation indicator */}
      {!clicked && (
        <motion.div
          className="fixed bottom-10 right-10 z-50 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-xs text-gray-400 uppercase">
            {currentProjectIndex + 1} / {projects.length}
          </p>
          <div className="flex flex-col gap-2">
            {projects.map((_, index) => (
              <div
                key={index}
                className={`w-1 h-8 rounded-full transition-colors duration-300 ${
                  index === currentProjectIndex ? 'bg-black' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default SplitView;