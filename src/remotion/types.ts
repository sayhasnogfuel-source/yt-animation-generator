export type CaptionMode = 'word' | 'sentence';

export type AnimationStyle =
  | 'roblox-story'
  | 'faceless-documentary'
  | 'reddit-story'
  | 'quiz-trivia'
  | 'money-business'
  | 'scary-story'
  | 'motivational';

export type BackgroundStyle =
  | 'neon-gradient'
  | 'midnight-grid'
  | 'sunset-wave'
  | 'minimal-dark'
  | 'cyber-lines';

export type ThemePreset =
  | 'neon-pulse'
  | 'cinematic-gold'
  | 'horror-red'
  | 'clean-corporate'
  | 'arcade-pop';

export type VideoProject = {
  id: string;
  title: string;
  niche: string;
  script: string;
  tone: string;
  callToAction: string;
  backgroundStyle: BackgroundStyle;
  voiceoverPath?: string;
  captionMode: CaptionMode;
  animationStyle: AnimationStyle;
  themePreset: ThemePreset;
  soundEffectMarkers: number[];
};

export type Scene = {
  id: string;
  text: string;
  startFrame: number;
  durationInFrames: number;
  isHook?: boolean;
};
