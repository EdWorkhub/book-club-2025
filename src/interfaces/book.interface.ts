// OpenLibrary Interface
export interface OpenLibraryBook {
  title: string;
  author: string;
  coverUrl: string | null;
  year: number | string;
  olid: string;
}

// OpenLibrary Detail Interface 
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

// Local DB Interface 
export interface LocalBook {
  id?: number;
  olId?: string | null;
  isbn?: number;
  title: string;
  author: string;
  published: string | null;
  imageUrl: string | null;
  pages?: string;

  description?: string | { value: string }; 
  covers?: string[];
}


