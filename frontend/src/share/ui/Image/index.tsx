"use client";

import placeholderImg from "@assets/img/placeholder.jpg";
import { __DEV__ } from "@share/constants/mode";
import NextImage from "next/image";
import {
	type ComponentProps,
	type ElementRef,
	forwardRef,
	useState,
} from "react";

export const Image = forwardRef<
	ElementRef<typeof NextImage>,
	ComponentProps<typeof NextImage>
>((props, ref) => {
	const [isError, setIsError] = useState(false);

	return (
		<NextImage
			ref={ref}
			placeholder={__DEV__ ? "blur" : "empty"}
			onError={() => setIsError(true)}
			{...props}
			src={!isError ? props.src : placeholderImg.src}
			width={!isError ? props.width : placeholderImg.width}
			height={!isError ? props.height : placeholderImg.height}
			blurDataURL={
				"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
			}
		/>
	);
});

Image.displayName = "CustomImage";
