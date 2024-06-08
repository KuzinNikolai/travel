import { DateTime } from "@/packages/utilsTypes/time";

export interface IReview {
  id: number;
  user_full_name: string;
  user: number;
  tour: number;
  text: string;
  created_date: DateTime;
}