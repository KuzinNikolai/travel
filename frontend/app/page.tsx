'use client';
import React from "react";
import { Htag } from "../components/Htag/Htag";
import { Button } from "../components/Button/Button";
import { Category } from "../components/Category/Category";
import { Rating } from "../components/Rating/Rating";

export default function Home(): JSX.Element {
  return (
      <div>
          <Htag tag="h1">
            Тег H1
          </Htag>
          <Button appearance="btn_solid">
            Button
          </Button>
          <Button appearance="w_100_btn_outline">
            Button
          </Button>
          <Category appearance="cat">
            Categories
          </Category>
          <Rating rating={1} isEditable/>
      </div>
  );

  interface CountryItem {
    id: number;
    name: string;
    // Другие свойства страны, если они есть
  }
  
  async function getCountries(): Promise<CountryItem[]> {
    try {
      const res = await fetch('http://127.0.0.1:8000/countries/');
      if (!res.ok) {
        throw new Error('Failed to fetch countries');
      }
      const data = await res.json();
      return data as CountryItem[];
    } catch (error) {
      console.error('Error fetching countries:', error);
      return []; // Возвращаем пустой массив в случае ошибки
    }
  }
  
}
