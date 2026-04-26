import {ThemePreset} from '../types';

export type ThemeConfig = {
  name: string;
  headingFont: string;
  bodyFont: string;
  primary: string;
  secondary: string;
  captionBg: string;
  glow: string;
};

export const themePresets: Record<ThemePreset, ThemeConfig> = {
  'neon-pulse': {
    name: 'Neon Pulse',
    headingFont: '"Bebas Neue", "Anton", sans-serif',
    bodyFont: 'Inter, system-ui, sans-serif',
    primary: '#6bf4ff',
    secondary: '#a855f7',
    captionBg: 'rgba(2,8,23,0.72)',
    glow: 'rgba(106,244,255,0.35)',
  },
  'cinematic-gold': {
    name: 'Cinematic Gold',
    headingFont: '"Montserrat", "Arial Black", sans-serif',
    bodyFont: 'Inter, system-ui, sans-serif',
    primary: '#ffd166',
    secondary: '#ff9f1c',
    captionBg: 'rgba(25,19,8,0.75)',
    glow: 'rgba(255,209,102,0.3)',
  },
  'horror-red': {
    name: 'Horror Red',
    headingFont: '"Oswald", Impact, sans-serif',
    bodyFont: 'Inter, system-ui, sans-serif',
    primary: '#ff2d55',
    secondary: '#ff6b6b',
    captionBg: 'rgba(24,0,8,0.78)',
    glow: 'rgba(255,45,85,0.3)',
  },
  'clean-corporate': {
    name: 'Clean Corporate',
    headingFont: '"Poppins", "Segoe UI", sans-serif',
    bodyFont: '"Poppins", "Segoe UI", sans-serif',
    primary: '#4fc3f7',
    secondary: '#64ffda',
    captionBg: 'rgba(6,19,30,0.72)',
    glow: 'rgba(79,195,247,0.28)',
  },
  'arcade-pop': {
    name: 'Arcade Pop',
    headingFont: '"Rubik Mono One", "Arial Black", sans-serif',
    bodyFont: '"Rubik", Inter, sans-serif',
    primary: '#ff4ecd',
    secondary: '#53ffe0',
    captionBg: 'rgba(10,6,29,0.75)',
    glow: 'rgba(255,78,205,0.3)',
  },
};
