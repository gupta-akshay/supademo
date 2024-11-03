import { useState, useEffect, useRef } from 'react';
import { YOUTUBE_API_URL, PLAYER_CONFIG } from '@/app/constants/video';

export default function useVideoPlayer(videoData: YoutubeVideo) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef<YT.Player | null>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  // Load Youtube API
  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = YOUTUBE_API_URL;
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      initializePlayer();
    };

    return () => {
      window.onYouTubeIframeAPIReady = undefined;
    };
  }, []);

  // Initialize player when YT is ready
  useEffect(() => {
    if (window.YT) {
      initializePlayer();
    }
  }, [videoData?.id?.videoId]);

  const initializePlayer = () => {
    if (!videoData?.id?.videoId || !playerContainerRef.current) return;

    // Destroy existing player if it exists
    if (playerRef.current) {
      try {
        playerRef.current.destroy();
      } catch (error) {
        console.error('Error destroying player:', error);
      }
    }

    playerRef.current = null;

    playerRef.current = new window.YT.Player(playerContainerRef.current, {
      videoId: videoData.id.videoId,
      playerVars: {
        ...PLAYER_CONFIG,
      },
      events: {
        onReady: handlePlayerReady,
        onStateChange: handlePlayerStateChange,
      },
    });
  };

  const handlePlayerReady = (event: YT.PlayerEvent) => {
    setPlayerReady(true);
    const videoDuration = event.target.getDuration();
    setDuration(videoDuration);

    // initial trim logic will go here
  };

  const handlePlayerStateChange = (event: YT.OnStateChangeEvent) => {
    const newState = event.data;
    setIsPlaying(newState === window.YT.PlayerState.PLAYING);
  };

  const handlePlayPause = () => {
    if (!playerRef.current || !playerReady) return;

    try {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    } catch (error) {
      console.error('Error controlling video:', error);
    }
  };

  return {
    playerContainerRef,
    playerRef,
    isPlaying,
    playerReady,
    handlePlayPause,
  };
}
