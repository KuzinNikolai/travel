import { Box } from "@/components/Box";
import { Button } from "@/components/Button";
import { Drawer } from "@/components/Drawer";
import { Typography } from "@/components/Typography";
import { FC } from "react";

interface ITourUsagePolicy {
  usagePolicy: string;
}

export const TourUsagePolicy: FC<ITourUsagePolicy> = ({ usagePolicy }) => {
  return (
    <Box className="bg-background-400" as="section">
      <div className="container py-3 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Typography variant="h2" width="medium">
            Политика использования
          </Typography>
          {usagePolicy.length > 130 && (
            <Drawer
              title="Политика использования"
              trigger={
                <Button className="text-red-500 hover:text-red-600">
                  <Typography variant="button" as="div" width="medium" align="right">
                    Читать далее
                  </Typography>
                </Button>
              }
            >
              {usagePolicy}
            </Drawer>
          )}
        </div>
        <Typography variant="paragraph">
          {usagePolicy.length > 130 ? `${usagePolicy.slice(0, 130)}...` : usagePolicy}
        </Typography>
      </div>
    </Box>
  );
};
