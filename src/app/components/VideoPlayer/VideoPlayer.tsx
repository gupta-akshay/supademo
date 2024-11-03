import useVideoPlayer from '@/app/hooks/video/useVideoPlayer';
import React from 'react';
import VideoControls from './VideoControls';

export default function VideoPlayer({
  videoData,
}: {
  videoData: YoutubeVideo,
}) {
  const {
    playerContainerRef,
    playerRef,
    isPlaying,
    playerReady,
    handlePlayPause,
  } = useVideoPlayer(videoData);

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
        onPlayPause={handlePlayPause}
      />
    </div>
  );
}
