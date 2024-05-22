import { City } from "../../types";

export function getAllCities(): Promise<City[]> {
    return fetch('http://127.0.0.1:8000/api/v1/cities/')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        return res.json();
      });
  }