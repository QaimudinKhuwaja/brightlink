import { motion, MotionProps } from 'framer-motion';
import { ReactNode, MouseEvent } from 'react';

interface MotionDivProps extends Omit<MotionProps, 'onClick'> {
  children: ReactNode;
  className?: string;
  delay?: number;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

export default function MotionDiv({
  children,
  className = '',
  initial = { opacity: 0, y: 20 },
  whileInView = { opacity: 1, y: 0 },
  viewport = { once: true, margin: '-100px' },
  transition = { duration: 0.6 },
  delay,
  onClick,
  ...props
}: MotionDivProps) {
  return (
    <motion.div
      initial={initial}
      whileInView={whileInView}
      viewport={viewport}
      transition={delay ? { ...transition, delay } : transition}
      className={className}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );
}
