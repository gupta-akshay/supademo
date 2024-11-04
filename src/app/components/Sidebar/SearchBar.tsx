import { useState, useCallback } from 'react';
import { debounce } from '@/app/utils/debounce';

interface SearchBarProps {
  searchQuery: string;
  onSearch: (query: string) => void;
}

export default function SearchBar({ searchQuery, onSearch }: SearchBarProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState(searchQuery);

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setIsLoading(false);
      if (query.trim().length > 0) {
        onSearch(query.trim());
      }
    }, 300),
    [onSearch]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setInputValue(query);
    
    if (query.trim()) {
      setIsLoading(true);
      debouncedSearch(query);
    } else {
      setIsLoading(false);
      onSearch('');
    }
  };

  return (
    <div className='sticky top-0 z-10 p-4 md:p-5 border-b border-gray-100 bg-white/95 backdrop-blur-sm'>
      <div className='relative'>
        <input
          type='text'
          placeholder='Search videos...'
          className='w-full px-4 py-2.5 pl-10 bg-[var(--background)] border border-[var(--gray-200)] rounded-xl 
                   focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-opacity-50 
                   text-sm transition-all duration-200 shadow-sm
                   text-[var(--foreground)] placeholder-[var(--gray-500)]'
          value={inputValue}
          onChange={handleSearch}
        />

        {isLoading ? (
          <div className='absolute right-3 top-1/2 -translate-y-1/2'>
            <div className='w-4 h-4 border-2 border-gray-300 border-t-primary rounded-full animate-spin' />
          </div>
        ) : (
          <svg
            className='absolute left-3 top-1/2 -translate-y-1/2 text-[var(--gray-500)] w-4 h-4'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
        )}
      </div>
    </div>
  );
}
