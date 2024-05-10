export function getAllCities(): Promise<City[]> {
    return fetch('http://127.0.0.1:8000/api/v1/cities/').then(res => res.json())
}