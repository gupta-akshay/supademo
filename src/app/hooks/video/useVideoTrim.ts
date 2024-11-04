import { useRef, useState } from 'react';
import { useVideoState } from '@/app/hooks/video';

export default function useVideoTrim(
  videoData: YoutubeVideo,
  videoState: ReturnType<typeof useVideoState>,
  seekTo: (time: number) => void,
  playerReady: boolean
) {
  const [step, setStep] = useState(0.1);
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const rangeRef = useRef<HTMLDivElement>(null);

  const { trimStart, trimEnd, duration, updateTrimStart, updateTrimEnd } =
    videoState;

  // Calculate percentages
  const trimStartPercentage = (trimStart / duration) * 100 || 0;
  const trimEndPercentage = (trimEnd ? (trimEnd / duration) * 100 : 100) || 100;

  const handleTrimStartChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Math.min(Number(event.target.value), trimEndPercentage - 1);
    const timeInSeconds = (value / 100) * duration;

    // Only update if the change is significant enough
    if (Math.abs(timeInSeconds - trimStart) > 0.1) {
      updateTrimStart(timeInSeconds);
      if (playerReady) {
        seekTo(timeInSeconds);
      }
    }

    return timeInSeconds;
  };

  const handleTrimEndChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(event.target.value), trimStartPercentage + 1);
    const timeInSeconds = (value / 100) * duration;

    // Only update if the change is significant enough
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
