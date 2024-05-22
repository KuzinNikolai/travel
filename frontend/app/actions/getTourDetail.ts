import { Tour } from '../../types';

export const getTourDetail = async (slug: string): Promise<Tour | null> => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/v1/tours/${slug}/`);
    if (!response.ok) {
      throw new Error('Не удалось получить детали тура');
    }
    const tourData = await response.json();
    return tourData as Tour;
  } catch (error) {
    console.error('Ошибка при получении деталей тура:', error);
    return null;
  }
};
