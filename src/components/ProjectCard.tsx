"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Github,
  ExternalLink,
  Code,
  Smartphone,
  Shield,
  Brain,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { AnchorShowcase } from "@/components/ui/AnchorShowcase";
import { Project } from "@/types";

const projectAccentColors: Record<string, string> = {
  "Campaign Insights Bot": "from-emerald-500/20 via-cyan-500/10",
  Anchor: "from-amber-500/20 via-orange-500/10",
  "Roomies App": "from-violet-500/20 via-fuchsia-500/10",
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

/* ── Featured project card (full-width, horizontal layout) ─────────── */
export const FeaturedProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <SpotlightCard className="group overflow-hidden border border-[var(--border-subtle)] hover:border-[var(--border-accent)] transition-colors duration-500">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Left: Interactive app showcase — clickable */}
          <a
            href={project.demo ?? project.github ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="relative h-80 md:h-auto md:min-h-[420px] bg-gradient-to-br from-[#0c0a14] via-[#0f0d18] to-[#0a0810] overflow-hidden block cursor-pointer group/phone"
            aria-label={`View ${project.title} live app`}
          >
            <AnchorShowcase />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover/phone:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <span className="opacity-0 group-hover/phone:opacity-100 transition-opacity duration-300 text-white text-sm font-body font-medium bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                View Live App
              </span>
            </div>
          </a>

          {/* Right: Features + links */}
          <div className="flex flex-col">
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
              <div>
                {/* Title + tagline */}
                <h3 className="font-display text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-2 tracking-tight">
                  {project.title}
                </h3>
                {project.tagline && (
                  <p className="text-[var(--accent-warm)] text-sm mb-6 font-body">
                    {project.tagline}
                  </p>
                )}

                {/* Feature highlights */}
                <div className="space-y-4 mb-6">
                  {[
                    {
                      icon: Smartphone,
                      label: "iOS App Store",
                      detail: "Shipped to production with Capacitor",
                    },
                    {
                      icon: Brain,
                      label: "On-device ML",
                      detail: "TensorFlow.js inference for streak insights",
                    },
                    {
                      icon: Shield,
                      label: "26 RLS policies",
                      detail: "Every table locked down, zero exposed endpoints",
                    },
                    {
                      icon: Zap,
                      label: "Real-time sync",
                      detail: "Live messaging and friend activity via Supabase",
                    },
                  ].map((feature, i) => (
                    <motion.div
                      key={feature.label}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.3 + i * 0.1,
                        duration: 0.4,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <div className="w-8 h-8 rounded-lg bg-[var(--accent-gold-soft)] flex items-center justify-center shrink-0 mt-0.5">
                        <feature.icon className="w-4 h-4 text-[var(--accent-gold)]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[var(--text-primary)]">
                          {feature.label}
                        </p>
                        <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                          {feature.detail}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tech.map((tech, techIndex) => (
                    <motion.span
                      key={techIndex}
                      className="tech-tag text-xs"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: index * 0.1 + techIndex * 0.05,
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-[var(--border-subtle)]">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors duration-300"
                    aria-label="View project on GitHub"
                  >
                    <Github className="w-4 h-4" />
                    <span>Source</span>
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors duration-300"
                    aria-label="View live demo"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live App</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
};

/* ── Standard project card — content-first, minimal decoration ─────── */
export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="h-full"
    >
      <SpotlightCard className="h-full group overflow-hidden border border-[var(--border-subtle)] hover:border-[var(--border-accent)] transition-colors duration-500">
        {/* Visual header — reduced, clean */}
        <div className="h-40 w-full bg-[var(--bg-secondary)] relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-40" />
          <div
            className={`absolute inset-0 bg-gradient-to-br ${projectAccentColors[project.title] ?? "from-[var(--accent-gold)]/20 via-transparent"} to-transparent`}
          />

          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="p-4 rounded-2xl border border-[var(--accent-gold)]/20 bg-[var(--bg-primary)]/40 backdrop-blur-sm group-hover:border-[var(--accent-gold)]/40 transition-colors duration-500">
              <div className="text-[var(--accent-gold)]/60 group-hover:text-[var(--accent-gold)]/90 transition-colors duration-500">
                <Code className="w-8 h-8" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          {/* Bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[var(--bg-primary)] to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6 relative flex flex-col flex-1">
          <h3 className="project-title text-xl mb-3 group-hover:text-[var(--accent-gold)] transition-colors duration-500">
            {project.title}
          </h3>

          <p className="project-description text-sm mb-4 leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech, techIndex) => (
              <motion.span
                key={techIndex}
                className="tech-tag text-xs"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + techIndex * 0.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          <p className="text-xs text-[var(--accent-gold)] mb-4 font-medium">
            {project.metrics}
          </p>

          <div className="flex items-center gap-4 pt-4 mt-auto border-t border-[var(--border-subtle)]">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors duration-300"
                aria-label="View project on GitHub"
              >
                <Github className="w-4 h-4" />
                <span>Source</span>
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors duration-300"
                aria-label="View live demo"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Demo</span>
              </a>
            )}
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
};
