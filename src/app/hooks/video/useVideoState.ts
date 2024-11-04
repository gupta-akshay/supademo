import { useState, useRef, useEffect } from 'react';

export default function useVideoState(videoData: YoutubeVideo) {
  // State for trim start position (in seconds)
  const [trimStart, setTrimStart] = useState(0);
  
  // State for trim end position (in seconds, null means end of video)
  const [trimEnd, setTrimEnd] = useState<number | null>(null);
  
  // State for total video duration (in seconds)
  const [duration, setDuration] = useState(0);
  
  // Ref for trim end to avoid stale values in intervals
  const trimEndRef = useRef<number | null>(null);

  /**
   * Effect to load stored trim values from localStorage when video changes
   * Resets trim values and loads stored values if they exist
   */
  useEffect(() => {
    if (videoData?.id?.videoId) {
      const storedStart = localStorage.getItem(
        `${videoData.id.videoId}_trimStart`
      );
      const storedEnd = localStorage.getItem(`${videoData.id.videoId}_trimEnd`);

      // Reset trim values
      setTrimStart(0);
      updateTrimEnd(null);

      // Restore stored values if they exist
      if (storedStart) {
        setTrimStart(Number(storedStart));
      }

      if (storedEnd) {
        updateTrimEnd(Number(storedEnd));
      }
    }
  }, [videoData?.id?.videoId]);

  /**
   * Updates trim start position and persists to localStorage
   */
  const updateTrimStart = (value: number) => {
    setTrimStart(value);
    // Persist to localStorage if we have a valid video ID
    if (videoData?.id?.videoId) {
      localStorage.setItem(
        `${videoData.id.videoId}_trimStart`,
        value.toString()
      );
    }
  };

  /**
   * Updates trim end position and persists to localStorage
   * Also updates the ref used for interval checks
   */
  const updateTrimEnd = (value: number | null) => {
    setTrimEnd(value);
    trimEndRef.current = value;
    // Only persist non-null values to localStorage
    if (videoData?.id?.videoId && value !== null) {
      localStorage.setItem(`${videoData.id.videoId}_trimEnd`, value.toString());
    }
  };

  /**
   * Updates video duration and sets initial trim end if needed
   * If no trim end is set and no stored value exists, sets trim end to video duration
   */
  const updateDuration = (value: number) => {
    setDuration(value);
    // Set trimEnd to duration only if no trim end exists and no stored value
    if (
      trimEnd === null &&
      !localStorage.getItem(`${videoData?.id?.videoId}_trimEnd`)
    ) {
      updateTrimEnd(value);
    }
  };

  return {
    trimStart,
    trimEnd,
    duration,
    trimEndRef,
    updateTrimStart,
    updateTrimEnd,
    updateDuration,
  };
}
