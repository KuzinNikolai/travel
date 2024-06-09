import { ITour } from "./Tour.entity";

export interface IDetailCity {
  id: number;
  name: string;
  title: string;
  slug: string;
  description: string;
  tour_count: number;
  tours: ITour[];
  photo: string;
}

export interface ICity {
  id: number;
  name: string;
  title: string;
  slug: string;
  // meta_desc: string;
  description: string;
  photo: string;
}

export interface ICityItem extends ICity {
  tour_count: number;
  popular_tours: ITour[];
}
