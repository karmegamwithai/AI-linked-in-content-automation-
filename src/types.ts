export type Platform = 'linkedin' | 'instagram';

export type PostStatus = 'draft' | 'scheduled' | 'published' | 'failed';

export type MediaType = 'text' | 'image' | 'video' | 'carousel';

export interface PostAnalytics {
  impressions: number;
  likes: number;
  comments: number;
  shares: number;
  clicks: number;
  engagementRate: number; // e.g. 4.8 (%)
}

export interface Post {
  id: string;
  title: string;
  contentLinkedin: string;
  contentInstagram: string;
  platforms: Platform[];
  mediaUrls: string[];
  mediaType: MediaType;
  aspectRatio: '1:1' | '4:5' | '16:9' | '9:16';
  status: PostStatus;
  scheduledTime?: string; // ISO string
  publishedAt?: string; // ISO string
  tags: string[];
  author: string;
  googleSheetsRowId?: number;
  analytics?: PostAnalytics;
  createdAt: string;
  updatedAt: string;
}

export interface ConnectedAccount {
  platform: Platform;
  accountName: string;
  username: string;
  avatarUrl: string;
  connected: boolean;
  followersCount: number;
  lastSyncedAt: string;
  tokenExpiresInDays: number;
}

export interface GoogleSheetsConfig {
  spreadsheetId: string;
  sheetName: string;
  syncIntervalMinutes: number;
  lastSyncedAt: string;
  connected: boolean;
  autoPublishFromSheets: boolean;
  totalSyncedRows: number;
}

export interface PostGenerationRequest {
  topic: string;
  tone: 'professional' | 'engaging' | 'casual' | 'storytelling' | 'educational';
  targetAudience: string;
  platforms: Platform[];
  includeCallToAction: boolean;
  includeHashtags: boolean;
  keyPoints?: string;
  mediaType?: MediaType;
}

export interface PostGenerationResponse {
  linkedinContent: string;
  instagramContent: string;
  hashtags: string[];
  suggestedHooks: string[];
  carouselSlides?: string[];
  bestTimeToPost: string;
}

export interface FileItem {
  path: string;
  name: string;
  type: 'file' | 'folder';
  content?: string;
  children?: FileItem[];
  language?: string;
}
