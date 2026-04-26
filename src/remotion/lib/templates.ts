import {VideoProject} from '../types';

const base = {
  tone: 'High-energy and clear',
  backgroundStyle: 'neon-gradient',
  captionMode: 'sentence',
  themePreset: 'neon-pulse',
  soundEffectMarkers: [45, 90, 150, 240, 360],
} satisfies Partial<VideoProject>;

export const templates: Record<string, VideoProject> = {
  'story-30': {
    id: 'story-30',
    title: '30-Second Story Short',
    niche: 'Storytelling',
    script:
      'I almost quit content creation last year. Then I changed one habit: I posted daily, even imperfectly. That one shift tripled my confidence and built momentum. If you are stuck, start ugly and stay consistent.',
    callToAction: 'Comment START if you want a 7-day posting plan.',
    animationStyle: 'reddit-story',
    ...base,
  } as VideoProject,
  'facts-45': {
    id: 'facts-45',
    title: '45-Second Facts Short',
    niche: 'Facts',
    script:
      'Your brain uses around twenty percent of your energy. Trees can communicate stress signals through root fungi. Octopuses have three hearts. If this surprised you, save this short for later.',
    callToAction: 'Follow for daily mind-blowing facts.',
    animationStyle: 'quiz-trivia',
    backgroundStyle: 'cyber-lines',
    themePreset: 'arcade-pop',
    tone: 'Fast, curious, and punchy',
    captionMode: 'word',
    soundEffectMarkers: [24, 48, 72, 120, 210, 330],
  },
  'motivational-60': {
    id: 'motivational-60',
    title: '60-Second Motivational Short',
    niche: 'Self-improvement',
    script:
      'Nobody sees the reps behind your success. They only see the result. Build your future by protecting your mornings, training your focus, and keeping promises to yourself. Every small win compounds. One disciplined month can change your year.',
    callToAction: 'Share this with someone who needs a push today.',
    animationStyle: 'motivational',
    backgroundStyle: 'sunset-wave',
    themePreset: 'cinematic-gold',
    tone: 'Inspiring and direct',
    captionMode: 'sentence',
    soundEffectMarkers: [30, 75, 140, 220, 300, 420, 510],
  },
  'roblox-skit-30': {
    id: 'roblox-skit-30',
    title: '30-Second Roblox-Style Skit',
    niche: 'Gaming story',
    script:
      'Noah said he could win with no upgrades. Ava laughed and accepted the challenge. The timer started. Noah dodged every obstacle and reached the final platform with one second left. Ava stared at the screen and said, okay, rematch.',
    callToAction: 'Drop ROUND 2 if you want the sequel.',
    animationStyle: 'roblox-story',
    backgroundStyle: 'midnight-grid',
    themePreset: 'arcade-pop',
    tone: 'Playful and dramatic',
    captionMode: 'word',
    soundEffectMarkers: [18, 45, 90, 140, 210, 300, 390],
  },
};
