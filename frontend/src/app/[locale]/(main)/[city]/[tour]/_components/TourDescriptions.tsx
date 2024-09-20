import type { DetailTour } from "@entity/tour";
import { Button } from "@share/ui/Buttons";
import { Section } from "@share/ui/Layout";
import { Drawer } from "@share/ui/Modals";
import { Typography } from "@share/ui/Text";
import { getTranslations } from "next-intl/server";
import type { FC } from "react";

type TourDescriptionProps = Pick<DetailTour, "description">;

export const TourDescription: FC<TourDescriptionProps> = async ({
	description,
}) => {
	const t = await getTranslations();

	return (
		<Section
			title={t("pages.detailTour.description")}
			header={
				description.length > 13 ? (
					<Drawer
						title={t("pages.detailTour.description")}
						trigger={
							<Button variant="outline">
								{t("pages.detailTour.readMore")}
							</Button>
						}
					>
						<Typography
							variant="contentPrimary"
							className="text-base-20 leading-5"
						>
							{description}
						</Typography>
					</Drawer>
				) : null
			}
		>
			<Typography
				variant="contentPrimary"
				className="line-clamp-3 text-base-20 leading-5"
			>
				{description}
			</Typography>
		</Section>
	);
};
