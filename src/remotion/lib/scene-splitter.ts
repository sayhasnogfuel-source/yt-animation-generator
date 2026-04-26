import {Scene} from '../types';

const sanitizeSentences = (script: string): string[] =>
  script
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

export const splitScriptIntoScenes = (
  script: string,
  fps: number,
  totalDurationInFrames: number
): Scene[] => {
  const sentences = sanitizeSentences(script);
  if (sentences.length === 0) {
    return [
      {
        id: 'scene-1',
        text: 'Add your script to generate scenes.',
        startFrame: 0,
        durationInFrames: totalDurationInFrames,
        isHook: true,
      },
    ];
  }

  const hookDuration = Math.min(2 * fps, Math.floor(totalDurationInFrames * 0.12));
  const remaining = Math.max(totalDurationInFrames - hookDuration, fps * 3);
  const weights = sentences.map((s, idx) => (idx === 0 ? 1 : Math.max(1, s.split(/\s+/).length / 10)));
  const totalWeight = weights.reduce((a, b) => a + b, 0);

  let cursor = 0;
  return sentences.map((text, index) => {
    const weightedFrames = Math.floor((weights[index] / totalWeight) * remaining);
    const duration = index === 0 ? hookDuration : Math.max(weightedFrames, Math.floor(2.2 * fps));
    const scene: Scene = {
      id: `scene-${index + 1}`,
      text,
      startFrame: cursor,
      durationInFrames: duration,
      isHook: index === 0,
    };
    cursor += duration;
    return scene;
  });
};

export const generateSoundEffectMarkers = (scenes: Scene[], fps: number): number[] => {
  const markers = scenes.flatMap((scene, index) => {
    const intro = scene.startFrame + Math.floor(Math.min(scene.durationInFrames * 0.15, fps));
    const impact = scene.startFrame + Math.floor(scene.durationInFrames * 0.75);
    return index === 0 ? [intro] : [intro, impact];
  });
  return [...new Set(markers)].filter((f) => Number.isFinite(f)).sort((a, b) => a - b);
};
