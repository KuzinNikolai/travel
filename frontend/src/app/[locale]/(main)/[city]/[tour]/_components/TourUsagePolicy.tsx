import { Button } from "@share/ui/Buttons";
import { Section } from "@share/ui/Layout";
import { Drawer } from "@share/ui/Modals";
import { Typography } from "@share/ui/Text";
import { getTranslations } from "next-intl/server";
import type { FC } from "react";

interface ITourUsagePolicy {
	usagePolicy: string;
}

export const TourUsagePolicy: FC<ITourUsagePolicy> = async ({
	usagePolicy,
}) => {
	const t = await getTranslations();

	return (
		<Section
			title={t("pages.detailTour.userPolicy")}
			header={
				usagePolicy.length > 130 ? (
					<Drawer
						title={t("pages.detailTour.userPolicy")}
						trigger={
							<Button variant="outline">
								{t("pages.detailTour.readMore")}
							</Button>
						}
					>
						<Typography variant="contentPrimary" className="leading-5">
							{usagePolicy}
						</Typography>
					</Drawer>
				) : null
			}
		>
			<Typography
				variant="contentPrimary"
				className="line-clamp-3 text-primary-400 leading-5"
			>
				{usagePolicy}
			</Typography>
		</Section>
	);
};
