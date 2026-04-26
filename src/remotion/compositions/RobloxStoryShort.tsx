import React from 'react';
import {AbsoluteFill, Easing, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

const dialogue = [
  {name: 'NOAH_01', line: 'No upgrades. One life. One run.'},
  {name: 'AVA_X', line: 'You choke this jump every time.'},
  {name: 'NOAH_01', line: 'Not today. Watch the timing!'},
  {name: 'AVA_X', line: 'WAIT... HE ACTUALLY DID IT?!'},
];

const Character: React.FC<{x: number; color: string; name: string; direction: 1 | -1}> = ({x, color, name, direction}) => {
  const frame = useCurrentFrame();
  const bounce = Math.abs(Math.sin(frame / 5 + x)) * 18;
  const sway = Math.sin(frame / 12 + x) * 9;
  return (
    <div style={{position: 'absolute', left: x + sway, bottom: 286 + bounce, transform: `scaleX(${direction})`}}>
      <div style={{position: 'absolute', left: -36, top: -58, background: '#000a', color: '#fff', padding: '6px 12px', borderRadius: 999, fontWeight: 800, letterSpacing: 1.1}}>{name}</div>
      <div style={{width: 86, height: 95, borderRadius: 14, background: color, boxShadow: '0 0 25px rgba(255,255,255,0.2)'}} />
      <div style={{width: 116, height: 24, marginTop: 10, borderRadius: 30, background: '#0007'}} />
    </div>
  );
};

export const RobloxStoryShort: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const zoom = interpolate(frame, [0, durationInFrames], [1.25, 1], {extrapolateRight: 'clamp'});
  const shake = interpolate(Math.sin(frame * 0.9), [-1, 1], [-6, 6], {easing: Easing.inOut(Easing.ease)});

  return (
    <AbsoluteFill style={{background: 'linear-gradient(155deg,#080a13,#0f1c40,#1a4186)', overflow: 'hidden', transform: `scale(${zoom}) translateX(${shake}px)`}}>
      <AbsoluteFill style={{backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.09) 1px, transparent 1px)', backgroundSize: '132px 132px'}} />

      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} style={{position: 'absolute', left: -80 + i * 280 + ((frame * 6) % 280), bottom: 230 + (i % 2) * 45, width: 220, height: 44, borderRadius: 12, background: i % 2 ? '#46ffa4' : '#5ca7ff', boxShadow: '0 8px 18px rgba(0,0,0,0.5)'}} />
      ))}

      <div style={{position: 'absolute', bottom: 190, left: -120, right: -120, height: 180, background: 'linear-gradient(90deg,#2adf6c,#2b7fff,#9a57ff)', transform: `translateX(${Math.sin(frame / 34) * 150}px)`}} />

      <Character x={260} color="#7efcb0" name="NOAH_01" direction={1} />
      <Character x={700} color="#ffcf6c" name="AVA_X" direction={-1} />

      {dialogue.map((item, index) => (
        <Sequence key={item.line} from={index * (fps * 3)} durationInFrames={fps * 3}>
          <div style={{position: 'absolute', top: 170 + index * 56, left: index % 2 ? 470 : 70, maxWidth: 560, padding: '16px 22px', borderRadius: 24, border: '2px solid rgba(255,255,255,0.35)', background: 'linear-gradient(140deg,#0f1324ef,#172447df)', color: '#fff', fontSize: 42, fontWeight: 800, textShadow: '0 4px 12px rgba(0,0,0,0.65)'}}>{item.line}</div>
        </Sequence>
      ))}

      <Sequence from={fps * 8} durationInFrames={fps * 4}>
        <div style={{position: 'absolute', top: 96, left: 78, color: '#fff', fontSize: 100, fontWeight: 900, letterSpacing: 2, textShadow: '0 8px 24px rgba(0,0,0,0.65)', transform: `scale(${spring({frame: frame - fps * 8, fps, config: {damping: 12, stiffness: 130}})})`}}>1 SECOND LEFT!</div>
      </Sequence>

      <Sequence from={durationInFrames - fps * 3} durationInFrames={fps * 3}>
        <div style={{position: 'absolute', bottom: 240, left: 74, right: 74, textAlign: 'center', color: '#fff', fontSize: 66, fontWeight: 900, background: 'linear-gradient(90deg,#111933ee,#172952ee)', border: '2px solid #7dd3fcaa', borderRadius: 24, padding: '20px 16px'}}>ROUND 2 DROPS TOMORROW — COMMENT "PART 2" 👇</div>
      </Sequence>
    </AbsoluteFill>
  );
};
