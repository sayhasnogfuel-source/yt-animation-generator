import React, {useMemo, useState} from 'react';
import {Player} from '@remotion/player';
import {ShortsComposition, resolveProject} from '../remotion/compositions/ShortsComposition';
import {generateSoundEffectMarkers, splitScriptIntoScenes} from '../remotion/lib/scene-splitter';
import {templates} from '../remotion/lib/templates';
import {themePresets} from '../remotion/lib/theme-presets';
import {AnimationStyle, BackgroundStyle, ThemePreset, VideoProject} from '../remotion/types';

const storageKey = 'yt-short-projects-v2';

const createFromTemplate = (templateId: string): VideoProject => ({
  ...templates[templateId],
  id: `${templateId}-${Date.now()}`,
});

const loadProjects = (): VideoProject[] => {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return [createFromTemplate('story-30')];
    return JSON.parse(raw) as VideoProject[];
  } catch {
    return [createFromTemplate('story-30')];
  }
};

export const DashboardApp: React.FC = () => {
  const [projects, setProjects] = useState<VideoProject[]>(() => loadProjects());
  const [activeId, setActiveId] = useState(projects[0]?.id ?? '');
  const active = projects.find((p) => p.id === activeId) ?? projects[0];

  const persist = (next: VideoProject[]) => {
    setProjects(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
  };

  const update = (patch: Partial<VideoProject>) => {
    const next = projects.map((project) => (project.id === active.id ? {...project, ...patch} : project));
    persist(next);
  };

  const projectProps = useMemo(() => resolveProject(active), [active]);
  const autoMarkers = useMemo(() => {
    const scenes = splitScriptIntoScenes(active.script, 30, 30 * 45);
    return generateSoundEffectMarkers(scenes, 30);
  }, [active.script]);

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h1>YouTube Shorts Lab</h1>
        <button onClick={() => { const p = createFromTemplate('facts-45'); persist([p, ...projects]); setActiveId(p.id); }}>+ Create new video</button>
        <button onClick={() => { const dupe = {...active, id: `${active.id}-copy-${Date.now()}`, title: `${active.title} (Copy)`}; persist([dupe, ...projects]); setActiveId(dupe.id); }}>Duplicate</button>
        <button onClick={() => update({soundEffectMarkers: autoMarkers})}>Auto SFX timing</button>
        <div className="project-list">
          {projects.map((p) => (
            <div key={p.id} className={`project-card ${p.id === active.id ? 'active' : ''}`} onClick={() => setActiveId(p.id)}>
              <div>{p.title}</div>
              <small>{p.niche}</small>
            </div>
          ))}
        </div>
      </aside>

      <main className="main-content">
        <section className="controls card">
          <h2>Video settings</h2>
          <label>Video title<input value={active.title} onChange={(e) => update({title: e.target.value})} /></label>
          <label>Niche<input value={active.niche} onChange={(e) => update({niche: e.target.value})} /></label>
          <label>Tone<input value={active.tone} onChange={(e) => update({tone: e.target.value})} /></label>
          <label>Call to action<input value={active.callToAction} onChange={(e) => update({callToAction: e.target.value})} /></label>
          <label>Theme preset
            <select value={active.themePreset} onChange={(e) => update({themePreset: e.target.value as ThemePreset})}>
              {Object.entries(themePresets).map(([key, val]) => <option key={key} value={key}>{val.name}</option>)}
            </select>
          </label>
          <label>Background style
            <select value={active.backgroundStyle} onChange={(e) => update({backgroundStyle: e.target.value as BackgroundStyle})}>
              {['neon-gradient','midnight-grid','sunset-wave','minimal-dark','cyber-lines'].map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
          <label>Animation style
            <select value={active.animationStyle} onChange={(e) => update({animationStyle: e.target.value as AnimationStyle})}>
              {['roblox-story','faceless-documentary','reddit-story','quiz-trivia','money-business','scary-story','motivational'].map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
          <label>Caption mode
            <select value={active.captionMode} onChange={(e) => update({captionMode: e.target.value as 'word' | 'sentence'})}>
              <option value="word">Word-by-word</option>
              <option value="sentence">Sentence-by-sentence</option>
            </select>
          </label>
          <label>Optional voiceover file path<input placeholder="public/audio/my-voice.mp3" value={active.voiceoverPath ?? ''} onChange={(e) => update({voiceoverPath: e.target.value || undefined})} /></label>
          <label>Script<textarea value={active.script} onChange={(e) => update({script: e.target.value})} rows={7} /></label>
          <label>SFX markers (frames)<input value={active.soundEffectMarkers.join(',')} onChange={(e) => update({soundEffectMarkers: e.target.value.split(',').map((x) => Number(x.trim())).filter((n) => Number.isFinite(n))})} /></label>
        </section>

        <section className="preview card">
          <h2>Preview (1080x1920 @ 30fps)</h2>
          <Player
            component={ShortsComposition}
            inputProps={projectProps}
            durationInFrames={30 * 45}
            compositionWidth={1080}
            compositionHeight={1920}
            fps={30}
            controls
            style={{width: '100%', maxWidth: 420, borderRadius: 18, overflow: 'hidden'}}
          />
          <p>Auto SFX markers preview: {autoMarkers.join(', ')}</p>
          <p>Render with: <code>npm run render</code> or <code>npm run render:roblox</code>.</p>
        </section>
      </main>
    </div>
  );
};
