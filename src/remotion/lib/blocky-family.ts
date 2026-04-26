import {BlockyCharacter, BlockyFamilyProject, DialogueBeat, Emotion, ShotType} from '../types';

const fallbackCharacters: BlockyCharacter[] = [
  {id: 'kid-1', name: 'Milo', ageGroup: 'child', shirtColor: '#60a5fa', skinTone: '#f1c27d', hairStyle: 'spiky', eyeVariant: 'wide', eyebrowVariant: 'thick'},
  {id: 'mom-1', name: 'Mom', ageGroup: 'adult', shirtColor: '#f472b6', skinTone: '#e0ac69', hairStyle: 'ponytail', eyeVariant: 'oval', eyebrowVariant: 'curved'},
  {id: 'sis-1', name: 'Lia', ageGroup: 'child', shirtColor: '#34d399', skinTone: '#c68642', hairStyle: 'curly', eyeVariant: 'round', eyebrowVariant: 'flat'},
];

export const blockyFamilyTemplates: Record<string, BlockyFamilyProject> = {
  'blocky-main': {
    title: 'BlockyFamilyShort',
    script: 'Milo: I only took one chip!\nLia: That bag was full a minute ago.\nMom: Who spilled crumbs on the couch?\nMilo: Uh... the couch ate them.',
    characterList: fallbackCharacters,
    location: 'living-room',
    props: ['chip-bag', 'table', 'toy'],
    mood: 'playful drama',
    subtitleTiming: 'scene',
    endingCta: 'Comment who was lying 👇',
  },
  'chips-story': {
    title: 'He wouldn\'t share his chips',
    script: 'Noah: These are MY chips.\nAva: You promised we would split them.\nNoah: I said maybe.\nAva: Mom! Noah is hiding the bag!',
    characterList: fallbackCharacters,
    location: 'kitchen',
    props: ['chip-bag', 'drink-cup', 'table'],
    mood: 'funny argument',
    subtitleTiming: 'scene',
    endingCta: 'Tag a sibling who does this 😂',
  },
  'broke-toy': {
    title: 'Mom found out who broke the toy',
    script: 'Mom: Why is this toy cracked?\nLia: It was fine this morning.\nMilo: Maybe the dog stepped on it...\nMom: We do not have a dog, Milo.',
    characterList: fallbackCharacters,
    location: 'bedroom',
    props: ['toy', 'book', 'chair'],
    mood: 'guilty reveal',
    subtitleTiming: 'scene',
    endingCta: 'Should Mom forgive him? 👀',
  },
  'lies-bigger': {
    title: 'Every time he lies, he gets bigger',
    script: 'Narrator: Every lie makes Jax grow one block taller.\nJax: I did not eat dessert.\nLia: Then why is your face chocolate?\nNarrator: Boom, two blocks taller.',
    characterList: fallbackCharacters,
    location: 'school-hallway',
    props: ['book', 'phone', 'table'],
    mood: 'magical comedy',
    subtitleTiming: 'scene',
    endingCta: 'Part 2 if he reaches the ceiling!',
  },
};

const detectEmotion = (text: string): Emotion => {
  const t = text.toLowerCase();
  if (t.includes('!') || t.includes('boom')) return 'shocked';
  if (t.includes('sorry') || t.includes('uh')) return 'guilty';
  if (t.includes('my') || t.includes('no ')) return 'mad';
  if (t.includes('yay') || t.includes('haha')) return 'excited';
  return 'neutral';
};

const shotCycle: ShotType[] = ['closeup', 'reaction', 'over-shoulder', 'medium', 'dramatic-zoom'];

export const parseDialogueToBeats = (script: string, fps: number, characters: BlockyCharacter[]): DialogueBeat[] => {
  const lines = script.split('\n').map((line) => line.trim()).filter(Boolean);

  return lines.map((line, index) => {
    const [speakerName, ...rest] = line.split(':');
    const text = rest.join(':').trim() || line;
    const found = characters.find((c) => c.name.toLowerCase() === speakerName.toLowerCase());
    const speakerId = found?.id ?? characters[index % characters.length]?.id ?? 'kid-1';
    const wordCount = Math.max(text.split(/\s+/).length, 4);
    const durationInFrames = Math.min(Math.max(Math.floor((wordCount / 2.6) * fps), fps * 2), fps * 4);

    return {
      speakerId,
      text,
      subtitle: text,
      emotion: detectEmotion(text),
      shot: shotCycle[index % shotCycle.length],
      durationInFrames,
      prop: index % 2 === 0 ? 'chip-bag' : undefined,
    };
  });
};
