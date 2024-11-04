interface VideoControlsProps {
  isPlaying: boolean;
  playerReady: boolean;
  sliderContainerRef: React.RefObject<HTMLDivElement>;
  rangeRef: React.RefObject<HTMLDivElement>;
  trimStartPercentage: number;
  trimEndPercentage: number;
  onPlayPause: () => void;
  onTrimStartChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTrimEndChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function VideoControls({
  isPlaying,
  playerReady,
  sliderContainerRef,
  rangeRef,
  trimStartPercentage,
  trimEndPercentage,
  onPlayPause,
  onTrimStartChange,
  onTrimEndChange,
}: VideoControlsProps) {
  return (
    <div className='w-full bg-white shadow-sm rounded-lg p-4 mt-4'>
      <div className='flex items-center gap-4'>
        {/* Play/Pause Button */}
        <button
          onClick={onPlayPause}
          disabled={!playerReady}
          className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex-shrink-0 font-medium ${
            !playerReady ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>

        {/* Trim Slider */}
        <div ref={sliderContainerRef} className='relative flex-1 h-8'>
          {/* Base Track */}
          <div className='absolute w-full h-full bg-gray-100 rounded-md' />

          {/* Range Visualization */}
          <div
            ref={rangeRef}
            className='absolute h-full bg-blue-600 opacity-25 rounded-md'
            style={{
              left: `${trimStartPercentage}%`,
              width: `${trimEndPercentage - trimStartPercentage}%`,
            }}
          />

          {/* Start Handle Input */}
          <input
            type='range'
            min={0}
            max={100}
            value={trimStartPercentage}
            onChange={onTrimStartChange}
            className='absolute w-full h-8 cursor-ew-resize'
            style={{
              pointerEvents: 'none',
              WebkitAppearance: 'none',
              zIndex: trimStartPercentage > 90 ? 4 : 3,
            }}
          />

          {/* End Handle Input */}
          <input
            type='range'
            min={0}
            max={100}
            value={trimEndPercentage}
            onChange={onTrimEndChange}
            className='absolute w-full h-8 cursor-ew-resize'
            style={{
              pointerEvents: 'none',
              WebkitAppearance: 'none',
              zIndex: 2,
            }}
          />
        </div>
      </div>
    </div>
  );
}
