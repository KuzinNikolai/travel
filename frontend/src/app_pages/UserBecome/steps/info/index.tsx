import { Button } from "@share/ui/Buttons";
import { Icon, type IconsName } from "@share/ui/Icon";
import { Section } from "@share/ui/Layout";
import { Typography } from "@share/ui/Text";
import { HeaderWithBack } from "@widget/Headers/HeaderWithBack";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import type { FC } from "react";
import { HowWeAreWorking } from "./components/HowWeAreWorking";
import { OfferTourItem } from "./components/OfferTourItem";

export const metadata = {
	title: "Become guide",
};

export const BecomeInfoStep = async () => {
	const t = await getTranslations();

	return (
		<>
			<HeaderWithBack title={t("pages.become.title")} />
			<Section contentProps={{ className: "flex flex-col gap-md" }}>
				<div className="space-y-3">
					<Typography variant="h4" as="h2">
						{t("pages.become.content.aboutUs.title")}
					</Typography>
					<Typography className="text-primary-400">
						{t("pages.become.content.aboutUs.description")}
					</Typography>
				</div>
				<div className="space-y-3">
					<Typography variant="h4" as="h2">
						{t("pages.become.content.whoCanJoin.title")}
					</Typography>
					<Typography className="text-primary-400">
						{t("pages.become.content.whoCanJoin.description")}
					</Typography>
				</div>
				<div className="space-y-3">
					<Typography variant="h4" as="h2">
						{t("pages.become.content.howToOfferYourTour.title")}
					</Typography>
					<ul className="flex list-none flex-col gap-sm">
						<OfferTourItem
							label={t(
								"pages.become.content.howToOfferYourTour.sendingTour.title",
							)}
							description={t(
								"pages.become.content.howToOfferYourTour.sendingTour.description",
							)}
							icon="ImageUp"
						/>
						<OfferTourItem
							label={t("pages.become.content.howToOfferYourTour.call.title")}
							description={t(
								"pages.become.content.howToOfferYourTour.call.description",
							)}
							icon="PhoneIncoming"
						/>
						<OfferTourItem
							label={t(
								"pages.become.content.howToOfferYourTour.postingOnWebsite.title",
							)}
							description={t(
								"pages.become.content.howToOfferYourTour.postingOnWebsite.description",
							)}
							icon="BookUp"
						/>
					</ul>
				</div>
				<Button variant="outline" className="my-5" asChild>
					<Link href="./form">{t("pages.become.becomeAction")}</Link>
				</Button>
				<div className="space-y-3">
					<Typography variant="h4" as="h2" className="text-base-0">
						{t("pages.become.content.howWeAreWorking.title")}
					</Typography>
					<ul className="space-y-3">
						<HowWeAreWorking
							label={t(
								"pages.become.content.howWeAreWorking.freePlacement.title",
							)}
							description={t(
								"pages.become.content.howWeAreWorking.freePlacement.description",
							)}
						/>
						<HowWeAreWorking
							label={t(
								"pages.become.content.howWeAreWorking.salesCommission.title",
							)}
							description={t(
								"pages.become.content.howWeAreWorking.salesCommission.description",
							)}
						/>
						<Typography className="!mt-7 text-base-20">
							{t("pages.become.content.howWeAreWorking.partnership")}
						</Typography>
					</ul>
				</div>
				<Button variant="outline" className="my-5" asChild>
					<Link href="./form">{t("pages.become.becomeAction")}</Link>
				</Button>
			</Section>
		</>
	);
};
