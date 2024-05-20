import { Tour } from '../../types'; // Импорт типов из общего файла types.d.ts

export interface TourListProps {
  tours: Tour[];
  citySlug: string;
}