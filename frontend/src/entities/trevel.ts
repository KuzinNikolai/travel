export interface ICityItem {
  id: number;
  name: string;
  slug: string;
  title: string;
  description: string;
  photo: string | null;
  tour_count: number;
}

export interface ITag {
  tag: string;
  slug: string;
  active_image: string;
  inactive_image: string;
}

export interface ITour {
  id: number;
  country: string;
  city: string;
  title: string;
  meta_desc: string;
  description: string;
  duration: string;
  type: string;
  slug: string;
  cat: string;
  tags: ITag[];
  min_price: number | null;
  photo: string;
  average_rating: number;
}

export interface ICity {
  id: number;
  name: string;
  title: string;
  slug: "phuket";
  meta_desc: string;
  description: string;
  photo: string;
}

export interface ICountry {
  id: number;
  name: string;
  slug: string;
  title: string;
  description: string;
  cities: ICity[]
}
