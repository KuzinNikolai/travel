interface City {
    meta_desc: ReactNode
    name: ReactNode
    id: number
    country: string
    title: string
    description: string
    slug: string
    photo: string
  }
  
  interface Tag {
    tag: string
    slug: string
    active_image: string
    inactive_image: string
  }

  interface Tour {
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
    cat: string;
  }