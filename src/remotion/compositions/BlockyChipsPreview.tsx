import React from 'react';
import {AbsoluteFill, Sequence, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {BlockyCharacter3D} from '../components/blocky/BlockyCharacter3D';
import {BlockyEnvironment} from '../components/blocky/BlockyEnvironment';
import {CameraRig} from '../components/blocky/CameraRig';
import {TopSubtitle} from '../components/blocky/TopSubtitle';
import {blockyFamilyTemplates} from '../lib/blocky-family';

const project = blockyFamilyTemplates['chips-story'];

const beats = [
  {speaker: 'kid-1', partner: 'sis-1', text: 'These are MY chips.', emotion: 'mad', shot: 'closeup', prop: 'chip-bag', frames: 78},
  {speaker: 'sis-1', partner: 'kid-1', text: 'You promised we would split them.', emotion: 'sad', shot: 'over-shoulder', prop: undefined, frames: 84},
  {speaker: 'kid-1', partner: 'sis-1', text: 'I said maybe.', emotion: 'guilty', shot: 'reaction', prop: 'chip-bag', frames: 72},
  {speaker: 'sis-1', partner: 'mom-1', text: 'Mom! Noah is hiding the bag!', emotion: 'shocked', shot: 'dramatic-zoom', prop: 'phone', frames: 82},
] as const;

export const BlockyChipsPreview: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  let cursor = 0;
  return (
    <AbsoluteFill style={{fontFamily: 'Inter, system-ui, sans-serif'}}>
      <BlockyEnvironment location="kitchen" props={['chip-bag', 'drink-cup', 'table']} />
      <AbsoluteFill style={{background: `radial-gradient(circle at 50% 20%, rgba(255,255,255,${interpolate(frame, [0, durationInFrames], [0.22, 0.08])}), transparent 55%)`}} />

      {beats.map((beat, index) => {
        const from = cursor;
        cursor += beat.frames;
        const speaker = project.characterList.find((c) => c.id === beat.speaker) ?? project.characterList[0];
        const partner = project.characterList.find((c) => c.id === beat.partner) ?? project.characterList[1];

        return (
          <Sequence key={`${beat.text}-${index}`} from={from} durationInFrames={beat.frames}>
            <CameraRig shot={beat.shot}>
              <BlockyCharacter3D character={speaker} emotion={beat.emotion} x={230} scale={speaker.ageGroup === 'adult' ? 1.08 : 1} prop={beat.prop} />
              <BlockyCharacter3D character={partner} emotion={index % 2 ? 'neutral' : 'mad'} x={660} scale={partner.ageGroup === 'adult' ? 1.08 : 1} />
            </CameraRig>
            <TopSubtitle text={beat.text} />
          </Sequence>
        );
      })}

      <Sequence from={Math.max(durationInFrames - fps * 3, 0)} durationInFrames={fps * 3}>
        <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
          <div style={{background: '#111827e6', color: '#fff', borderRadius: 18, border: '2px solid #93c5fd', padding: '20px 28px', fontSize: 60, fontWeight: 900}}>
            Tag a sibling who steals snacks 😂
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
