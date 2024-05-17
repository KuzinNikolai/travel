import React from "react";
import { Button } from "../../components/Button/Button";
import styles from "../../components/Htag/Htag.module.css";
import { SquareTourCard } from "../../components/SquareTourCard/SquareTourCard";
import { getAllCities } from "../actions/getAllCities";
import { getAllTours } from "../actions/getAllTours";

export const dynamic = 'force-dynamic';


export default async function Home() {
  const cities = await getAllCities(); // Получаем данные о городах
  const tours = await getAllTours(); // Получаем данные о турах

  return (
    <main>
      <section>
        <h2>Cities</h2>
        {cities.map((city) => (
          <div key={city.id}>
            <h1 className={styles.h1}>
               {city.name}
            </h1>
            <p>{city.title}</p>
            <p>{city.slug}</p>
            <p>{city.meta_desc}</p>
            <p>{city.description}</p>
            <Button appearance='btn_solid'>
               {city.name}
            </Button>
          </div>
        ))}
      </section>
      <section>
        <h2>Tours</h2>
        {tours.map((tour) => (
          <React.Fragment key={tour.id}>
            <SquareTourCard
              appearance="card"
              title={tour.title}
              description={tour.description}
              price={tour.adult_price}
              image={tour.photo}
              children={undefined} 
              average_rating={tour.average_rating}
            />
          </React.Fragment>
        ))}
      </section>
    </main>
  );
}
 