export const dynamic = 'force-dynamic';


interface City {
  id: number;
  name: string;
  title: string;
  slug: string;
  meta_desc: string;
  description: string;
  image: string;
  country: string;
}

async function getCities(): Promise<City[]> {
  const res = await fetch('http://127.0.0.1:8000/api/v1/cities/')
 
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json();
}
 
export default async function Home() {
  const data = await getCities();

  return (
    <main>
      {data.map((city) => (
        <div key={city.id}>
          <h1>{city.name}</h1>
          <p>{city.title}</p>
          <p>{city.slug}</p>
          <p>{city.meta_desc}</p>
          <p>{city.description}</p>
        </div>
      ))}
    </main>
  );
}
