import React from 'react';
import {Composition} from 'remotion';
import {RobloxStoryShort} from './compositions/RobloxStoryShort';
import {ShortsComposition} from './compositions/ShortsComposition';
import {templates} from './lib/templates';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Shorts1080x1920"
        component={ShortsComposition}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={30 * 45}
        defaultProps={templates['facts-45']}
      />
      <Composition
        id="RobloxStoryShort"
        component={RobloxStoryShort}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={30 * 30}
      />
    </>
  );
};
