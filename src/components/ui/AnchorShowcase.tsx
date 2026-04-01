"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * Pixel-accurate phone mockup of Anchor's habit-tracking UI.
 * Based on the real app: light mode, glass-morphism, Inter + Playfair Display fonts.
 */

const habits = [
  {
    name: "Exercise (20 Pushups)",
    subtitle: "at home & dead hang",
    streak: 6,
    days: [true, true, true, true, true, true, null],
    health: 92,
    frequency: "6 times a day",
  },
  {
    name: "30 minutes of Audiobook",
    subtitle: "Read with focus",
    streak: 3,
    days: [true, true, false, true, true, true, null],
    health: 78,
    frequency: "Daily",
  },
  {
    name: "Morning Meditation",
    subtitle: "15 Minutes of NSDR",
    streak: 1,
    days: [true, true, true, true, false, true, null],
    health: 85,
    frequency: "Daily",
  },
];

const dayLabels = ["Fr", "Sa", "Su", "Mo", "Tu", "We", "Th"];

const HealthRing: React.FC<{ score: number; size?: number }> = ({
  score,
  size = 32,
}) => {
  const r = (size - 6) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 85 ? "#4ade80" : score >= 70 ? "#fbbf24" : "#f87171";

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="absolute"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(0,0,0,0.06)"
          strokeWidth="3"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: "stroke-dashoffset 0.6s ease-out" }}
        />
      </svg>
      <span
        className="font-extrabold leading-none"
        style={{
          fontSize: size * 0.28,
          color,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {score}
      </span>
    </div>
  );
};

