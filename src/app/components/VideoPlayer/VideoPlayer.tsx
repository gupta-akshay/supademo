import VideoControls from './VideoControls';
import { useVideoTrim, useVideoPlayer, useVideoState } from '@/app/hooks/video';
import { useEffect } from 'react';

export default function VideoPlayer({
  videoData,
}: {
  videoData: YoutubeVideo,
}) {
  const videoState = useVideoState(videoData);

  const {
    playerContainerRef,
    isPlaying,
    playerReady,
    handlePlayPause,
    playerRef,
    seekTo,
  } = useVideoPlayer(videoData, videoState);

  const {
    sliderContainerRef,
    rangeRef,
    trimStartPercentage,
    trimEndPercentage,
    handleTrimStartChange,
    handleTrimEndChange,
  } = useVideoTrim(videoData, videoState, seekTo, playerReady);

  const { trimStart } = videoState;

  // Reset video position when video changes
  useEffect(() => {
    if (playerReady && trimStart > 0) {
      const timeoutId = setTimeout(() => {
        seekTo(trimStart);
      }, 200);
      return () => clearTimeout(timeoutId);
    }
  }, [videoData?.id?.videoId, playerReady, seekTo, trimStart]);

  return (
    <div className='w-full'>
      <div className='w-full aspect-video bg-gray-800 rounded-lg overflow-hidden relative'>
        <div
          ref={playerContainerRef}
          className='w-full h-full'
          style={{ pointerEvents: 'none' }}
        />
        <div className='absolute inset-0' style={{ pointerEvents: 'none' }}>
          <div className='ytp-volume-panel' style={{ pointerEvents: 'auto' }} />
        </div>
      </div>
      <VideoControls
        isPlaying={isPlaying}
        playerReady={playerReady}
        sliderContainerRef={sliderContainerRef}
        rangeRef={rangeRef}
        trimStartPercentage={trimStartPercentage}
        trimEndPercentage={trimEndPercentage}
        onPlayPause={handlePlayPause}
        onTrimStartChange={handleTrimStartChange}
        onTrimEndChange={handleTrimEndChange}
      />
    </div>
  );
}
