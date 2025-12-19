
export interface BookQuote {
  text: string;
  context: string;
}

export interface BookData {
  title: string;
  author: string;
  genre: string;
  description: string;
  extendedSummary: string;
  aestheticMood: string;
  primaryColor: string;
  secondaryColor: string;
  quotes: BookQuote[];
  authorBio: string;
  themes: string[];
  readingTime: string;
  illustrationUrl?: string;
}

export type AppStatus = 'idle' | 'loading' | 'success' | 'error';

export interface FileData {
  inlineData: {
    data: string;
    mimeType: string;
  };
}
