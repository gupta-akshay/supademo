import { useState, useRef, useEffect } from 'react';

export default function useVideoState(videoData: YoutubeVideo) {
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState<number | null>(null);
  const [duration, setDuration] = useState(0);
  const trimEndRef = useRef<number | null>(null);

  // Load stored trim values on video change
  useEffect(() => {
    if (videoData?.id?.videoId) {
      const storedStart = localStorage.getItem(
        `${videoData.id.videoId}_trimStart`
      );
      const storedEnd = localStorage.getItem(`${videoData.id.videoId}_trimEnd`);

      setTrimStart(0);
      updateTrimEnd(null);

      if (storedStart) {
        setTrimStart(Number(storedStart));
      }

      if (storedEnd) {
        updateTrimEnd(Number(storedEnd));
      }
    }
  }, [videoData?.id?.videoId]);

  const updateTrimStart = (value: number) => {
    setTrimStart(value);
    if (videoData?.id?.videoId) {
      localStorage.setItem(
        `${videoData.id.videoId}_trimStart`,
        value.toString()
      );
    }
  };

  const updateTrimEnd = (value: number | null) => {
    setTrimEnd(value);
    trimEndRef.current = value;
    if (videoData?.id?.videoId && value !== null) {
      localStorage.setItem(`${videoData.id.videoId}_trimEnd`, value.toString());
    }
  };

  const updateDuration = (value: number) => {
    setDuration(value);
    // Only set trimEnd to duration if there's no stored value and trimEnd is null
    if (trimEnd === null && !localStorage.getItem(`${videoData?.id?.videoId}_trimEnd`)) {
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
