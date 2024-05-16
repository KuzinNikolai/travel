import { getAllTours } from "../../actions/getAllTours";

export const dynamic = 'force-dynamic';

interface Tour {
  id: number;
  title: string;
  slug: string;
  meta_desc: string;
  description: string;
  image: string;
  country: string;
  city: string;
}
 
export default async function Tour() {
  const tours = await getAllTours();

  return (
    <main>
      {tours.map((tour) => (
        <div key={tour.id}>
          <h1>{tour.title}</h1>
          <p>{tour.slug}</p>
          <p>{tour.meta_desc}</p>
          <p>{tour.description}</p>
        </div>
      ))}
    </main>
  );
}
