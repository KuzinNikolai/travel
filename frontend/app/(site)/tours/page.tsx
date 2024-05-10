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

async function getTours(): Promise<Tour[]> {
  const res = await fetch('http://127.0.0.1:8000/api/v1/tours/')
 
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json();
}
 
export default async function Tour() {
  const data = await getTours();

  return (
    <main>
      {data.map((tour) => (
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
