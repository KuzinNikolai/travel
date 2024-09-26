import { Typography } from "@share/ui/Text"
import type { MDXComponents } from "mdx/types"
import { useLocale } from "next-intl"
import Image, { type ImageProps } from "next/image"
import Link from "next/link"

export function useMDXComponents(components: MDXComponents): MDXComponents {
	const locale = useLocale()

	return {
		h1: ({ children }) => (
			<Typography
				variant='h1'
				as='h1'
			>
				{children}
			</Typography>
		),
		h2: ({ children }) => (
			<Typography
				variant='h2'
				as='h2'
			>
				{children}
			</Typography>
		),
		h3: ({ children }) => (
			<Typography
				variant='h3'
				as='h3'
			>
				{children}
			</Typography>
		),
		h4: ({ children }) => (
			<Typography
				variant='h4'
				as='h4'
			>
				{children}
			</Typography>
		),
		h5: ({ children }) => (
			<Typography
				variant='h5'
				as='h5'
			>
				{children}
			</Typography>
		),
		h6: ({ children }) => (
			<Typography
				variant='h6'
				as='h6'
			>
				{children}
			</Typography>
		),
		a: ({ children, ...props }) => (
			<Typography
				variant='link'
				as='a'
			>
				{props.href ? (
					<Link
						href={props.href}
						hrefLang={props.hrefLang}
						{...props}
					>
						{children}
					</Link>
				) : (
					children
				)}
			</Typography>
		),
		img: ({ ...props }) => (
			<Image
				sizes='100vw'
				style={{ width: "100%", height: "auto" }}
				{...(props as ImageProps)}
			/>
		),
		blockquote: ({ children }) => <Typography as='blockquote'>{children}</Typography>,
		p: ({ children }) => <Typography>{children}</Typography>,
		li: ({ children }) => <Typography as='li'>{children}</Typography>,
		...components,
	}
}
