import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {ShotType} from '../../types';

const shotValues: Record<ShotType, {scale: number; x: number; y: number}> = {
  closeup: {scale: 1.2, x: -80, y: 10},
  medium: {scale: 1, x: 0, y: 0},
  'over-shoulder': {scale: 1.08, x: 70, y: 8},
  reaction: {scale: 1.16, x: -120, y: -8},
  'dramatic-zoom': {scale: 1.25, x: 0, y: -20},
};

export const CameraRig: React.FC<{shot: ShotType; children: React.ReactNode}> = ({shot, children}) => {
  const frame = useCurrentFrame();
  const v = shotValues[shot];
  const wobble = interpolate(Math.sin(frame / 18), [-1, 1], [-6, 6]);
  return <div style={{width: '100%', height: '100%', transform: `translate(${v.x + wobble}px, ${v.y}px) scale(${v.scale})`, transformOrigin: 'center center'}}>{children}</div>;
};
