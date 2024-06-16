"use client";

import { Skeleton } from "@/components/Skeleton";
import { Typography } from "@/components/Typography";
import { Tour } from "@/components/share/Tour";
import { ITour } from "@/entities/travel/Tour.entity";
import { useStore } from "@/packages/hooks/useStore";
import { useWishlistStore } from "@/packages/stores/wishlist";
import emptyCart from "@assets/img/empty-cart.png";
import consola from "consola";
import Image from "next/image";
import { FC } from "react";

interface IListProps {
  tours: ITour[];
}

export const List: FC<IListProps> = ({ tours }) => {
  const wishlistTours = useStore(useWishlistStore, (store) => store.tours);

  const filteredTours = tours.filter((tour) =>
    wishlistTours?.find((tourId) => tour.id === tourId)
  );

  consola.log("test", wishlistTours);

  if (wishlistTours === null) {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 5 }, (_, i) => (
          <Tour.Skeleton key={i} />
        ))}
      </div>
    );
  }

  return wishlistTours?.length ? (
    filteredTours.map((tour) => <Tour key={tour.id} tour={tour} />)
  ) : (
    <div className="flex-1 -translate-y-2 flex flex-col justify-center items-center gap-5 h-fit">
      <Image
        src={emptyCart.src}
        width={emptyCart.width}
        height={emptyCart.height}
        alt="Изображение отображающее пустая корзину"
      />
      <Typography variant="h2">Упс! Желаемых туров нет!</Typography>
      <Typography variant="content2">
        Похоже, вы еще не добавляли туров.
      </Typography>
    </div>
  );
};
