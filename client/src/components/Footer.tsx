import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/hooks/useI18n";
import { ArrowUp, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

type SocialLink = { icon: React.ReactNode; href: string; label: string };
type QuickLink = { name: string; href: string };
type ContactInfo = { icon: React.ReactNode; text: string; href?: string };

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useI18n();

  const socialLinks: SocialLink[] = [
    { icon: <FaLinkedin size={18} />, href: "https://www.linkedin.com/in/ivovallejos/", label: t("footer.social.linkedin") },
    { icon: <FaGithub size={18} />, href: "https://github.com/Lazxrus", label: t("footer.social.github") },
  ];

  const quickLinks: QuickLink[] = [
    { name: t("footer.navigation.links.0.name"), href: t("footer.navigation.links.0.href") },
    { name: t("footer.navigation.links.1.name"), href: t("footer.navigation.links.1.href") },
    { name: t("footer.navigation.links.2.name"), href: t("footer.navigation.links.2.href") },
  ];

  const contactInfo: ContactInfo[] = [
    { icon: <Mail size={16} />, text: t("footer.contact.email"), href: `mailto:${t("footer.contact.email")}` },
    { icon: <FaGithub size={16} />, text: t("footer.contact.github"), href: "https://github.com/Lazxrus" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <footer className="px-6 py-12 mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Glass background container */}
        <motion.div
          className="backdrop-blur-lg bg-white/70 dark:bg-gray-900/70 rounded-xl p-8 border border-white/20 dark:border-gray-700/50 shadow-lg text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Branding */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{t("footer.branding.name")}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {t("footer.branding.description")}
              </p>
              <div className="flex space-x-4 justify-center">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-300"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Navigation */}
            <motion.div variants={itemVariants}>
              <h4 className="text-gray-900 dark:text-white font-medium mb-4 text-sm uppercase tracking-wider">
                {t("footer.navigation.title")}
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <a
                      href={link.href}
                      className="hover:text-gray-900 dark:hover:text-white transition-colors duration-300 text-sm text-gray-600 dark:text-gray-300"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div variants={itemVariants}>
              <h4 className="text-gray-900 dark:text-white font-medium mb-4 text-sm uppercase tracking-wider">
                {t("footer.contact.title")}
              </h4>
              <ul className="space-y-3">
                {contactInfo.map((info, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start space-x-3 text-sm justify-center"
                    whileHover={{ scale: 1.02 }}
                  >
                    <span className="text-gray-600 dark:text-gray-400 mt-0.5">{info.icon}</span>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="hover:text-gray-900 dark:hover:text-white transition-colors duration-300 text-gray-600 dark:text-gray-300"
                      >
                        {info.text}
                      </a>
                    ) : (
                      <span className="text-gray-600 dark:text-gray-300">{info.text}</span>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Bottom bar */}
          <motion.div
            className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700/50 flex flex-col items-center text-xs text-gray-600 dark:text-gray-400 space-y-4 sm:space-y-0 sm:flex-row sm:justify-between"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div>
              <p>© {currentYear} Lazxrus. {t("footer.bottom.copyright")}</p>
            </div>

            <div className="flex items-center space-x-6">
              <motion.a
                href="#hero"
                aria-label={t("footer.bottom.backToTop")}
                className="p-2 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowUp size={16} />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};