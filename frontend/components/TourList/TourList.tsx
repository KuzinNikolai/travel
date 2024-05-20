import React from 'react';
import Link from 'next/link';
import styles from './TourList.module.css';
import { Tour } from '../../types'; // Импортируем типы из файла types.d.ts
import RatingPreview from '../RatingPreview/RatingPreview';

export const dynamic = 'force-dynamic';

type TourListProps = {
  tours: Tour[];
  citySlug: string;
};

const TourList: React.FC<TourListProps> = ({ tours, citySlug }) => {
  return (
    <section>
      <h2>Tours</h2>
      <div className={styles.cardContainer}>
        {tours.map((tour) => (
          <div key={tour.id} className={styles.cardItem}>
            <Link href={`/city/${citySlug}/tours/${tour.slug}`} legacyBehavior>
              <a>
                {tour.photo && <img src={tour.photo} alt={tour.title} />}
                <h4>{tour.title}</h4>
                <p>{tour.description}</p>
                <p>Price: {tour.min_price}</p>
                {tour.tags && tour.tags.length > 0 && (
                  <p>Tags: {tour.tags.map((tag) => tag.tag).join(', ')}</p>
                )}
                {tour.cat && (
                  <p>Category: {tour.cat}</p>
                )}
                {tour.duration && (
                  <p>Duration: {tour.duration}</p>
                )}
              </a>
            </Link>
            <div className={styles.product_content}>
              <RatingPreview average_rating={tour.average_rating} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TourList;
