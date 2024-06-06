import { DateTime } from "@/packages/utilsTypes/time";
import { IQuestion } from "./question";
import { IReview } from "./review";

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

export interface ICity {
  id: number;
  name: string;
  title: string;
  slug: string;
  meta_desc: string;
  description: string;
  photo: string;
}

export interface ICityItem extends ICity {
  tour_count: number;
  popular_tours: ITour[];
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
  currency_prefix: string;
}

export interface IDetailTour extends ITour {
  currency_prefix: string;
  lang: string[];
  transfer: string[];
  faqs: IQuestion[];
  programs: string[];
  included: string[];
  notincluded: string[];
  take: string[];
  reviews: IReview[];
  photos: string[];
  meta_keywords: string;
  adult_price: number;
  child_price: number;
  children_possible: boolean;
  what_age_child_free: number;
  pregnant_possible: boolean;
  photo: string;
  usage_policy: string;
  time_create: DateTime;
  time_update: DateTime | null;
  promotions: number;
  author: number;
}
