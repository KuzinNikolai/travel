import { Button } from "@/components/Button";
import { Drawer } from "@/components/Drawer";
import { Typography } from "@/components/Typography";
import { Section } from "@/components/layout/Section";
import { FC } from "react";

interface ITourDescriptionProps {
  description: string;
}

export const TourDescription: FC<ITourDescriptionProps> = ({ description }) => {
  return (
    <Section
      title="Описание"
      header={
        description.length > 13 ? (
          <Drawer
            title="Описание"
            trigger={
              <Button className="text-red-500 hover:text-red-600 ">
                <Typography variant="button" as="div" textWidth="medium">
                  Читать далее
                </Typography>
              </Button>
            }
          >
            <Typography variant="content2">{description}</Typography>
          </Drawer>
        ) : null
      }
    >
      <Typography variant="content2" className="line-clamp-3 text-primary-400">
        {description}
      </Typography>
    </Section>
  );
};
