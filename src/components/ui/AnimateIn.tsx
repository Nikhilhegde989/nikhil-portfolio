import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const viewport = { once: true, margin: '-60px' };

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const FadeUp: React.FC<Props> = ({ children, className, delay = 0 }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 36 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={viewport}
    transition={{ duration: 0.6, ease: EASE, delay }}
  >
    {children}
  </motion.div>
);

export const FadeIn: React.FC<Props> = ({ children, className, delay = 0 }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={viewport}
    transition={{ duration: 0.5, ease: 'easeOut', delay }}
  >
    {children}
  </motion.div>
);

export const SlideLeft: React.FC<Props> = ({ children, className, delay = 0 }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, x: 40 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={viewport}
    transition={{ duration: 0.6, ease: EASE, delay }}
  >
    {children}
  </motion.div>
);

export const ScaleIn: React.FC<Props> = ({ children, className, delay = 0 }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, scale: 0.88 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={viewport}
    transition={{ duration: 0.5, ease: EASE, delay }}
  >
    {children}
  </motion.div>
);

export const StaggerGrid: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="visible"
    viewport={viewport}
    variants={staggerContainer}
  >
    {children}
  </motion.div>
);

export const StaggerItem: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <motion.div className={className} variants={staggerItem}>
    {children}
  </motion.div>
);