const HabitCard: React.FC<{
  habit: (typeof habits)[0];
  index: number;
}> = ({ habit, index }) => (
  <motion.div
    className="relative overflow-hidden mb-2"
    style={{
      padding: "12px",
      background: "rgba(255, 255, 255, 0.35)",
      backdropFilter: "blur(12px) saturate(180%)",
      WebkitBackdropFilter: "blur(12px) saturate(180%)",
      border: "1px solid rgba(255, 255, 255, 0.4)",
      borderTop: "1.5px solid rgba(255, 255, 255, 0.6)",
      borderRadius: "14px",
      boxShadow:
        "0 4px 16px 0 rgba(0, 0, 0, 0.06), inset 0 1px 1px 0 rgba(255, 255, 255, 0.5)",
    }}
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{
      delay: 0.3 + index * 0.12,
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    }}
  >
    {/* Shine overlay */}
    <div
      className="absolute top-0 left-0 right-0 pointer-events-none"
      style={{
        height: "50%",
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%)",
        borderRadius: "14px 14px 0 0",
      }}
    />

    <div className="flex items-start justify-between mb-1.5 relative">
      <div className="flex-1 min-w-0 pr-16">
        <p
          className="truncate leading-tight"
          style={{
            fontSize: "10px",
            fontWeight: 600,
            color: "rgba(20, 20, 30, 0.95)",
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          {habit.name}
        </p>
        <p
          className="mt-0.5"
          style={{
            fontSize: "8px",
            color: "rgba(50, 50, 60, 0.7)",
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          {habit.frequency}
        </p>
      </div>
      {/* Health ring + streak */}
      <div className="absolute top-0 right-0 flex items-center gap-1">
        <HealthRing score={habit.health} size={22} />
        <div className="flex items-center gap-0.5">
          <span style={{ fontSize: "9px" }}>🔥</span>
          <span
            style={{
              fontSize: "9px",
              fontWeight: 700,
              color: "#f97316",
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            {habit.streak}
          </span>
        </div>
      </div>
    </div>

    {/* Day circles — the signature UI element */}
    <div className="flex items-start gap-1 mt-1.5">
      {habit.days.map((status, i) => (
        <div key={i} className="flex flex-col items-center gap-0.5">
          <div
            className="flex items-center justify-center"
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              fontSize: "6px",
              fontWeight: 600,
              fontFamily: "Inter, system-ui, sans-serif",
              color:
                status === true
                  ? "#fff"
                  : status === false
                    ? "#fff"
                    : "rgba(20, 20, 30, 0.9)",
              background:
                status === true
                  ? "#4ade80"
                  : status === false
                    ? "#f87171"
                    : "rgba(200, 200, 200, 0.3)",
              transition: "all 0.2s ease",
            }}
          >
            {dayLabels[i]}
          </div>
          {i === dayLabels.length - 1 && (
            <span
              style={{
                fontSize: "5px",
                fontWeight: 600,
                color: "rgba(50, 50, 60, 0.85)",
                textTransform: "uppercase",
                letterSpacing: "0.01em",
              }}
            >
              TODAY
            </span>
          )}
        </div>
      ))}
    </div>
  </motion.div>
);

export const AnchorShowcase: React.FC = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center py-4">
      {/* Phone frame — iPhone style */}
      <motion.div
        className="relative overflow-hidden"
        style={{
          width: "210px",
          borderRadius: "26px",
          background:
            "linear-gradient(135deg, #fafafa 0%, #f5f5f5 20%, #f0f0f0 40%, rgba(196, 181, 253, 0.08) 70%, rgba(167, 139, 250, 0.12) 100%)",
          border: "1px solid rgba(0, 0, 0, 0.08)",
          boxShadow:
            "0 25px 60px rgba(0, 0, 0, 0.25), 0 8px 24px rgba(0, 0, 0, 0.15), inset 0 0.5px 0 rgba(255, 255, 255, 0.8)",
        }}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* iOS Status bar */}
        <div className="flex items-center justify-between px-5 pt-2.5 pb-1">
          <span
            style={{
              fontSize: "8px",
              fontWeight: 600,
              color: "rgba(20, 20, 30, 0.9)",
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            9:41
          </span>
          <div className="flex items-center gap-1">
            {/* Signal bars */}
            <div className="flex items-end gap-px">
              {[3, 4.5, 6, 7.5].map((h, i) => (
                <div
                  key={i}
                  style={{
                    width: "2px",
                    height: `${h}px`,
                    borderRadius: "1px",
                    background: "rgba(20, 20, 30, 0.8)",
                  }}
                />
              ))}
            </div>
            {/* Battery */}
            <div
              style={{
                width: "16px",
                height: "8px",
                borderRadius: "2px",
                border: "1px solid rgba(20, 20, 30, 0.3)",
                padding: "1px",
                marginLeft: "2px",
              }}
            >
              <div
                style={{
                  width: "80%",
                  height: "100%",
                  borderRadius: "1px",
                  background: "rgba(20, 20, 30, 0.7)",
                }}
              />
            </div>
          </div>
        </div>

        {/* App header — matches real app */}
        <div className="relative text-center pt-1 pb-2 px-4">
          <motion.h3
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "22px",
              fontWeight: 700,
              background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.02em",
              margin: 0,
              lineHeight: 1.2,
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            Anchor
          </motion.h3>
          <p
            style={{
              fontSize: "7px",
              color: "rgba(50, 50, 60, 0.7)",
              fontFamily: "Inter, system-ui, sans-serif",
              letterSpacing: "0.01em",
              marginTop: "2px",
            }}
          >
            Build better habits, one day at a time
          </p>
          {/* Edit button — top right */}
          <div
            className="absolute right-4 flex items-center gap-0.5"
            style={{
              top: "8px",
              padding: "3px 6px",
              borderRadius: "8px",
              fontSize: "7px",
              fontWeight: 600,
              color: "rgba(50, 50, 60, 0.7)",
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            <svg width="7" height="7" viewBox="0 0 16 16" fill="none">
              <path
                d="M11.5 1.5L14.5 4.5L5 14H2V11L11.5 1.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Edit
          </div>
        </div>

        {/* Habit cards */}
        <div className="px-2.5 pb-2">
          {habits.map((habit, i) => (
            <HabitCard key={habit.name} habit={habit} index={i} />
          ))}
        </div>

        {/* Bottom nav — glass morphism pill */}
        <div className="px-2 pb-2">
          <div
            className="flex items-center"
            style={{
              padding: "4px",
              borderRadius: "16px",
              background: "rgba(255, 255, 255, 0.35)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              border: "1px solid rgba(255, 255, 255, 0.4)",
              borderTop: "1.5px solid rgba(255, 255, 255, 0.6)",
              boxShadow:
                "0 4px 16px 0 rgba(0, 0, 0, 0.06), inset 0 1px 1px 0 rgba(255, 255, 255, 0.5)",
            }}
          >
            {[
              { label: "Habits", active: true },
              { label: "Friends", active: false },
              { label: "Messages", active: false },
              { label: "Settings", active: false },
            ].map((tab) => (
              <div
                key={tab.label}
                className="flex-1 text-center"
                style={{
                  padding: "6px 2px",
                  borderRadius: "10px",
                  fontSize: "7px",
                  fontWeight: 600,
                  fontFamily: "Inter, system-ui, sans-serif",
                  letterSpacing: "0.025em",
                  color: tab.active ? "#fff" : "rgba(50, 50, 60, 0.7)",
                  background: tab.active
                    ? "linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)"
                    : "transparent",
                  boxShadow: tab.active
                    ? "0 2px 8px rgba(0, 0, 0, 0.15)"
                    : "none",
                }}
              >
                {tab.label}
              </div>
            ))}
          </div>
        </div>

        {/* Home indicator */}
        <div className="flex justify-center pb-1.5 pt-0.5">
          <div
            style={{
              width: "48px",
              height: "3px",
              borderRadius: "2px",
              background: "rgba(20, 20, 30, 0.15)",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};
