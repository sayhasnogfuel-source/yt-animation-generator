import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {BackgroundStyle, ThemePreset} from '../types';
import {backgroundPalette} from '../lib/style-presets';
import {themePresets} from '../lib/theme-presets';

export const AnimatedBackground: React.FC<{stylePreset: BackgroundStyle; themePreset: ThemePreset}> = ({stylePreset, themePreset}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const colors = backgroundPalette[stylePreset];
  const theme = themePresets[themePreset];
  const drift = interpolate(frame, [0, durationInFrames], [0, 540]);

  return (
    <AbsoluteFill style={{background: `radial-gradient(circle at ${35 + Math.sin(drift / 25) * 25}% ${38 + Math.cos(drift / 18) * 18}%, ${theme.primary}33, transparent 50%), linear-gradient(160deg, ${colors[0]}, ${colors[1]} 34%, ${colors[2]} 70%, ${colors[3]})`}}>
      <AbsoluteFill
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '76px 76px',
          transform: `translate(${Math.sin(frame / 35) * 18}px, ${Math.cos(frame / 45) * 18}px) scale(1.06)`,
          opacity: stylePreset === 'minimal-dark' ? 0.08 : 0.25,
        }}
      />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: 220 - i * 22,
            height: 220 - i * 22,
            borderRadius: '50%',
            border: `2px solid ${theme.secondary}40`,
            top: `${10 + i * 14 + Math.sin((frame + i * 20) / 25) * 2}%`,
            left: `${(i * 17 + frame * 0.08) % 120 - 10}%`,
            filter: 'blur(1px)',
          }}
        />
      ))}
    </AbsoluteFill>
  );
};
