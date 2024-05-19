import React from 'react';
import { notFound } from 'next/navigation';
import styles from '../[slug]/СityDetail.module.css';
import { City, Tour, Tag } from '../../../../types'; // Импортируем типы из файла types.d.ts
import { SquareTourCard } from '../../../../components/SquareTourCard/SquareTourCard';

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
      
      <h3>Туры</h3>
      <ul>
      <section>
        <h2>Tours</h2>
        <div className={styles.cardContainer}>
          {city.tours.map((tour) => (
            <div key={tour.id} className={styles.cardItem}>
              <SquareTourCard
                appearance="card"
                title={tour.title}
                meta_desc={tour.meta_desc}
                description={tour.description}
                duration={tour.duration}
                price={tour.adult_price}
                image={tour.photo}
                children={undefined} 
                average_rating={tour.average_rating}
              />
            </div>
          ))}
        </div>
      </section>
      </ul>
    </div>
  );
};

export default CityDetail;
