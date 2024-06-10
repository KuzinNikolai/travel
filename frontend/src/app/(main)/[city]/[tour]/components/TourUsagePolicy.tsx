import { Button } from "@/components/Button";
import { Drawer } from "@/components/Drawer";
import { Typography } from "@/components/Typography";
import { Section } from "@/components/layout/Section";
import { FC } from "react";

interface ITourUsagePolicy {
  usagePolicy: string;
}

export const TourUsagePolicy: FC<ITourUsagePolicy> = ({ usagePolicy }) => {
  return (
    <Section
      title="Политика использования"
      header={
        usagePolicy.length > 130 ? (
          <Drawer
            title="Политика использования"
            trigger={
              <Button className="text-red-500 hover:text-red-600">
                <Typography
                  variant="button"
                  as="span"
                  width="medium"
                  align="right"
                >
                  Читать далее
                </Typography>
              </Button>
            }
          >
            <Typography variant="content2">{usagePolicy}</Typography>
          </Drawer>
        ) : null
      }
    >
      <Typography variant="content2" className="text-primary-400 line-clamp-3">
        {usagePolicy}
      </Typography>
    </Section>
  );
};
