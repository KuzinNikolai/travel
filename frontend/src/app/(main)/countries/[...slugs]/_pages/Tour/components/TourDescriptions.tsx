import { Box } from "@/components/Box";
import { Button } from "@/components/Button";
import { Drawer } from "@/components/Drawer";
import { Typography } from "@/components/Typography";
import { IDetailTour } from "@/entities/travel/Tour.entity";
import { FC } from "react";

interface ITourDescriptionProps {
  description: string;
}

export const TourDescription: FC<ITourDescriptionProps> = ({ description }) => {
  return (
    <Box className="bg-background-400" as="section">
      <div className="container py-3 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Typography variant="h2" width="medium">
            Описание
          </Typography>
          {description.length > 130 && (
            <Drawer
              title="Описание"
              trigger={
                <Button className="text-red-500 hover:text-red-600 ">
                  <Typography variant="button" as="div" width="medium">
                    Читать далее
                  </Typography>
                </Button>
              }
            >
              {description}
            </Drawer>
          )}
        </div>
        <Typography variant="paragraph">
          {description.length > 130 ? `${description.slice(0, 130)}...` : description}
        </Typography>
      </div>
    </Box>
  );
};
