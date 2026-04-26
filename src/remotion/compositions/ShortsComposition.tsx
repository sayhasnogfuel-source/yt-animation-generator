import React, {useMemo} from 'react';
import {AbsoluteFill, Audio, Easing, Sequence, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {AnimatedBackground} from '../components/AnimatedBackground';
import {Captions} from '../components/Captions';
import {SceneCard} from '../components/SceneCard';
import {generateSoundEffectMarkers, splitScriptIntoScenes} from '../lib/scene-splitter';
import {templates} from '../lib/templates';
import {themePresets} from '../lib/theme-presets';
import {VideoProject} from '../types';

export type ShortsProps = Partial<VideoProject> & {templateId?: string};

const defaultProject = templates['story-30'];

export const resolveProject = (props: ShortsProps): VideoProject => {
  const fromTemplate = props.templateId ? templates[props.templateId] : undefined;
  const merged = {...defaultProject, ...fromTemplate, ...props};
  return {...merged, id: merged.id ?? 'preview-project'};
};

const HookOverlay: React.FC<{title: string; tone: string; themePreset: VideoProject['themePreset']}> = ({title, tone, themePreset}) => {
  const frame = useCurrentFrame();
  const theme = themePresets[themePreset];
  const pop = interpolate(frame, [0, 14], [0.7, 1], {extrapolateRight: 'clamp', easing: Easing.out(Easing.back(2))});
  const blurOut = interpolate(frame, [36, 60], [0, 20], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', opacity: interpolate(frame, [0, 50, 60], [1, 1, 0], {extrapolateRight: 'clamp'}), filter: `blur(${blurOut}px)`}}>
      <div style={{fontFamily: theme.headingFont, fontSize: 130, color: '#fff', fontWeight: 900, textAlign: 'center', textShadow: `0 0 35px ${theme.glow}`, transform: `scale(${pop})`}}>WAIT ✋</div>
      <div style={{marginTop: 12, color: '#fff', fontSize: 48, background: theme.captionBg, padding: '14px 18px', borderRadius: 18, border: `2px solid ${theme.primary}55`}}>{title}</div>
      <div style={{marginTop: 8, color: '#dbeafe', fontSize: 30}}>{tone}</div>
    </AbsoluteFill>
  );
};

export const ShortsComposition: React.FC<ShortsProps> = (props) => {
  const project = resolveProject(props);
  const {durationInFrames, fps} = useVideoConfig();
  const scenes = useMemo(() => splitScriptIntoScenes(project.script, fps, durationInFrames), [project.script, fps, durationInFrames]);
  const autoSfx = useMemo(() => generateSoundEffectMarkers(scenes, fps), [fps, scenes]);
  const sfxMarkers = project.soundEffectMarkers.length ? project.soundEffectMarkers : autoSfx;

  return (
    <AbsoluteFill style={{fontFamily: themePresets[project.themePreset].bodyFont}}>
      <AnimatedBackground stylePreset={project.backgroundStyle} themePreset={project.themePreset} />

      <Sequence from={0} durationInFrames={Math.min(60, durationInFrames)}>
        <HookOverlay title={project.title} tone={project.tone} themePreset={project.themePreset} />
      </Sequence>

      {scenes.map((scene, index) => (
        <Sequence key={scene.id} from={scene.startFrame} durationInFrames={scene.durationInFrames}>
          <SceneCard
            scene={scene}
            index={index}
            stylePreset={project.animationStyle}
            themePreset={project.themePreset}
            title={project.title}
            niche={project.niche}
          />
          <Captions
            text={scene.text}
            mode={project.captionMode}
            startFrame={scene.startFrame}
            durationInFrames={scene.durationInFrames}
            themePreset={project.themePreset}
          />
        </Sequence>
      ))}

      <AbsoluteFill style={{pointerEvents: 'none', padding: '120px 76px 200px', border: '2px dashed rgba(255,255,255,0.16)'}} />

      {project.voiceoverPath ? <Audio src={project.voiceoverPath} /> : null}
      {sfxMarkers.map((marker) => (
        <Sequence key={marker} from={marker} durationInFrames={8}>
          <div style={{position: 'absolute', top: 30, right: 40, color: '#fff', fontSize: 24, fontWeight: 800, background: '#000b', padding: '9px 14px', borderRadius: 999, border: '1px solid #fff6'}}>SFX • HIT</div>
        </Sequence>
      ))}

      <Sequence from={Math.max(durationInFrames - 120, 0)} durationInFrames={120}>
        <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
          <div style={{fontSize: 66, fontWeight: 900, color: '#fff', background: '#0a0f23d9', borderRadius: 20, padding: '26px 34px', border: `2px solid ${themePresets[project.themePreset].primary}66`}}>
            {project.callToAction}
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
