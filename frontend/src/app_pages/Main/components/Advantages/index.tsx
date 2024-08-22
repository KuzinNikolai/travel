import type { IAdvantage } from "@entity/advantage.entity";
import { Icon } from "@share/ui/Icon";
import { Section } from "@share/ui/Layout";
import { getTranslations } from "next-intl/server";
import { Advantage } from "./Advantage";

export const AdvantageList = (
	t: Awaited<ReturnType<typeof getTranslations<never>>>,
) =>
	[
		{
			title: t("pages.mainPage.advantages.tourCancellation.title"),
			description: t("pages.mainPage.advantages.tourCancellation.description"),
			iconLabel: t("pages.mainPage.advantages.tourCancellation.iconLabel"),
			icon: <Icon name="Clock9" className="h-6 w-6 stroke-1" />,
		},
		{
			title: t("pages.mainPage.advantages.reviews.title"),
			description: t("pages.mainPage.advantages.reviews.description"),
			iconLabel: t("pages.mainPage.advantages.reviews.iconLabel"),
			icon: <Icon name="Star" className="h-6 w-6 stroke-1" />,
		},
		{
			title: t("pages.mainPage.advantages.prepayment.title"),
			description: t("pages.mainPage.advantages.prepayment.description"),
			iconLabel: t("pages.mainPage.advantages.prepayment.iconLabel"),
			icon: <Icon name="HandCoins" className="h-6 w-6 stroke-1" />,
		},
	] satisfies IAdvantage[];

export const Advantages = async () => {
	const t = await getTranslations();

	return (
		<Section>
			<ul className="m-none flex list-none flex-row justify-between gap-sm overflow-x-auto">
				{AdvantageList(t).map((advantage, index) => (
					<Advantage
						key={`${index}-${advantage.title}`}
						advantage={advantage}
					/>
				))}
			</ul>
		</Section>
	);
};
