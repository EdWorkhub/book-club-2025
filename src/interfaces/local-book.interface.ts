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
