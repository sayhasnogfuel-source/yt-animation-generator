import React from 'react';
import {AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {CaptionMode, ThemePreset} from '../types';
import {themePresets} from '../lib/theme-presets';

const words = (text: string) => text.split(/\s+/).filter(Boolean);

const wordWeight = (word: string) => {
  if (/[!?]/.test(word)) return 1.8;
  if (/[,.]/.test(word)) return 1.3;
  return Math.max(1, word.length / 4);
};

export const Captions: React.FC<{
  text: string;
  mode: CaptionMode;
  startFrame: number;
  durationInFrames: number;
  themePreset: ThemePreset;
}> = ({text, mode, startFrame, durationInFrames, themePreset}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const theme = themePresets[themePreset];
  const progress = spring({frame: frame - startFrame, fps, config: {damping: 14, stiffness: 140}});

  if (mode === 'sentence') {
    const glow = interpolate(progress, [0, 1], [0.3, 1]);
    return (
      <AbsoluteFill style={{justifyContent: 'flex-end', padding: '0 62px 230px'}}>
        <div
          style={{
            fontSize: 64,
            fontWeight: 850,
            lineHeight: 1.08,
            color: 'white',
            textShadow: `0 8px 24px rgba(0,0,0,0.8), 0 0 28px ${theme.glow}`,
            background: theme.captionBg,
            borderRadius: 26,
            padding: '24px 30px',
            transform: `translateY(${(1 - progress) * 18}px) scale(${0.95 + progress * 0.05})`,
            border: `2px solid ${theme.primary}55`,
            boxShadow: `0 10px 35px ${theme.glow}`,
            opacity: glow,
          }}
        >
          {text}
        </div>
      </AbsoluteFill>
    );
  }

  const sentenceWords = words(text);
  const totalWeight = sentenceWords.reduce((acc, word) => acc + wordWeight(word), 0);

  let running = 0;
  return (
    <AbsoluteFill style={{justifyContent: 'flex-end', padding: '0 62px 230px'}}>
      <div style={{display: 'flex', gap: 10, flexWrap: 'wrap', maxWidth: 940}}>
        {sentenceWords.map((word, index) => {
          const weight = wordWeight(word);
          const from = startFrame + Math.floor((running / totalWeight) * durationInFrames);
          running += weight;
          const until = startFrame + Math.floor((running / totalWeight) * durationInFrames);
          const slot = Math.max(until - from, 3);

          return (
            <Sequence key={`${word}-${index}`} from={from} durationInFrames={slot + 4}>
              <span
                style={{
                  fontSize: 56,
                  fontWeight: 900,
                  color: 'white',
                  background: theme.captionBg,
                  borderRadius: 14,
                  padding: '8px 14px',
                  border: `2px solid ${theme.secondary}66`,
                  textShadow: '0 4px 12px rgba(0,0,0,0.8)',
                }}
              >
                {word}
              </span>
            </Sequence>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
