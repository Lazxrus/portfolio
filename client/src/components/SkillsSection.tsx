import { useState } from "react";
import { Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/hooks/useI18n";

import dockerIcon from "@/assets/icons/docker.png";
import flaskIcon from "@/assets/icons/flask.png";
import gitIcon from "@/assets/icons/git.png";
import githubIcon from "@/assets/icons/github.png";
import linuxIcon from "@/assets/icons/linux.png";
import mongodbIcon from "@/assets/icons/mongodb.png";
import numpyIcon from "@/assets/icons/numpy.png";
import pandasIcon from "@/assets/icons/pandas.png";
import plotlyIcon from "@/assets/icons/plotly.png";
import postgresqlIcon from "@/assets/icons/postgresql.png";
import pythonIcon from "@/assets/icons/python.png";
import sqlIcon from "@/assets/icons/sql.png";
import vscodeIcon from "@/assets/icons/vscode.png";

type Skill = {
	name: string;
	level: number; // 0 to 100
	category: "backend" | "data" | "tools";
	icon: string; // key for iconImages
};

const skills: Skill[] = [
    // Backend
    { name: "Python", level: 80, category: "backend", icon: "python" },
    { name: "Pandas", level: 70, category: "backend", icon: "pandas" },
    { name: "NumPy", level: 70, category: "backend", icon: "numpy" },
    { name: "Flask", level: 65, category: "backend", icon: "flask" },

    // Data ML
    { name: "PostgreSQL", level: 60, category: "data", icon: "postgresql" },
    { name: "MongoDB", level: 75, category: "data", icon: "mongodb" },
    { name: "SQL", level: 70, category: "data", icon: "sql" },
    { name: "Plotly", level: 70, category: "data", icon: "plotly" },

    // Tools
    { name: "Docker", level: 60, category: "tools", icon: "docker" },
    { name: "Git", level: 80, category: "tools", icon: "git" },
    { name: "GitHub", level: 85, category: "tools", icon: "github" },
    { name: "VS Code", level: 85, category: "tools", icon: "vscode" },
    { name: "Linux", level: 75, category: "tools", icon: "linux" },
];

const iconImages: { [key: string]: string } = {
    docker: dockerIcon,
    flask: flaskIcon,
    git: gitIcon,
    github: githubIcon,
    linux: linuxIcon,
    mongodb: mongodbIcon,
    numpy: numpyIcon,
    pandas: pandasIcon,
    plotly: plotlyIcon,
    postgresql: postgresqlIcon,
    python: pythonIcon,
    sql: sqlIcon,
    vscode: vscodeIcon,
};

const SkillBar = ({ level }: { level: number }) => (
    <div className="w-full h-3 bg-secondary/20 rounded-full overflow-hidden">
        <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${level}%` }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className={`h-full rounded-full ${
                level > 75
                    ? "bg-linear-to-r from-green-400 to-emerald-500"
                    : level > 50
                    ? "bg-linear-to-r from-yellow-400 to-amber-500"
                    : "bg-linear-to-r from-red-400 to-pink-500"
            }`}
        />
    </div>
);

const InfiniteScrollSkills = ({ skills }: { skills: Skill[] }) => {
    const duplicatedSkills = [...skills, ...skills, ...skills];

    return (
        <div className="overflow-hidden py-8">
            <motion.div
                className="flex gap-8 mb-8"
                animate={{ x: ["0%", "-100%"] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
                {duplicatedSkills.map((skill, index) => (
                    <div key={`${skill.name}-${index}`} className="shrink-0 flex flex-col items-center gap-2">
                        <div className="w-16 h-16 rounded-full bg-card border-2 border-primary/50 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                            <img src={iconImages[skill.icon]} alt={skill.name} className="w-8 h-8 object-contain" />
                        </div>
                        <span className="text-sm font-medium text-center">{skill.name}</span>
                    </div>
                ))}
            </motion.div>

            <motion.div
                className="flex gap-8"
                animate={{ x: ["-100%", "0%"] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
                {[...duplicatedSkills].reverse().map((skill, index) => (
                    <div key={`${skill.name}-reverse-${index}`} className="shrink-0 flex flex-col items-center gap-2">
                        <div className="w-16 h-16 rounded-full bg-card border-2 border-primary/50 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                            <img src={iconImages[skill.icon]} alt={skill.name} className="w-8 h-8 object-contain" />
                        </div>
                        <span className="text-sm font-medium text-center">{skill.name}</span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export const SkillsSection = () => {
    const [activeCategory, setActiveCategory] = useState("all");
    const { t } = useI18n();

    const categories = [
        { id: "all", label: t("skills.categories.0.label"), color: "bg-gradient-to-r from-purple-500 to-pink-500" },
        { id: "backend", label: t("skills.categories.1.label"), color: "bg-gradient-to-r from-blue-500 to-cyan-500" },
        { id: "data", label: t("skills.categories.2.label"), color: "bg-gradient-to-r from-green-500 to-emerald-500" },
        { id: "tools", label: t("skills.categories.3.label"), color: "bg-gradient-to-r from-orange-500 to-yellow-500" },
    ];

    const filteredSkills = skills.filter(
        (skill) => activeCategory === "all" || skill.category === activeCategory
    );

    return (
        <section id="skills" className="py-28 px-4 bg-linear-to-br from-background via-secondary/5 to-background">
            <div className="container mx-auto max-w-6xl">
                {/* Header */}
                <motion.div 
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <Sparkles className="h-4 w-4" />
                    {t("skills.badge")}
                </motion.div>

                {/* Hero */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-15">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 pb-1 bg-clip-text text-transparent bg-linear-to-br from-primary to-primary/80 leading-tight">
                        {t("skills.title")}
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        {t("skills.description")}
                    </p>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-3 mb-16">
                    {categories.map((category) => (
                        <motion.button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`px-6 py-2.5 rounded-full font-medium border border-transparent hover:shadow-lg ${
                                activeCategory === category.id
                                    ? `${category.color} text-white shadow-md`
                                    : "bg-secondary/50 text-foreground hover:bg-secondary/70"
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {category.label}
                        </motion.button>
                    ))}
                </div>

                {activeCategory === "all" ? (
                    <InfiniteScrollSkills skills={skills} />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence mode="popLayout">
                            {filteredSkills.map((skill) => (
                                <motion.div
                                    key={skill.name}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="bg-card p-6 rounded-2xl border border-border/30 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-lg group"
                                >
                                    <div className="flex items-start gap-4 mb-5">
                                        <div className="w-12 h-12 rounded-full bg-card border-2 border-primary/50 flex items-center justify-center">
                                            <img src={iconImages[skill.icon]} alt={skill.name} className="w-6 h-6 object-contain" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center mb-2">
                                                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                                                    {skill.name}
                                                </h3>
                                                <span
                                                    className={`text-sm font-medium px-2 py-1 rounded-full ${
                                                        skill.level > 75
                                                            ? "bg-emerald-500/10 text-emerald-500"
                                                            : skill.level > 50
                                                            ? "bg-amber-500/10 text-amber-500"
                                                            : "bg-pink-500/10 text-pink-500"
                                                    }`}
                                                >
                                                    {skill.level}%
                                                </span>
                                            </div>
                                            <SkillBar level={skill.level} />
                                            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                                                <span>{t("skills.skillLevels.basic")}</span>
                                                <span>{t("skills.skillLevels.advanced")}</span>
                                                <span>{t("skills.skillLevels.expert")}</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </section>
    );
};