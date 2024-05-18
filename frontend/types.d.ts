
interface City {
  tours: Tour[];
  meta_desc: React.ReactNode;
  name: React.ReactNode;
  id: number;
  country: string;
  title: string;
  description: string;
  slug: string;
  photo: string;
}

interface Tag {
  tag: string;
  slug: string;
  active_image: string;
  inactive_image: string;
}

interface Tour {
  category: ReactNode;
  id: number;
  name: string;
  title: string;
  slug: string;
  meta_desc: string;
  description: string;
  image: string;
  country: string;
  city: string;
  adult_price: number;
  duration: number;
  tags: Tag[];
  programs: Programm[];
  min_price: number;
  photo: string;
  average_rating: number;
  cat: Category[];
}

interface Category {
  id: number;
  name: string;
  description: string;
  slug: string;
  photo: string;
}

interface Programm {
  // Определение программы
}

interface Category {
  // Определение категории
}

export { City, Tag, Tour, Category, Programm }; // Экспортируем типы из файла
