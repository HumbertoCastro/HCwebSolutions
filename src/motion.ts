export const motionTokens = {
  ease: [0.16, 1, 0.3, 1] as const,
  softEase: [0.22, 1, 0.36, 1] as const,
  duration: {
    fast: 0.22,
    base: 0.44,
    slow: 0.68,
  },
  stagger: {
    tight: 0.055,
    base: 0.08,
  },
};
