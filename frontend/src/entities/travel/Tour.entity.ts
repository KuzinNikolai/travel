import { DateTime } from "@/packages/utilsTypes/time";
import { ITag } from "./Tag.entity";
import { IQuestion } from "../question.entity";
import { IReview } from "../review.entity";
import { IProgram } from "./program.entity";

export interface ITour {
  id: number;
  slug: string;
  country: string;
  country_slug: string;
  city: string;
  city_slug: string;

  title: string;
  meta_desc: string;
  description: string;

  duration: string;
  type: string;
  cat: string;
  tags: ITag[];
  min_price: number;
  photo: string;
  photo_alt: string;
  average_rating: number;
  currency_prefix: string;
}

export interface IDetailTour extends ITour {
  meta_keywords: string;

  lang: string[];
  transfer: string[];

  faqs: IQuestion[];
  programs: IProgram[];
  reviews: IReview[];

  included: string[];
  notincluded: string[];
  take: string[];

  photos: string[];
  adult_price: number;
  child_price: number;
  children_possible: boolean;
  what_age_child_free: number;
  pregnant_possible: boolean;
  usage_policy: string;
  promotions: number;
  author: number;

  time_create: DateTime;
  time_update: DateTime | null;
}
