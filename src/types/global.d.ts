interface YoutubeResponse {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: PageInfo;
  items: YoutubeVideo[];
}

interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

interface YoutubeVideo {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId?: string;
    channelId?: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: Thumbnail;
      medium: Thumbnail;
      high: Thumbnail;
    };
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
  };
}

interface Thumbnail {
  url: string;
  width: number;
  height: number;
}
