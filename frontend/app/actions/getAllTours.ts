import { Tour } from "../../types";

export function getAllTours(): Promise<Tour[]> {
    return fetch('http://127.0.0.1:8000/api/v1/tours/')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        return res.json();
      });
  }