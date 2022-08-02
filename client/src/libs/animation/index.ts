import { Variants } from "framer-motion";

export const formVariant: Variants = {
  hidden: {
    opacity: 0,
    y: "100%",
  },
  visible: {
    opacity: 1,
    y: 0,
    zIndex: 999,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    opacity: 0,
    y: "150%",
    transition: {
      type: "tween",
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

export const modalVariant: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

export const shortVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    opacity: 0,
    y: 30,
    transition: {
      type: "tween",
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

export const menuVariant: Variants = {
  visible: {
    opacity: 1,
    scale: 1,
    right: 25,
    top: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  hidden: {
    opacity: 0,
    scale: 0,
    right: -35,
    top: 30,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};
