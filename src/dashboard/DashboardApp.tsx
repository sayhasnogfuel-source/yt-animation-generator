import React, {useMemo, useState} from 'react';
import {Player} from '@remotion/player';
import {BlockyChipsPreview} from '../remotion/compositions/BlockyChipsPreview';
import {BlockyFamilyShort, resolveBlockyProject} from '../remotion/compositions/BlockyFamilyShort';
import {ShortsComposition, resolveProject} from '../remotion/compositions/ShortsComposition';
import {blockyFamilyTemplates} from '../remotion/lib/blocky-family';
import {generateSoundEffectMarkers, splitScriptIntoScenes} from '../remotion/lib/scene-splitter';
import {templates} from '../remotion/lib/templates';
import {themePresets} from '../remotion/lib/theme-presets';
import {AnimationStyle, BackgroundStyle, BlockyFamilyProject, ThemePreset, VideoProject} from '../remotion/types';

const storageKey = 'yt-short-projects-v3';

type Mode = 'standard' | 'blocky-family';
type BlockyPreviewMode = 'chips-preview' | 'template-preview';

const createFromTemplate = (templateId: string): VideoProject => ({...templates[templateId], id: `${templateId}-${Date.now()}`});
const createBlocky = (templateId: string): BlockyFamilyProject => ({...blockyFamilyTemplates[templateId]});

