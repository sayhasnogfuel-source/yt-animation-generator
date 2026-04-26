import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {BlockyCharacter, Emotion, PropType} from '../../types';

const mouthForEmotion: Record<Emotion, string> = {
  neutral: '38% 60% 60% 45%',
  sad: '45% 45% 65% 65%',
  mad: '65% 65% 40% 40%',
  shocked: '50%',
  guilty: '45% 40% 60% 55%',
  excited: '35% 35% 60% 60%',
};

const eyebrowRotation: Record<Emotion, number> = {neutral: 0, sad: -12, mad: 15, shocked: -20, guilty: -7, excited: -5};

const propShape: Record<PropType, React.CSSProperties> = {
  'chip-bag': {width: 56, height: 70, background: 'linear-gradient(#f59e0b,#ef4444)', borderRadius: 10},
  'snack-bag': {width: 56, height: 70, background: 'linear-gradient(#a855f7,#ec4899)', borderRadius: 10},
  'drink-cup': {width: 42, height: 64, background: '#f8fafc', borderRadius: '8px 8px 14px 14px'},
  phone: {width: 34, height: 58, background: '#111827', borderRadius: 8},
  chair: {width: 70, height: 70, background: '#7c3aed', borderRadius: 8},
  table: {width: 92, height: 52, background: '#b45309', borderRadius: 8},
  toy: {width: 50, height: 50, background: '#22c55e', borderRadius: 8},
  book: {width: 56, height: 46, background: '#2563eb', borderRadius: 6},
};

export const BlockyCharacter3D: React.FC<{character: BlockyCharacter; emotion: Emotion; x: number; scale?: number; prop?: PropType}> = ({character, emotion, x, scale = 1, prop}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const blink = Math.sin(frame / 16 + x) > 0.94 ? 0.2 : 1;
  const idle = Math.sin(frame / 9 + x) * 8;
  const headTurn = interpolate(Math.sin(frame / 20 + x), [-1, 1], [-10, 10]);
  const armReach = spring({frame: frame % (fps * 2), fps, config: {damping: 12}});

  return (
    <div style={{position: 'absolute', left: x, bottom: 260 + idle, transform: `scale(${scale})`, filter: 'drop-shadow(0 20px 16px rgba(0,0,0,0.35))'}}>
      <div style={{width: 92, height: 124, background: character.shirtColor, borderRadius: 22, transform: `perspective(400px) rotateY(${headTurn * 0.25}deg)`}} />
      <div style={{position: 'absolute', top: -90, left: 8, width: 76, height: 76, borderRadius: 18, background: character.skinTone, transform: `perspective(500px) rotateY(${headTurn}deg)`}}>
        <div style={{position: 'absolute', top: 14, left: 12, width: 18, height: 12 * blink, background: '#0f172a', borderRadius: 12}} />
        <div style={{position: 'absolute', top: 14, right: 12, width: 18, height: 12 * blink, background: '#0f172a', borderRadius: 12}} />
        <div style={{position: 'absolute', top: 7, left: 10, width: 22, height: 4, background: '#1f2937', transform: `rotate(${eyebrowRotation[emotion]}deg)`}} />
        <div style={{position: 'absolute', top: 7, right: 10, width: 22, height: 4, background: '#1f2937', transform: `rotate(${-eyebrowRotation[emotion]}deg)`}} />
        <div style={{position: 'absolute', bottom: 14, left: 22, width: 32, height: 14, background: '#7f1d1d', borderRadius: mouthForEmotion[emotion]}} />
      </div>
      <div style={{position: 'absolute', top: -110, left: 2, width: 86, height: 24, borderRadius: 12, background: '#111827'}} />

      <div style={{position: 'absolute', left: -18, top: 14, width: 18, height: 68, borderRadius: 9, background: character.skinTone, transform: `rotate(${8 + armReach * 15}deg)`}} />
      <div style={{position: 'absolute', right: -18, top: 14, width: 18, height: 68, borderRadius: 9, background: character.skinTone, transform: `rotate(${-8 - armReach * 15}deg)`}} />
      {prop ? <div style={{position: 'absolute', right: -44, top: 30, ...propShape[prop]}} /> : null}
    </div>
  );
};
