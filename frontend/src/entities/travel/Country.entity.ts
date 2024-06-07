import { ICity, ICityItem } from "./City.entity";

export interface ICountry {
  id: number;
  name: string;
  slug: string;
  title: string;
  description: string;
  cities: ICity[];
}

export interface IDetailCountry extends ICountry {
  cities: ICityItem[];
}