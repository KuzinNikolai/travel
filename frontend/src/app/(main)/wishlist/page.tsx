import { BackHeader } from "@/components/Headers/BackHeader";
import { Section } from "@/components/layout/Section";
import { List } from "./List";
import { Suspense } from "react";
import { getTours } from "@/packages/API/fetches/tours";

const WishList = async () => {
  const tours = await getTours() || [];

  return (
    <>
      <BackHeader />
      <Section
        title="wishlist"
        hiddenTitle
        className="flex-1 flex flex-col"
        containerClassNames="flex-1"
      >
        <Suspense>
          <List tours={tours} />
        </Suspense>
      </Section>
    </>
  );
};

export default WishList;
