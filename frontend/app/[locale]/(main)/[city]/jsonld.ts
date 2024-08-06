import type { DetailCity } from "@entity/city"
import { API_DOMAIN } from "@share/constants/API_DOMAIN"
import type { ItemList, WithContext } from "schema-dts"

export const generateToursJsonLd = (city: DetailCity): WithContext<ItemList> => ({
	"@context": "https://schema.org",
	"@type": "ItemList",
	description: `Все туры в ${city.tours[0].city}`,

	itemListElement: city.tours.map((tour) => ({
		"@type": ["TouristAttraction", "Offer"],
		"@id": tour.id.toString(),
		name: tour.title,
		image: {
			"@type": "ImageObject",
			"@id": tour.photo,
			about: tour.photo_alt,
		},
		tourBookingPage: `${API_DOMAIN}/countries/${tour.country_slug}/${tour.city_slug}/${tour.slug}`,
		url: `${API_DOMAIN}/countries/${tour.country_slug}/${tour.city_slug}/${tour.slug}`,
		aggregateRating: {
			"@type": "AggregateRating",
			"@id": "0",
			ratingCount: tour.average_rating,
		},
		description: city.description,
		publicAccess: true,
		price: tour.min_price,
		priceCurrency: tour.currency_prefix,
	})),
})