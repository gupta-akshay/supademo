# YouTube Video Trimmer

A Next.js application that allows users to search, view, and trim YouTube videos. Built with TypeScript and Tailwind CSS.

## Features

- 🎥 YouTube video playback
- ✂️ Video trimming functionality
- 🔍 Search through video library
- 📱 Responsive design
- 💾 Persistent trim settings
- 📄 Pagination support

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- YouTube IFrame API

## Getting Started

1. Clone the repository:

```bash
git clone git@github.com:gupta-akshay/supademo.git
cd youtube-video-trimmer
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

```
src/
├── app/
│   ├── components/         # React components
│   │   ├── Sidebar/        # Video list and search
│   │   └── VideoPlayer/    # Video player and controls
│   ├── hooks/              # Custom React hooks
│   │   ├── video/          # Video-related hooks
│   │   ├── search/         # Search logc
│   │   └── pagination/     # Pagination logic
│   ├── constants/          # Application constants
│   ├── data/               # Static data
│   └── utils/              # Utility functions
```

## Key Components

- `VideoPlayer`: Main video player component
- `Sidebar`: Video list with search and pagination
- `VideoControls`: Trim and playback controls

## Custom Hooks

- `useVideoPlayer`: Manages YouTube player instance and controls
- `useVideoState`: Handles video trim state and persistence
- `useVideoTrim`: Controls trim slider functionality
- `useSearch`: Filters videos based on search query
- `usePagination`: Handles video list pagination