export const DashboardApp: React.FC = () => {
  const [mode, setMode] = useState<Mode>('blocky-family');
  const [blockyPreviewMode, setBlockyPreviewMode] = useState<BlockyPreviewMode>('chips-preview');
  const [projects, setProjects] = useState<VideoProject[]>(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return [createFromTemplate('story-30')];
      return JSON.parse(raw) as VideoProject[];
    } catch {
      return [createFromTemplate('story-30')];
    }
  });
  const [blocky, setBlocky] = useState<BlockyFamilyProject>(() => createBlocky('chips-story'));
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

  const autoMarkers = useMemo(() => generateSoundEffectMarkers(splitScriptIntoScenes(active.script, 30, 30 * 45), 30), [active.script]);
  const projectProps = useMemo(() => resolveProject(active), [active]);
  const blockyProps = useMemo(() => resolveBlockyProject(blocky), [blocky]);

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h1>YouTube Shorts Lab</h1>
        <label>
          Mode
          <select value={mode} onChange={(e) => setMode(e.target.value as Mode)}>
            <option value="blocky-family">Blocky Family (3D-style)</option>
            <option value="standard">Standard motion</option>
          </select>
        </label>
        {mode === 'standard' ? (
          <>
            <button onClick={() => { const p = createFromTemplate('facts-45'); persist([p, ...projects]); setActiveId(p.id); }}>+ Create new video</button>
            <button onClick={() => update({soundEffectMarkers: autoMarkers})}>Auto SFX timing</button>
            <div className="project-list">{projects.map((p) => <div key={p.id} className={`project-card ${p.id === active.id ? 'active' : ''}`} onClick={() => setActiveId(p.id)}><div>{p.title}</div><small>{p.niche}</small></div>)}</div>
          </>
        ) : (
          <>
            <label>
              Blocky preview
              <select value={blockyPreviewMode} onChange={(e) => setBlockyPreviewMode(e.target.value as BlockyPreviewMode)}>
                <option value="chips-preview">Polished chips sample</option>
                <option value="template-preview">Editable template preview</option>
              </select>
            </label>
            <button onClick={() => setBlocky(createBlocky('chips-story'))}>Load: chips story</button>
            <button onClick={() => setBlocky(createBlocky('broke-toy'))}>Load: broke toy</button>
            <button onClick={() => setBlocky(createBlocky('lies-bigger'))}>Load: lies bigger</button>
          </>
        )}
      </aside>

      <main className="main-content">
        {mode === 'standard' ? (
          <section className="controls card">
            <h2>Standard settings</h2>
            <label>Video title<input value={active.title} onChange={(e) => update({title: e.target.value})} /></label>
            <label>Niche<input value={active.niche} onChange={(e) => update({niche: e.target.value})} /></label>
            <label>Tone<input value={active.tone} onChange={(e) => update({tone: e.target.value})} /></label>
            <label>Call to action<input value={active.callToAction} onChange={(e) => update({callToAction: e.target.value})} /></label>
            <label>Theme preset<select value={active.themePreset} onChange={(e) => update({themePreset: e.target.value as ThemePreset})}>{Object.entries(themePresets).map(([key, val]) => <option key={key} value={key}>{val.name}</option>)}</select></label>
            <label>Background style<select value={active.backgroundStyle} onChange={(e) => update({backgroundStyle: e.target.value as BackgroundStyle})}>{['neon-gradient','midnight-grid','sunset-wave','minimal-dark','cyber-lines'].map((option) => <option key={option}>{option}</option>)}</select></label>
            <label>Animation style<select value={active.animationStyle} onChange={(e) => update({animationStyle: e.target.value as AnimationStyle})}>{['roblox-story','faceless-documentary','reddit-story','quiz-trivia','money-business','scary-story','motivational'].map((option) => <option key={option}>{option}</option>)}</select></label>
            <label>Script<textarea value={active.script} onChange={(e) => update({script: e.target.value})} rows={7} /></label>
          </section>
        ) : (
          <section className="controls card">
            <h2>BlockyFamilyShort settings</h2>
            <label>Title<input value={blocky.title} onChange={(e) => setBlocky({...blocky, title: e.target.value})} /></label>
            <label>Location<select value={blocky.location} onChange={(e) => setBlocky({...blocky, location: e.target.value as BlockyFamilyProject['location']})}><option value="kitchen">kitchen</option><option value="bedroom">bedroom</option><option value="living-room">living room</option><option value="school-hallway">school hallway</option></select></label>
            <label>Mood<input value={blocky.mood} onChange={(e) => setBlocky({...blocky, mood: e.target.value})} /></label>
            <label>Script (NAME: line)<textarea value={blocky.script} onChange={(e) => setBlocky({...blocky, script: e.target.value})} rows={8} /></label>
            <label>Ending CTA<input value={blocky.endingCta} onChange={(e) => setBlocky({...blocky, endingCta: e.target.value})} /></label>
            <label>Character list JSON<textarea value={JSON.stringify(blocky.characterList, null, 2)} rows={8} onChange={(e) => { try { setBlocky({...blocky, characterList: JSON.parse(e.target.value)}); } catch {} }} /></label>
          </section>
        )}

        <section className="preview card">
          <h2>Preview (1080x1920 @ 30fps)</h2>
          {mode === 'standard' ? (
            <Player component={ShortsComposition} inputProps={projectProps} durationInFrames={30 * 45} compositionWidth={1080} compositionHeight={1920} fps={30} controls style={{width: '100%', maxWidth: 420, borderRadius: 18, overflow: 'hidden'}} />
          ) : blockyPreviewMode === 'chips-preview' ? (
            <Player component={BlockyChipsPreview} durationInFrames={30 * 22} compositionWidth={1080} compositionHeight={1920} fps={30} controls style={{width: '100%', maxWidth: 420, borderRadius: 18, overflow: 'hidden'}} />
          ) : (
            <Player component={BlockyFamilyShort} inputProps={blockyProps} durationInFrames={30 * 30} compositionWidth={1080} compositionHeight={1920} fps={30} controls style={{width: '100%', maxWidth: 420, borderRadius: 18, overflow: 'hidden'}} />
          )}
          <p>Preview: <code>npm run studio</code></p>
          <p>Render MP4: <code>npm run render:chips</code> (polished sample)</p>
          <p>Then render template: <code>npm run render:blocky</code></p>
        </section>
      </main>
    </div>
  );
};
