import React from 'react';
import {Composition} from 'remotion';
import {BlockyChipsPreview} from './compositions/BlockyChipsPreview';
import {BlockyFamilyShort} from './compositions/BlockyFamilyShort';
import {RobloxStoryShort} from './compositions/RobloxStoryShort';
import {ShortsComposition} from './compositions/ShortsComposition';
import {blockyFamilyTemplates} from './lib/blocky-family';
import {templates} from './lib/templates';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="BlockyChipsPreview" component={BlockyChipsPreview} width={1080} height={1920} fps={30} durationInFrames={30 * 22} />
      <Composition
        id="BlockyFamilyShort"
        component={BlockyFamilyShort}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={30 * 30}
        defaultProps={blockyFamilyTemplates['chips-story']}
      />
      <Composition
        id="Shorts1080x1920"
        component={ShortsComposition}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={30 * 45}
        defaultProps={templates['facts-45']}
      />
      <Composition id="RobloxStoryShort" component={RobloxStoryShort} width={1080} height={1920} fps={30} durationInFrames={30 * 30} />
    </>
  );
};
