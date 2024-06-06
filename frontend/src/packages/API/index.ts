import * as serverCities from "./fetches/cities";
import * as serverTours from "./fetches/tours";
// import * as serverCountries from "./serverApi/countries";

export const serverApi = {
  cities: serverCities,
  tours: serverTours,
  // countries: serverCountries,
}
