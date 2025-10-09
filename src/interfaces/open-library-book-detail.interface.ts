export interface OpenLibraryBookDetail {
  fullAuthors?: any;
  // key is olid
  key: string; 
  covers: string[]; 
  authors: string[]; 
  title: string;
  description?: string | { type: string; value: string };
  subjectPlaces: string[];
  subjectTimes: string;
  subjects: string[];
  firstPublishDate: string;
  pages: string;
}
