import {AnimationStyle, BackgroundStyle} from '../types';

export const backgroundPalette: Record<BackgroundStyle, string[]> = {
  'neon-gradient': ['#09090f', '#301860', '#5f2eea', '#19d3ff'],
  'midnight-grid': ['#090b13', '#111a2a', '#20395e', '#4d7cff'],
  'sunset-wave': ['#180f26', '#642b73', '#c6426e', '#ff8c42'],
  'minimal-dark': ['#080808', '#111111', '#1a1a1a', '#2d2d2d'],
  'cyber-lines': ['#040711', '#031838', '#025b8c', '#00d4ff'],
};

export const accentByStyle: Record<AnimationStyle, string> = {
  'roblox-story': '#67f28f',
  'faceless-documentary': '#ffd166',
  'reddit-story': '#ff6b6b',
  'quiz-trivia': '#7c4dff',
  'money-business': '#00c853',
  'scary-story': '#ff1744',
  motivational: '#00e5ff',
};

export const transitionForIndex = (index: number) => (index % 2 === 0 ? 'zoom' : 'swipe');
