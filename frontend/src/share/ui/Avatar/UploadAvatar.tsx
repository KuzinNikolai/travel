import { forwardRef, useState } from "react"
import type { RefCallBack } from "react-hook-form"
import { Typography } from "../Text"
import Image from "next/image"
import { cn } from "@share/lib"

interface UploadAvatarProps {
	isPending: boolean
	onBlur: () => void
	value: File | string | null
	name: string
	ref: RefCallBack
	onChange?: (image: File | null) => void
	disabled?: boolean
	size?: {
		width: number
		height: number
	}
}

export const UploadImage = forwardRef<HTMLInputElement, UploadAvatarProps>(({ size, isPending, ...props }, ref) => {
	const _size = size || { width: 40, height: 40 }

	const [imgPath, setImgPath] = useState(typeof props.value === "string" ? props.value : null)

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null
		props.onChange?.(file)
		file && setImgPath(URL.createObjectURL(file))
	}

	return (
		<div
			className='relative flex h-full w-full flex-col items-center justify-center rounded-full bg-gray-300/60'
			style={_size}
		>
			{imgPath && (
				<Image
					src={imgPath}
					alt='Avatar'
					width={props.value instanceof File ? props.value.size : _size.width * 2}
					height={props.value instanceof File ? props.value.size : _size.height * 2}
					className='absolute top-0 right-0 bottom-0 left-0 h-full w-full rounded-full bg-gray-300/60 object-cover'
				/>
			)}

			<label
				htmlFor={props.name}
				className={cn(
					"absolute top-0 right-0 bottom-0 left-0 rounded-ful",
					isPending ? "cursor-not-allowed" : "cursor-pointer",
				)}
			>
				<Typography
					variant='contentSecondary'
					className='sr-only'
				>
					Добавьте изображение к профилю
				</Typography>
			</label>

			<input
				id={props.name}
				type='file'
				name={props.name}
				ref={ref}
				accept='image/png, image/jpeg, image/webp'
				multiple={false}
				className='sr-only absolute top-0 right-0 bottom-0 left-0'
				disabled={isPending}
				onChange={onChange}
			/>
		</div>
	)
})

UploadImage.displayName = "UploadImage"
