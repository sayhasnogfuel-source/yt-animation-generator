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

export type EnvironmentType = 'kitchen' | 'bedroom' | 'living-room' | 'school-hallway';
export type PropType = 'chip-bag' | 'snack-bag' | 'drink-cup' | 'phone' | 'chair' | 'table' | 'toy' | 'book';
export type Emotion = 'sad' | 'mad' | 'shocked' | 'guilty' | 'excited' | 'neutral';
export type ShotType = 'closeup' | 'medium' | 'over-shoulder' | 'reaction' | 'dramatic-zoom';

export type BlockyCharacter = {
  id: string;
  name: string;
  ageGroup: 'child' | 'adult';
  shirtColor: string;
  skinTone: string;
  hairStyle: 'short' | 'ponytail' | 'spiky' | 'curly';
  eyeVariant: 'round' | 'oval' | 'wide';
  eyebrowVariant: 'thick' | 'curved' | 'flat';
};

export type DialogueBeat = {
  speakerId: string;
  text: string;
  emotion: Emotion;
  shot: ShotType;
  durationInFrames: number;
  subtitle?: string;
  prop?: PropType;
};

export type BlockyFamilyProject = {
  title: string;
  script: string;
  characterList: BlockyCharacter[];
  location: EnvironmentType;
  props: PropType[];
  mood: string;
  subtitleTiming: 'scene' | 'word';
  endingCta: string;
};
