import React from 'react';
import { notFound } from 'next/navigation';
import styles from '../[slug]/СityDetail.module.css';
import { City, Tour } from '../../../../types'; // Импортируем типы из файла types.d.ts

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

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{city.name}</h1>
      <h2 className={styles.subtitle}>{city.title}</h2>
      <p className={styles.meta}>{city.meta_desc}</p>
      <p className={styles.description}>{city.description}</p>
      {/* Add any other city details here */}

      <h3>Tours</h3>
      <ul>
        {city.tours.map((tour: Tour) => (
          <li key={tour.id}>
            {tour.photo && <img src={tour.photo} alt={tour.title} />}
            <h4>{tour.title}</h4>
            <p>{tour.description}</p>
            {tour.tags && tour.tags.length > 0 && (
             <p>Tags: {tour.tags.map((tag) => tag.tag).join(', ')}</p> 
            )}
            <p>Category: {tour.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CityDetail;
