interface VideoControlsProps {
  isPlaying: boolean;
  playerReady: boolean;
  onPlayPause: () => void;
}

export default function VideoControls({
  isPlaying,
  playerReady,
  onPlayPause,
}: VideoControlsProps) {
  return (
    <div className='w-full bg-white shadow-sm rounded-lg p-4 mt-4'>
      <div className='flex items-center gap-4'>
        <button
          onClick={onPlayPause}
          disabled={!playerReady}
          className={`px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-hover)] transition-colors flex-shrink-0 font-medium ${
            !playerReady ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
    </div>
  );
}
