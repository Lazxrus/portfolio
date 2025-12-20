import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useTheme } from "next-themes";
import { backup } from "node:sqlite";

const WelcomeScreen = ({ onWelcomeComplete }) => {
    const [phase, setPhase] = useState(0);
    const [exitAnimation, setExitAnimation] = useState(false);
    const [typedText, setTypedText] = useState("");
    const { theme } = useTheme();

    // Theme-based colors
    const colors = {
        light: {
            primary: "hsl(222.2 47.4% 11.2%)",
            secondary: "hsl(262.1 83.3% 57.8%)",
            background: "hsl(0 0% 100%)",
            muted: "hsl(215.4 16.3% 46.9%)",
            link: "hsl(221.2 83.2% 53.5%)"
        },
        dark: {
            primary: "hsl(210 40% 98%)",
            secondary: "hsl(263.4 70% 50.4%)",
            background: "hsl(222.2 47.4% 11.2%)",
            muted: "hsl(215 20.2% 65.1%)",
            link: "hsl(217.2 91.2% 59.8%)"
        }
    };

    // TODO: Add portfolioURL
    const currentColors = colors[theme] || colors.dark;
    const portfolioUrl = "addlink.con"
    const welcomeMessages = [
        "Crafting digital experiences",
        "Backend Developer",
        "Python Specialist"
    ];

    useEffect(() => {
        const phase1 = setTimeout(() => setPhase(1), 800);
        const phase2 = setTimeout(() => setPhase(2), 1600);
        const phase3 = setTimeout(() => setPhase(3), 2400);
        const complete = setTimeout(() => {
            setExitAnimation(true);
            setTimeout(onWelcomeComplete, 1000);
        }, 5000);

        return () => {
            clearTimeout(phase1);
            clearTimeout(phase2);
            clearTimeout(phase3);
            clearTimeout(complete);
        };
    }, [onWelcomeComplete]);

    useEffect(() => {
        if (phase >= 2) {
            let i = 0;
            const typingInterval = setInterval(() => {
                if (i <= portfolioUrl.length) {
                    setTypedText(portfolioUrl.substring(0, i));
                    i++;
                } else {
                    clearInterval(typingInterval);
                }
            }, 40);

            return () => clearInterval(typingInterval);
        }
    }, [phase]);

    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3
            }
        },
        exit: {
            y: "-100vh",
            opacity: 0,
            transition: {
                duration: 1,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    };

    const contentVariants = {
        hidden: { y:20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    };

    const underlineVariants = {
    hidden: { scaleX: 0 },
    visible: {
        scaleX: 1,
        transition: {
            delay: 0.8,
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1]
            }
        }
    };

    const cursorVariants = {
        blinking: {
            opacity: [0, 0, 1, 1],
            transition: {
                duration: 1,
                repeat: Infinity,
                repeatDelay: 0
            }
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Welcome Screen */}
            <motion.div
                className="h-full w-full flex items-center justify-center p-4"
                style={{ backgroundColor: currentColors.background }}
                variants={containerVariants}
                initial="hidden"
                animate={exitAnimation ? "exit" : "visible"}
            >
            </motion.div>
        </div>
    )

};