interface City {
    id: number
    country: string
    city: string
    title: string
    description: string
    slug: string
    cat: string
    tags: Tag[]
    min_price: number
    photo: string
    average_rating: number
  }
  
  interface Tag {
    tag: string
    slug: string
    active_image: string
    inactive_image: string
  }