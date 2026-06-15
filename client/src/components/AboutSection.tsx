import { useState, useEffect, useCallback } from 'react';
import { Briefcase, Code, Calendar, Sparkles, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type TabType = 'personal' | 'professional' | 'approach';

interface Achievement {
  number: string;
  label: string;
  icon: React.ReactNode;
  suffix: string;
}

interface TechStack {
  category: string;
  items: string[];
}

interface SocialLink {
  icon: React.ReactNode;
  href: string;
}

interface MousePosition {
  x: number;
  y: number;
}

interface TabContent {
  personal: string;
  professional: string;
  approach: string;
}

export const AboutSection = (): React.ReactElement => {
  const [activeTab, setActiveTab] = useState<TabType>('personal');
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [counter, setCounter] = useState<number>(0);

  const handleMouseMove = useCallback((e: MouseEvent): void => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  const achievements: Achievement[] = [
    { number: "12+", label: "ETL Projects", icon: <Briefcase className="h-5 w-5" />, suffix: "" },
    { number: "1", label: "Years Exp", icon: <Calendar className="h-5 w-5" />, suffix: "+" },
    { number: "100", label: "APIs Parsed", icon: <Target className="h-5 w-5" />, suffix: "+" },
    { number: "Python", label: "Proficiency", icon: <Code className="h-5 w-5" />, suffix: "" }
  ];

  const techStack: TechStack[] = [
    { category: "Backend", items: ["Python", "Pandas", "NumPy", "SQLAlchemy"] },
    { category: "Databases", items: ["PostgreSQL", "MongoDB", "SQL", "SQLite"] },
    { category: "DevOps", items: ["Docker", "Git", "Linux", "Vercel"] },
  ];

  const tabContent: TabContent = {
    personal: "Passionate about building robust data solutions and scalable backend systems. I enjoy solving complex problems with clean Python code, contributing to open-source projects, and continuously expanding my knowledge in data engineering.",
    professional: "As a Junior Python Developer, I've built 12+ ETL projects and data pipelines processing 100+ APIs. I specialize in data extraction, transformation, and pipeline development using modern Python frameworks and databases.",
    approach: "I focus on writing maintainable, well-documented code with proper error handling. My approach emphasizes understanding data flows, optimizing queries, and building reliable systems that scale efficiently."
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    const interval = setInterval(() => setCounter((prev: number) => (prev + 1) % 4), 2000);
    return () => clearInterval(interval);
  }, []);

  const handleDownload = (): void => {
    const link: HTMLAnchorElement = document.createElement('a');
    link.href = '/Sahil-resume.pdf';
    link.download = 'Sahil-resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleTabClick = (tab: TabType): void => {
    setActiveTab(tab);
  };

  return (
    <section id="about" className="relative py-16 md:py-28 px-4 sm:px-6 lg:px-12 bg-linear-to-br from-background via-background to-primary/5 overflow-hidden">
      <div className="container mx-auto max-w-7xl relative">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20 px-2 sm:px-6">
          <div className="inline-flex items-center gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-2xl bg-primary/10 border border-primary/20 mb-6 transition-all duration-500 hover:bg-primary/15 hover:scale-105 group cursor-pointer">
            <div className="relative">
              <Sparkles className="h-4 sm:h-5 w-4 sm:w-5 text-primary animate-pulse" />
            </div>
            <span className="text-sm sm:text-base font-semibold text-primary tracking-wide">ABOUT ME</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">
            <span className="bg-linear-to-r from-foreground to-primary bg-clip-text text-transparent">Transforming</span>
            <span className="block text-primary animate-pulse">Data Into Insight</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Building scalable data pipelines that combine <span className="text-primary font-semibold">reliability</span>, <span className="text-primary font-semibold">efficiency</span>, and <span className="text-primary font-semibold">insights</span>
          </p>
        </div>

          <div className="grid grid-cols-1 xl:grid-cols-1 gap-8 md:gap-12">
          {/* Left Column */}
          <div className="xl:col-span-1 space-y-8">
            {/* About Card */}
            <div className="bg-card/50 border border-border rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:shadow-3xl hover:border-primary/40 hover:bg-card/60 relative overflow-hidden group">
              {/* Decorative Circles */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-primary rounded-full -translate-y-16 translate-x-16" />
                <div className="absolute bottom-0 left-0 w-20 sm:w-24 h-20 sm:h-24 bg-secondary rounded-full -translate-x-16 translate-y-16" />
              </div>

              <div className="relative">
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                  {/* Profile Image */}
                  <div className="relative shrink-0">
                    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-4 border-primary/20 shadow-2xl transition-all duration-500 group-hover:border-primary/40 group-hover:scale-105 md:group-hover:scale-110 relative">
                      <img src="/profile-logo.png" alt="Ivo Vallejos" className="w-full h-full object-cover" />
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Ivo Vallejos</h2>
                    <p className="text-primary text-base sm:text-lg font-semibold mb-3 sm:mb-4">Python Developer</p>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                      {achievements.map((achievement: Achievement, index: number) => (
                        <div key={index} className={`p-2 sm:p-3 rounded-xl bg-background/50 border border-border transition-all duration-300 hover:scale-105 hover:border-primary/30 ${counter === index ? 'bg-primary/10 border-primary/50' : ''}`}>
                          <div className="flex items-center gap-2 justify-center md:justify-start">
                            {achievement.icon}
                            <div>
                              <div className="font-bold text-sm sm:text-lg">{achievement.number}{achievement.suffix}</div>
                              <div className="text-[10px] sm:text-xs text-muted-foreground">{achievement.label}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex flex-col sm:flex-row border-b border-border mb-4 sm:mb-6">
                  {(['personal', 'professional', 'approach'] as const).map((tab: TabType) => (
                    <button
                      key={tab}
                      onClick={() => handleTabClick(tab)}
                      className={`flex-1 py-2 sm:py-3 px-2 sm:px-4 text-sm sm:text-base font-medium transition-all duration-300 ${activeTab === tab ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="min-h-25 sm:min-h-30">
                  <AnimatePresence mode="sync">
                    <motion.p
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed"
                    >
                      {tabContent[activeTab]}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="bg-card/50 border border-border rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:shadow-3xl hover:border-primary/40 hover:bg-card/60">
              <h3 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <Code className="h-4 sm:h-6 w-4 sm:w-6 text-primary" />Tech Stack Overview
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {techStack.map((stack: TechStack, index: number) => (
                  <div key={index} className="bg-background/50 border border-border rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:border-primary/30 hover:scale-105 group">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div className="p-1 sm:p-2 bg-primary/10 rounded-lg text-primary group-hover:scale-110 transition-transform duration-300"><Code className="h-3 sm:h-4 w-3 sm:w-4" /></div>
                      <h4 className="font-semibold text-sm sm:text-lg">{stack.category}</h4>
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      {stack.items.map((item: string, itemIndex: number) => (
                        <div key={itemIndex} className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />{item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style>
        {`
          @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
          .animate-float { animation: float 3s ease-in-out infinite; }
          .animation-delay-2000 { animation-delay: 2s; }
        `}
      </style>
    </section>
  );
};