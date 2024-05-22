import React from 'react';
import { notFound } from 'next/navigation';
import styles from '../[slug]/СityDetail.module.css';
import TourList from '../../../../components/TourList/TourList';
import { City, Tour, Tag } from '../../../../types'; // Импортируем типы из файла types.d.ts
import { SquareTourCard } from '../../../../components/SquareTourCard/SquareTourCard';

export const dynamic = 'force-dynamic';

type Props = {
  params: {
    slug: string;
  };
};

const fetchCity = async (slug: string): Promise<City | null> => {
  const res = await fetch(`http://localhost:8000/api/v1/city/${slug}/`);
  if (!res.ok) {
    return null;
  }
  const city = await res.json();
  return city;
};

const CityDetail = async ({ params }: Props) => {
  const city = await fetchCity(params.slug);

  if (!city) {
    notFound();
  }

  // Сбор всех уникальных тегов из туров
  const allTags: Tag[] = [];
  city.tours.forEach((tour: Tour) => {
    tour.tags.forEach((tag: Tag) => {
      if (!allTags.some((existingTag) => existingTag.slug === tag.slug)) {
        allTags.push(tag);
      }
    });
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{city.name}</h1>
      <h2 className={styles.subtitle}>{city.title}</h2>
      <p className={styles.meta}>{city.meta_desc}</p>
      <p className={styles.description}>{city.description}</p>
      
      {/* Вывод всех уникальных тегов */}
      <h3>Теги</h3>
      <ul>
        {allTags.map((tag: Tag) => (
          <li key={tag.slug}>{tag.tag}</li>
        ))}
      </ul>
      <TourList tours={city.tours} />
    </div>
  );
};

export default CityDetail;
