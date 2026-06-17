import { useEffect, useState, useRef } from "react";
import type { FC } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Home,
  User,
  Code,
  Briefcase,
  Sun,
  Moon,
  Languages,
} from "lucide-react";
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useI18n } from "@/hooks/useI18n";

type NavItem = { name: string; href: string; icon: LucideIcon };

const navItems: NavItem[] = [
  { name: "Home", href: "#hero", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "Skills", href: "#skills", icon: Code },
  { name: "Projects", href: "#projects", icon: Briefcase },
];

const ThemeToggle: FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      document.documentElement.classList.add("dark");
      setTheme("dark");
      return;
    }
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
    if (prefersDark) {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    if (newTheme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
      title="Toggle theme"
      aria-label="Toggle theme"
      aria-pressed={theme === "dark"}
    >
      {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
};

const LanguageSwitcher: FC = () => {
  const { i18n } = useI18n();

  return (
    <motion.button
      onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en')}
      className={cn(
        "p-2 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-md",
        "text-green-600 hover:bg-purple-100 dark:hover:bg-purple-900/50",
        "border border-gray-200 dark:border-gray-700 shadow-sm",
        "flex items-center justify-center"
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={`Switch to ${i18n.language === 'en' ? 'Spanish' : 'English'}`}
      aria-label={`Switch to ${i18n.language === 'en' ? 'Spanish' : 'English'}`}
      aria-pressed={i18n.language === 'es'}
    >
      <Languages className="w-5 h-5" />
    </motion.button>
  );
};

export const Navbar: FC = () => {
  const [activeSection, setActiveSection] = useState<string>("#hero");
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollYRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY ?? 0;

      if (currentScrollY > lastScrollYRef.current && currentScrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      lastScrollYRef.current = currentScrollY;

      const sections = navItems.map((item) => item.href);
      const scrollPosition = currentScrollY + 100;

      for (const section of sections) {
        if (!section.startsWith("#")) continue;
        const element = document.querySelector<HTMLElement>(section);
        if (!element) continue;
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isExternal = (href: string) => /^https?:\/\//.test(href);

  return (
    <>
      {/* Top Right Buttons */}
      <motion.div
        className="fixed top-4 right-4 z-50 flex gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        role="toolbar"
        aria-label="Quick links"
      >
        <LanguageSwitcher />

        <motion.a
          href="https://github.com/Lazxrus"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "p-2 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-md",
            "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50",
            "border border-gray-200 dark:border-gray-700 shadow-sm",
            "flex items-center justify-center"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="GitHub Profile"
          aria-label="GitHub Profile"
        >
          <FaGithub className="w-5 h-5" />
        </motion.a>

        <motion.a
          href="https://linkedin.com/in/ivovallejos"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "p-2 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-md",
            "text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/50",
            "border border-gray-200 dark:border-gray-700 shadow-sm",
            "flex items-center justify-center"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="LinkedIn Profile"
          aria-label="LinkedIn Profile"
        >
          <FaLinkedin className="w-5 h-5" />
        </motion.a>
      </motion.div>

      {/* Bottom Navbar */}
      <motion.nav
        className={cn(
          "fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50",
          "transition-transform duration-300 ease-in-out",
          showNavbar ? "translate-y-0" : "translate-y-full"
        )}
        style={{ willChange: "transform" }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        role="navigation"
        aria-label="Primary navigation"
      >
        <div className="flex items-center justify-center bg-white/80 dark:bg-black/80 backdrop-blur-md rounded-full shadow-lg p-2 border border-gray-200 dark:border-gray-700">
          <div className="flex space-x-1 items-center">
            {navItems.map((item) => {
              const isActive = activeSection === item.href;
              const external = isExternal(item.href);
              const Icon = item.icon;
              return external ? (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "p-2 rounded-full transition-colors flex flex-col items-center",
                    isActive ? "bg-primary text-white" : "text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
                  )}
                  aria-label={item.name}
                  title={item.name}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs mt-1 hidden md:block">{item.name}</span>
                </a>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "p-2 rounded-full transition-colors flex flex-col items-center",
                    isActive ? "bg-primary text-white" : "text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
                  )}
                  aria-label={item.name}
                  title={item.name}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs mt-1 hidden md:block">{item.name}</span>
                </a>
              );
            })}
            <div className="flex items-center px-2 gap-1">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
};