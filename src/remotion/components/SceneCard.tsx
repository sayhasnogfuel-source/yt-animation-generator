import React from 'react';
import {AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {AnimationStyle, Scene, ThemePreset} from '../types';
import {accentByStyle, transitionForIndex} from '../lib/style-presets';
import {themePresets} from '../lib/theme-presets';

export const SceneCard: React.FC<{
  scene: Scene;
  index: number;
  stylePreset: AnimationStyle;
  themePreset: ThemePreset;
  title: string;
  niche: string;
}> = ({scene, index, stylePreset, themePreset, title, niche}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const theme = themePresets[themePreset];
  const accent = accentByStyle[stylePreset] ?? theme.primary;
  const localFrame = frame - scene.startFrame;
  const enter = spring({frame: localFrame, fps, config: {damping: 13, stiffness: 120}});
  const pulse = Math.sin(localFrame / 5) * 10;
  const transition = transitionForIndex(index);
  const moveX = transition === 'swipe' ? interpolate(localFrame, [0, 20], [200, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)}) : 0;
  const zoom = transition === 'zoom' ? interpolate(localFrame, [0, 20], [1.24, 1], {extrapolateRight: 'clamp', easing: Easing.out(Easing.exp)}) : 1;

  return (
    <AbsoluteFill style={{padding: 72, transform: `translateX(${moveX}px) scale(${zoom})`}}>
      <div
        style={{
          borderRadius: 36,
          border: `2px solid ${theme.primary}88`,
          background: 'linear-gradient(140deg, rgba(10,10,20,0.75), rgba(25,25,45,0.45))',
          backdropFilter: 'blur(12px)',
          padding: '42px 46px',
          boxShadow: `0 30px 60px ${theme.glow}`,
          transform: `translateY(${(1 - enter) * 60}px)`,
        }}
      >
        <div style={{fontSize: 30, color: '#d7e4ff', letterSpacing: 2, fontWeight: 700}}>{niche.toUpperCase()}</div>
        <div style={{fontFamily: theme.headingFont, fontSize: 100, marginTop: 10, color: 'white', fontWeight: 900, lineHeight: 0.95, textShadow: `0 0 30px ${theme.glow}`}}>{scene.isHook ? 'STOP SCROLLING' : title}</div>
        <div style={{fontFamily: theme.bodyFont, fontSize: 52, marginTop: 22, color: '#ecf2ff', fontWeight: 700, lineHeight: 1.12}}>{scene.text}</div>
      </div>

      <div style={{position: 'absolute', right: 110, top: 200, width: 220, height: 220, borderRadius: '50%', border: `10px solid ${accent}`, transform: `translateY(${pulse}px)`}} />
      <div style={{position: 'absolute', left: 88, bottom: 340, width: 200, height: 18, background: accent, transform: `rotate(${-25 + Math.sin(localFrame / 7) * 10}deg)`, borderRadius: 99}} />
      <div style={{position: 'absolute', left: 258, bottom: 270, width: 0, height: 0, borderTop: '24px solid transparent', borderBottom: '24px solid transparent', borderLeft: `44px solid ${accent}`}} />
    </AbsoluteFill>
  );
};
