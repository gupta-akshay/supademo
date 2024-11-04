import { useRef } from 'react';
import { useVideoState } from '@/app/hooks/video';

export default function useVideoTrim(
  videoState: ReturnType<typeof useVideoState>,
  seekTo: (time: number) => void,
  playerReady: boolean
) {
  // Refs for DOM elements
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const rangeRef = useRef<HTMLDivElement>(null);

  const { trimStart, trimEnd, duration, updateTrimStart, updateTrimEnd } =
    videoState;

  // Convert time values to percentages for slider positioning
  const trimStartPercentage = (trimStart / duration) * 100 || 0;
  const trimEndPercentage = (trimEnd ? (trimEnd / duration) * 100 : 100) || 100;

  const handleTrimStartChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): number => {
    // Ensure start handle doesn't overlap with end handle
    const value = Math.min(Number(event.target.value), trimEndPercentage - 1);
    const timeInSeconds = (value / 100) * duration;

    // Only update if the change is significant (>0.1s)
    if (Math.abs(timeInSeconds - trimStart) > 0.1) {
      updateTrimStart(timeInSeconds);
      if (playerReady) {
        seekTo(timeInSeconds);
      }
    }

    return timeInSeconds;
  };

  const handleTrimEndChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): number => {
    // Ensure end handle doesn't overlap with start handle
    const value = Math.max(Number(event.target.value), trimStartPercentage + 1);
    const timeInSeconds = (value / 100) * duration;

    // Only update if there's no end time or the change is significant
    if (!trimEnd || Math.abs(timeInSeconds - trimEnd) > 0.1) {
      updateTrimEnd(timeInSeconds);
      if (playerReady) {
        seekTo(trimStart);
      }
    }

    return timeInSeconds;
  };

  return {
    sliderContainerRef,
    rangeRef,
    trimStartPercentage,
    trimEndPercentage,
    handleTrimStartChange,
    handleTrimEndChange,
  };
}
