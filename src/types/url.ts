export interface ShortenedUrl {
  shortCode: string;
  shortUrl: string;
  originalUrl: string;
  createdAt: string;
}

export interface AnalyticsData {
  short_code: string;
  original_url: string;
  clicks: number;
  created_at: string;
}


export interface UrlItem {
  id: number;
  original_url: string;
  short_code: string;
  clicks: number;
  createdAt: string;
}

export interface PaginatedUrls {
  count: number;
  rows: UrlItem[];
}