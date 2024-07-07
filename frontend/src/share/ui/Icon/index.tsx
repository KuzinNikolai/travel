import { icons as lucideIconsPack } from "lucide-react"
import { type FC, type HTMLAttributes, forwardRef } from "react"
import { customIconsPack } from "./CustomIcons"

type IconsName = keyof (typeof lucideIconsPack & typeof customIconsPack)

interface IconProps extends HTMLAttributes<SVGSVGElement> {
	name?: IconsName
}

const Icon: FC<IconProps> = forwardRef<SVGSVGElement, IconProps>(({ name, ...props }, ref) => {
	const NewIcon =
		lucideIconsPack[name as keyof typeof lucideIconsPack] ||
		customIconsPack[name as keyof typeof customIconsPack] ||
		lucideIconsPack.Asterisk

	return (
		<NewIcon
			{...props}
			ref={ref}
		/>
	)
})

Icon.displayName = "Icon"

export { Icon, type IconProps, type IconsName }
