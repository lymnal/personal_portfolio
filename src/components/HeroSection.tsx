"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Lightbulb, ArrowDown } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/esamnyu", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/ethansam",
    label: "LinkedIn",
  },
  { icon: Lightbulb, href: "/ideas", label: "Ideas" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const HeroSection: React.FC = () => {
  const scrollToContent = () => {
    document.getElementById("ideas")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="min-h-[80vh] flex items-center justify-center relative overflow-hidden"
    >
      <motion.div
        className="section-container relative z-10 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Name — static, confident */}
        <motion.h1
          className="hero-title font-display font-bold mb-5"
          variants={itemVariants}
        >
          Ethan Sam
        </motion.h1>

        {/* Single identity — no cycling */}
        <motion.div
          variants={itemVariants}
          className="text-xl md:text-2xl text-[var(--accent-warm)] font-body mb-8 tracking-wide"
        >
          AI Security Engineer
        </motion.div>

        {/* Elevated tagline — the brand line */}
        <motion.p
          variants={itemVariants}
          className="text-[var(--text-secondary)] text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-body"
        >
          Building secure AI systems and using AI to break insecure ones.
        </motion.p>

        {/* Social links + CTA */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="w-10 h-10 rounded-full border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent-gold)] hover:border-[var(--accent-gold)] transition-colors duration-300"
                aria-label={link.label}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
              >
                <link.icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          <motion.button
            onClick={scrollToContent}
            className="btn-primary inline-flex items-center gap-2 text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>See My Work</span>
            <ArrowDown className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};
