import React, {useMemo} from 'react';
import {AbsoluteFill, Sequence, useVideoConfig} from 'remotion';
import {BlockyCharacter3D} from '../components/blocky/BlockyCharacter3D';
import {BlockyEnvironment} from '../components/blocky/BlockyEnvironment';
import {CameraRig} from '../components/blocky/CameraRig';
import {TopSubtitle} from '../components/blocky/TopSubtitle';
import {blockyFamilyTemplates, parseDialogueToBeats} from '../lib/blocky-family';
import {BlockyFamilyProject} from '../types';

export type BlockyFamilyProps = Partial<BlockyFamilyProject> & {templateId?: string};

export const resolveBlockyProject = (props: BlockyFamilyProps): BlockyFamilyProject => {
  const fromTemplate = props.templateId ? blockyFamilyTemplates[props.templateId] : undefined;
  return {
    ...blockyFamilyTemplates['blocky-main'],
    ...fromTemplate,
    ...props,
  } as BlockyFamilyProject;
};

export const BlockyFamilyShort: React.FC<BlockyFamilyProps> = (props) => {
  const project = resolveBlockyProject(props);
  const {fps, durationInFrames} = useVideoConfig();
  const beats = useMemo(() => parseDialogueToBeats(project.script, fps, project.characterList), [fps, project.characterList, project.script]);

  let cursor = 0;
  return (
    <AbsoluteFill style={{fontFamily: 'Inter, system-ui, sans-serif'}}>
      <BlockyEnvironment location={project.location} props={project.props} />

      {beats.map((beat, i) => {
        const from = cursor;
        const duration = Math.min(beat.durationInFrames, Math.max(60, durationInFrames - cursor));
        cursor += duration;
        const speaker = project.characterList.find((c) => c.id === beat.speakerId) ?? project.characterList[0];
        const partner = project.characterList[(i + 1) % project.characterList.length];

        return (
          <Sequence key={`${beat.speakerId}-${i}`} from={from} durationInFrames={duration}>
            <CameraRig shot={beat.shot}>
              <BlockyCharacter3D character={speaker} emotion={beat.emotion} x={240} scale={speaker.ageGroup === 'adult' ? 1.08 : 1} prop={beat.prop} />
              <BlockyCharacter3D character={partner} emotion={'neutral'} x={640} scale={partner.ageGroup === 'adult' ? 1.08 : 1} />
            </CameraRig>
            <TopSubtitle text={beat.subtitle ?? beat.text} />
          </Sequence>
        );
      })}

      <Sequence from={Math.max(durationInFrames - fps * 3, 0)} durationInFrames={fps * 3}>
        <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
          <div style={{background: '#111827dd', color: '#fff', fontSize: 62, fontWeight: 900, borderRadius: 18, padding: '20px 28px'}}> {project.endingCta} </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
