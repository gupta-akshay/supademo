import { useState, useEffect, useRef, useCallback } from 'react';
import { PLAYER_CONFIG } from '@/app/constants/video';
import { useVideoState } from '@/app/hooks/video';

function usePlayerState() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const playerRef = useRef<YT.Player | null>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  
  return {
    isPlaying,
    setIsPlaying,
    playerReady,
    setPlayerReady,
    playerRef,
    playerContainerRef
  };
}

function useIntervalManager() {
  const checkIntervalRef = useRef<NodeJS.Timeout>();
  
  const clearCheckInterval = useCallback(() => {
    if (checkIntervalRef.current) {
      clearInterval(checkIntervalRef.current);
      checkIntervalRef.current = undefined;
    }
  }, []);

  return { checkIntervalRef, clearCheckInterval };
}

export default function useVideoPlayer(
  videoData: YoutubeVideo,
  videoState: ReturnType<typeof useVideoState>
) {
  const { 
    isPlaying, setIsPlaying, playerReady, setPlayerReady, 
    playerRef, playerContainerRef 
  } = usePlayerState();
  
  const { checkIntervalRef, clearCheckInterval } = useIntervalManager();
  const lastSeekTime = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);
  const userInitiatedRef = useRef<boolean>(false);

  const { trimStart, trimEndRef, updateDuration } = videoState;

  // Helper function to check if player is ready and has methods
  const isPlayerReady = useCallback(() => {
    return (
      playerRef.current &&
      playerReady &&
      typeof playerRef.current.getCurrentTime === 'function' &&
      typeof playerRef.current.seekTo === 'function' &&
      typeof playerRef.current.playVideo === 'function' &&
      typeof playerRef.current.pauseVideo === 'function'
    );
  }, [playerReady]);

  // Debounced seek function
  const seekTo = useCallback(
    (time: number) => {
      if (!isPlayerReady()) return;

      const now = Date.now();
      if (now - lastSeekTime.current < 200) return;

      try {
        isSeekingRef.current = true;
        playerRef.current?.seekTo(time, true);
        lastSeekTime.current = now;
        setTimeout(() => {
          isSeekingRef.current = false;
        }, 200);
      } catch (error) {
        console.error('Error seeking:', error);
        isSeekingRef.current = false;
      }
    },
    [isPlayerReady]
  );

  const handlePlayerReady = useCallback((event: YT.PlayerEvent) => {
    try {
      const player = event.target;
      playerRef.current = player;
      
      player.pauseVideo();
      setIsPlaying(false);
      updateDuration(player.getDuration());
      setPlayerReady(true);

      if (trimStart > 0) {
        player.seekTo(trimStart, true);
      }
    } catch (error) {
      console.error('Error in handlePlayerReady:', error);
      setPlayerReady(false);
    }
  }, [trimStart, updateDuration, setIsPlaying, setPlayerReady]);

  const handlePlayerStateChange = useCallback(
    (event: YT.OnStateChangeEvent) => {
      const newState = event.data;

      if (!userInitiatedRef.current && newState === window.YT.PlayerState.PLAYING) {
        event.target.pauseVideo();
        setIsPlaying(false);
        return;
      }

      // Update playing state based on player state
      if (userInitiatedRef.current) {
        const isNowPlaying = newState === window.YT.PlayerState.PLAYING;
        setIsPlaying(isNowPlaying);
        
        if (isNowPlaying) {
          clearCheckInterval();
          
          checkIntervalRef.current = setInterval(() => {
            // Check if player still exists and has methods
            if (!playerRef.current?.getCurrentTime) {
              clearCheckInterval();
              return;
            }
            
            try {
              const currentTime = playerRef.current.getCurrentTime();
              const currentTrimEnd = trimEndRef.current;

              if (currentTrimEnd !== null && currentTime >= currentTrimEnd - 0.1) {
                console.log('Reached trim end, pausing');
                if (playerRef.current?.pauseVideo) {
                  playerRef.current.pauseVideo();
                  setIsPlaying(false);
                  userInitiatedRef.current = false;
                }
                clearCheckInterval();
              }
            } catch (error) {
              console.error('Error in check interval:', error);
              clearCheckInterval();
            }
          }, 250);
        } else {
          clearCheckInterval();
        }
      }
    },
    [isPlaying, clearCheckInterval]
  );

  const handlePlayPause = useCallback(() => {
    if (!playerRef.current || !playerReady) return;

    try {
      if (isPlaying) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
        userInitiatedRef.current = false;
      } else {
        userInitiatedRef.current = true;
        
        const currentTime = playerRef.current.getCurrentTime();
        if (Math.abs(currentTime - trimStart) > 0.1) {
          playerRef.current.seekTo(trimStart, true);
        }
        
        playerRef.current.playVideo();
      }
    } catch (error) {
      console.error('Error in handlePlayPause:', error);
      setIsPlaying(false);
      userInitiatedRef.current = false;
    }
  }, [isPlaying, playerReady, trimStart]);

  // Reset states when video changes
  useEffect(() => {
    setIsPlaying(false);
    setPlayerReady(false);
    userInitiatedRef.current = false;
  }, [videoData?.id?.videoId]);

  // Initialize player with autoplay disabled
  const initializePlayer = useCallback(() => {
    if (!videoData?.id?.videoId || !playerContainerRef.current) return;

    if (playerRef.current) {
      try {
        playerRef.current.destroy();
      } catch (error) {
        console.error('Error destroying player:', error);
      }
    }

    // Reset all state
    setPlayerReady(false);
    setIsPlaying(false);
    userInitiatedRef.current = false;
    playerRef.current = null;

    if (playerContainerRef.current) {
      playerContainerRef.current.innerHTML = '';
    }

    try {
      const newPlayer = new window.YT.Player(playerContainerRef.current, {
        videoId: videoData.id.videoId,
        playerVars: {
          ...PLAYER_CONFIG,
          autoplay: 0,
          start: Math.floor(trimStart),
        },
        events: {
          onReady: handlePlayerReady,
          onStateChange: handlePlayerStateChange,
        },
      });
      
      playerRef.current = newPlayer;
    } catch (error) {
      console.error('Error initializing player:', error);
    }
  }, [
    videoData?.id?.videoId,
    trimStart,
    handlePlayerStateChange,
    handlePlayerReady,
  ]);

  useEffect(() => {
    const cleanup = () => {
      clearCheckInterval();
      if (playerRef.current?.destroy) {
        try {
          playerRef.current.destroy();
        } catch (error) {
          console.error('Error destroying player:', error);
        }
      }
    };

    return cleanup;
  }, [clearCheckInterval]);

  useEffect(() => {    
    if (window.YT) {
      initializePlayer();
      return;
    }

    const loadYouTubeAPI = () => {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    };

    loadYouTubeAPI();
    window.onYouTubeIframeAPIReady = initializePlayer;

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

  // Handle video changes
  useEffect(() => {
    console.log('Video changed, cleaning up...');
    
    // Clear the check interval
    clearCheckInterval();

    // Stop the currently playing video first
    if (playerRef.current?.pauseVideo) {
      try {
        playerRef.current.pauseVideo();
      } catch (error) {
        console.error('Error pausing video:', error);
      }
    }

    setIsPlaying(false);
    setPlayerReady(false);
    userInitiatedRef.current = false;

    // Reinitialize player with new video
    if (window.YT) {
      initializePlayer();
    }
  }, [videoData?.id?.videoId, clearCheckInterval]);

  // Add this effect to ensure video stays paused during initialization
  useEffect(() => {
    if (
      playerRef.current &&
      typeof playerRef.current.pauseVideo === 'function'
    ) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    }
  }, [videoData?.id?.videoId]);

  return {
    playerContainerRef,
    isPlaying,
    playerReady,
    handlePlayPause,
    playerRef,
    seekTo,
  };
}
