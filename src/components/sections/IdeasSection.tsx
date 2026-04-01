"use client";

import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, ArrowRight } from "lucide-react";
import Link from "next/link";
import { IdeaCard } from "@/components/IdeaCard";
import { ideas } from "@/lib/data";

export const IdeasSection: React.FC = () => {
  const featuredIdeas = ideas.filter((idea) => idea.featured);
  const flagship = featuredIdeas[0];
  const rest = featuredIdeas.slice(1, 3);

  if (!flagship) return null;

  return (
    <section id="ideas" className="py-16 md:py-24 relative">
      <div className="section-container">
        <motion.div
          className="flex items-center justify-between mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="section-title mb-0">
            <Lightbulb className="section-icon" />
            Ideas
          </h2>
        </motion.div>

        <motion.p
          className="text-[var(--text-muted)] text-sm mb-10 -mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          I publish when I learn something worth sharing.
        </motion.p>

        {/* Flagship idea — full width, elevated treatment */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <Link href={`/ideas/${flagship.slug}`} className="block group">
            <div className="glass-card p-8 md:p-10 relative overflow-hidden">
              {/* Gold accent line — left edge */}
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[var(--accent-gold)] via-[var(--accent-gold)]/60 to-transparent" />

              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs text-[var(--accent-gold)] font-body tracking-wider uppercase">
                      {flagship.category}
                    </span>
                    <span className="text-[var(--text-muted)] text-xs">
                      {flagship.readTime}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-semibold text-[var(--text-primary)] mb-4 group-hover:text-[var(--accent-gold)] transition-colors duration-300 leading-tight">
                    {flagship.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] text-base leading-relaxed max-w-2xl">
                    {flagship.excerpt}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)] group-hover:text-[var(--accent-gold)] transition-colors duration-300 shrink-0 md:mt-8">
                  <span>Read</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Other featured ideas — 2 column grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {rest.map((idea, index) => (
            <IdeaCard key={idea.slug} idea={idea} index={index} />
          ))}
        </div>

        {/* View all link */}
        {ideas.length > 3 && (
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="/ideas"
              className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors duration-300"
            >
              <span>View all ideas</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};
