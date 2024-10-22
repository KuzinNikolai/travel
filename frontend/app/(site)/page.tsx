import React from "react";
import Link from 'next/link';
import { Button } from "../../components/Button/Button";
import { SquareTourCard } from "../../components/SquareTourCard/SquareTourCard";
import { getAllCities } from "../actions/getAllCities";
import { getAllTours } from "../actions/getAllTours";
import styles from "../page.module.css"; 
import { title } from "process";

export const dynamic = 'force-dynamic';


export default async function Home() {
  const cities = await getAllCities(); // Получаем данные о городах
  const tours = await getAllTours(); // Получаем данные о турах

  return (
    <main>
      <section>
        <h2>Cities</h2>
        <div className={styles.cardContainer}>
          {cities.map((city) => (
            <div key={city.id} className={styles.cardItem}>
             <Link href={`/city/${city.slug}`} legacyBehavior>
                <a className={styles.link}>
              <h1>
                {city.name}
              </h1>
              <p>{city.title}</p>
              <p>{city.slug}</p>
              <p>{city.meta_desc}</p>
              <p>{city.description}</p>
              <Button appearance='btn_solid'>
                {city.name}
              </Button>
              </a>
              </Link>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2>Tours</h2>
        <div className={styles.cardContainer}>
          {tours.map((tour) => (
            <div key={tour.id} className={styles.cardItem}>
              <SquareTourCard
                appearance="card"
                title={tour.title}
                meta_desc={tour.meta_desc}
                description={tour.description}
                duration={tour.duration}
                min_price={tour.min_price}
                image={tour.photo}
                children={undefined} 
                average_rating={tour.average_rating}
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
 