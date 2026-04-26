import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {EnvironmentType, PropType} from '../../types';

const envGradients: Record<EnvironmentType, string> = {
  kitchen: 'linear-gradient(170deg,#bfe9ff,#d8f4de,#fef3c7)',
  bedroom: 'linear-gradient(170deg,#dbeafe,#f5d0fe,#fde68a)',
  'living-room': 'linear-gradient(170deg,#bfdbfe,#fde68a,#fecaca)',
  'school-hallway': 'linear-gradient(170deg,#bae6fd,#ddd6fe,#bbf7d0)',
};

const propBlock = (prop: PropType, index: number) => ({
  width: prop.includes('bag') ? 82 : 95,
  height: 70,
  background: ['#f59e0b', '#f43f5e', '#22c55e', '#3b82f6', '#8b5cf6'][index % 5],
  left: 70 + index * 120,
  bottom: 210 + (index % 2) * 12,
});

export const BlockyEnvironment: React.FC<{location: EnvironmentType; props: PropType[]}> = ({location, props}) => {
  const frame = useCurrentFrame();
  const blur = interpolate(Math.sin(frame / 50), [-1, 1], [2, 5]);

  return (
    <AbsoluteFill style={{background: envGradients[location]}}>
      <AbsoluteFill style={{opacity: 0.14, backgroundImage: 'linear-gradient(rgba(0,0,0,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.18) 1px, transparent 1px)', backgroundSize: '90px 90px'}} />
      <div style={{position: 'absolute', bottom: 0, left: -40, right: -40, height: 300, background: 'linear-gradient(180deg,#f8fafc00,#94a3b8aa)', filter: `blur(${blur}px)`}} />
      {props.map((prop, idx) => (
        <div key={`${prop}-${idx}`} style={{position: 'absolute', borderRadius: 12, boxShadow: '0 14px 24px rgba(0,0,0,0.2)', ...propBlock(prop, idx)}} />
      ))}
    </AbsoluteFill>
  );
};
