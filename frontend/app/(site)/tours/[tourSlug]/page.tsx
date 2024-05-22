import { getTourDetail } from "../../../actions/getTourDetail";
import { Tour } from '../../../../types';
import RatingPreview from "../../../../components/RatingPreview/RatingPreview";

export const dynamic = 'force-dynamic';

interface TourDetailParams {
  params: {
    tourSlug: string;
  };
}

export default async function TourPage({ params: { tourSlug } }: TourDetailParams) {
  const tour: Tour | null = await getTourDetail(tourSlug);

  if (!tour) {
    return <div>Tour not found</div>;
  }
  return (
    <div>
      <h1>{tour.title}</h1>
      <p>{tour.description}</p>
      <p>{tour.meta_desc}</p>
      <p>{tour.duration}</p>
      <p>Цена: {tour.min_price}</p>
      <p>Average Rating: {tour.average_rating}</p>
      <p>Category: {tour.cat}</p>
      {tour.tags && tour.tags.length > 0 && (
        <p>Tags: {tour.tags.map((tag) => tag.tag).join(', ')}</p>
      )}
       <div>
          <RatingPreview average_rating={tour.average_rating} />
       </div>
        {/* Добавление секции фотографий */}
        {tour.photos && tour.photos.length > 0 && (
        <div>
          <h3>Photos</h3>
          <div>
            {tour.photos.map((photo, index) => (
              <img key={index} src={photo} alt={`Photo ${index + 1}`} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
