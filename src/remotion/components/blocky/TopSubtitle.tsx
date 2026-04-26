import React from 'react';
import {AbsoluteFill} from 'remotion';

export const TopSubtitle: React.FC<{text: string}> = ({text}) => {
  return (
    <AbsoluteFill style={{justifyContent: 'flex-start', alignItems: 'center', paddingTop: 58, pointerEvents: 'none'}}>
      <div style={{background: '#000d', color: '#fff', fontSize: 46, fontWeight: 800, lineHeight: 1.1, maxWidth: 980, borderRadius: 14, padding: '14px 20px', textAlign: 'center'}}>{text}</div>
    </AbsoluteFill>
  );
};
