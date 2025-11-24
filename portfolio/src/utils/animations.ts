// src/utils/animations.ts

import { Variants } from 'framer-motion';

// Fade In Animations
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

// Scale Animations
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

export const scaleInPulse: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.6, 
      ease: 'easeOut',
      scale: {
        type: 'spring',
        stiffness: 200,
        damping: 15
      }
    }
  }
};

// Stagger Container
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

// Slide Animations
export const slideInLeft: Variants = {
  hidden: { x: '-100%', opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export const slideInRight: Variants = {
  hidden: { x: '100%', opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

// Rotate Animations
export const rotateIn: Variants = {
  hidden: { opacity: 0, rotate: -180 },
  visible: { 
    opacity: 1, 
    rotate: 0,
    transition: { duration: 0.8, ease: 'easeOut' }
  }
};

// Bounce Animation
export const bounceIn: Variants = {
  hidden: { opacity: 0, scale: 0.3 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10
    }
  }
};

// Flip Animation
export const flipIn: Variants = {
  hidden: { opacity: 0, rotateX: -90 },
  visible: { 
    opacity: 1, 
    rotateX: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

// Hover Effects
export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.2 }
};

export const hoverGlow = {
  boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
  transition: { duration: 0.3 }
};

export const hoverLift = {
  y: -5,
  transition: { duration: 0.2 }
};

// Tap Effects
export const tapScale = {
  scale: 0.95,
  transition: { duration: 0.1 }
};

// Viewport Settings
export const viewportOptions = {
  once: true,
  margin: '-100px',
  amount: 0.3
};

export const viewportOptionsEager = {
  once: true,
  margin: '0px',
  amount: 0.1
};

// Text Animation (Character by Character)
export const textContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.2
    }
  }
};

export const textChild: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 }
  }
};

// Card Hover Effect
export const cardHover = {
  y: -10,
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
  transition: { duration: 0.3 }
};

// Button Variants
export const buttonVariants: Variants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    boxShadow: '0 10px 30px rgba(59, 130, 246, 0.4)',
    transition: { duration: 0.2 }
  },
  tap: { scale: 0.95 }
};

// Loading Spinner
export const spinnerVariants: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear'
    }
  }
};

// Pulse Effect
export const pulseVariants: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// Floating Effect
export const floatVariants: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};
